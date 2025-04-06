import ParallaxBackground from '../elements/parallax-background';
import EstimateForm from '../forms/estimates';
import { Image, Link } from '@/utils/types';
import Section from '../shared/section';
import { CustomLink } from '../shared/custom-link';
import { IconCircleCheck } from '@tabler/icons-react';

type THighlight = {
  title: string;
};
export interface HeroSectionProps {
  title: string;
  subTitle?: string;
  description: string;
  background: Image;
  displayForm: boolean;
  cta?: Link;
  highlights: THighlight[];
}
export default function Hero({
  title,
  subTitle,
  description,
  background,
  cta,
  highlights,
  displayForm = false,
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
          <div className='flex flex-col h-full justify-center gap-4'>
            <h1 className='font-bold text-center desktop:text-left text-4xl desktop:text-7xl capitilize text-background'>
              {title}
              <br />
              <span className='text-primary tablet:block'>{subTitle}</span>
            </h1>
            {description && (
              <p className='text-background/90 text-xl max-w-6xl'>
                {description}
              </p>
            )}
            {highlights && highlights.length > 0 && (
              <HighlightList highlights={highlights} />
            )}
            {cta && (
              <CustomLink className='mt-4 self-start' size='xl' {...cta} />
            )}
          </div>
          {displayForm && (
            <div className='w-full max-w-md'>
              <EstimateForm />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

const HighlightList = ({ highlights }: { highlights: THighlight[] }) => {
  return (
    <ul className='flex gap-x-8'>
      {highlights.map((item, index) => (
        <Highlight key={`highlight-item-${index}`} {...item} />
      ))}
    </ul>
  );
};

const Highlight = ({ title }: THighlight) => (
  <li className='inline-flex items-center justify-center gap-2'>
    <IconCircleCheck className='size-6 text-primary' />
    <span className='text-background font-semibold'>{title}</span>
  </li>
);
