import { NextResponse } from 'next/server';
import { i18n, Locale } from './i18n/config';

const locales = i18n.locales as Locale[];

export function middleware(req: any) {
  // Step 1: Country-based access control
  const country =
    req?.geo?.country || req.headers.get('x-vercel-ip-country') || 'US';

  if (country !== 'US' && country !== 'SE' && country !== 'HN') {
    return new NextResponse("🚫 You don't have access to this site.", {
      status: 403,
    });
  }

  // Step 2: Handle ?locale= query parameter
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') as Locale | null;

  if (locale && locales.includes(locale)) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
