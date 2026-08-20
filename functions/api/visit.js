// Cloudflare Pages Functions: 访客上报
// POST /api/visit  body: { path, visitorId, network }
// 记录 IP、访客编号、设备类型/型号、网络类型、时间、路径，按天存 KV（key: d:YYYY-MM-DD）
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.VISITS) {
      return new Response(
        JSON.stringify({ ok: false, err: 'VISITS_KV_NOT_BOUND' }),
        { status: 503, headers: { 'content-type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const ip = (request.headers.get('CF-Connecting-IP') || '').slice(0, 64);
    const ua = (request.headers.get('User-Agent') || '').slice(0, 300);
    const ref = (request.headers.get('Referer') || '').slice(0, 300);
    const device = /iPad|Tablet/i.test(ua)
      ? 'tablet'
      : (/Mobile|Android|iPhone|iPod/i.test(ua) ? 'mobile' : 'desktop');

    // 手机型号解析（轻量正则，够用即可）
    let deviceModel = '';
    if (device === 'mobile') {
      const iphone = ua.match(/iPhone[^;)]*/i);
      if (iphone) {
        deviceModel = 'iPhone';
      } else {
        const android = ua.match(/Android [\d.]+; ([^;)]+)/i);
        if (android) deviceModel = android[1].trim();
      }
    }

    const t = Date.now();
    const path = String(body.path || '/').slice(0, 200);
    const visitorId = String(body.visitorId || '').slice(0, 32);
    const network = ['wifi', 'cellular', 'ethernet', 'unknown'].includes(body.network)
      ? body.network
      : 'unknown';

    // 东八区日期
    const dayKey = 'd:' + new Date(t + 8 * 3600 * 1000).toISOString().slice(0, 10);

    const prev = await env.VISITS.get(dayKey);
    const arr = prev ? JSON.parse(prev) : [];
    arr.push({ t, ip, visitorId, device, deviceModel, network, path, ref });
    while (arr.length > 20000) arr.shift();
    await env.VISITS.put(dayKey, JSON.stringify(arr));

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, err: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}