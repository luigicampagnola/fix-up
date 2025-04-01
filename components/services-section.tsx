import { Image, Link } from '@/utils/types';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { CustomImage } from './shared/custom-image';
import clsx from 'clsx';

/*
  FIX:
  THIS DATA STRUCTURE IS NOT CORRECT
  THIS MUST BE FIXED LATER  
*/
type SrcImage = {
  src: Image;
};
type BackgroundImage = {
  backgroundImage: Image;
};
/*
  FIX:
  THIS DATA STRUCTURE IS NOT CORRECT
  THIS MUST BE FIXED LATER  
*/
type Option = {
  values: string;
};
export type CardWidgetProps = {
  name?: string;
  image?: SrcImage;
  title?: string;
  subtitle?: string;
  options?: Option[];
  link?: Link;
};
export type ServicesSectionProps = {
  title?: string;
  subtitle?: string;
  cards?: CardWidgetProps[];
  backgroundImage: BackgroundImage;
};

export default function ServicesSection({
  title,
  subtitle,
  cards,
}: ServicesSectionProps) {
  return (
    <section className='flex flex-col items-center relative bg-secondary'>
      <div className='container py-24'>
        <h3 className='capitalize font-bold text-center desktop:text-left text-4xl desktop:text-5xl capitilize text-background space-x-2'>
          {title}
          <span className='text-primary pl-2'>{subtitle}</span>
        </h3>

        <div className='mt-12'>
          <BentoGrid>
            {cards &&
              cards.map(({ title, options, image, link }, i) => (
                <BentoGridItem
                  key={i}
                  title={title}
                  description={
                    options && options?.length > 0 ? (
                      <div className='inline-flex flex-col gap-2 items-start'>
                        <p>
                          {options
                            ?.slice(0, 2)
                            .map((option) => option.values)
                            .join('')
                            .replace(/-/g, '')}
                        </p>
                        <span className='group-hover/bento:underline-offset-2 group-hover/bento:underline font-semibold capitalize'>
                          learn more
                        </span>
                      </div>
                    ) : null
                  }
                  header={
                    image ? (
                      <div className='relative flex flex-1 w-full h-full min-h-[8rem] rounded-xl'>
                        <CustomImage
                          className='w-full h-full rounded-xl'
                          alternativeText={image.src.alternativeText}
                          url={image.src.url}
                          fill
                        />
                      </div>
                    ) : (
                      <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'></div>
                    )
                  }
                  className={clsx({
                    ' desktop:col-span-1 desktop:row-span-2': i === 0,
                  })}
                  link={link}
                />
              ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
