import './globals.css';
import NavBar from '@/components/nav-bar';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { poppins } from './fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={poppins.className}>
      <body className='relative flex min-h-screen flex-col font-body antialiased'>
        <NavBar />
        <main className='relative flex flex-1 flex-col text-foreground dark:text-foreground'>
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
