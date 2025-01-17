import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/nav-bar";
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Fix Up Roofing and Construction LLC",
              "image": "https://fixuproofing.com/logo.png",
              "telephone": "+1 786-235-2435",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "6917 NW 77th Ave",
                "addressLocality": "Miami",
                "addressRegion": "FL",
                "postalCode": "33166",
                "addressCountry": "US",
              },
              "url": "https://fixuproofing.com",
              "openingHours": "Mo-Fr 09:00-19:00",
            }),
          }}
        />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
