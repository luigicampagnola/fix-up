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
