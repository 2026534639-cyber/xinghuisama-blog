'use client';

import { useEffect } from 'react';

let scriptInjected = false;

const PV_IDS = ['busuanzi_value_page_pv', 'busuanzi_value_site_uv', 'busuanzi_value_site_pv'];

export default function BusuanziLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    const doneKey = 'bsz_done_' + path;

    const applyCached = () => {
      try {
        const map = JSON.parse(sessionStorage.getItem('bsz_cache') || '{}');
        PV_IDS.forEach((id) => {
          const el = document.getElementById(id);
          if (el && map[id]) el.textContent = map[id];
        });
      } catch (e) {}
    };

    if (sessionStorage.getItem(doneKey)) {
      applyCached();
      return;
    }

    if (scriptInjected) return;
    scriptInjected = true;

    const s = document.createElement('script');
    s.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    s.async = true;
    s.onload = () => {
      setTimeout(() => {
        try {
          const map: Record<string, string> = {};
          PV_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (el && el.textContent) map[id] = el.textContent;
          });
          sessionStorage.setItem('bsz_cache', JSON.stringify(map));
          sessionStorage.setItem(doneKey, '1');
        } catch (e) {}
      }, 2500);
    };
    document.head.appendChild(s);
  }, []);

  return null;
}