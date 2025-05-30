'use server';

import { fetchAPI } from '@/utils/api';
import {
  ADDRESS_REGEX,
  DISPOSABLE_EMAIL_DOMAINS,
  INVALID_US_AREA_CODES,
  IS_NOT_PRODUCTION_ENV,
  SOUTH_FLORIDA_CITIES,
  SOUTH_FLORIDA_ZIP_RANGES,
  VALID_US_AREA_CODES,
} from '@/utils/constants';
import { z } from 'zod';
import { cookies } from 'next/headers';

const EstimateFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters' })
      .regex(/^[A-Za-z\s'-]+$/, {
        message:
          'Full name can only contain letters, spaces, hyphens, or apostrophes',
      })
      .refine((val) => !val.toLowerCase().includes('test'), {
        message: 'Full name cannot contain "test"',
      }),
    phoneNumber: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, {
      message: 'Phone number must be in format (000) 000-0000',
    }),
    isCustomAreaCode: z.boolean().optional().default(false),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .refine(
        (val) =>
          !DISPOSABLE_EMAIL_DOMAINS.some((domain) =>
            val.endsWith(`@${domain}`)
          ),
        { message: 'Disposable email addresses are not allowed' }
      )
      .refine((val) => !/test(?:ing)?\b/i.test(val.toLowerCase()), {
        message: 'Email cannot contain "test" or "testing"',
      }),
    street: z
      .string()
      .transform((val) => val.trim())
      .pipe(
        z
          .string()
          .max(90, { message: 'Address cannot exceed 90 characters' })
          .regex(ADDRESS_REGEX, {
            message: 'Address requires street, city (Broward/Miami-Dade), ZIP code (e.g., 6917 NW 77th Ave Miami 33166)',
          })
          .refine(
            (val) => {
              const lowerVal = val.toLowerCase();
              // Match all 5-digit numbers and take the second one if it exists, otherwise the first
              const zipMatches = lowerVal.match(/\b\d{5}\b/g);
              if (!zipMatches || zipMatches.length === 0) return false;
              const zipNum = parseInt(zipMatches[zipMatches.length > 1 ? 1 : 0], 10);
              const isSouthFloridaZip = SOUTH_FLORIDA_ZIP_RANGES.some(
                (range) => zipNum >= range.min && zipNum <= range.max
              );
              return isSouthFloridaZip;
            },
            {
              message: 'Address requires a valid ZIP code in South Florida (e.g., 6917 NW 77th Ave Miami 33166)',
            }
          )
          .refine(
            (val) => {
              const lowerVal = val.toLowerCase();
              return SOUTH_FLORIDA_CITIES.some((city) =>
                lowerVal.includes(city)
              );
            },
            {
              message: 'Unfortunately, we do not currently serve that city. Please call us at (786) 235-2435 for more information.',
            }
          )
      ),
    recaptchaToken: z
      .string()
      .min(1, { message: 'reCAPTCHA verification is required' }),
    contactInfo: z.string().max(0, { message: 'Bot detected' }),
    formLoadTime: z.string().refine(
      (val) => {
        const loadTime = parseInt(val, 10);
        const currentTime = Date.now();
        return currentTime - loadTime >= 3000;
      },
      { message: 'Form submitted too quickly' }
    ),
  })
  .superRefine((data, ctx) => {
    const { phoneNumber, isCustomAreaCode } = data;
    const areaCode = phoneNumber.slice(1, 4);
    const isValidAreaCode =
      VALID_US_AREA_CODES.includes(areaCode) || isCustomAreaCode;
    const isInvalidAreaCode = INVALID_US_AREA_CODES.includes(areaCode);
    const isRepetitive = phoneNumber.match(/(\d)\1{9}/);

    if (!isValidAreaCode || isInvalidAreaCode || isRepetitive) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid US phone number',
        path: ['phoneNumber'],
      });
    }
  });


export type EstimateFormData = z.infer<typeof EstimateFormSchema>;

export type FormResponse = {
  success: boolean;
  errors?: {
    fullName?: string[];
    phoneNumber?: string[];
    isCustomAreaCode?: string[];
    email?: string[];
    street?: string[];
    recaptchaToken?: string[];
    contactInfo?: string[];
    formLoadTime?: string[];
  };
  message?: string;
};

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  if (IS_NOT_PRODUCTION_ENV) {
    return true;
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('reCAPTCHA secret key is not configured');
    throw new Error('reCAPTCHA secret key is not configured');
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(
          secretKey
        )}&response=${encodeURIComponent(token)}`,
      }
    );

    if (!response.ok) {
      console.error(
        `reCAPTCHA API request failed with status: ${response.status}`
      );
      return false;
    }

    const data: {
      success: boolean;
      'error-codes'?: string[];
      hostname?: string;
    } = await response.json();
    if (!data.success) {
      console.error('reCAPTCHA verification failed:', {
        errorCodes: data['error-codes'],
        hostname: data.hostname,
        tokenSnippet: token.slice(0, 20) + '...',
      });
    }
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function submitEstimateForm(
  prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> {
  const data = {
    fullName: formData.get('fullName') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    isCustomAreaCode: formData.get('isCustomAreaCode') === 'true',
    email: formData.get('email') as string,
    street: formData.get('street') as string,
    recaptchaToken: formData.get('recaptchaToken') as string,
    contactInfo: (formData.get('contactInfo') as string) || '',
    formLoadTime: formData.get('formLoadTime') as string,
  };

  // Validate form data
  const validationResult = EstimateFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('Validation failed:', {
      data,
      errors: validationResult.error.flatten().fieldErrors,
    });
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const recaptchaVerified = await verifyRecaptchaToken(data.recaptchaToken);
    if (!recaptchaVerified) {
      return {
        success: false,
        errors: {
          recaptchaToken: ['reCAPTCHA verification failed. Please try again.'],
        },
      };
    }

    const { fullName, phoneNumber, email, street } = validationResult.data;

    await fetchAPI({
      path: '/api/contacts',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            fullName,
            phone: phoneNumber,
            email,
            address: street,
            internalTest: IS_NOT_PRODUCTION_ENV,
          },
        }),
      },
    });
    await setFormSubmittedCookie();

    return {
      success: true,
      message:
        "Thank you! We'll contact you shortly with your free estimate. Have a great day!",
    };
  } catch (error) {
    console.error('API_REQUEST_ERROR', error);
    return {
      success: false,
      message: 'There was an error submitting your request. Please try again.',
    };
  }
}

export async function getModalCookies() {
  const cookieStore = await cookies();
  const formSubmitted = cookieStore.get('FORM_SUBMITTED')?.value;
  const modalDisabled = cookieStore.get('MODAL_DISABLED')?.value;
  return { formSubmitted: !!formSubmitted, modalDisabled: !!modalDisabled };
}

export async function setModalDisabledCookie() {
  const cookieStore = await cookies();
  cookieStore.set('MODAL_DISABLED', 'true', {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    path: '/',
    httpOnly: true,
  });
}

export async function setFormSubmittedCookie() {
  const cookieStore = await cookies();
  cookieStore.set('FORM_SUBMITTED', 'true', {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    path: '/',
    httpOnly: true,
  });
}
