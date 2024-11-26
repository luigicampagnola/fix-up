export async function getPage(slug: string) {
  try {
    const res = await fetch(
      `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`
    );
    const data = await res.json();

    const page = data[0];

    return page || null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}
