import { CustomLink, LinkProps } from './custom-link';
import {
  IconPhoneCall,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconMedicalCross,
} from '@tabler/icons-react';

export type ContactInformationType = {
  type: 'phone' | 'email' | 'address';
  label: string;
  url: string;
};

export const ContactInformation = ({
  type,
  label,
  url,
}: ContactInformationType) => {
  const constants = {
    className: 'inline-flex items-center space-x-1 hover:text-primary',
    target: '_blank',
    variant: 'link',
  } as Omit<LinkProps, 'url'>;

  switch (type) {
    case 'phone':
      return (
        <CustomLink url={`tel:${url}`} {...constants}>
          <IconPhoneCall />
          <span>{label}</span>
        </CustomLink>
      );
    case 'email':
      return (
        <CustomLink {...constants} url={`mailto:${url}`}>
          <IconMail />
          <span>{label}</span>
        </CustomLink>
      );
    case 'address':
      return (
        <CustomLink url={url} {...constants}>
          <IconMapPin />
          <span>{label}</span>
        </CustomLink>
      );
    default:
      return (
        <span {...constants}>
          <span>{label}</span>
        </span>
      );
  }
};

export type ContactInformationIconType = {
  type: 'phone' | 'email' | 'facebook' | 'yelp';
} & Omit<ContactInformationType, 'type'>;

export const ContactInformationIcon = ({
  type,
  label,
  url,
}: ContactInformationIconType) => {
  const constants = {
    className: 'inline-flex items-center space-x-1 rounded-full',
    target: '_blank',
    size: 'icon',
    rounded: 'full',
  } as Omit<LinkProps, 'url'>;

  switch (type) {
    case 'phone':
      return (
        <CustomLink
          {...constants}
          target='_self'
          url={`tel:${url}`}
          aria-label={label}
        >
          <IconPhoneCall />
        </CustomLink>
      );
    case 'email':
      return (
        <CustomLink {...constants} url={`mailto:${url}`} aria-label={label}>
          <IconMail />
        </CustomLink>
      );
    case 'facebook':
      return (
        <CustomLink {...constants} url={url} aria-label={label}>
          <IconBrandFacebook />
        </CustomLink>
      );
    case 'yelp':
      return (
        <CustomLink {...constants} url={url} aria-label={label}>
          <IconMedicalCross />
        </CustomLink>
      );
  }
};
