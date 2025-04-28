import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherDropdown from '../elements/language-switcher';
import { Locale } from '@/i18n/config';
import { LocaleOption } from '@/utils/types';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale() as Locale;

  const items = t.raw('items') as unknown as LocaleOption[];
  return (
    <LocaleSwitcherDropdown
      defaultValue={locale}
      items={items}
      label={t('label')}
    />
  );
}
