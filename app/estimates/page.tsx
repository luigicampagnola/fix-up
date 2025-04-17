import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';

import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// export async function generateMetadata(): Promise<Metadata | undefined> {
//   const data = await fetchSEOMetadata({
//     path: '/api/home',
//   });
//   if (data) {
//     const { metaTitle, metaDescription } = data;
//     return { title: metaTitle, description: metaDescription } as Metadata;
//   }
// }
interface EstimatePageProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
}
export default async function Page() {
  return (
    <>
      <Hero
        title='Get Your Free Roofing Estimate'
        subTitle='Today!'
        description='With over 16 years of climbing ladders and hammering shingles, we’ve seen it all. From small homes to big office buildings, we’ve got the tools, the talent, and the superior materials to keep your roof top-of-the-line.'
        displayForm={true}
      />
    </>
  );
}
