"use server"

import { z } from "zod"

const EstimateFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  phoneNumber: z.string().regex(/^$$\d{3}$$\s?\d{3}-\d{4}$/, {
    message: "Phone number must be in format (000) 000-0000",
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  street: z.string().min(3, { message: "Street address must be at least 3 characters" }),
  recaptchaToken: z.string().min(1, { message: "reCAPTCHA verification is required" }),
})

export type EstimateFormData = z.infer<typeof EstimateFormSchema>

export type FormResponse = {
  success: boolean
  errors?: {
    fullName?: string[]
    phoneNumber?: string[]
    email?: string[]
    street?: string[]
    recaptchaToken?: string[]
  }
  message?: string
}

export async function submitEstimateForm(prevState: FormResponse, formData: FormData): Promise<FormResponse> {
  const data = {
    fullName: formData.get("fullName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
    street: formData.get("street") as string,
    recaptchaToken: formData.get("recaptchaToken") as string,
  }

  const validationResult = EstimateFormSchema.safeParse(data)

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  try {
    /*
    const recaptchaVerified = await verifyRecaptchaToken(data.recaptchaToken);
    if (!recaptchaVerified) {
      return {
        success: false,
        message: "reCAPTCHA verification failed. Please try again."
      }
    }
    */
    // For demo purposes, we'll simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return {
      success: true,
      message: "Thank you! We'll contact you shortly with your free estimate.",
    }
  } catch (error) {
    // Handle any errors that occur during processing
    return {
      success: false,
      message: "There was an error submitting your request. Please try again.",
    }
  }
}

/*
async function verifyRecaptchaToken(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=YOUR_RECAPTCHA_SECRET_KEY&response=${token}`,
  });

  const data = await response.json();
  return data.success;
}

*/