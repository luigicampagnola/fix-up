import DynamicModule from "@/components/dynamic-module";
import { PageData } from "@/components/types";
import { getPage } from "@/utils/api";

export const revalidate = 60;

export default async function Services() {
  const pageData: PageData | null = await getPage('services');


  return (
    <div>
      {pageData && pageData.modules.map((module, index) => <DynamicModule key={`service-module-${index}`} moduleData={module} />)}
    </div>
  );
}
