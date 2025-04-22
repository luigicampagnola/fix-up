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
  description?: string | RichTextProps;
  background?: Image;
  displayForm?: boolean;
  cta?: Link;
  highlights?: THighlight[];
  size?: 'normal' | 'large' | 'small';
  align?: 'left' | 'center';
  width?: 'small' | 'large';
}
export default function Hero({
  title,
  subTitle,
  description,
  background,
  cta,
  highlights,
  displayForm = false,
  size = 'normal',
  align = 'left',
  width = 'large',
}: HeroSectionProps) {
  return (
    <Section
      name='get-free-estimates'
      className={clsx(
        'flex flex-col overflow-hidden items-center relative min-h-[90dvh] desktop:min-h-[85dvh] max-h-[68rem]',
        {
          'min-h-[85dvh] desktop:min-h-[85dvh] max-h-[68rem]':
            !size || size === 'normal',
          'min-h-[150dvh] tablet:min-h-[130dvh] desktop:min-h-[95dvh] max-h-[68rem]':
            size === 'large',
          'min-h-[45dvh] desktop:min-h-[45dvh]': size === 'small',
        }
      )}
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
        <div
          className={clsx(
            'flex flex-col items-center container desktop:flex-row gap-14',
            {
              'justify-start': !align || align === 'left',
              'justify-center': align === 'center',
            }
          )}
        >
          <div
            className={clsx('flex flex-col h-full justify-center gap-4', {
              'max-w-6xl': !width || width === 'large',
              'max-w-3xl': width === 'small',
            })}
          >
            <h1 className='font-bold  desktop:text-left text-5xl tablet:text-6xl capitilize text-background'>
              {title}
              <br />
              <span className='text-primary tablet:block'>{subTitle}</span>
            </h1>
            {typeof description !== 'string' &&
            description !== undefined &&
            description !== null ? (
              <RichText
                className='text-background/90 text-base tablet:text-lg'
                content={description}
              />
            ) : (
              <p className='text-background/90 text-base tablet:text-lg'>
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
