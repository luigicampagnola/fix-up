// app/page.tsx (para App Router) o pages/index.tsx (para Pages Router)
import { getSlug } from "@/utils/api";
// import DynamicModule from "@/components/dynamic-module";
// import TopBar from "@/components/top-bar";
// import { PageData } from "../components/types";
import ServicesSection from "@/components/services-section";
import { workingWithUsCards } from "@/utils/mock-data";
// import TopSection from "@/components/top-section";
// import OptionSection from "@/components/option-section";
// import { faqs } from "@/utils/mock-data";

export const revalidate = 60;

export default async function HomePage() {
  //const pageData = await getPage('home');
  const pageSlug = await getSlug('services', 'air-conditioning')

  console.log('============>', pageSlug);


  // const topBarData = pageData?.modules.find(
  //   (module) => module.__component === "shared.top-bar"
  // );

  // if (!pageData) {
  //   return <div>Not Found</div>;
  // }

  // const {title, secondTitle, description, benefits, buttonLabel} = topRoofing; //Uncomment this section to see the TopSection data in its element
  // const {title, secondTitle, topDescription, options, middleDescription, bottomDescription} = faqs;
  const {title, subtitle, cards} = workingWithUsCards;


  return (
    <div>
      {/* 
        // Uncomment this section to see the TopSection element 
        <TopSection
        title={title}
        secondTitle={secondTitle}
        description={description}
        benefits={benefits}
        buttonLabel={buttonLabel}
      /> */}
      {/* <OptionSection
        title={title}
        secondTitle={secondTitle}
        topDescription={topDescription}
        options={options}
        middleDescription={middleDescription}
        bottomDescription={bottomDescription}
      /> */}
      <ServicesSection title={title} subtitle={subtitle} cards={cards} pageSlug={pageSlug} />
      {/* {topBarData && (
        <TopBar
          phoneNumber={topBarData.phoneNumber}
          email={topBarData.email}
          address={topBarData.address}
          facebook={topBarData.facebook}
        />
      )} */}
      {/* {pageData.modules.map((module, index) => (
        <DynamicModule key={index} moduleData={module} />
      ))} */}
    </div>
  );
}
