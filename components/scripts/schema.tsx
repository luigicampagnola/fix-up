import { fetchSEOSchema } from '@/utils/api';
import Script from 'next/script';
export default async function Schema() {
  const schema = await fetchSEOSchema();
  return (
    <Script
      id="schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
