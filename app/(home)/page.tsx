import DynamicModule from '@/components/dynamic-module';
import { ModuleData } from '@/components/types';
import { fetchAPI } from '@/utils/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Roofing and Construction Services',
  description:
    "Choose Miami's top Best Roofing & Construction Company! A  ffordable, quick, and reliable solutions for your home or business.",
};

interface HomePageProps {
  id: number;
  documentID: string;
  slug: string;
  modules: any[];
}
export default async function Home() {
  const data = await fetchAPI({
    path: '/api/pages',
    query: {
      filters: {
        slug: {
          $eq: '/',
        },
      },
    },
  });
  const dataParsed = data as any;
  const modules = dataParsed[0].modules;
  // console.log(
  //   'modules',
  //   modules.map((x: any) => x.__component)
  // );
  return (
    <>
      {modules
        .slice(0, 5)
        .map((module: ModuleData, index: string | null | undefined) => (
          <DynamicModule key={index} moduleData={module} />
        ))}
    </>
  );
}
