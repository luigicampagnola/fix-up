import { fetchAPI } from '@/utils/api';
import DesktopMenuBar from './elements/desktop-menu-bar';
import Header, { HeaderProps } from './elements/header';
import MobileMenuBar from './elements/mobile-menu-bar';
import { MenuProps } from '@/utils/types';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';

export default async function NavigationBar() {
  const locale = (await getLocale()) as Locale;
  const menuResponse = fetchAPI<MenuProps>({
    path: '/api/navigation',
    query: {
      locale: locale,
      populate: {
        cta: {
          fields: ['label', 'url'],
        },
        links: {
          populate: {
            list: {
              fields: ['label', 'url'],
            },
            group: {
              fields: ['title'],
              populate: {
                sub: {
                  fields: ['label', 'url'],
                },
              },
            },
          },
        },
      },
    },
  });
  const response = await menuResponse;
  const { data: menu } = response;

  const headerResponse = fetchAPI<HeaderProps>({
    path: '/api/global',
    query: {
      locale: locale,
      populate: {
        contacts: {
          fields: ['type', 'label', 'url'],
        },
        socials: {
          fields: ['type', 'label', 'url'],
        },
      },
    },
  });

  return (
    <Header headerData={headerResponse}>
      <DesktopMenuBar {...menu} />
      <MobileMenuBar menu={menuResponse} header={headerResponse} />
    </Header>
  );
}
