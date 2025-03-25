import Link from 'next/link';
import { CustomImage } from '../shared/custom-image';
import { CustomLink } from '../shared/custom-link';
import { Image, Link as LinkT } from '@/utils/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { buttonVariants } from '../ui/button';

type GroupNavigation = {
  title: string;
  sub: LinkT[];
};
type NavigationLink = {
  group?: GroupNavigation[];
  list?: LinkT[];
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
            title: 'Miami-Date County',
            sub: [
              { label: 'Miami', url: '#' },
              { label: 'Miami Beach', url: '#' },
              { label: 'Miami Gardens', url: '#' },
              { label: 'Coral Gables', url: '#' },
              { label: 'Hialeah', url: '#' },
              { label: 'Kendall', url: '#' },
              { label: 'Westchester', url: '#' },
            ],
          },
          {
            title: 'Broward County',
            sub: [
              { label: 'Fort Lauradel', url: '#' },
              { label: 'Hollywood', url: '#' },
              { label: 'Miramar', url: '#' },
              { label: 'Pembroke Pines', url: '#' },
              { label: 'Pompano Beach', url: '#' },
            ],
          },
        ],
      },
      {
        label: 'Services',
        url: '/services',
        list: [
          { label: 'Air Conditioning', url: '/services/air-conditioning' },
          { label: 'Commercial Roofing', url: '/services/commercial-roofing' },
          {
            label: 'Residential Roofing',
            url: '/services/residential-roofing',
          },
          { label: 'Solar Panels', url: '/services/solar-panels' },
          { label: 'Windows and Doors', url: '/services/windows-and-doors' },
        ],
      },
      { label: 'Projects', url: '/projects' },
      { label: 'Blog', url: '/blog' },
      { label: 'Financing', url: '/financing' },
    ],

    cta: { label: 'free estimates', url: '/estimates' },
  };

  const { logo, links, cta } = data;
  return (
    <div className='hidden flex-1 relative container desktop:flex items-center justify-between'>
      {/* Logo */}
      <Link href={'/'} className='relative h-14 w-36'>
        <CustomImage {...logo} priority className='h-full w-full' fill />
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
                          sub.map(({ label }, index) => (
                            <div key={`group-link-${index}`}>
                              <DropdownMenuItem>{label}</DropdownMenuItem>
                            </div>
                          ))}
                      </div>
                    ))}
                  {list &&
                    list.map(({ label }, index) => (
                      <div
                        key={`group-item-${index}`}
                        className='grid auto-rows-[40px] '
                      >
                        <DropdownMenuItem>{label}</DropdownMenuItem>
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
