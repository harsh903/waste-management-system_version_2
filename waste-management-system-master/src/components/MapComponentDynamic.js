'use client';

import dynamic from 'next/dynamic';

// Dynamically load the MapComponent with no SSR
const MapComponentNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-lg flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
  )
});

export default function MapComponent() {
  return <MapComponentNoSSR />;
}