import { ContactForm, PhoneNumber } from './types';
import ParallaxBackground from './elements/parallax-background';
import EstimateForm from './forms/estimates';
import { CustomImage } from './shared/custom-image';
import { Image } from '@/utils/types';
import clsx from 'clsx';
interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: PhoneNumber;
  email?: string;
  address?: string;
  contactForm?: ContactForm & {
    sponsors?: {
      files: Image[];
    };
  };
}

function SponsorsSection({
  sponsors,
  align,
}: {
  sponsors: Image[];
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={clsx('relative py-8 flex flex-col gap-y-2', {
        'items-center': !align || align === 'center',
        'items-start': align === 'left',
      })}
    >
      <h3 className='text-sm text-muted tablet:text-base'>
        Our Trusted Sponsors
      </h3>
      <div
        className={clsx(
          'relative flex flex-wrap  gap-2 max-w-xl items-center w-full',
          { container: !align || align === 'center' }
        )}
      >
        {sponsors?.map(({ url, alternativeText, width, height }, index) => (
          <div
            key={`sponsor-images-${index}`}
            className='relative flex items-center justify-center'
          >
            <div className='absolute inset-0 transition-all duration-300 brightness-50 opacity-40 hover:brightness-100 hover:opacity-0 bg-secondary' />
            <CustomImage
              className='h-12  w-auto object-contain tint-primary'
              alternativeText={alternativeText}
              url={url}
              width={width}
              height={height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default function GetFreeEstimateSection({
  title,
  subtitle,
  contactForm,
}: Props) {
  const image = contactForm?.backgroundImage?.backgroundImage!;
  const sponsors = contactForm?.sponsors?.files;

  return (
    <section className='flex flex-col overflow-hidden items-center relative min-h-[110vh] tablet:min-h-[100vh] desktop:min-h-[85vh] max-h-[68rem]'>
      <div className='absolute inset-0 z-0'>
        <ParallaxBackground {...image} />
      </div>
      <div className='z-10 bg-secondary/80 inset-0 w-full flex flex-col absolute'>
        <div className='pt-12 flex-1 flex flex-col items-center container desktop:flex-row  gap-y-8'>
          <div className='flex flex-col h-full justify-evenly'>
            <h1 className='font-bold text-center desktop:text-left text-4xl desktop:text-7xl capitilize text-background'>
              {title}
              <br />
              <span className='text-primary tablet:block'>{subtitle}</span>
            </h1>
            {sponsors && (
              <div className='hidden desktop:block'>
                <SponsorsSection sponsors={sponsors} align='left' />
              </div>
            )}
          </div>
          {contactForm && (
            <div className='w-full max-w-md'>
              <EstimateForm />
            </div>
          )}
        </div>
        {sponsors && (
          <div className='desktop:hidden'>
            <SponsorsSection sponsors={sponsors} />
          </div>
        )}
      </div>
    </section>
  );
}
