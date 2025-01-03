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
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
