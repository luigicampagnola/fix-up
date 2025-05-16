import './globals.css';
import { poppins } from './fonts';
import NavigationBar from '@/components/navigation-bar';
import { Metadata } from 'next';
import { fetchSEOMetadata } from '@/utils/api';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from '@/components/footer';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Schema from '@/components/scripts/schema';
import { GoogleTagManager } from '@next/third-parties/google';
import AhrefsAnalytics from '@/components/scripts/ahrefs';
import { Analytics } from '@vercel/analytics/next';
import EstimateModal from '@/components/shared/estimate-modal';

export async function generateMetadata(): Promise<Metadata> {
  return await fetchSEOMetadata({ path: '/api/global', basePath: '' });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={poppins.className}>
      <head>
        <Schema />
      </head>
      <NextIntlClientProvider>
        <body className='relative flex min-h-screen flex-col font-body antialiased'>
          <GoogleTagManager gtmId='GTM-PD2XNBPT' />
          <AhrefsAnalytics ahrefsId='vY6zsAfYDYGdkfPvwyB2PQ' />
          <NavigationBar />
          <main className='relative flex flex-1 flex-col text-foreground dark:text-foreground'>
            {children}
          </main>
          <EstimateModal />
          <Footer />
          <SpeedInsights />
          <Analytics />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
