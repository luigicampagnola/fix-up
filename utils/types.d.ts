/*
    Shared Types
*/

export type Image = {
    id?: string;
    url: string;
    alternativeText: string;
    width?: number;
    height?: number;
}

export type Link = {
    label: string;
    url: string;
}


/* 
    SEO types
*/

export type SEOMetaTags = {
    metaTitle: string;
    metaDescription: string;
    shareImage: Image;
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