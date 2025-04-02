import { CustomLink } from './shared/custom-link';
import Section from './shared/section';
import { BackgroundImage } from './types';

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: BackgroundImage;
  button: {
    label: string;
    url: string;
  };
};

export default function Cta({ title, subtitle, description, button }: Props) {
  return (
    <Section
      name='cta'
      className='flex flex-col items-center relative bg-secondary'
    >
      <div className='container py-20'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-4xl desktop:text-4xl font-bold tracking-tight text-background capitalize text-center'>
            {title} <span className='text-primary'>{subtitle}</span>
          </h1>
          <p className='max-w-4xl text-background text-center text-lg'>
            {description}
          </p>
        </div>
        <div className='text-center mt-8'>
          <CustomLink url='/estimates' size='lg' className='capitalize'>
            {button?.label}
          </CustomLink>
        </div>
      </div>
    </Section>
  );
}
