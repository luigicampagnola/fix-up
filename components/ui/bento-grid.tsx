import { cn } from '@/lib/utils';
import { CustomLink } from '../shared/custom-link';
import { Link } from '@/utils/types';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 tablet:auto-rows-[24rem] tablet:grid-cols-2 desktop:auto-rows-[20rem] desktop:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link?: Link;
}) => {
  return (
    <div
      className={cn(
        'relative group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-foreground/30 bg-background p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none cursor-pointer isolate',
        className
      )}
    >
      {header}
      <div className='transition duration-200 group-hover/bento:translate-x-2'>
        {icon}
        <div className='mt-2 mb-2 font-sans font-bold text-foreground dark:text-neutral-200'>
          {title}
        </div>
        <div className='font-sans text-xs font-normal text-foreground dark:text-neutral-300'>
          {description}
        </div>
      </div>
      {link && (
        <CustomLink
          aria-label={link.label}
          url={link.url}
          className='z-10 absolute inset-0'
          styled={true}
        />
      )}
    </div>
  );
};
