// components/DynamicModule.tsx
import { CardWidgetProps } from "./card-widget";
import GetFreeEstimateSection from "./get-free-estimate-section";
import GetStartedSection from "./get-started-section";
import InformationSection from "./information-section";
import OptionSection from "./option-section";
import OptionSection2 from "./option-section2";
import ServicesSection from "./services-section";
import TopSection from "./top-section";
import { Options, Rates, ScrollTo, TextList } from "./types";

interface ModuleData {
  __component: string;
  id: number;
  title?: string;
  subtitle?: string;
  cards?: CardWidgetProps[];
  secondTitle?: string;
  description?: string;
  benefits?: TextList[];
  button?: ScrollTo;
  topDescription?: string;
  options?: Options[];
  middleDescription?: string;
  bottomDescription?: string;
  descriptionWithLink?: string;
  image?: {url: string};
  rates?: Rates;
}


const moduleComponents: { [key: string]: React.ComponentType<ModuleData> } = {
  "shared.top-section": TopSection,
  "shared.services": ServicesSection,
  "shared.options-section": OptionSection,
  "shared.option-section2": OptionSection2,
  "shared.information-section": InformationSection,
  "shared.form-section": GetStartedSection,
  "shared.form-section2": GetFreeEstimateSection
};


interface DynamicModuleProps {
  moduleData: ModuleData;
}

const DynamicModule = ({ moduleData }: DynamicModuleProps) => {
  const ModuleComponent = moduleComponents[moduleData.__component];

  // console.log(ModuleComponent, 'Module Component');

  if (!ModuleComponent) {
    console.warn(`No component found for type ${moduleData.__component}`);
    return null;
  }

  return <ModuleComponent {...moduleData} />;
};

export default DynamicModule;