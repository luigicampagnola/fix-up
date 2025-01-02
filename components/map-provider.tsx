'use client';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';
const libraries = ['places', 'drawing', 'geometry'];

export function MapProvider({ children }: { children: ReactNode }) {

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  if(loadError) return <div className='bg-forestgreen'><p className='text-black'>Encountered error while loading google maps</p></div>

  if(!scriptLoaded) return <div className='bg-forestgreen'><svg className='animate-spin z-10 h-5 w-5 mr-3 fill-white text-black' viewBox='0 0 24 24'>Loading Map...</svg></div>

  return children;
}