import ParallaxBackground from '../elements/parallax-background';
import EstimateForm from '../forms/estimates';
import { Image, Link } from '@/utils/types';
import Section from '../shared/section';
import { CustomLink } from '../shared/custom-link';
import { IconCircleCheck } from '@tabler/icons-react';
import clsx from 'clsx';
import RichText, { RichTextProps } from '../shared/rich-text';

type THighlight = {
  title: string;
};
export interface HeroSectionProps {
  title: string;
  subTitle?: string;
  description: string | RichTextProps;
  background?: Image;
  displayForm?: boolean;
  cta?: Link;
  highlights?: THighlight[];
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
      className='flex flex-col overflow-hidden items-center relative min-h-[90vh] desktop:min-h-[85vh] max-h-[68rem]'
    >
      {background && (
        <div className='absolute inset-0 z-0'>
          <ParallaxBackground {...background} />
        </div>
      )}

      <div
        className={clsx(
          'z-10 inset-0 w-full flex flex-col absolute justify-center',
          { 'bg-secondary': !background, 'bg-secondary/80': background }
        )}
      >
        <div className='flex flex-col items-center container desktop:flex-row gap-14'>
          <div className='flex flex-col h-full justify-center gap-4'>
            <h1 className='font-bold  desktop:text-left text-5xl tablet:text-6xl capitilize text-background'>
              {title}
              <br />
              <span className='text-primary tablet:block'>{subTitle}</span>
            </h1>
            {typeof description !== 'string' ? (
              <RichText
                className='text-background/90 text-base tablet:text-lg max-w-6xl'
                content={description}
              />
            ) : (
              <p className='text-background/90 text-base tablet:text-lg max-w-6xl'>
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
    <ul className='flex flex-col desktop:flex-row desktop:gap-x-8 '>
      {highlights.map((item, index) => (
        <Highlight key={`highlight-item-${index}`} {...item} />
      ))}
    </ul>
  );
};

const Highlight = ({ title }: THighlight) => (
  <li className='inline-flex items-center desktop:justify-center gap-2'>
    <IconCircleCheck className='size-6 text-primary' />
    <span className='text-background font-semibold'>{title}</span>
  </li>
);
