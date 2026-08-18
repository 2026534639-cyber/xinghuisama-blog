"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import twikoo from 'twikoo';

interface TwikooCommentsProps {
  path?: string;
}

export default function TwikooComments({ path }: TwikooCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const inited = useRef(false);

  useEffect(() => {
    if (!containerRef.current || inited.current) return;

    twikoo.init({
      envId: 'blog-d7ggjp03sb503b09f',
      el: containerRef.current,
      path: path || pathname,
      onCommentLoaded: () => {
        console.log('评论加载完成');
      },
    });

    inited.current = true;
  }, [pathname, path]);

  return (
    <div className="w-full mt-16 relative">
      {/* 底部光晕 */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none z-0"></div>

      {/* Twikoo 容器 */}
      <div ref={containerRef} className="relative z-10 pt-6 border-t border-slate-200/50 dark:border-slate-700/50" />

      {/* 毛玻璃样式 */}
      <style jsx global>{`
        .tk-submit {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 16px !important;
          transition: all 0.3s ease;
        }
        .tk-submit:focus-within {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: #6366f1 !important;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3) !important;
        }
        .tk-submit .el-textarea__inner {
          background: transparent !important;
          border: none !important;
          color: inherit !important;
          box-shadow: none !important;
        }
        .tk-submit .el-button--primary {
          background: #6366f1 !important;
          border: none !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
          transition: transform 0.2s, box-shadow 0.2s;
          color: white !important;
        }
        .tk-submit .el-button--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6) !important;
        }
        .tk-comment {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 16px !important;
          padding: 16px !important;
          margin-top: 12px !important;
        }
        .tk-comment .tk-avatar {
          border-radius: 50% !important;
          overflow: hidden;
        }
        .tk-comment .tk-nick {
          color: #6366f1 !important;
          font-weight: bold !important;
        }
        .tk-comment .tk-content {
          color: inherit !important;
        }
        .tk-comment .tk-time {
          color: #94a3b8 !important;
        }
        .dark .tk-submit {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .dark .tk-comment {
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </div>
  );
}
