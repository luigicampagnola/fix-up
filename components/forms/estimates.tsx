'use client';

import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormResponse, submitEstimateForm } from '@/lib/actions';
import Recaptcha from './recaptcha';
import { useTranslations } from 'next-intl';

interface FormField {
  label: string;
  placeholder: string;
}

interface TEstimateForm {
  title: string;
  submit: string;
  fields: {
    name: FormField;
    phoneNumber: FormField;
    email: FormField;
    street: FormField;
  };
  thankYou: {
    title: string;
    description: string;
  };
}

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
    contactInfo: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [formLoadTime, setFormLoadTime] = useState<string>(
    Date.now().toString()
  );

  const isFormValid: boolean =
    formData.fullName.length > 0 &&
    formData.phoneNumber.length > 0 &&
    formData.email.length > 0 &&
    formData.street.length > 0 &&
    recaptchaToken.length > 0;

  const formatPhoneNumber = (value: string): string => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRecaptchaVerify = (token: string | null): void => {
    if (token) setRecaptchaToken(token);
  };

  const handleSubmit = async (formData: FormData): Promise<void> => {
    formData.append('recaptchaToken', recaptchaToken);
    formData.append('formLoadTime', formLoadTime);
    await formAction(formData);
  };

  useEffect(() => {
    if (state.success) {
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        street: '',
        contactInfo: '',
      });
      setRecaptchaToken('');
      setFormLoadTime(Date.now().toString());
    }
  }, [state.success]);

  const tEstimateForm = useTranslations('EstimateForm');
  const tFields = tEstimateForm.raw('fields') as TEstimateForm['fields'];
  const tThankYou = tEstimateForm.raw('thankYou') as TEstimateForm['thankYou'];

  return state.success ? (
    <Card className='w-full max-w-md px-6 py-16 bg-background rounded-lg shadow-lg space-y-4'>
      <h2 className='text-2xl font-bold text-foreground'>{tThankYou.title}</h2>
      <Alert className='bg-green-50 border-green-200 text-primary'>
        <AlertDescription>{tThankYou.description}</AlertDescription>
      </Alert>
    </Card>
  ) : (
    <Card className='w-full max-w-md p-6 bg-background rounded-lg shadow-lg'>
      <div className='flex items-center gap-2 mb-6'>
        <h2 className='text-2xl font-bold text-foreground'>
          {tEstimateForm('title')}
        </h2>
      </div>
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
            {tFields.name.label}
          </label>
          <Input
            id='fullName'
            name='fullName'
            placeholder={tFields.name.placeholder}
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
            {tFields.phoneNumber.label}
          </label>
          <Input
            id='phoneNumber'
            name='phoneNumber'
            placeholder={tFields.phoneNumber.placeholder}
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
            {tFields.email.label}
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder={tFields.email.placeholder}
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
            {tFields.street.label}
          </label>
          <Input
            id='street'
            name='street'
            placeholder={tFields.street.placeholder}
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
        <Input
          type='text'
          name='contactInfo'
          value={formData.contactInfo}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete='off'
        />
        <Input type='hidden' name='formLoadTime' value={formLoadTime} />
        <Suspense>
          <Recaptcha onVerify={handleRecaptchaVerify} />
        </Suspense>
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
          {isPending ? 'Submitting...' : tEstimateForm('submit')}
        </Button>
      </form>
    </Card>
  );
}
