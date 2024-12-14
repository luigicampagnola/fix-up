import { getPage } from "@/utils/api";
import DynamicModule from "@/components/dynamic-module";
import { notFound } from "next/navigation";
import { ModuleData } from "@/components/types";
import { Key } from "react";

interface PageProps {
  params: { slug?: string }; // Define explícitamente el tipo de params
}

export default async function DynamicPage({ params }: PageProps) {
  const slug = '/' + (params?.slug?.toString()?.replace(/,/g, '/') || ''); // Usar "home" como predeterminado para la raíz

  console.log(slug)
  const pageData = await getPage(slug);


  console.log(pageData)

  if (!pageData) {
    notFound(); // Muestra una página 404 si no se encuentra la data
  }

  return (
    <div>
      <h1>Home Page</h1>
      {pageData.modules.map((module: ModuleData, index: Key | null | undefined) => (
        <DynamicModule key={index} moduleData={module} />
      ))}
    </div>
  );
}


// export async function generateStaticParams() {
//   try {
//     const res = await fetch(`http://localhost:1337/api/pages?fields=slug`);
//     const data = await res.json();

//     if (!data || !data.data) {
//       console.error("No data returned or incorrect structure:", data);
//       return [];
//     }

//     return data.data.map((page: { slug: string }) => {
//       const slug = page.slug === "/" ? "" : page.slug; // Manejar el caso especial de "/"
//       console.log(slug, "slug from generateStaticParams");
//       return { slug };
//     });
//   } catch (error) {
//     console.error("Error fetching slugs:", error);
//     return [];
//   }
// }
