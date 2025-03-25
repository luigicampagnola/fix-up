'use client';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebook, FaPhone, FaYelp } from 'react-icons/fa6';
import { CustomLink, LinkProps } from '../shared/custom-link';

type ContactInformation = {
  type: 'phone' | 'email' | 'address';
  label: string;
  url: string;
};
const ContactInformation = ({ type, label, url }: ContactInformation) => {
  const constants = {
    className: 'inline-flex items-center space-x-1 hover:text-primary',
    target: '_blank',
    variant: 'link',
  } as Omit<LinkProps, 'url'>;

  switch (type) {
    case 'phone':
      return (
        <CustomLink url={`tel:${url}`} {...constants}>
          <FaPhone />
          <span>{label}</span>
        </CustomLink>
      );
    case 'email':
      return (
        <CustomLink {...constants} url={`mailto:${url}`}>
          <FaEnvelope />
          <span>{label}</span>
        </CustomLink>
      );
    case 'address':
      return (
        <CustomLink url={url} {...constants}>
          <FaMapMarkerAlt />
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
type ContactInformationIconT = {
  type: 'phone' | 'email' | 'facebook' | 'yelp';
} & Omit<ContactInformation, 'type'>;
const ContactInformationIcon = ({
  type,
  label,
  url,
}: ContactInformationIconT) => {
  const constants = {
    className: 'inline-flex items-center space-x-1 rounded-full',
    target: '_blank',
    size: 'icon',
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
          <FaPhone />
        </CustomLink>
      );
    case 'email':
      return (
        <CustomLink {...constants} url={`mailto:${url}`} aria-label={label}>
          <FaEnvelope />
        </CustomLink>
      );
    case 'facebook':
      return (
        <CustomLink {...constants} url={url} aria-label={label}>
          <FaFacebook />
        </CustomLink>
      );
    case 'yelp':
      return (
        <CustomLink {...constants} url={`mailto:${url}`} aria-label={label}>
          <FaYelp />
        </CustomLink>
      );
  }
};

interface HeaderProps {
  contacts: Array<ContactInformation>;
  socials: Array<ContactInformationIconT>;
}
export default function Header({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [navHeight, setNavHeight] = useState<number>(112);
  const [displayTop, setDisplayTop] = useState(true);

  useEffect(() => {
    const updateHeight = () => {
      if (scrollY.get() > 50) {
        setNavHeight(80);
        setDisplayTop(false);
      } else {
        setNavHeight(112);
        setDisplayTop(true);
      }
    };

    const unsubscribe = scrollY.on('change', updateHeight);

    return () => unsubscribe();
  }, [scrollY]);

  const data: HeaderProps = {
    contacts: [
      {
        type: 'phone',
        label: '(786) 235-2435',
        url: '7862352435',
      },
      {
        type: 'email',
        label: 'cs@fixuproofing.com',
        url: 'cs@fixuproofing.com',
      },
      {
        type: 'address',
        label: '6917 NW 77th Ave, Miami, FL 33166',
        url: 'https://www.google.com/maps/place/Fix+Up+Roofing+and+Construction+LLC/@25.8366019,-80.3213593,15z/data=!4m6!3m5!1s0x8143193a6d65e119:0xea7b42391f5b4101!8m2!3d25.8366019!4d-80.3213593!16s%2Fg%2F11pds269z0?entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D',
      },
    ],
    socials: [
      { type: 'phone', label: 'Call us', url: '7862352435' },
      { type: 'email', label: 'Email us', url: 'cs@fixuproofing.com' },
      {
        type: 'facebook',
        label: 'Find us in Facebook',
        url: 'https://www.facebook.com/FixUpRoofingAndConstruction/',
      },
      {
        type: 'yelp',
        label: 'Yelp reviews',
        url: 'https://www.yelp.com/biz/fix-up-roofing-and-construction-miami-2',
      },
    ],
  };
  const { contacts, socials } = data;
  return (
    <AnimatePresence>
      <motion.nav
        className={
          'sticky inset-x-0 top-0 z-50 flex flex-col w-full bg-background border-b border-foreground/20'
        }
        initial={false}
        animate={{ height: navHeight }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ height: 112 }}
      >
        <motion.div
          variants={{
            visible: {
              opacity: 1,
              height: 'auto',
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
            hidden: {
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
          }}
          initial='visible'
          animate={displayTop ? 'visible' : 'hidden'}
          className='bg-midnightblue'
        >
          <div className=' flex justify-center items-center text-white text-sm gap-x-4 divide-x-2 py-0.5'>
            {/* Contact Information */}
            <div className='inline-flex items-center gap-x-2 '>
              {contacts &&
                contacts.map((contact, index) => (
                  <ContactInformation
                    key={`contact-information-${index}`}
                    {...contact}
                  />
                ))}
            </div>

            <div className='inline-flex items-center pl-4 gap-x-2'>
              {socials &&
                socials.map((contact, index) => (
                  <ContactInformationIcon
                    key={`contact-information-item-${index}`}
                    {...contact}
                  />
                ))}
            </div>
          </div>
        </motion.div>
        {children}
      </motion.nav>
    </AnimatePresence>
  );
}
