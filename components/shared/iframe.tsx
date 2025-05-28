'use client';

import { IframeHTMLAttributes, useEffect, useState } from 'react';

export default function Iframe({
  title,
  src,
}: IframeHTMLAttributes<HTMLIFrameElement>) {
  const [display, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return display ? (
    <iframe
      title={title}
      src={src}
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
      className='aspect-[3/2] desktop:aspect-[4/3]'
    />
  ) : null;
}
