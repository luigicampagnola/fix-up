export async function getPage(slug: string) {
  try {
    // console.log(slug, 'slug')
    console.log(slug)

    const res = await fetch(
      `https://amazing-fireworks-dd56623770.strapiapp.com/api/pages?filters[slug][$eq]=${slug}&populate=*`
      // `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`
    );

    const data = await res.json();
    
    console.log(data, 'data')
    
    

    const page = data && data[0]; // Selecciona el primer resultado

    return page || null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}