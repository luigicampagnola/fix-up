import { getPage } from "@/utils/api";
import DynamicModule from "@/components/dynamic-module";
import { notFound } from "next/navigation";
import { ModuleData } from "@/components/types";
import { Key } from "react";
import { PageData } from "@/components/types";
import LinksSection from "@/components/links-section";
import BottomBar from "@/components/bottom-bar";
import { bottomBarSection, linkSection } from "@/utils/mock-data";
import { Metadata } from "next";
import Head from "next/head";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = "/" + (resolvedParams?.slug?.join("/") || "");
  const pageData: PageData | null = await getPage(slug);

  if (pageData) {
    const seoInformation = pageData.modules.find(
      (module: ModuleData) => module.__component === "shared.seo"
    );

    const headTitle =
      seoInformation?.metaTitle ||
      "Best Roofing and Construction Services | Fix Up Roofing";
    const headDescription =
      seoInformation?.metaDescription ||
      "Choose Miami's top Best Roofing & Construction Company! Affordable, quick, and reliable solutions for your home or business.";
    const headImage = seoInformation?.shareImage?.url || "/icon/fixup.svg";

    // Generar la URL canónica
    const canonicalUrl =
      seoInformation?.canonicalUrl || `https://www.fixuproofing.com${slug}`;

    return {
      title: headTitle,
      description: headDescription,
      openGraph: {
        images: headImage,
        title: headTitle,
        description: headDescription,
      },
      alternates: {
        canonical: canonicalUrl, // Pasar la URL canónica aquí
      },
    };
  }

  const headTitle = "Best Roofing and Construction Services | Fix Up Roofing";
  const headDescription =
    "Choose Miami's top Best Roofing & Construction Company! Affordable, quick, and reliable solutions for your home or business.";
  const headImage = "/icon/fixup.svg";

  // Generar la URL canónica para la página predeterminada
  const canonicalUrl = `https://www.fixuproofing.com${slug}`;

  return {
    title: headTitle,
    description: headDescription,
    openGraph: {
      images: headImage,
      title: headTitle,
      description: headDescription,
    },
    alternates: {
      canonical: canonicalUrl, // URL canónica para la página predeterminada
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = "/" + (resolvedParams?.slug?.join("/") || "");
  const pageData: PageData | null = await getPage(slug);

  if (!pageData) {
    notFound();
  }

  const canonicalUrl = `https://www.fixuproofing.com${slug}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />{" "}
        {/* Aquí se agrega el link canonical */}
      </Head>
      <div>
        {pageData.modules.map(
          (module: ModuleData, index: Key | null | undefined) => (
            <DynamicModule key={index} moduleData={module} />
          )
        )}
        <LinksSection {...linkSection} />
        <BottomBar {...bottomBarSection} />
      </div>
    </>
  );
}
