// app/schema.tsx

import { fetchSEOSchema } from '@/utils/api';

export default async function Schema() {
  const schema = await fetchSEOSchema();
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
