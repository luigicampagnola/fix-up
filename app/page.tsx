// app/page.tsx (para App Router) o pages/index.tsx (para Pages Router)
import { getPage } from "@/utils/api";
// import DynamicModule from "@/components/dynamic-module";
import TopBar from "@/components/top-bar";
import { PageData } from "../components/types";
import TopSection from "@/components/top-section";
import OptionSection from "@/components/option-section";

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

  const faqs = {
    title: "Picture the Relief of a Hassle-Free",
    secondTitle: "Roof Over Your Head",
    topDescription:
      " Think for a moment about what it would be like if you could:",
    options: [
      {
        label:
          " Secure high-quality roofing services at affordable rates – no hidden costs.",
      },
      {
        label:
          " Harness the power of skilled professionals to protect your home or business.",
      },
      {
        label:
          " Fix any roofing issue quickly – no matter the season or the reason.",
      },
      {
        label:
          " Negotiate clear, straightforward terms that leave everyone satisfied.",
      },
    ],
    middleDescription: "Doesn’t that sound uplifting?",
    bottomDescription:
      "Let us introduce you to our general roofing services which will empower you to enjoy all those advantages",
  };

  return (
    <div>
      <TopSection
        title="Top Roofing Services in"
        secondTitle="Miami for Reliable Repairs!"
        description="Choose Fix Up Roofing and Construction for reliable roof services that fit your busy schedule and avoid repair headaches."
        benefits={benefits}
        buttonLabel="Contact us today!"
      />
      <OptionSection
        title={faqs.title}
        secondTitle={faqs.secondTitle}
        topDescription={faqs.topDescription}
        options={faqs.options}
        middleDescription={faqs.middleDescription}
        bottomDescription={faqs.bottomDescription}
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
