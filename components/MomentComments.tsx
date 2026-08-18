"use client";

import TwikooComments from './TwikooComments';

interface MomentCommentsProps {
  id: string; // 必须传入说说的专属 ID
}

export default function MomentComments({ id }: MomentCommentsProps) {
  return <TwikooComments path={id} />;
}