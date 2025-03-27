import { ContactForm, PhoneNumber } from './types';
import ParallaxBackground from './elements/parallax-background';
import EstimateForm from './forms/estimates';
interface SponsorFile {
  documentId: string;
  url: string;
}
interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: PhoneNumber;
  email?: string;
  address?: string;
  contactForm?: ContactForm & {
    sponsors?: {
      files: SponsorFile[];
    };
  };
}

export default function GetFreeEstimateSection({
  title,
  subtitle,
  contactForm,
}: Props) {
  const image = contactForm?.backgroundImage?.backgroundImage!;

  return (
    <section className='flex flex-col items-center overflow-hidden relative min-h-[110vh] tablet:min-h-[100vh] desktop:min-h-[80vh] max-h-[68rem]'>
      <div className='absolute inset-0 z-0'>
        <ParallaxBackground {...image} />
      </div>
      <div className='z-10 bg-secondary/80 inset-0 w-full flex flex-col absolute'>
        <div className='py-12 flex-1 flex flex-col items-center container desktop:flex-row desktop:justify-between gap-y-8'>
          <div className='flex'>
            <h1 className=' font-bold text-center desktop:text-left text-4xl desktop:text-7xl capitilize text-background'>
              {title}
              <br />
              <span className='text-primary tablet:block'>{subtitle}</span>
            </h1>
          </div>
          {contactForm && (
            <div className='w-full pb-8 max-w-md'>
              <EstimateForm />
            </div>
          )}
        </div>
        <div className='-mt-10 flex-shrink-0 rotate-180'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-32 w-full block'
            viewBox='0 0 2600 131.1'
            preserveAspectRatio='none'
          >
            <path
              className='fill-white origin-center rotate-0'
              d='M0 0L2600 0 2600 69.1 0 0z'
            ></path>
            <path
              className='fill-white origin-center rotate-0 opacity-50'
              d='M0 0L2600 0 2600 69.1 0 69.1z'
            ></path>
            <path
              className='fill-white origin-center rotate-0 opacity-25'
              d='M2600 0L0 0 0 130.1 2600 69.1z'
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
