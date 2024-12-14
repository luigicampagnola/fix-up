import { Hero } from "./hero";
import NavBar from "./nav-bar";
import ServicesSection from "./services-section";
import { TopBar } from "./top-bar";
import { ModuleData } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleComponents: { [key: string]: React.ComponentType<any> } = {
  "shared.hero": Hero,
  "shared.top-bar": TopBar,
  "shared.nav-bar": NavBar,
  "shared.card-container": ServicesSection,
};

interface DynamicModuleProps {
  moduleData: ModuleData;
}

const DynamicModule = ({ moduleData }: DynamicModuleProps) => {
  const ModuleComponent = moduleComponents[moduleData.__component];

  if (!ModuleComponent) {
    // console.warn(`No component found for type ${moduleData.__component}`);
    return null;
  }

  const props = { ...moduleData };
  // console.log(props, "props");
  return <ModuleComponent {...props} />;
};

export default DynamicModule;
