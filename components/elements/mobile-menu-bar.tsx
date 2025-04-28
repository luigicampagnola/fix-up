'use client';
import { AnimatePresence } from 'framer-motion';
import { use, useState } from 'react';
import MobileMenuModal from '../ui/mobile-menu-modal';
import { APIResponse, MenuProps } from '@/utils/types';
import { CustomImage } from '../shared/custom-image';
import { Button } from '../ui/button';
import { CustomLink } from '../shared/custom-link';
import { HeaderProps } from './header';
import { ContactInformationIcon } from '../shared/contact-information';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { IconMenu2 } from '@tabler/icons-react';
import LocaleSwitcher from '../shared/locale-switcher';

export default function MobileMenuBar({
  menu,
  header,
}: {
  menu: Promise<APIResponse<MenuProps>>;
  header: Promise<APIResponse<HeaderProps>>;
}) {
  const [open, setOpen] = useState(false);
  const { data: menuData } = use(menu);
  const { data: headerData } = use(header);

  const { logo, links, cta } = menuData;
  const { socials } = headerData;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a')) {
      setOpen(false);
    }
  };
  return (
    <div
      className={
        'flex-1 flex flex-row items-center justify-between desktop:hidden container'
      }
    >
      <CustomLink
        styled={false}
        url={'/'}
        className='my-2 inline-flex relative h-14 w-36 flex-shrink-0'
      >
        <CustomImage
          url='/fixup.svg'
          alternativeText='Fix Up brand logo'
          priority
          className='h-full w-full'
          fill
          localImage={true}
        />
      </CustomLink>
      <div className='z-50 flex w-full gap-x-2 justify-end'>
        <LocaleSwitcher />
        <Button
          aria-label='Open Menu'
          onClick={() => setOpen(!open)}
          variant='secondary'
          size='icon'
        >
          <IconMenu2 className='text-background w-6 h-5 flex-shrink-0' />
        </Button>
      </div>
      <AnimatePresence>
        {open && (
          <MobileMenuModal setOpen={setOpen} logo={logo}>
            <div className='flex flex-col h-full relative overflow-y-auto'>
              <div
                className='flex-1 flex w-full flex-col gap-y-8 container'
                onClick={handleClick}
              >
                <div className='pt-8 flex flex-col items-start justify-center gap-2 divide-y divide-background/50'>
                  {links &&
                    links.length > 0 &&
                    links
                      .slice(0, 6)
                      .map(({ label, url, group, list }, index) => {
                        return (group && group.length > 0) ||
                          (list && list.length > 0) ? (
                          <Accordion
                            className='text-white w-full pt-2'
                            key={`navigation-menu-${index}`}
                            type='single'
                            collapsible
                          >
                            <AccordionItem value='item-1' className='gap-y-1'>
                              <AccordionTrigger className='text-lg'>
                                {label}
                              </AccordionTrigger>
                              {group &&
                                group.map(({ title, sub }, index) => (
                                  <AccordionContent
                                    key={`group-link-${index}`}
                                    className='mt-2 p-2 bg-slate-600'
                                  >
                                    {title}

                                    {sub &&
                                      sub.map(({ label, url }, index) => (
                                        <div
                                          key={`group-link-${index}`}
                                          className='bg-slate-800 p-2 mt-2'
                                        >
                                          <CustomLink
                                            key={`navigation-link-${index}`}
                                            url={url}
                                            className='capitalize text-sm'
                                            variant={'navigation-link'}
                                            size='none'
                                          >
                                            {label}
                                          </CustomLink>
                                        </div>
                                      ))}
                                  </AccordionContent>
                                ))}
                              {list &&
                                list.map(({ label, url }, index) => (
                                  <AccordionContent
                                    className='mt-2 p-2 bg-slate-600'
                                    key={`list-link-${index}`}
                                  >
                                    <CustomLink
                                      key={`navigation-link-${index}`}
                                      url={url}
                                      className='capitalize text-sm'
                                      variant={'navigation-link'}
                                      size='none'
                                    >
                                      {label}
                                    </CustomLink>
                                  </AccordionContent>
                                ))}
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <div
                            key={`navigation-menu-${index}`}
                            className='w-full pt-2'
                          >
                            <CustomLink
                              url={url}
                              className='capitalize'
                              variant={'navigation-link'}
                              size='none'
                            >
                              {label}
                            </CustomLink>
                          </div>
                        );
                      })}
                </div>

                <CustomLink className='uppercase' size='lg' {...cta} />
              </div>

              <div className='inline-flex items-center justify-center py-8 gap-x-2'>
                {socials &&
                  socials.map((contact, index) => (
                    <ContactInformationIcon
                      key={`contact-information-item-${index}`}
                      {...contact}
                    />
                  ))}
              </div>
            </div>
          </MobileMenuModal>
        )}
      </AnimatePresence>
    </div>
  );
}
