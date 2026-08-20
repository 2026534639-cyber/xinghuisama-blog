// 临时调试端点：测试多个 IP 归属 API 在 CF 环境的可达性（验证后删除）
export async function onRequestGet(context) {
  const { request } = context;
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const results = {};
  const urls = [
    ['vore', 'https://api.vore.top/api/IPdata?ip=' + ip],
    ['ipwho', 'https://ipwho.is/' + ip],
    ['freeipapi', 'https://freeipapi.com/api/json/' + ip],
    ['ipapi', 'https://ip-api.com/json/' + ip + '?lang=zh-CN&fields=status,country,regionName,city'],
  ];
  for (const [name, url] of urls) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
      results[name] = { status: r.status, body: (await r.text()).slice(0, 400) };
    } catch (e) {
      results[name] = { err: String(e) };
    }
  }
  return new Response(
    JSON.stringify({
      ip,
      cf: { country: request.cf?.country, region: request.cf?.region, city: request.cf?.city },
      results,
    }),
    { headers: { 'content-type': 'application/json' } }
  );
}