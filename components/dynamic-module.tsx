// components/DynamicModule.tsx
import { Hero } from "./hero";

interface ModuleData {
  __component: string;
  id: number;
  title?: string;
}


const moduleComponents: { [key: string]: React.ComponentType<ModuleData> } = {
  "shared.hero": Hero,
};


interface DynamicModuleProps {
  moduleData: ModuleData;
}

const DynamicModule = ({ moduleData }: DynamicModuleProps) => {
  console.log(moduleData, '<---- Module Data');

  const ModuleComponent = moduleComponents[moduleData.__component];

  console.log(ModuleComponent, 'Module Component');

  if (!ModuleComponent) {
    console.warn(`No component found for type ${moduleData.__component}`);
    return null;
  }

  return <ModuleComponent {...moduleData} />;
};

export default DynamicModule;