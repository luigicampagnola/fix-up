import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
// import { Redis } from '@upstash/redis';
import { Locale, i18n } from './i18n/config';

const locales = i18n.locales as Locale[];
// const redis = new Redis({
//   url: process.env.TRACKING_DB_URL || '',
//   token: process.env.TRACKING_DB_TOKEN || '',
// });

// Helper to parse cookies from header
// function parseCookies(cookieHeader: string | null): Record<string, string> {
//   const cookies: Record<string, string> = {};
//   if (!cookieHeader) return cookies;
//   cookieHeader.split(';').forEach((cookie) => {
//     const [name, value] = cookie.trim().split('=');
//     if (name && value) cookies[name] = value;
//   });
//   return cookies;
// }

// function extractHostname(referer: string | null): string | null {
//   if (!referer) return null;
//   try {
//     const match = referer.match(/^(?:https?:\/\/)?([^\/:?#]+)/i);
//     return match ? match[1] : null;
//   } catch (e) {
//     console.error('Error extracting hostname from referer:', e);
//     return null;
//   }
// }


async function logUserActivity(request: NextRequest) {
  try {
    const allCookies = request.cookies.getAll(); // Safely access cookie
    const uaHeader = request.headers.get('user-agent');
    const userAgentData = uaHeader ? userAgent(request) : {}; // Fallback to empty object if no user-agent
    console.log('User-Agent Header:', uaHeader); // Debug log
    const referer = request.headers.get('referer');
    // const refererHost = extractHostname(referer);
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    // const cookies = parseCookies(request.headers.get('cookie'));

    const userInfo = {
      ip,
      forwardedFor: request.headers.get('x-vercel-forwarded-for') || 'unknown',
      ...userAgentData,
      path: request.nextUrl.pathname,
      method: request.method,
      timestamp: new Date().toISOString(),
      // query: (() => {
      //   try {
      //     return Object.fromEntries(request.nextUrl.searchParams);
      //   } catch (e) {
      //     console.error('Failed to parse search params:', e);
      //     return {};
      //   }
      // })(),
      referer: referer || null,
      // refererHost,
      geo: {
        country: request.headers.get('x-vercel-ip-country') || 'unknown',
        region: request.headers.get('x-vercel-ip-region') || 'unknown',
        city: request.headers.get('x-vercel-ip-city') || 'unknown',
        latitude: request.headers.get('x-vercel-ip-latitude') || 'unknown',
        longitude: request.headers.get('x-vercel-ip-longitude') || 'unknown',
      },
      acceptLanguage: request.headers.get('accept-language') || null,
      accept: request.headers.get('accept') || null,
      connection: request.headers.get('connection') || null,
      protocol: request.headers.get('x-forwarded-proto') || 'unknown',
      port: request.headers.get('x-forwarded-port') || 'unknown',
      host: request.headers.get('host') || 'unknown',
      requestId: request.headers.get('x-vercel-id') || 'unknown',
      deploymentUrl: request.headers.get('x-vercel-deployment-url') || 'unknown',
      xRequestedWith: request.headers.get('x-requested-with') || null,
      ...allCookies
    };

    const key = `user_activity:${Date.now()}`;
    console.log('key: ', key, 'data: ', JSON.stringify(userInfo));
    // await redis.set(key, JSON.stringify(userInfo));
    // await redis.expire(key, 7 * 24 * 60 * 60); // Expire after 7 days
  } catch (error) {
    console.error('Error logging user activity to Upstash Redis:', error);
  }
}


export async function middleware(request: NextRequest) {
  // Step 1: Country-based access control
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  if (country !== 'US' && country !== 'SE' && country !== 'HN') {
    return new NextResponse("🚫 You don't have access to this site.", {
      status: 403,
    });
  }

  await logUserActivity(request);

  // Step 4: Get or set session ID
  const { searchParams } = new URL(request.url);
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