'use client';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { use, useEffect, useState } from 'react';
import {
  ContactInformation,
  ContactInformationIcon,
  ContactInformationIconType,
  ContactInformationType,
} from '../shared/contact-information';
import { APIResponse } from '@/utils/types';

export interface HeaderProps {
  contacts: Array<ContactInformationType>;
  socials: Array<ContactInformationIconType>;
}
export default function Header({
  children,
  headerData,
}: {
  children: React.ReactNode;
  headerData: Promise<APIResponse<HeaderProps>>;
}) {
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

  const {
    data: { contacts, socials },
  } = use(headerData);
  return (
    <>
      {/* Display Desktop */}
      <AnimatePresence>
        <motion.nav
          className={
            'hidden sticky inset-x-0 top-0 z-50 desktop:flex flex-col w-full bg-background border-b border-foreground/20'
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
      {/* Display Mobile */}
      <div className='desktop:hidden sticky inset-x-0 top-0 z-50 flex-col w-full bg-background border-b border-foreground/20'>
        {children}
      </div>
    </>
  );
}
