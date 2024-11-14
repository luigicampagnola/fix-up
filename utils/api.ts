
// utils/api.ts
import configs from '../environment.configs';

const { STRAPI_API_URL } = configs.development;

export async function getPage(slug: string) {
  const res = await fetch(`${STRAPI_API_URL}pages?filters[slug][$eq]=${slug}&populate[modules][populate]=*`);
  if (!res.ok) {
    throw new Error("Failed to fetch page data");
  }
  const json = await res.json();
  return json.data[0]; // Devuelve solo la primera página encontrada
}
