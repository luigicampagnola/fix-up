// app/page.tsx (para App Router) o pages/index.tsx (para Pages Router)
import { getPage } from "@/utils/api";
import DynamicModule from "@/components/dynamic-module";
import TopBar from "@/components/top-bar";
import { PageData } from "../components/types";


export const revalidate = 60;

export default async function HomePage() {
  const pageData: PageData | null = await getPage("home");

  const topBarData = pageData?.modules.find(
    (module) => module.__component === "shared.top-bar"
  );

  if (!pageData) {
    return <div>Not Found</div>;
  }

  console.log(pageData.modules[0], 'pageData')
  return (
    <div>
      {topBarData && (
        <TopBar
          phoneNumber={topBarData.phoneNumber}
          email={topBarData.email}
          address={topBarData.address}
          facebook={topBarData.facebook}
        />
      )}
      {pageData.modules.map((module, index) => (
        <DynamicModule key={index} moduleData={module} />
      ))}
    </div>
  );
}
