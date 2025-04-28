import { getUserLocale } from '@/lib/locale';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  try {
    const messages = (await import(`@/app/translations/${locale}`)).default;
    return {
      locale: locale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    const fallbackMessages = (await import(`@/app/translations/en-us`)).default;
    return {
      locale: 'en-us',
      messages: fallbackMessages,
    };
  }
});
