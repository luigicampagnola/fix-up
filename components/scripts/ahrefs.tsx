import Script from 'next/script';
export default async function AhrefsAnalytics({
  ahrefsId,
}: {
  ahrefsId: string;
}) {
  return (
    <Script
      id="ahrefs-script"
      strategy="afterInteractive"
      src="https://analytics.ahrefs.com/analytics.js"
      data-ahrefs-id={ahrefsId}
      async
    />
  );
}
