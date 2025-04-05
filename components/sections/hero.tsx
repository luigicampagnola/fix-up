import ParallaxBackground from '../elements/parallax-background';
import EstimateForm from '../forms/estimates';
import { Image } from '@/utils/types';
import Section from '../shared/section';

export interface HeroSectionProps {
  title?: string;
  subTitle?: string;
  background: Image;
  theme: 'contact' | 'hero';
}
export default function Hero({
  title,
  subTitle,
  background,
  theme = 'hero',
}: HeroSectionProps) {
  return (
    <Section
      name='get-free-estimates'
      className='flex flex-col overflow-hidden items-center relative min-h-[95vh] desktop:min-h-[85vh] max-h-[68rem]'
    >
      <div className='absolute inset-0 z-0'>
        <ParallaxBackground {...background} />
      </div>
      <div className='z-10 bg-secondary/80 inset-0 w-full flex flex-col absolute justify-center'>
        <div className='flex flex-col items-center container desktop:flex-row  gap-y-8'>
          <div className='flex flex-col h-full justify-center'>
            <h1 className='font-bold text-center desktop:text-left text-4xl desktop:text-7xl capitilize text-background'>
              {title}
              <br />
              <span className='text-primary tablet:block'>{subTitle}</span>
            </h1>
          </div>
          {theme === 'contact' && (
            <div className='w-full max-w-md'>
              <EstimateForm />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
