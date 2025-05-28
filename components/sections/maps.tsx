import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PropsWithChildren, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { IconMapPin } from '@tabler/icons-react';
import Iframe from '../shared/iframe';
import Section from '../shared/section';
import { GOOGLE_MAPS_URL } from '@/utils/constants';
import { CustomLink } from '../shared/custom-link';

type LocationArea = {
  name: string;
  slug: string;
};
export type Location = {
  id?: string;
  name: string;
  slug: string;
  mapUrl: string;
  areas: LocationArea[];
};

export interface MapsSectionProps {
  title?: string;
  subTitle?: string;
  description?: string;
  locations?: Location[];
}

export default function Maps({
  title,
  subTitle,
  description,
  locations,
}: MapsSectionProps) {
  const tabs =
    locations && locations?.length > 0
      ? locations?.map(({ name, id }) => ({ id: `tab-${id}`, name }))
      : [];

  return (
    <Section
      name='map-section'
      className='w-full bg-muted py-16 desktop:py-24 relative'
    >
      <div className='container'>
        {/* Header Section */}
        <div className='flex flex-col items-center  gap-y-4'>
          <h2 className='inline-flex flex-col items-center capitalize font-bold text-center text-4xl desktop:text-5xl capitilize text-secondary'>
            {title}
            <span className='text-primary pl-2'>{subTitle}</span>
          </h2>

          <p className='max-w-4xl text-foreground text-center text-lg'>
            {description}
          </p>
        </div>
        {tabs && tabs.length > 0 && (
          <Suspense fallback={<div>Loading Location tabs...</div>}>
            <Tabs
              defaultValue={tabs[0]?.id}
              className='mt-8 w-full  flex flex-col items-center'
            >
              <TabsList className='inline-flex bg-background/80 rounded-full p-1 shadow-md'>
                {tabs &&
                  tabs.map(({ id, name }, index) => (
                    <TabsTrigger
                      key={`tab-trigger-${index}`}
                      value={id}
                      className='capitalize text-foreground/60'
                    >
                      {name}
                    </TabsTrigger>
                  ))}
              </TabsList>
              {locations &&
                locations.map(({ id, name, slug, mapUrl, areas }) => (
                  <TabsContent
                    key={`tab-content-${id}`}
                    value={`tab-${id}`}
                    className='grid desktop:grid-cols-2 gap-x-8 w-full'
                  >
                    <MapLocationItem name={name} mapUrl={mapUrl} />
                    <ContentLocationItem
                      name={name}
                      slug={slug}
                      areas={areas}
                    />
                  </TabsContent>
                ))}
            </Tabs>
          </Suspense>
        )}
      </div>
    </Section>
  );
}
const TabContentWrapper = ({
  children,
  className,
}: { className?: string } & PropsWithChildren) => (
  <div
    className={cn(
      'col-span-1 mt-8 relative rounded-md',
      className
    )}
  >
    {children}
  </div>
);

const MapLocationItem = ({
  name,
  mapUrl,
}: Omit<Location, 'slug' | 'areas'>) => (
  <TabContentWrapper className='bg-foreground/10'>
    <Iframe
      title={`${name} Map`}
      src={`${GOOGLE_MAPS_URL}${mapUrl}`}
    />
    <div className='absolute bottom-0 left-0 w-full p-4'>
      <div className='bg-background rounded-lg p-3 inline-flex items-center gap-2 shadow-md'>
        <IconMapPin className='h-4 w-4 text-secondary' aria-hidden='true' />
        <h3 className='font-bold text-foreground text-sm'>{name}</h3>
      </div>
    </div>
  </TabContentWrapper>
);

const ContentLocationItem = ({
  name,
  areas,
  slug,
}: Omit<Location, 'mapUrl'>) => (
  <TabContentWrapper>
    <div className='bg-background rounded-md shadow-lg overflow-hidden border border-foreground/20'>
      <div className='bg-secondary border-b border-foreground/20'>
        <h3 className='text-xl font-bold text-background flex items-center p-4'>
          <IconMapPin
            className='h-5 w-5 text-background mr-2'
            aria-hidden='true'
          />
          {name}
        </h3>
      </div>
      <div>
        <h4 className='sr-only'>Service Locations in {name}</h4>
        <ul className='grid tablet:grid-cols-2 gap-3 p-4' aria-label={name}>
          {areas &&
            areas.map(({ ...props }, index) => (
              <LocationItem
                key={`location-item-${index}`}
                {...props}
                parentLocation={slug}
              />
            ))}
        </ul>
      </div>
    </div>
  </TabContentWrapper>
);

function LocationItem({
  name,
  slug,
  parentLocation,
}: LocationArea & { parentLocation: string }) {
  return (
    <li>
      <CustomLink
        styled={false}
        url={`/locations/${parentLocation}/${slug}`}
        className='flex items-center gap-2 p-2 rounded-md hover:bg-foreground/10 transition-colors'
      >
        <IconMapPin
          className='h-4 w-4 text-secondary flex-shrink-0'
          aria-hidden='true'
        />
        <span className='text-foreground text-sm fforeground/20m'>{name}</span>
      </CustomLink>
    </li>
  );
}
