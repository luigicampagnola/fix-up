'use client';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa6';
export default function Header({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [navHeight, setNavHeight] = useState<number>(112);

  useEffect(() => {
    const updateHeight = () => {
      if (scrollY.get() > 50) {
        setNavHeight(94);
      } else {
        setNavHeight(112);
      }
    };

    const unsubscribe = scrollY.on('change', updateHeight);

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={
        'sticky inset-x-0 top-0 z-50 flex flex-col w-full bg-background border-b border-foreground/20'
      }
      initial={false}
      animate={{ height: navHeight }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ height: 112 }}
    >
      <div className='bg-midnightblue text-white text-sm py-1 flex justify-center items-center'>
        {/* Contact Information */}
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-1'>
            <FaPhone />
            <span>sdf</span>
          </div>
          <div className='flex items-center space-x-1'>
            <FaEnvelope />
            <span>sdf</span>
          </div>
          <div className='flex items-center space-x-1'>
            <FaMapMarkerAlt />
            <span>sdfs</span>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <a href='https://facebook.com' aria-label='Facebook'>
            <FaFacebook />
          </a>
          <span>asdf</span>
        </div>
      </div>
      {children}
    </motion.nav>
  );
}
