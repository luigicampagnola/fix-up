/*
    Shared Types
*/

export type Image = {
  id?: string;
  documentId?: string;
  url: string;
  alternativeText: string;
  width?: number;
  height?: number;
}

export type Link = {
  label: string;
  url: string;
}

export interface APIResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type Review = {
  name: string;
  content: string;
  date?: Date;
  rate: number;
};


/* 
    SEO types
*/

export type SEOMetaTags = {
  metaTitle: string;
  metaDescription: string;
  metaImage: Image;
  canonicalURL: string;
}

/* 
    Navigation 
*/

export type GroupNavigation = {
  title: string;
  sub: Link[];
};

export type NavigationLink = {
  group?: GroupNavigation[];
  list?: Link[];
} & Link;
export interface MenuProps {
  logo: Image;
  links: NavigationLink[];
  cta: Link;
}

/*
  Collection Types
*/
type Option = {
  values: string;
};
export type Services = {
  name: string;
  slug: string;
  cover: Image;
  description: RichTextProps;
};