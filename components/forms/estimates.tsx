'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormResponse, submitEstimateForm } from '@/lib/actions';
// import Recaptcha from './recaptcha';

const initialState: FormResponse = {
  success: false,
  errors: {},
};

export default function EstimateForm() {
  const [state, formAction, isPending] = useActionState(
    submitEstimateForm,
    initialState
  );

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    street: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState('');

  const isFormValid =
    formData.fullName.length > 0 &&
    formData.phoneNumber.length > 0 &&
    formData.email.length > 0 &&
    formData.street.length > 0 &&
    recaptchaToken.length > 0;

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 3) {
      return numbers.length ? `(${numbers}` : '';
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
        6,
        10
      )}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRecaptchaVerify = (token: string | null) => {
    if (token) setRecaptchaToken(token);
  };

  const handleSubmit = (formData: FormData) => {
    formData.append('recaptchaToken', recaptchaToken);
    return formAction(formData);
  };

  useEffect(() => {
    if (state.success) {
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        street: '',
      });
      setRecaptchaToken('');
    }
  }, [state.success]);

  return (
    <Card className='w-full max-w-md p-6 bg-background rounded-lg shadow-lg'>
      <div className='flex items-center gap-2 mb-6'>
        <h2 className='text-2xl font-bold text-foreground'>
          Get Free Estimate
        </h2>
      </div>

      {state.success && (
        <Alert className='mb-4 bg-green-50 border-green-200 text-primary'>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.message && !state.success && (
        <Alert className='mb-4 bg-red-50 border-red-200 text-destructive'>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <label
            htmlFor='fullName'
            className='block text-sm font-medium text-gray-700'
          >
            Full Name
          </label>
          <Input
            id='fullName'
            name='fullName'
            placeholder='Your Full Name'
            value={formData.fullName}
            onChange={handleChange}
            className={`border ${
              state.errors?.fullName ? 'border-destructive' : 'border-gray-300'
            } rounded p-3 w-full`}
            required
          />
          {state.errors?.fullName && (
            <p className='text-destructive text-xs mt-1'>
              {state.errors.fullName[0]}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='phoneNumber'
            className='block text-sm font-medium text-gray-700'
          >
            Phone Number
          </label>
          <Input
            id='phoneNumber'
            name='phoneNumber'
            placeholder='(000) 000-0000'
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`border ${
              state.errors?.phoneNumber
                ? 'border-destructive'
                : 'border-gray-300'
            } rounded p-3 w-full`}
            required
          />
          {state.errors?.phoneNumber && (
            <p className='text-destructive text-xs mt-1'>
              {state.errors.phoneNumber[0]}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='your@email.com'
            value={formData.email}
            onChange={handleChange}
            className={`border ${
              state.errors?.email ? 'border-destructive' : 'border-gray-300'
            } rounded p-3 w-full`}
            required
          />
          {state.errors?.email && (
            <p className='text-destructive text-xs mt-1'>
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='street'
            className='block text-sm font-medium text-gray-700'
          >
            Street Address
          </label>
          <Input
            id='street'
            name='street'
            placeholder='Street'
            value={formData.street}
            onChange={handleChange}
            className={`border ${
              state.errors?.street ? 'border-destructive' : 'border-gray-300'
            } rounded p-3 w-full`}
            required
          />
          {state.errors?.street && (
            <p className='text-destructive text-xs mt-1'>
              {state.errors.street[0]}
            </p>
          )}
        </div>

        {/* <Recaptcha onVerify={handleRecaptchaVerify} /> */}
        {state.errors?.recaptchaToken && (
          <p className='text-destructive text-xs mt-1'>
            {state.errors.recaptchaToken[0]}
          </p>
        )}

        <Button
          type='submit'
          className='w-full'
          disabled={!isFormValid || isPending}
        >
          {isPending ? 'Submitting...' : 'Contact Fix Up Roofing'}
        </Button>
      </form>
    </Card>
  );
}
