'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UTMGenerator } from '../forms/utm-generator';
import { UrlPath } from '@/utils/types';

export function UTMGeneratorWrapper({
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
  return (
    <Card>
      <CardHeader className='bg-slate-50 rounded-t-lg'>
        <CardTitle>UTM Parameter Generator</CardTitle>
        <CardDescription>
          Create tracking URLs for your marketing campaigns
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <UTMGenerator
          baseUrl={baseUrl}
          sources={sources}
          defaultUrl={defaultUrl}
          urlPaths={urlPaths}
        />
      </CardContent>
    </Card>
  );
}
