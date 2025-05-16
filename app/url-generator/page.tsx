import { UTMGeneratorWrapper } from '@/components/elements/utm-wrapper';
import Section from '@/components/shared/section';

export default async function Page() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://fixuproofing.com';
  const response = await fetch(`${BASE_URL}/api/public-urls`);
  const { data } = await response.json();
  const sources = ['qr', 'facebook', 'instagram', 'yelp', 'google'];
  const defaultUrl = '/estimates?locale=en-us';

  return (
    <Section name='url-generator' className=' py-10 bg-secondary'>
      <div className='container max-w-2xl  px-4 mx-auto'>
        <UTMGeneratorWrapper
          baseUrl={BASE_URL}
          sources={sources}
          defaultUrl={defaultUrl}
          urlPaths={data}
        />
      </div>
    </Section>
  );
}
