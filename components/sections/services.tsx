import { Image, Link, Services as TServices } from '@/utils/types';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { CustomImage } from '../shared/custom-image';
import clsx from 'clsx';
import Section from '../shared/section';
import RichText from '../shared/rich-text';

export interface ServicesSectionProps {
  title?: string;
  subTitle?: string;
  cards?: TServices[];
}

export default function Services({
  title,
  subTitle,
  cards,
}: ServicesSectionProps) {
  return (
    <Section
      name='services-section'
      className='flex flex-col items-center relative bg-secondary'
    >
      <div className='container py-24'>
        <h3 className='capitalize font-bold text-center desktop:text-left text-4xl desktop:text-5xl capitilize text-background space-x-2'>
          {title}
          <span className='text-primary pl-2'>{subTitle}</span>
        </h3>

        <div className='mt-12'>
          <BentoGrid>
            {cards &&
              cards.map(({ name, cover, slug, description }, i) => (
                <BentoGridItem
                  key={i}
                  title={name}
                  description={
                    description ? (
                      <div className='inline-flex flex-col gap-2 items-start'>
                        <RichText
                          className='text-xs line-clamp-3'
                          content={description}
                        />
                        <span className='group-hover/bento:underline-offset-2 group-hover/bento:underline font-semibold capitalize'>
                          learn more
                        </span>
                      </div>
                    ) : null
                  }
                  header={
                    cover ? (
                      <div className='relative flex flex-1 w-full h-full min-h-[8rem] rounded-xl'>
                        <CustomImage
                          className='w-full h-full rounded-xl'
                          {...cover}
                          fill
                        />
                      </div>
                    ) : (
                      <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-background dark:from-foreground dark:to-foreground/90 to-background/20'></div>
                    )
                  }
                  className={clsx({
                    ' desktop:col-span-1 desktop:row-span-2': i === 0,
                  })}
                  link={{ url: `/services/${slug}`, label: 'learn more' }}
                />
              ))}
          </BentoGrid>
        </div>
      </div>
    </Section>
  );
}
