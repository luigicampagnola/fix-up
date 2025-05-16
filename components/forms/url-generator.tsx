'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export default function UTMGenerator({
  baseUrl,
  sources,
  defaultUrl,
}: {
  baseUrl: string;
  sources: string[];
  defaultUrl: string;
}) {
  const [path, setPath] = useState(defaultUrl);
  const [campaign, setCampaign] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUtmUrl = (source: string) => {
    const cleanCampaign = campaign.trim().replace(/\s+/g, '-').toLowerCase();
    const utmParams = new URLSearchParams({
      utm_source: source,
      utm_medium: source,
      utm_campaign: cleanCampaign || 'default-campaign',
    });

    return `${baseUrl}${path}?${utmParams.toString()}`;
  };

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card>
      <CardHeader className='bg-background rounded-t-lg'>
        <CardTitle>UTM Parameter Generator</CardTitle>
        <CardDescription>
          Create tracking URLs for your marketing campaigns
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6 space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='path'>URL Path</Label>
          <div className='flex items-center space-x-2'>
            <div className='bg-slate-100 px-3 py-2 rounded-md text-sm text-slate-600 whitespace-nowrap'>
              {baseUrl}/
            </div>
            <Input
              id='path'
              value={path}
              onChange={(e) =>
                setPath(
                  e.target.value.startsWith('/')
                    ? e.target.value
                    : `/${e.target.value}`
                )
              }
              placeholder='estimates'
              className='flex-1'
            />
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
                  <div className='flex flex-col tablet:flex-row items-stretch gap-4'>
                    <div className='flex-1 bg-slate-200 p-3 rounded-md tablet:rounded-l-md border border-slate-200 tablet:border-r-0 overflow-x-auto text-sm break-all'>
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
      </CardContent>
    </Card>
  );
}
