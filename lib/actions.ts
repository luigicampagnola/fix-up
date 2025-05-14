'use server';

import { fetchAPI } from '@/utils/api';
import {
  DISPOSABLE_EMAIL_DOMAINS,
  INVALID_US_AREA_CODES,
  VALID_US_AREA_CODES,
} from '@/utils/constants';
import { z } from 'zod';

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
      .min(5, { message: 'Address must be at least 5 characters' })
      .max(100, { message: 'Address cannot exceed 100 characters' }),
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
            internalTest: process.env.NODE_ENV !== 'production',
          },
        }),
      },
    });

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
