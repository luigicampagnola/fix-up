import DynamicModule from "@/components/dynamic-module";
import InformationSection from "@/components/information-section";
import { PageData } from "@/components/types";
import { getPage } from "@/utils/api";
import { informationData } from "@/utils/mock-data";

export default async function ServicesSlug({params} : {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const page = slug && slug[slug.length - 1];
  const pageData: PageData | null = await getPage(page);

  // if(!pageData) {
  //   return <section className="flex justify-center h-lvh items-center" >
  //     <div className="text-forestgreen uppercase font-bold text-[50px]"><span className="text-white">404 |</span> page not found.</div>
  //   </section>;
  // }

  const {title, subtitle, button, description, image, rates} = informationData;

  return (
    <div>
      {pageData && pageData.modules.map((module, index) => <DynamicModule key={`${slug[0]}module-${index}`} moduleData={module} />)}
      <InformationSection title={title} subtitle={subtitle} description={description} image={image} button={button} rates={rates} />
    </div>
  );
}
