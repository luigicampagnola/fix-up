import Link from 'next/link';
import { CustomImage } from './shared/custom-image';
import { fetchAPI } from '@/utils/api';
import { HeaderProps } from './elements/header';
import {
  ContactInformation,
  ContactInformationIcon,
} from './shared/contact-information';
import { FooterProps } from '@/utils/types';
import { CustomLink } from './shared/custom-link';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';

export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footerResponse = await fetchAPI<FooterProps>({
    path: '/api/footer',
    query: {
      locale: locale,
      fields: ['license', 'copyRight'],
      populate: {
        groups: {
          fields: ['title'],
          populate: {
            sub: {
              fields: ['label', 'url'],
            },
          },
        },
      },
    },
  });
  const headerResponse = await fetchAPI<HeaderProps>({
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
  const {
    data: { contacts, socials },
  } = headerResponse;
  const {
    data: { groups, license, copyRight },
  } = footerResponse;

  return (
    <footer className="">
      <div className="container py-14">
        <div className="grid tablet:grid-rows-2 grid-cols-1 gap-8 tablet:grid-cols-3 desktop:grid-rows-1 desktop:grid-cols-5">
          {/* Company Info */}
          <div className="w-full row-span-2">
            <div className="space-y-2">
              <CustomLink
                styled={false}
                url={'/'}
                className="inline-flex relative h-14 w-36 flex-shrink-0"
              >
                <CustomImage
                  url="/fixup.svg"
                  alternativeText="Fix Up brand logo"
                  priority
                  className="h-full w-full"
                  fill
                  localImage={true}
                />
              </CustomLink>
              <p className="text-sm font-medium">{license}</p>
              <div className="inline-flex flex-col items-start gap-2 py-4 ">
                {contacts &&
                  contacts.map((contact, index) => (
                    <ContactInformation
                      key={`contact-information-${index}`}
                      {...contact}
                      styled={false}
                    />
                  ))}
              </div>
            </div>
            <div className="inline-flex gap-x-2">
              {socials &&
                socials.map((contact, index) => (
                  <ContactInformationIcon
                    key={`contact-information-item-${index}`}
                    {...contact}
                  />
                ))}
            </div>
          </div>
          {/* Group menu links */}
          {groups &&
            groups.map(({ sub, title }, index) => (
              <div key={`footer-group-item-${index}`} className="space-y-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <ul className="space-y-2">
                  {sub &&
                    sub.map(({ label, url }, index) => (
                      <li key={`footer-group-item-sub-${index}`}>
                        <Link
                          href={url}
                          className="text-sm hover:text-green-600 hover:underline transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="bg-secondary py-2 flex flex-col justify-between px-4 text-white tablet:flex-row tablet:items-center">
        <div className="mb-2 text-sm tablet:mb-0 text-background text-center w-full">
          Copyright © {new Date().getFullYear()} {copyRight}
        </div>
      </div>
    </footer>
  );
}
