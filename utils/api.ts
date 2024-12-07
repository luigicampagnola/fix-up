
// utils/api.ts
import configs from '../environment.configs';

const { STRAPI_URL } = configs.development;

// export async function getPage(page: string) {
//   const res = await fetch(`${STRAPI_URL}${page}?populate[modules][populate]=*`);

//   // const res = await fetch(`${STRAPI_API_URL}pages?filters[slug][$eq]=${slug}&populate[modules][populate]=*`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch pages data from strapi");
//   }
//   const jsonData = await res.json();

//   return jsonData[0];
// }

export async function getPage(slug: string) {
  const res = await fetch(`${STRAPI_URL}pages?filters[slug][$eq]=${slug}&populate[modules][populate]=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch pages data from strapi");
  }
  
  const jsonData = await res.json();

  return jsonData[0];
}
