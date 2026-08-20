"use client";

import { useEffect, useState } from 'react';
import { siteConfig } from '../siteConfig';

interface DanmakuItem {
  id: number;
  text: string;
  top: number;
  duration: number;
  delay: number;
}

export default function DanmakuBackground() {
  const [danmakus, setDanmakus] = useState<DanmakuItem[]>([]);
  const danmakuList = siteConfig.danmakuList || [];

  useEffect(() => {
    if (danmakuList.length === 0) return;

    const generatedDanmakus: DanmakuItem[] = [];
    const count = 2;

    for (let i = 0; i < count; i++) {
      generatedDanmakus.push({
        id: i,
        text: danmakuList[Math.floor(Math.random() * danmakuList.length)],
        top: Math.random() * 80 + 10,
        duration: Math.random() * 20 + 25,
        delay: Math.random() * 20,
      });
    }
    setDanmakus(generatedDanmakus);
  }, []);

  return (
    <div className="fixed top-28 h-[30vh] left-0 right-0 overflow-hidden pointer-events-none z-0">
      {danmakus.map((item) => (
        <div
          key={item.id}
          className="absolute whitespace-nowrap text-white/30 dark:text-white/10 font-bold text-lg tracking-wider select-none"
          style={{
            top: `${item.top}%`,
            left: '0',
            animation: `float-left ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {item.text}
        </div>
      ))}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-left {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
      `}} />
    </div>
  );
}
