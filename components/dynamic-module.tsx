// components/DynamicModule.tsx
import { CardWidgetProps } from "./card-widget";
import ServicesSection from "./services-section";
// import ServicesSection from "./services-section";
import TopSection from "./top-section";
import { ScrollTo, TextList } from "./types";

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
}


const moduleComponents: { [key: string]: React.ComponentType<ModuleData> } = {
  "shared.top-section": TopSection,
  "shared.services": ServicesSection,
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