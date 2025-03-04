import type { Metadata } from "next";
import "./globals.css";
// import NavBar from "@/components/nav-bar";
import { Poppins } from "next/font/google";
// import TopBar from "@/components/top-bar";

export const metadata: Metadata = {
  title: "Best Roofing and Construction Services | Fix Up Roofing",
  description:
    "Choose Miami's top Best Roofing & Construction Company! Affordable, quick, and reliable solutions for your home or business.",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="vY6zsAfYDYGdkfPvwyB2PQ"
          async
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Fix Up Roofing and Construction LLC",
              image: "https://fixuproofing.com/logo.png",
              telephone: "+1 786-235-2435",
              address: {
                "@type": "PostalAddress",
                streetAddress: "6917 NW 77th Ave",
                addressLocality: "Miami",
                addressRegion: "FL",
                postalCode: "33166",
                addressCountry: "US",
              },
              url: "https://fixuproofing.com",
              openingHours: "Mo-Fr 09:00-19:00",
            }),
          }}
        />
        {/* Google Tag Manager Script */}
        <script>
          {`(function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PD2XNBPT');`}
        </script>
        {/* End Google Tag Manager Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-PD2XNTBPT"
        ></script>
      </head>
      <body>
        <noscript>
          {/* Google Tag Manager NoScript */}
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PD2XNBPT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
          {/* End Google Tag Manager NoScript */}
        </noscript>
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
