import { cn, getFullImagePath } from '@/lib/utils';
import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';

interface CustomImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  url?: string;
  alternativeText: string;
  className: string;
  width?: number;
  height?: number;
  fill?: boolean;
  documentId?: string;
  name?: string;
  priority?: boolean;
  quality?: number;
  localImage?: boolean;
}
export const CustomImage = ({
  className,
  url,
  alternativeText,
  width,
  height,
  fill = false,
  documentId,
  priority,
  quality,
  localImage,
}: CustomImageProps) => {
  return url ? (
    <Image
      id={documentId}
      className={cn('object-cover object-center', className)}
      src={localImage ? url : getFullImagePath(url)}
      alt={alternativeText}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      quality={quality}
    />
  ) : null;
};
