"use client";

import TwikooComments from './TwikooComments';

interface LabCommentsProps {
  pageId?: string; // 必须传入工作台的专属 ID
}

// 🌟 专门为炼金实验室定制的评论组件（Twikoo），不影响原有的 Comments.tsx
export default function LabComments({ pageId }: LabCommentsProps) {
  return <TwikooComments path={pageId} />;
}