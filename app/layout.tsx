import './globals.css';
import { poppins } from './fonts';
import NavigationBar from '@/components/navigation-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Fix Up Roofing',
    default: 'Best Roofing and Construction Services',
  },
  description:
    "Choose Miami's top Best Roofing & Construction Company! A  ffordable, quick, and reliable solutions for your home or business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={poppins.className}>
      <body className='relative flex min-h-screen flex-col font-body antialiased'>
        <NavigationBar />
        <main className='relative flex flex-1 flex-col text-foreground dark:text-foreground'>
          {children}
        </main>
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
