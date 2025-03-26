import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get('title')!;
  // const rawImageUrl = searchParams.get('imageUrl');

  const splitTitle = rawTitle?.split('|');
  const imageUrl = searchParams.get('imageUrl');
  try {
    return new ImageResponse(
      (
        <div
          tw='flex w-full h-full relative'
          style={{
            backgroundImage: `url(${imageUrl})`, // Fixed typo
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            tw='flex flex-col w-full h-full items-center justify-center relative'
            style={{ backgroundColor: 'rgba(19, 18, 69, 0.8)' }}
          >
            <div tw='flex flex-col md:flex-row w-full h-full md:items-center justify-between p-8'>
              <div tw='flex flex-col text-4xl sm:text-6xl font-bold items-center tracking-tight text-left w-full'>
                <span tw='text-white uppercase text-center'>
                  {splitTitle[0]}
                </span>
                <span tw='text-[#539544] uppercase'>{splitTitle[1]}</span>
                <a tw='mt-8 flex items-center justify-center rounded-md border border-transparent bg-[#539544] px-5 py-3 text-4xl text-white uppercase'>
                  Contact Us Today!
                </a>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('ImageResponse Error:', error);
    return new ImageResponse(
      (
        <div tw='flex w-full h-full items-center justify-center bg-red-500'>
          <span tw='text-white text-4xl'>
            Error: Could not load background image
          </span>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
