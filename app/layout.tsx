import './globals.css';
import { poppins } from './fonts';
import NavigationBar from '@/components/navigation-bar';

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
