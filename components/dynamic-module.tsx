import dynamic from 'next/dynamic';
import { CardWidgetProps } from './card-widget';
import { Options, Rates, ScrollTo, TextList } from './types';

const GetFreeEstimateSection = dynamic(
  () => import('./get-free-estimate-section')
);
const BlogSection = dynamic(() => import('./blog-section'));
const FinancingProgramSection = dynamic(
  () => import('./financing-program-section')
);
const GetStartedSection = dynamic(() => import('./get-started-section'));
const InformationSection = dynamic(() => import('./information-section'));
const MapSection = dynamic(() => import('./map-section'));
const OptionSection = dynamic(() => import('./option-section'));
const OptionSection2 = dynamic(() => import('./option-section2'));
const OptionSection3 = dynamic(() => import('./option-section3'));
const ServicesSection = dynamic(() => import('./services-section'));
const SliderSection = dynamic(() => import('./slider-section'));
const TopSection = dynamic(() => import('./top-section'));
const Cta = dynamic(() => import('./cta'));
const BlogSlugSection = dynamic(() => import('./blog-slug-section'));
const TopSection2 = dynamic(() => import('./top-section2'));

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
  image?: { url: string };
  rates?: Rates;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleComponents: { [key: string]: React.ComponentType<any> } = {
  'shared.top-section': TopSection,
  'shared.top-section2': TopSection2,
  'shared.services': ServicesSection,
  'shared.financing-program-section': FinancingProgramSection,
  'shared.options-section': OptionSection,
  'shared.option-section2': OptionSection2,
  'shared.information-section': InformationSection,
  'shared.form-section': GetStartedSection,
  'shared.form-section2': GetFreeEstimateSection,
  'shared.options-section3': OptionSection3,
  'shared.blog-section': BlogSection,
  'shared.map-section': MapSection,
  'shared.blog-slug-section': BlogSlugSection,
  'shared.images-section': SliderSection,
  'shared.cta': Cta,
};

interface DynamicModuleProps {
  moduleData: ModuleData;
}

const DynamicModule = ({ moduleData }: DynamicModuleProps) => {
  const ModuleComponent = moduleComponents[moduleData.__component];

  if (!ModuleComponent) {
    console.warn(`No component found for type ${moduleData.__component}`);
    return null;
  }

  // Transformar `image` para que sea compatible con `ImageData`
  const transformedModuleData = {
    ...moduleData,
    image: moduleData.image
      ? {
          alt: moduleData.title || 'Default Alt Text', // Texto alternativo
          src: {
            url: moduleData.image.url,
          },
        }
      : undefined,
  };

  return <ModuleComponent {...transformedModuleData} />;
};

export default DynamicModule;
