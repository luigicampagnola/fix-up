'use client';

import { Rates, ScrollTo } from './types';

import GoogleRate from './google-rate';

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  rates?: Rates;
  button?: ScrollTo;
};

export default function InformationSection({
  title,
  subtitle,
  description,
  rates,
}: Props) {
  return (
    <>
      <section className='w-full bg-muted py-16 desktop:py-28'>
        <div className=' flex flex-col-reverse relative container gap-y-8 items-center desktop:flex-row desktop:gap-x-20'>
          {rates && (
            <div className='w-full max-w-xl'>
              <GoogleRate rates={rates} />
            </div>
          )}
          <div className='space-y-3'>
            <h3 className='text-3xl tablet:text-5xl font-bold capitalize text-secondary'>
              {title} <span className='text-primary'>{subtitle}</span>
            </h3>
            {description && (
              <div
                className='prose-p:text-foreground desktop:prose-lg'
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
