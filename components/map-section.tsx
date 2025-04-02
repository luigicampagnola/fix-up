import { MapData } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PropsWithChildren, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { IconMapPin } from '@tabler/icons-react';
import Iframe from './shared/iframe';

export interface MapSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mapsData?: MapData[];
}

export default function MapSection({
  title,
  subtitle,
  description,
  mapsData,
}: MapSectionProps) {
  const tabs = mapsData
    ? mapsData?.map(({ label, id }) => ({ id: `tab-${id}`, label }))
    : [];

  return (
    <section className='w-full bg-muted py-16 desktop:py-24 relative'>
      <div className='container'>
        {/* Header Section */}
        <div className='flex flex-col items-center  gap-y-4'>
          <h2 className='inline-flex flex-col items-center capitalize font-bold text-center text-4xl desktop:text-5xl capitilize text-secondary'>
            {title}
            <span className='text-primary pl-2'>{subtitle}</span>
          </h2>

          <p className='max-w-4xl text-foreground text-center text-lg'>
            {description}
          </p>
        </div>
        {tabs && (
          <Suspense fallback={<div>Loading Location tabs...</div>}>
            <Tabs
              defaultValue={tabs[0].id}
              className='mt-8 w-full  flex flex-col items-center'
            >
              <TabsList className='inline-flex bg-background/80 rounded-full p-1 shadow-md'>
                {tabs &&
                  tabs.map(({ id, label }, index) => (
                    <TabsTrigger
                      key={`tab-trigger-${index}`}
                      value={id}
                      className='capitalize text-foreground/60'
                    >
                      {label}
                    </TabsTrigger>
                  ))}
              </TabsList>
              {mapsData &&
                mapsData.map(({ id, label, link, mapLocations }) => (
                  <TabsContent
                    key={`tab-content-${id}`}
                    value={`tab-${id}`}
                    className='grid desktop:grid-cols-2 gap-x-8 w-full'
                  >
                    <MapLocationItem label={label} link={link} />
                    <ContentLocationItem
                      label={label}
                      mapLocations={mapLocations}
                    />
                  </TabsContent>
                ))}
            </Tabs>
          </Suspense>
        )}
      </div>
    </section>
  );
}
const TabContentWrapper = ({
  children,
  className,
}: { className?: string } & PropsWithChildren) => (
  <div
    className={cn(
      'col-span-1 mt-8 relative aspect-[4/3] rounded-md',
      className
    )}
  >
    {children}
  </div>
);

const MapLocationItem = ({ label, link }: Omit<MapData, 'zoom' | 'center'>) => (
  <TabContentWrapper className='bg-foreground/10'>
    <Iframe
      title={`${label} Map`}
      src={link}
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
      className='absolute inset-0 rounded-md'
    />
    <div className='absolute bottom-0 left-0 w-full p-4'>
      <div className='bg-background rounded-lg p-3 inline-flex items-center gap-2 shadow-md'>
        <IconMapPin className='h-4 w-4 text-secondary' aria-hidden='true' />
        <h3 className='font-bold text-foreground text-sm'>{label}</h3>
      </div>
    </div>
  </TabContentWrapper>
);

const ContentLocationItem = ({
  label,
  mapLocations,
}: Omit<MapData, 'zoom' | 'center' | 'link'>) => (
  <TabContentWrapper>
    <div className='bg-background rounded-md shadow-lg overflow-hidden border border-foreground/20'>
      <div className='bg-secondary border-b border-foreground/20'>
        <h3 className='text-xl font-bold text-background flex items-center p-4'>
          <IconMapPin
            className='h-5 w-5 text-background mr-2'
            aria-hidden='true'
          />
          {label}
        </h3>
      </div>
      <div>
        <h4 className='sr-only'>Service Locations in {label}</h4>
        <ul className='grid tablet:grid-cols-2 gap-3 p-4' aria-label={label}>
          {mapLocations &&
            mapLocations.map(({ label }, index) => (
              <LocationItem key={`location-item-${index}`} name={label} />
            ))}
        </ul>
      </div>
    </div>
  </TabContentWrapper>
);

function LocationItem({ name }: { name: string }) {
  return (
    <li>
      <div className='flex items-center gap-2 p-2 rounded-md hover:bg-foreground/10 transition-colors'>
        <IconMapPin
          className='h-4 w-4 text-secondary flex-shrink-0'
          aria-hidden='true'
        />
        <span className='text-foreground text-sm fforeground/20m'>{name}</span>
      </div>
    </li>
  );
}
