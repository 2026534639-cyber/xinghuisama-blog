"use client";

import { useEffect, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const BackgroundEffectsLazy = dynamic(() => import('./BackgroundEffects'), { ssr: false });
const CyberCatLazy = dynamic(() => import('./CyberCat'), { ssr: false });
const ClickEffectLazy = dynamic(() => import('./ClickEffect'), { ssr: false });
const FloatingPlayerLazy = dynamic(() => import('./FloatingPlayer'), { ssr: false });
const GlobalToolboxLazy = dynamic(() => import('./GlobalToolbox'), { ssr: false });

export default function LazyDecorations({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {children}
      {mounted && (
        <>
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <BackgroundEffectsLazy />
          </div>
          <div className="hidden md:block">
            <FloatingPlayerLazy />
          </div>
          <div className="hidden md:block">
            <GlobalToolboxLazy />
          </div>
          <div className="hidden md:block">
            <ClickEffectLazy />
          </div>
          <div className="hidden md:block">
            <CyberCatLazy />
          </div>
        </>
      )}
    </>
  );
}
