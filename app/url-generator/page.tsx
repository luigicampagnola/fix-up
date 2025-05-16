import UTMGenerator from '@/components/forms/url-generator';
import Section from '@/components/shared/section';

export default function Page() {
  return (
    <Section name='utm-generator' className='py-20 bg-secondary px-4'>
      <div className='max-w-2xl mx-auto'>
        <UTMGenerator
          baseUrl='https://www.fixuproofing.com'
          sources={['qr', 'facebook', 'instagram', 'yelp', 'google']}
          defaultUrl='/estimates'
        />
      </div>
    </Section>
  );
}
