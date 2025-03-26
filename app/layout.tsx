import './globals.css';
import { poppins } from './fonts';
import NavigationBar from '@/components/navigation-bar';
import { Metadata } from 'next';
import { fetchAPI } from '@/utils/api';
import { SEOMetaTags } from '@/utils/types';
import { getFullImagePath, imageOptimizer } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await fetchAPI<{ seo: SEOMetaTags }>({
    path: '/api/global',
    query: {
      populate: {
        seo: {
          fields: ['metaTitle', 'metaDescription'],
          populate: {
            metaImage: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
          },
        },
      },
    },
  });

  const {
    seo: { metaTitle, metaDescription, metaImage },
  } = data;

  const imageUrlPath = metaImage.url
    ? getFullImagePath(metaImage.url)
    : '/opengraph-image.jpg';

  const image = imageOptimizer({
    url: imageUrlPath,
  });

  return {
    title: {
      template: '%s | Fix Up Roofing',
      default: metaTitle,
    },
    description: metaDescription,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(metaTitle)}
          &imageUrl=${encodeURIComponent(image)}`,
        },
      ],
    },
  };
}

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
