import Link from 'next/link';
import { CustomImage } from '../shared/custom-image';
import { CustomLink } from '../shared/custom-link';
import { Image, Link as LinkT } from '@/utils/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { buttonVariants } from '../ui/button';
import clsx from 'clsx';
import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';

// const home = {
//   logo: {
//     url: '/icon/fixup.svg',
//     alternativeText: 'Fix Up logo',
//   },
// };

// type SubNavigation = {
//   title: string;
//   links:
// };
type GroupNavigation = {
  title: string;
  sub: LinkT[];
};
type NavigationLink = {
  group?: GroupNavigation[];
} & LinkT;

interface MenuProps {
  logo: Image;
  links: NavigationLink[];
  cta: LinkT;
}

export default function DesktopMenuBar() {
  const data: MenuProps = {
    logo: {
      url: '/icon/fixup.svg',
      alternativeText: 'Fixup Roofing & Construction Logo',
    },
    links: [
      { label: 'About', url: '/about-us' },
      {
        label: 'Locations',
        url: '/locations',
        group: [
          {
            title: 'Broward County',
            sub: [
              { label: 'Location 1', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
            ],
          },
          {
            title: 'Miami-Date County',
            sub: [
              { label: 'Location 1', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
            ],
          },
        ],
      },
      {
        label: 'Financing',
        url: '/financing',
        group: [
          {
            title: 'Broward County',
            sub: [
              { label: 'Location 1', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
            ],
          },
          {
            title: 'Miami-Date County',
            sub: [
              { label: 'Location 1', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
              { label: 'Location 2', url: '#' },
            ],
          },
        ],
      },
      { label: 'Projects', url: '/projects' },
      { label: 'Blog', url: '/blog' },
    ],

    cta: { label: 'free estimates', url: '/estimates' },
  };

  const { logo, links, cta } = data;
  return (
    <div className='flex-1 relative container flex items-center justify-between'>
      {/* Logo */}
      <Link href={'/'} className='relative h-14 w-36'>
        <CustomImage {...logo} priority className='h-full w-full' fill />
      </Link>
      {/* Navgiation Links */}
      <div className='flex items-center justify-center gap-x-2'>
        {links &&
          links.length > 0 &&
          links.slice(0, 6).map(({ label, url, group }, index) => {
            return group && group.length > 0 ? (
              <DropdownMenu key={`navigation-menu-${index}`}>
                <DropdownMenuTrigger
                  className={clsx(
                    buttonVariants({ variant: 'navigation-link' })
                  )}
                >
                  {label}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='grid grid-cols-2 gap-8 p-8'>
                  {group &&
                    group.map(({ title, sub }, index) => (
                      <span
                        key={`group-item-${index}`}
                        className='grid grid-cols-3 gap-x-4'
                      >
                        <DropdownMenuLabel className='col-span-3'>
                          {title}
                        </DropdownMenuLabel>
                        {sub &&
                          sub.map(({ label }, index) => (
                            <div key={`group-link-${index}`}>
                              <DropdownMenuItem>{label}</DropdownMenuItem>
                            </div>
                          ))}
                      </span>
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
      <CustomLink className='uppercase' {...cta} />
    </div>
  );
}
