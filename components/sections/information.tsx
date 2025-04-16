import Section from '../shared/section';
import RichText, { RichTextProps } from '../shared/rich-text';
import GoogleReviews from '../shared/google-reviews';
import { Suspense } from 'react';

export interface InformationSectionProps {
  title: string;
  subTitle?: string;
  description?: RichTextProps;
  displayReviews: boolean;
}

export default function Information({
  title,
  subTitle,
  description,
  displayReviews = false,
}: InformationSectionProps) {
  return (
    <Section
      name='information-section'
      className='w-full bg-muted py-16 desktop:py-24'
    >
      <div className='flex flex-col-reverse relative container gap-y-8 items-center desktop:flex-row desktop:gap-x-20'>
        {displayReviews && (
          <Suspense fallback={<div>Loading reviews...</div>}>
            <div className='flex-shrink-0 w-full max-w-md'>
              <GoogleReviews />
            </div>
          </Suspense>
        )}
        <div className='space-y-3'>
          <h3 className='text-3xl tablet:text-5xl font-bold capitalize text-secondary'>
            {title} <span className='text-primary'>{subTitle}</span>
          </h3>
          {description && <RichText content={description} />}
        </div>
      </div>
    </Section>
  );
}
