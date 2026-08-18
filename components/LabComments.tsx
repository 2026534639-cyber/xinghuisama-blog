"use client";

import TwikooComments from './TwikooComments';

export default function LabComments({ pageId }: { pageId?: string }) {
  return <TwikooComments path={pageId} />;
}
