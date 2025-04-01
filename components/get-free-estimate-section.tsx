import { ContactForm, PhoneNumber } from './types';
import ParallaxBackground from './elements/parallax-background';
import EstimateForm from './forms/estimates';
import { CustomImage } from './shared/custom-image';
import { Image } from '@/utils/types';
import clsx from 'clsx';
import { Marquee } from './magicui/marquee';
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
      className={clsx('relative py-6 flex flex-col gap-y-1', {
        'items-center': !align || align === 'center',
        'items-start': align === 'left',
      })}
    >
      <h3 className='text-sm text-foreground/80 font-semibold tablet:text-base capitalize'>
        Trusted by leading companies
      </h3>
      <div
        className={clsx('relative flex  gap-2  items-center w-full', {
          container: !align || align === 'center',
        })}
      >
        <Marquee pauseOnHover className='[--duration:40s]'>
          {sponsors?.map(({ url, alternativeText, width, height }, index) => (
            <div
              key={`sponsor-images-${index}`}
              className='relative flex items-center justify-center'
            >
              <CustomImage
                className='h-10 tablet:h-12  w-auto object-contain tint-primary'
                alternativeText={alternativeText}
                url={url}
                width={width}
                height={height}
              />
            </div>
          ))}
        </Marquee>
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
    <>
      <section className='flex flex-col overflow-hidden items-center relative min-h-[90vh] desktop:min-h-[75vh] max-h-[68rem]'>
        <div className='absolute inset-0 z-0'>
          <ParallaxBackground {...image} />
        </div>
        <div className='z-10 bg-secondary/80 inset-0 w-full flex flex-col absolute justify-center'>
          <div className='flex flex-col items-center container desktop:flex-row  gap-y-8'>
            <div className='flex flex-col h-full justify-center'>
              <h1 className='font-bold text-center desktop:text-left text-4xl desktop:text-7xl capitilize text-background'>
                {title}
                <br />
                <span className='text-primary tablet:block'>{subtitle}</span>
              </h1>
            </div>
            {contactForm && (
              <div className='w-full max-w-md'>
                <EstimateForm />
              </div>
            )}
          </div>
        </div>
      </section>

      {sponsors && <SponsorsSection sponsors={sponsors} />}
    </>
  );
}
