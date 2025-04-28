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
};

export type Link = {
  label: string;
  url: string;
};

export interface APIResponse<T> {
  data: T;
  meta?: {
    pagination: {
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
export type MetaSocial = {
  socialNetwork: 'Facebook' | 'X';
  title: string;
  description: string;
  image: Image;
};
export type SEOMetaTags = {
  metaTitle: string;
  metaDescription: string;
  metaImage: Image;
  canonicalURL: string;
  keywords?: string;
  metaSocial: MetaSocial[];
};

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

export interface FooterProps {
  groups: GroupNavigation[];
  license?: string;
  copyRight?: string;
}

export type LocaleOption = {
  value: Locale;
  label: string;
  flag: string;
};

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
  description: RichTextProps['content'];
};

export type ArticleCategory = {
  name: string;
  slug: string;
};

export type Article = {
  title: string;
  slug: string;
  description: string;
  cover: Image;
  publishedAt: Date;
  category: ArticleCategory;
  content: RichTextProps['content'];
};
