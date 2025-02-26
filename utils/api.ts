export async function getPage(slug: string) {
  try {
    const res = await fetch(
      `https://amazing-fireworks-dd56623770.strapiapp.com/api/pages?filters[slug][$eq]=${slug}&populate=*`
      // `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*` // for dev
    );

    const data = await res.json();
    const page = data && data[0]; // Shows the first result

    return page || null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}
