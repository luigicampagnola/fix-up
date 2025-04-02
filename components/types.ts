// types.ts
export interface ModuleData {
  __component: string;
  id: number;
  title?: string;
  phoneNumber?: PhoneNumber;
  email?: Email;
  address?: string;
  facebook?: Facebook;
  metaDescription?: string;
  canonicalUrl?: string;
  metaTitle?: string;
  shareImage?: SlideImage;
}

export interface Email {
  label: string;
  emailHref: string;
  target: string;
}

export interface Address {
  label: string;
  href: string;
}

export interface Facebook {
  label: string;
  href: string;
  target: string;
}

export interface PhoneNumber {
  label: string;
  href: string;
}

export interface PageData {
  modules: ModuleData[];
}

export interface ScrollTo {
  label: string;
  cssSelector: string;
  position: string;
}

export interface TextList {
  values: string;
  position: string;
}

export interface LinkData {
  label: string;
  url: string;
}

export interface ImageData {
  alt: string;
  src: {
    url: string;
    width?: number;
    height?: number;
  };
}

export interface BackgroundImage {
  backgroundImage: {
    url: string;
    alternativeText: string;
  };
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
  address?: Address;
}

export interface Rates {
  label: string;
  subLabel: string;
  googleLogo: { url: string };
  comments: Comment[];
}

export interface Comment {
  name: string;
  date: string;
  comment: string;
  rate: number;
}

export interface FieldData {
  label?: string;
  placeholder?: string;
  required: boolean;
  warning: string;
  formatWarning?: string;
}

export interface ContactForm {
  title: string;
  warning: string;
  name: FieldData;
  phone: FieldData;
  email: FieldData;
  street: FieldData;
  captcha: FieldData;
  button: {
    label: string;
    url: string;
  };
  backgroundImage: BackgroundImage;
}

export interface MapData {
  id?: number;
  label?: string;
  link?: string;
  mapLocations?: { label: string }[];
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
}

export interface SlideImage {
  alternativeText: string;
  url: string;
  height: number;
  width: number;
}
