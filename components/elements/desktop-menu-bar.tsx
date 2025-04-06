import Link from 'next/link';
import { CustomImage } from '../shared/custom-image';
import { CustomLink } from '../shared/custom-link';
import { MenuProps } from '@/utils/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { buttonVariants } from '../ui/button';

export default function DesktopMenuBar({ logo, links, cta }: MenuProps) {
  return (
    <div className='hidden flex-1 relative container desktop:flex items-center justify-between'>
      {/* Logo */}
      <Link href={'/'} className='relative h-14 w-36 flex-shrink-0'>
        <CustomImage
          url='/fixup.svg'
          alternativeText='Fix Up brand logo'
          priority
          className='h-full w-full'
          fill
          localImage
        />
      </Link>
      {/* Navgiation Links */}
      <div className='flex items-center justify-center gap-x-2'>
        {links &&
          links.length > 0 &&
          links.slice(0, 6).map(({ label, url, group, list }, index) => {
            return (group && group.length > 0) || (list && list.length > 0) ? (
              <DropdownMenu key={`navigation-menu-${index}`}>
                <DropdownMenuTrigger
                  className={buttonVariants({ variant: 'navigation-link' })}
                >
                  {label}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='grid grid-cols-2 gap-x-8 p-8'>
                  {group &&
                    group.map(({ title, sub }, index) => (
                      <div
                        key={`group-item-${index}`}
                        className='grid auto-rows-[40px] '
                      >
                        <DropdownMenuLabel className='col-span-1'>
                          {title}
                        </DropdownMenuLabel>
                        {sub &&
                          sub.map(({ label, url }, index) => (
                            <div key={`group-link-${index}`}>
                              <DropdownMenuItem>
                                <CustomLink url={url} styled={false}>
                                  {label}
                                </CustomLink>
                              </DropdownMenuItem>
                            </div>
                          ))}
                      </div>
                    ))}
                  {list &&
                    list.map(({ label, url }, index) => (
                      <div
                        key={`group-item-${index}`}
                        className='grid auto-rows-[40px] '
                      >
                        <DropdownMenuItem>
                          <CustomLink url={url} styled={false}>
                            {label}
                          </CustomLink>
                        </DropdownMenuItem>
                      </div>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <CustomLink
                key={`navigation-link-${index}`}
                url={url}
                variant='navigation-link'
                className='capitalize'
              >
                {label}
              </CustomLink>
            );
          })}
      </div>
      {/* Call to actions */}
      <CustomLink className='uppercase' size='lg' {...cta} />
    </div>
  );
}
