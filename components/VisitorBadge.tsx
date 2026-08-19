"use client";

import { useEffect, useState } from 'react';
import { getVisitorInfo, VisitorLevel } from '../utils/visitor';

const LEVEL_META: Record<VisitorLevel, { label: string; cls: string }> = {
  admin: { label: '管理员', cls: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30' },
  vip: { label: '授权访客', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' },
  normal: { label: '普通访客', cls: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-400/30' },
};

export default function VisitorBadge() {
  const [info, setInfo] = useState<{ id: string; level: VisitorLevel } | null>(null);

  useEffect(() => {
    getVisitorInfo().then(setInfo).catch(() => {});
  }, []);

  if (!info) return null;

  const meta = LEVEL_META[info.level];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${meta.cls}`}>
      <span>🪪 {info.id}</span>
      <span className="opacity-70">·</span>
      <span>{meta.label}</span>
    </div>
  );
}
