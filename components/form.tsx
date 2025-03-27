'use client';

import { useEffect, useState } from 'react';
import { FaCircleExclamation, FaRegEnvelopeOpen } from 'react-icons/fa6';
import dynamic from 'next/dynamic';
import { ContactForm } from './types';
import { InputField, InputPhoneField } from './input-fields';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Button } from './ui/button';

const ReCAPTCHADynamic = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
});

interface SponsorFile {
  documentId: string;
  url: string;
}
interface Props {
  contactForm: ContactForm & {
    sponsors?: {
      files: SponsorFile[];
    };
  };
}

export default function Form({ contactForm }: Props) {
  const [validFields, setValidFields] = useState({
    fullname: true,
    phone: true,
    email: true,
    street: true,
    captcha: true,
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [showValidMessage, setShowValidMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    street: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para saber si el formulario ha sido enviado

  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  function handleRecaptchaChange(value: string | null) {
    setRecaptchaValue(value);
    setValidFields((prev) => ({ ...prev, captcha: !!value }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setValidFields({
      fullname: formData.fullname.length > 0,
      phone: formData.phone.length === 12,
      email: emailRegex.test(formData.email),
      street: formData.street.length > 3,
      captcha: !!recaptchaValue,
    });

    if (
      formData.fullname.length > 0 &&
      formData.phone.length === 12 &&
      emailRegex.test(formData.email) &&
      formData.street.length > 3 &&
      recaptchaValue
    ) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          setSubmitting(false);
          throw new Error(`response status: ${response.status}`);
        }

        if (response.ok) {
          // Limpiar el formulario (limpiar el estado de los valores)
          setFormData({
            fullname: '',
            phone: '',
            email: '',
            street: '',
          });
          // Resetea el estado del reCAPTCHA
          setRecaptchaValue(null);
          setShowValidMessage(true);
          setFormSubmitted(true); // Actualiza el estado para indicar que el formulario fue enviado
          setSubmitting(false);
          handleRecaptchaChange('false');
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    } else {
      setSubmitting(false);
    }
  }

  const {
    button,
    captcha,
    email,
    name,
    phone,
    street,
    title,
    warning,
    sponsors,
  } = contactForm;
  const fieldsAreInvalid = Object.keys(validFields).some(
    (key) => validFields[key as keyof typeof validFields] === false
  );

  useEffect(() => {
    if (showValidMessage) setTimeout(() => setShowValidMessage(false), 3000);
  }, [showValidMessage]);

  const sponsorImages =
    sponsors?.files?.map(
      (file) => `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL || ''}${file.url}`
    ) || [];

  return (
    <div
      id='Form'
      className='form bg-white rounded-lg shadow-sm md:m-0 relative'
    >
      <div
        className={`${
          showValidMessage
            ? 'opacity-100 z-10 flex flex-col'
            : 'opacity-0 -z-10 hidden'
        } transition-opacity ease-in-out delay-75 duration-100 absolute border-4 border-solid border-white bg-forestgreen text-white p-5 rounded-md bottom-0 right-0 z-10 w-full`}
      >
        <h6 className='font-bold border-b-4 border-midnightblue text-white text-[20px]'>
          Thank You for Your Submission!
        </h6>
        <p className='left-5 pt-4'>
          We have received your contact request along with your personal
          information. Our team will review your details and reach out to you
          promptly. Please check your inbox (and your spam folder just in case)
          for our response. We appreciate your trust and look forward to
          connecting with you soon. Have a great day!
        </p>
      </div>
      <form
        className='pt-[48px] px-[42px] md:px-[48] pb-[32px]'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center gap-x-2'>
          <FaRegEnvelopeOpen className='text-primary text-2xl' />
          <h2 className='text-foreground font-bold text-2xl capitalize'>
            {title}
          </h2>
        </div>
        <div
          className={`${
            fieldsAreInvalid
              ? 'border-internationOrange border p-4 bg-snow text-internationOrange text-[13px] font-medium flex'
              : 'hidden'
          }`}
        >
          <FaCircleExclamation className='text-[28px]' />
          <p className='pl-4'>{warning}</p>
        </div>
        <InputField
          id='fullname'
          name='fullname'
          labels={name}
          invalid={!validFields.fullname}
          type='text'
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <InputPhoneField
          id='phone'
          name='phone'
          labels={phone}
          invalid={!validFields.phone}
          value={formData.phone}
          onChange={handleInputChange}
        />
        <InputField
          id='email'
          name='email'
          labels={email}
          invalid={!validFields.email}
          type='email'
          value={formData.email}
          onChange={handleInputChange}
        />
        <InputField
          id='street'
          name='street'
          labels={street}
          invalid={!validFields.street}
          type='text'
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className='flex flex-col py-2'>
          <label
            className={`${
              !validFields.captcha
                ? 'text-internationOrange'
                : 'text-foreground'
            } font-bold text-[16px] uppercase`}
          >
            {captcha.label}
          </label>

          <div className='recaptcha-container'>
            {recaptchaKey && (
              <ReCAPTCHADynamic
                sitekey={recaptchaKey}
                onChange={handleRecaptchaChange}
                hl='es'
                theme='light'
                size='normal'
              />
            )}
          </div>
          <span
            className={`${
              !validFields.captcha && warning ? 'block' : 'hidden'
            } border-internationOrange border bg-snow text-internationOrange`}
          >
            {captcha.warning}
          </span>
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={submitting || formSubmitted} // Deshabilita el botón después del envío exitoso
        >
          {formSubmitted ? (
            'Thank you for your request!' // Cambia el texto cuando se haya enviado correctamente
          ) : submitting ? (
            <svg
              className='animate-spin h-5 w-5 mr-3 fill-forestgreen ...'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-75'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
                strokeDasharray='30'
                strokeLinecap='round'
              ></circle>
            </svg>
          ) : (
            button.label
          )}
        </Button>
        {sponsorImages.length > 0 && (
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {sponsorImages.map((image, index) => (
                <div
                  className='flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] px-2'
                  key={`slide-${index}`}
                >
                  <Image
                    alt={`Sponsor ${index + 1}`}
                    width={300}
                    height={200}
                    className='object-cover w-full h-auto'
                    src={image}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
