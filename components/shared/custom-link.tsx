import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'hrefLang'>,
    VariantProps<typeof buttonVariants> {
  url: string;
  documentId?: string;
  label?: string;
  children?: React.ReactNode;
  styled?: boolean;
}
export const CustomLink = ({
  className,
  url,
  children,
  label,
  documentId,
  variant,
  size,
  rounded,
  styled = true,
  ...props
}: LinkProps) =>
  url ? (
    <Link
      href={url}
      id={documentId}
      className={
        !styled
          ? className
          : clsx(buttonVariants({ variant, size, rounded, className }))
      }
      prefetch={true}
      {...props}
    >
      {children || label}
    </Link>
  ) : null;
