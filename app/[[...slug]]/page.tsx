import { getPage } from "@/utils/api";
import DynamicModule from "@/components/dynamic-module";
import { notFound } from "next/navigation";
import { ModuleData } from "@/components/types";
import { Key } from "react";
import { PageData } from "@/components/types";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DynamicPage({ params }: PageProps) {
  // Await the params object
  const resolvedParams = await params;
  const slug = '/' + (resolvedParams?.slug?.join('/') || '');

  console.log(slug);
  const pageData: PageData | null = await getPage(slug);

  console.log(pageData);

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      {pageData.modules.map((module: ModuleData, index: Key | null | undefined) => (
        <DynamicModule key={index} moduleData={module} />
      ))}
    </div>
  );
}