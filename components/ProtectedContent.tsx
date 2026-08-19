"use client";

import { useEffect, useState } from 'react';
import { getVisitorInfo, VisitorLevel } from '../utils/visitor';
import { LockKeyhole } from 'lucide-react';

// 🌟 隐藏文章正文守卫：只有 admin / 授权访客 才能看到正文，
//    普通访客显示"仅授权访客可见"占位。
export default function ProtectedContent({ contentHtml }: { contentHtml: string }) {
  const [state, setState] = useState<'loading' | 'allowed' | 'denied'>('loading');

  useEffect(() => {
    getVisitorInfo().then((info) => {
      setState(info.level === 'admin' || info.level === 'vip' ? 'allowed' : 'denied');
    }).catch(() => setState('denied'));
  }, []);

  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center py-24 animate-pulse">
        <LockKeyhole className="text-indigo-500 w-8 h-8" />
        <span className="ml-3 font-black text-slate-500 tracking-widest text-sm">校验访问权限中...</span>
      </div>
    );
  }

  if (state === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4 rounded-3xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
          <LockKeyhole className="text-indigo-500 w-7 h-7" />
        </div>
        <div>
          <p className="text-lg font-black text-slate-800 dark:text-slate-200">此内容仅对授权访客可见</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">只有站长标记的访客编号才能查看本文</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="article-content"
      className="prose prose-slate dark:prose-invert prose-base md:prose-lg max-w-none text-slate-800 dark:text-slate-200 transition-colors duration-700 scroll-smooth"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
