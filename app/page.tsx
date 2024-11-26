import { getPage } from "@/utils/api";
import DynamicModule from "@/components/dynamic-module";
import { PageData } from "../components/types";

export const revalidate = 60;
export default async function HomePage() {
  const pageData: PageData | null = await getPage("home");

  console.log(pageData, "Page Data"); // Revisa qué está llegando

  if (!pageData) {
    return <div>Not Found</div>;
  }

  if (!pageData.modules || pageData.modules.length === 0) {
    return <div>No Modules Found</div>;
  }

  return (
    <div>
      {pageData.modules.map((module, index) => (
        <DynamicModule key={index} moduleData={module} />
      ))}
    </div>
  );
}
