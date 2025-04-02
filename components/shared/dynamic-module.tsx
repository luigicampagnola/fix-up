import dynamic from 'next/dynamic';
const GetFreeEstimateSection = dynamic(
  () => import('../get-free-estimate-section')
);
const BlogSection = dynamic(() => import('../blog-section'));
const FinancingProgramSection = dynamic(
  () => import('../financing-program-section')
);
const GetStartedSection = dynamic(() => import('../get-started-section'));
const InformationSection = dynamic(() => import('../information-section'));
const MapSection = dynamic(() => import('../map-section'));
const OptionSection = dynamic(() => import('../option-section'));
const OptionSection2 = dynamic(() => import('../option-section2'));
const OptionSection3 = dynamic(() => import('../option-section3'));
const ServicesSection = dynamic(() => import('../services-section'));
const SliderSection = dynamic(() => import('../slider-section'));
const TopSection = dynamic(() => import('../top-section'));
const Cta = dynamic(() => import('../cta'));
const BlogSlugSection = dynamic(() => import('../blog-slug-section'));
const TopSection2 = dynamic(() => import('../top-section2'));

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

const DynamicModule = ({ data }: { data: any }) => {
  const { __component } = data;
  const ModuleComponent = moduleComponents[__component];

  if (!ModuleComponent) {
    console.warn(`No component found for type ${__component}`);
    return null;
  }

  return <ModuleComponent {...data} />;
};

export default DynamicModule;
