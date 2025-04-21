'use client';

import { startTransition, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconCheck } from '@tabler/icons-react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/lib/locale';
import { LocaleOption } from '@/utils/types';

type LocaleSwitcherDropdownProps = {
  defaultValue: Locale;
  items: LocaleOption[];
  label: string;
};

export default function LocaleSwitcherDropdown({
  defaultValue,
  items,
  label,
}: LocaleSwitcherDropdownProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultValue);

  function handleLocaleChange(value: string) {
    const locale = value as Locale;
    setCurrentLocale(locale);
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  const selectedLocale = items.find(({ value }) => value === currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-9 min-w-20 gap-1 px-3 text-sm'
        >
          <span className='mr-1'>{selectedLocale?.flag}</span>
          {selectedLocale?.label.slice(0, 2)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>

        {items.map(({ value, flag, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleLocaleChange(value)}
            className='flex items-center gap-2'
          >
            <span className='mr-1'>{flag}</span>
            {label}
            {currentLocale === value && (
              <IconCheck className='h-4 w-4 ml-auto' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
