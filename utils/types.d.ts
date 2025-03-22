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

/* 
    SEO types
*/

export type SEOMetaTags = {
    metaTitle: string;
    metaDescription: string;
    shareImage: Image;
    canonicalURL: string;
}