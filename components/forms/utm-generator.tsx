'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { UrlPath } from '@/utils/types';

export function UTMGenerator({
  baseUrl,
  sources,
  defaultUrl,
  urlPaths,
}: {
  baseUrl: string;
  sources: string[];
  defaultUrl: string;
  urlPaths: UrlPath[];
}) {
  const [path, setPath] = useState(defaultUrl);
  const [campaign, setCampaign] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState(defaultUrl);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPaths, setFilteredPaths] = useState(urlPaths);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter paths based on input
  useEffect(() => {
    const filtered = urlPaths?.filter(
      (urlPath) =>
        urlPath.path.toLowerCase().includes(inputValue.toLowerCase()) ||
        urlPath.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredPaths(filtered);
  }, [inputValue, urlPaths]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateUtmUrl = (source: string) => {
    const cleanCampaign = campaign.trim().replace(/\s+/g, '-').toLowerCase();
    const utmParams = new URLSearchParams({
      utm_source: source,
      utm_medium: source,
      utm_campaign: cleanCampaign || 'default-campaign',
    });
    const fullPath = path.includes('locale')
      ? `${baseUrl}${path}&${utmParams.toString()}`
      : `${baseUrl}${path}?${utmParams.toString()}`;

    return fullPath;
  };

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Handle path selection
  const handleSelectPath = (selectedPath: string) => {
    setPath(selectedPath);
    setInputValue(selectedPath);
    setShowSuggestions(false);
    // Blur the input to hide the virtual keyboard on mobile
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);

    // Update path with proper formatting
    if (value.startsWith('/')) {
      setPath(value);
    } else if (value) {
      setPath(`/${value}`);
    } else {
      setPath('/');
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Label htmlFor='path'>Search URL Path</Label>
        <div className='relative'>
          <Input
            ref={inputRef}
            id='path'
            placeholder='Search or enter a path...'
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            className='w-full'
          />

          {showSuggestions && filteredPaths.length > 0 && (
            <div
              ref={suggestionsRef}
              className='absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-auto'
            >
              <div className='py-1 text-sm'>
                <div className='px-2 py-1.5 text-xs font-medium text-slate-500'>
                  Available Paths
                </div>
                {filteredPaths.map((urlPath, index) => (
                  <div
                    key={`filtered-item-${index}`}
                    className='px-2 py-1.5 hover:bg-slate-100 cursor-pointer'
                    onClick={() => handleSelectPath(urlPath.path)}
                  >
                    <div className='font-medium'>{urlPath.label}</div>
                    <div className='text-xs text-slate-500'>{urlPath.path}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='mt-2'>
          <Label htmlFor='path'>Target Path</Label>
          <div className='flex items-center mt-2'>
            <div className='bg-slate-100 px-3 py-2 rounded-l-md text-sm text-slate-600 whitespace-nowrap'>
              {baseUrl}
            </div>
            <div className='bg-slate-50 px-3 py-2 rounded-r-md text-sm border border-slate-200 flex-1 overflow-x-auto'>
              {path}
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='campaign'>Campaign Name</Label>
        <Input
          id='campaign'
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          placeholder='summer-2025'
        />
      </div>

      <div className='pt-4 space-y-4'>
        <Label>Generated URLs</Label>
        <div className='space-y-3'>
          {sources.map((source, index) => {
            const url = generateUtmUrl(source);
            return (
              <div key={source} className='space-y-1'>
                <div className='text-sm font-medium capitalize'>{source}</div>
                <div className='flex flex-col tablet:flex-row items-stretch gap-2'>
                  <div className='flex-1 bg-slate-50 p-3 rounded-md tablet:rounded-l-md border border-slate-200 tablet:border-r-0 overflow-x-auto text-sm break-all'>
                    {url}
                  </div>
                  <Button
                    variant='outline'
                    className='h-[42px] tablet:h-auto tablet:rounded-l-none tablet:self-stretch flex-shrink-0'
                    onClick={() => copyToClipboard(url, index)}
                  >
                    {copiedIndex === index ? (
                      <IconCheck className='h-4 w-4 mr-2' />
                    ) : (
                      <IconCopy className='h-4 w-4 mr-2' />
                    )}
                    Copy
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
