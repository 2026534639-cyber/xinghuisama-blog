'use client';

import { useEffect } from 'react';
import { getOrCreateVisitorId } from '../utils/visitor';

// 页面加载时上报访客记录（IP/型号由服务端识别，编号/网络类型客户端采集）
// 同标签页会话内同一路径只上报一次，避免刷新刷屏
function detectNetwork(): string {
  try {
    const nav: any = navigator;
    if (nav.connection && nav.connection.type) {
      const t = nav.connection.type;
      if (t === 'wifi' || t === 'ethernet') return 'wifi';
      if (t === 'cellular') return 'cellular';
      return 'unknown';
    }
    return 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

export default function VisitorReporter() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const key = 'vst_' + window.location.pathname;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
      const visitorId = getOrCreateVisitorId();
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          visitorId,
          network: detectNetwork(),
        }),
        keepalive: true,
      }).catch(() => {});
    } catch (e) {}
  }, []);
  return null;
}