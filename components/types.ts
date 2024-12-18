// types.ts
export interface ModuleData {
  __component: string;
  id: number;
  title?: string;
  phoneNumber?: PhoneNumber;
  email?: Email;
  address?: string;
  facebook?: Facebook;
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
  googleLogo: {url: string};
  comments: Comment[];
}

export interface Comment {
    name: string;
    date: string;
    comment: string;
    rate: number;
}