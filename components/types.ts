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