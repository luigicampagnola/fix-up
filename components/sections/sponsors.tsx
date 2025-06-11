import clsx from 'clsx';
import { CustomImage } from '../shared/custom-image';
import { Marquee } from '../magicui/marquee';
import Section from '../shared/section';
import { Image } from '@/utils/types';

export interface SponsorSectionProps {
  title: string;
  images?: Image[];
  align?: 'left' | 'center';
}

export default function Sponsors({
  title,
  images,
  align,
}: SponsorSectionProps) {
  return (
    <Section
      name="sponsors-section"
      className={clsx('relative py-6 flex flex-col gap-y-1', {
        'items-center': !align || align === 'center',
        'items-start': align === 'left',
      })}
    >
      <h2 className="text-sm text-foreground/80 font-semibold tablet:text-base capitalize">
        {title}
      </h2>
      <div
        className={clsx('relative flex  gap-2  items-center w-full', {
          container: !align || align === 'center',
        })}
      >
        <Marquee pauseOnHover className="[--duration:40s]">
          {images &&
            images.map(({ url, alternativeText, width, height }, index) => (
              <div
                key={`sponsor-images-${index}`}
                className="relative flex items-center justify-center"
              >
                <CustomImage
                  className="h-10 tablet:h-12  w-auto object-contain tint-primary"
                  alternativeText={alternativeText}
                  url={url}
                  width={width}
                  height={height}
                />
              </div>
            ))}
        </Marquee>
      </div>
    </Section>
  );
}
