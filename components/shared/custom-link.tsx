import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'hrefLang'>,
    VariantProps<typeof buttonVariants> {
  url: string;
  documentId?: string;
  label?: string;
  children?: React.ReactNode;
}
export const CustomLink = ({
  className,
  url,
  children,
  label,
  documentId,
  variant,
  size,
  ...props
}: LinkProps) =>
  url ? (
    <Link
      href={url}
      id={documentId}
      className={clsx(buttonVariants({ variant, size, className }))}
      prefetch={true}
      {...props}
    >
      {children || label}
    </Link>
  ) : null;
