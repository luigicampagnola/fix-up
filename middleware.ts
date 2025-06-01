import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
import { Locale, i18n } from './i18n/config';
import { v4 as uuidv4 } from 'uuid';

const locales = i18n.locales as Locale[];
const redis = new Redis({
  url: process.env.TRACKING_DB_URL || '',
  token: process.env.TRACKING_DB_TOKEN || '',
});

async function logUserActivity(request: NextRequest, sessionId: string) {
  try {
    const uaHeader = request.headers.get('user-agent');
    const userAgentData = uaHeader ? userAgent(request) : {};
    const referer = request.headers.get('referer');
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Parse referer to extract domain and categorize traffic source
    let trafficSource = 'direct';
    let refererDomain = null;
    if (referer) {
      try {
        const parsedReferer = new URL(referer);
        refererDomain = parsedReferer.hostname || 'unknown';
        if (refererDomain.includes('google.com')) {
          trafficSource = 'organic_search';
        } else if (refererDomain.includes('facebook.com') || refererDomain.includes('twitter.com') || refererDomain.includes('linkedin.com')) {
          trafficSource = 'social';
        }
      } catch (error) {
        console.warn('Invalid referer URL:', referer, error);
      }
    }

    // Parse UTM parameters from the request URL
    const url = new URL(request.url);
    const utmParams = {
      utm_source: url.searchParams.get('utm_source') || null,
      utm_medium: url.searchParams.get('utm_medium') || null,
      utm_campaign: url.searchParams.get('utm_campaign') || null,
      utm_term: url.searchParams.get('utm_term') || null,
      utm_content: url.searchParams.get('utm_content') || null,
    };

    const userInfo = {
      ip,
      forwardedFor: request.headers.get('x-vercel-forwarded-for') || 'unknown',
      ...userAgentData,
      path: request.nextUrl.pathname,
      method: request.method,
      timestamp: new Date().toISOString(),
      referer: referer || null,
      refererDomain,
      trafficSource,
      utmParams,
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
      sessionId,
    };

    // Create keys for storage and counting
    const counterKey = `uac:${ip}:${sessionId}`;
    const storageKey = `ua:${Date.now()}:${sessionId}`;

    // Increment counters for traffic source and geographic data
    await redis.incr(counterKey); // Count unique user+source combinations
    await redis.expire(counterKey, 7 * 24 * 60 * 60);
    await redis.incr(`tsc:${trafficSource}`); // Count by traffic source
    await redis.expire(`tsc:${trafficSource}`, 7 * 24 * 60 * 60);

    console.log('User-Activity-Key', storageKey);
    console.log('User-Activity-Counter-Key', counterKey);
    console.log('Traffic-Source', trafficSource);
    console.log('Referer-Domain', refererDomain);
    console.log('UTM-Params', JSON.stringify(utmParams));
    console.log('User-Session-Id', sessionId);
    console.log('User-Agent Header:', uaHeader);
    console.log('User-Info:', JSON.stringify(userInfo));
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
  const response = NextResponse.next();

  const sessionId = request.cookies.get('SESSION_ID')?.value
  if (!sessionId) {
    const sessionId = uuidv4();
    await logUserActivity(request, sessionId);
    response.cookies.set('SESSION_ID', sessionId, { path: '/' });
  } else {
    await logUserActivity(request, sessionId);
  }

  // Step 4: Get or set session ID
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') as Locale | null;

  if (locale && locales.includes(locale)) {
    response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    return response;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};