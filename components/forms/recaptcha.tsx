'use client'; // Keep this since reCAPTCHA is client-side only

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => <div className="p-3 text-gray-500">Loading ReCAPTCHA...</div>, // Optional fallback
});

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY!;

export interface RecaptchaProps {
  onVerify: (value: string | null) => void;
}

export default function Recaptcha({ onVerify }: RecaptchaProps) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);

  return (
    <div className="border border-gray-200 rounded p-3 bg-gray-50">
      {display && (
        <ReCAPTCHA
          sitekey={recaptchaKey}
          hl="es"
          theme="light"
          size="normal"
          onChange={onVerify}
        />
      )}
    </div>
  );
}
