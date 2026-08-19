import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from '../../siteConfig';

export const dynamic = 'force-static';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export async function GET() {
  const items: string[] = [];

  const collect = (dir: string, type: 'post' | 'chatter') => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));
    files.forEach((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dirPath, f), 'utf8'));
      const slug = f.replace(/\.md$/, '');
      const title = data.title || slug;
      const date = new Date(data.date || Date.now()).toUTCString();
      const base = type === 'post' ? 'posts' : 'chatter';
      const link = `${siteConfig.url}/${base}/${slug}`;
      const desc = stripHtml(content).slice(0, 300);
      items.push(
        `    <item>\n` +
        `      <title>${escapeXml(title)}</title>\n` +
        `      <link>${escapeXml(link)}</link>\n` +
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>\n` +
        `      <pubDate>${date}</pubDate>\n` +
        `      <description>${escapeXml(desc)}</description>\n` +
        `    </item>`
      );
    });
  };

  collect('posts', 'post');
  collect('chatters', 'chatter');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${escapeXml(siteConfig.title)}</title>\n` +
    `    <link>${escapeXml(siteConfig.url)}</link>\n` +
    `    <description>${escapeXml(siteConfig.bio)}</description>\n` +
    `    <language>zh-cn</language>\n` +
    `    <atom:link href="${escapeXml(siteConfig.url)}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
    items.join('\n') + '\n' +
    `  </channel>\n` +
    `</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}