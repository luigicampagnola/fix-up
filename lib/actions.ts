'use server';

import { fetchAPI } from '@/utils/api';
import { z } from 'zod';

// list of disposable domain fields (partial, expand as needed)
const disposableEmailDomains: string[] = [
  'hedotu.com',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
];
const disposablePhoneNumbers: string[] = [
  '000',
  '111',
  '222',
  '333',
  '444',
  '555',
  '666',
  '777',
  '888',
  '999',
];

const EstimateFormSchema = z.object({
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
  phoneNumber: z
    .string()
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, {
      message: 'Phone number must be in format (000) 000-0000',
    })
    .refine(
      (val) => {
        const areaCode = val.slice(1, 4);
        return (
          !disposablePhoneNumbers.includes(areaCode) && !val.match(/(\d)\1{9}/)
        );
      },
      { message: 'Invalid US phone number' }
    ),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .refine(
      (val) =>
        !disposableEmailDomains.some((domain) => val.endsWith(`@${domain}`)),
      { message: 'Disposable email addresses are not allowed' }
    )
    .refine((val) => !val.toLowerCase().includes('test'), {
      message: 'Email cannot contain "test"',
    }),
  street: z
    .string()
    .min(5, { message: 'Street address must be at least 5 characters' })
    .regex(/\d+.*(St|Ave|Rd|Blvd|Ln|Dr|Ct|Cir|Way)/i, {
      message:
        'Street address must include a number and street type (e.g., St, Ave)',
    })
    .refine((val) => !val.toLowerCase().includes('test'), {
      message: 'Address cannot contain "test"',
    }),
  recaptchaToken: z
    .string()
    .min(1, { message: 'reCAPTCHA verification is required' }),
  contactInfo: z.string().max(0, { message: 'Bot detected' }), // Honeypot field, must be empty
  formLoadTime: z.string().refine(
    (val) => {
      const loadTime = parseInt(val, 10);
      const currentTime = Date.now();
      return currentTime - loadTime >= 3000; // At least 3 seconds
    },
    { message: 'Form submitted too quickly' }
  ),
});

export type EstimateFormData = z.infer<typeof EstimateFormSchema>;

export type FormResponse = {
  success: boolean;
  errors?: {
    fullName?: string[];
    phoneNumber?: string[];
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
    throw new Error('reCAPTCHA secret key is not configured');
  }

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

  const data: { success: boolean; 'error-codes'?: string[] } =
    await response.json();
  if (!data.success) {
    console.error('reCAPTCHA verification failed:', data['error-codes']);
  }
  return data.success;
}

export async function submitEstimateForm(
  prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> {
  const data = {
    fullName: formData.get('fullName') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    street: formData.get('street') as string,
    recaptchaToken: formData.get('recaptchaToken') as string,
    contactInfo: (formData.get('contactInfo') as string) || '',
    formLoadTime: formData.get('formLoadTime') as string,
  };
  const validationResult = EstimateFormSchema.safeParse(data);

  if (!validationResult.success) {
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
