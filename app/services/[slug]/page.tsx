import DynamicModule from "@/components/dynamic-module";
import { PageData } from "@/components/types";
import { getSlug } from "@/utils/api";                                       

export default async function ServicesSlug({params} : {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const pageData: PageData | null = await getSlug('services', slug);

  if(!pageData) {
    return <section className="flex justify-center h-lvh items-center" >
      <div className="text-forestgreen uppercase font-bold text-[50px]"><span className="text-white">404 |</span> page not found.</div>
    </section>
  }

  return (
    <div>
      {pageData && pageData.modules.map((module, index) => <DynamicModule key={`service-module-${index}`} moduleData={module} />)}
    </div>
  );
}
