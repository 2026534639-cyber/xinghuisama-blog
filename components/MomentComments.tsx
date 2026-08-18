"use client";

import TwikooComments from './TwikooComments';

interface MomentCommentsProps {
  id: string;
}

export default function MomentComments({ id }: MomentCommentsProps) {
  return <TwikooComments path={id} />;
}
