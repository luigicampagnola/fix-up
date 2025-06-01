import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
import { Locale } from './i18n/config';

const locales = (await import('./i18n/config')).i18n.locales as Locale[];
const redis = new Redis({
  url: process.env.TRACKING_DB_URL || '',
  token: process.env.TRACKING_DB_TOKEN || '',
});

// Helper to parse cookies from header
function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) cookies[name] = value;
  });
  return cookies;
}

function extractHostname(referer: string | null): string | null {
  if (!referer) return null;
  try {
    const match = referer.match(/^(?:https?:\/\/)?([^\/:?#]+)/i);
    return match ? match[1] : null;
  } catch (e) {
    console.error('Error extracting hostname from referer:', e);
    return null;
  }
}

async function logUserActivity(request: NextRequest, sessionId: string) {
  try {

    const userAgentData = userAgent(request)
    const referer = request.headers.get('referer');
    const refererHost = extractHostname(referer);
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const cookies = parseCookies(request.headers.get('cookie'));

    const userInfo = {
      ip,
      forwardedFor: request.headers.get('x-vercel-forwarded-for') || 'unknown',
      ...userAgentData,
      path: request.nextUrl.pathname,
      method: request.method,
      timestamp: new Date().toISOString(),
      query: (() => {
        try {
          return Object.fromEntries(request.nextUrl.searchParams);
        } catch (e) {
          console.error('Failed to parse search params:', e);
          return {};
        }
      })(),
      referer: referer || null,
      refererHost,
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
      cookies,
      sessionId,
    };

    const key = `user_activity:${Date.now()}`;
    await redis.set(key, JSON.stringify(userInfo));
    await redis.expire(key, 7 * 24 * 60 * 60); // Expire after 7 days
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

  // Step 2: Check rate limiting
  // const ip = request.headers.get('x-forwarded-for') || 'unknown';
  // const isRateLimited = await checkRateLimit(ip);
  // if (isRateLimited) {
  //   return new NextResponse('Too Many Requests', { status: 429 });
  // }

  // Step 3: Handle ?locale= query parameter
  let locale: Locale | null = null;
  try {
    locale = request.nextUrl.searchParams.get('locale') as Locale | null;
  } catch (e) {
    console.error('Failed to parse locale from search params:', e);
  }

  // Step 4: Get or set session ID
  const cookies = parseCookies(request.headers.get('cookie'));
  let sessionId = cookies.sessionId;
  const response = NextResponse.next();
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    response.headers.set(
      'Set-Cookie',
      `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}`
    );
  }

  // Step 5: Set locale cookie if valid
  if (locale && locales.includes(locale)) {
    response.headers.append(
      'Set-Cookie',
      `NEXT_LOCALE=${locale}; Path=/`
    );
  }

  // Step 6: Log user activity
  await logUserActivity(request, sessionId);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};