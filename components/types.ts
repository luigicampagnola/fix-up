export interface BaseModule {
  __component: string; // Identificador del componente
  id: number; // ID común para todos los módulos
}

// Tipo específico para el componente Hero
export interface HeroModule extends BaseModule {
  __component: "shared.hero";
  title: string;
}

// Tipo específico para el componente TopBar
export interface TopBarModule extends BaseModule {
  __component: "shared.top-bar";
  phoneNumber: PhoneNumber;
  email: Email;
  address: string;
  facebook: Facebook;
}

// Tipo para todas las posibles estructuras de módulos
export type ModuleData = HeroModule | TopBarModule;

// Subtipos para datos específicos usados en los módulos
export interface Email {
  label: string;
  emailHref: string;
  target: string;
}

export interface Facebook {
  label: string | null;
  href: string;
  target: string;
}

export interface PhoneNumber {
  label: string;
  href: string;
}

// Tipo para toda la página
export interface PageData {
  modules: ModuleData[];
}

// Interface para Link
export interface Link {
  id: number;
  label: string;
  url: string;
}

// Interface para Image
export interface Image {
  id: number;
  alt: string;
  src?: string;
}

// Interface para Option dentro de Cards
export interface Option {
  id: number;
  option: string;
}

export interface CardWidgetProps {
  name: string;
  image: {
    alt: string;
    src: string;
  };
  title: string;
  subtitle: string;
  options: Option[]; // Arreglo de objetos con "id" y "option"
  link?: {
    label: string;
    url: string;
  };
}

export interface ServicesSectionProps {
  title: string;
  subtitle: string;
  cards: CardWidgetProps[];
}
