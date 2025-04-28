'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CustomImage } from '../shared/custom-image';
import { Image } from '@/utils/types';

// This is a client component that handles just the parallax effect
export default function ParallaxBackground({ url, alternativeText }: Image) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '95%']);

  return (
    <div ref={ref} className='absolute inset-0 z-0 w-full h-full'>
      <motion.div className='absolute inset-0 h-full' style={{ y }}>
        <CustomImage
          url={url}
          alternativeText={alternativeText}
          fill
          priority={true}
          sizes='100vw'
          quality={75}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className='brightness-50'
        />
      </motion.div>
    </div>
  );
}
