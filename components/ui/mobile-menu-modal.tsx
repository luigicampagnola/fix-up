'use client';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { CustomImage } from '../shared/custom-image';
import { Button } from './button';
import { Image } from '@/utils/types';

export default function MobileMenuModal({
  setOpen,
  children,
  logo,
}: {
  children: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  logo: Image;
}) {
  useLockBodyScroll();
  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={
        'fixed inset-0 z-50 flex h-full min-h-screen w-full flex-col bg-secondary'
      }
    >
      <div className='z-50 bg-background'>
        <div className=' flex items-center justify-between container'>
          <Link href={'/'} className='relative h-14 w-36 flex-shrink-0 my-1.5'>
            <CustomImage {...logo} priority className='h-full w-full' fill />
          </Link>
          <Button
            aria-label='Close Menu'
            onClick={() => setOpen(false)}
            variant='secondary'
            size='icon'
          >
            <FaPlus className='text-background w-10 h-10 flex-shrink-0 rotate-45' />
          </Button>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
