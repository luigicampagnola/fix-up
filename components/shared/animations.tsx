'use client';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface FaceSlideUpProps extends PropsWithChildren {
  className?: string;
  index?: number;
}
export const FadeSlideUp = ({
  className,
  children,
  index,
}: FaceSlideUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index ? index * 0.1 : 0.5 }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);
