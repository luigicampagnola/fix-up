// app/page.tsx (para App Router) o pages/index.tsx (para Pages Router)
import { getPage } from "@/utils/api";
// import DynamicModule from "@/components/dynamic-module";
import TopBar from "@/components/top-bar";
import { PageData } from "../components/types";
import TopSection from "@/components/top-section";

export const revalidate = 60;

export default async function HomePage() {
  const pageData: PageData | null = await getPage("home");

  const topBarData = pageData?.modules.find(
    (module) => module.__component === "shared.top-bar"
  );

  // if (!pageData) {
  //   return <div>Not Found</div>;
  // }

  const benefits = [
    "Get the Best Value for Your Money",
    "Enjoy Quick, Efficient Service",
    "Maintain Your Peace of Mind!",
  ];

  return (
    <div>
      <TopSection
        title="Top Roofing Services"
        secondTitle="in Miami for Reliable Repairs!"
        description="Choose Fix Up Roofing and Construction for reliable roof services that fit your busy schedule and avoid repair headaches."
        benefits={benefits}
        buttonLabel="Contact us today!"
      />
      {topBarData && (
        <TopBar
          phoneNumber={topBarData.phoneNumber}
          email={topBarData.email}
          address={topBarData.address}
          facebook={topBarData.facebook}
        />
      )}
      {/* {pageData.modules.map((module, index) => (
        <DynamicModule key={index} moduleData={module} />
      ))} */}
    </div>
  );
}
