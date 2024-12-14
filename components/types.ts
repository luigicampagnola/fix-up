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

export interface ScrollTo {
  label: string;
  cssSelector: string;
}

export interface TextList {
  values: string
}

export interface LinkData {
  label: string;
  url: string;
}

export interface ImageData {
  alt: string;
  src: string;
}

export interface Options {
  label: string;
  description?: string;
}

export interface LinksList {
  title: string;
  links: LinkData[];
}

export interface LinksSocialMedia {
  yelp?: string;
  googlePlus?: string;
  facebook?: string;
}

export interface LinksContact {
  hashtag?: string;
  phoneNumber?: PhoneNumber;
  email?: Email;
  address?: string;
}

export interface Rates {
  label: string;
  subLabel: string;
  googleLogo: {url: string};
  comments: Comment[];
}

export interface Comment {
    name: string;
    date: string;
    comment: string;
    rate: number;
}
