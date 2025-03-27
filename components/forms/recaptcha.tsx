'use client'; // Keep this since reCAPTCHA is client-side only

import dynamic from 'next/dynamic';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => <div className='p-3 text-gray-500'>Loading reCAPTCHA...</div>, // Optional fallback
});

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY!;

export interface RecaptchaProps {
  onVerify: (value: string | null) => void;
}

export default function Recaptcha({ onVerify }: RecaptchaProps) {
  return (
    <div className='border border-gray-200 rounded p-3 bg-gray-50'>
      <ReCAPTCHA
        sitekey={recaptchaKey}
        hl='es'
        theme='light'
        size='normal'
        onChange={onVerify}
      />
    </div>
  );
}
