// Cloudflare Pages Functions: 访客聚合查询
// GET /api/visits?period=day|week|month|year
// 返回：总访问、独立访客(IP去重)、设备分布、每日趋势、最近100条明细
export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    if (!env.VISITS) {
      return new Response(
        JSON.stringify({ ok: false, err: 'VISITS_KV_NOT_BOUND' }),
        { status: 503, headers: { 'content-type': 'application/json' } }
      );
    }

    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'day';
    const days = { day: 1, week: 7, month: 31, year: 365 }[period] || 1;

    const result = {
      ok: true,
      period,
      days,
      total: 0,
      uniqueVisitors: 0,
      devices: { mobile: 0, desktop: 0, tablet: 0 },
      networks: { wifi: 0, cellular: 0, ethernet: 0, unknown: 0 },
      models: {},
      cities: {},
      daily: [],
      recent: [],
    };

    const now = Date.now() + 8 * 3600 * 1000;
    const all = [];
    for (let i = 0; i < days; i++) {
      const dayKey = new Date(now - i * 86400000).toISOString().slice(0, 10);
      const raw = await env.VISITS.get('d:' + dayKey);
      if (!raw) continue;
      const arr = JSON.parse(raw);
      result.daily.push({ date: dayKey, count: arr.length });
      all.push(...arr);
    }
    result.daily.reverse();

    const idSet = new Set();
    const ipSet = new Set();
    for (const v of all) {
      result.total++;
      if (v.ip) ipSet.add(v.ip);
      if (v.visitorId) idSet.add(v.visitorId);
      const dv = v.device || 'desktop';
      result.devices[dv] = (result.devices[dv] || 0) + 1;
      const nw = v.network || 'unknown';
      result.networks[nw] = (result.networks[nw] || 0) + 1;
      if (dv === 'mobile' && v.deviceModel) {
        result.models[v.deviceModel] = (result.models[v.deviceModel] || 0) + 1;
      }
      if (v.city) {
        result.cities[v.city] = (result.cities[v.city] || 0) + 1;
      }
    }
    // 独立访客：优先按编号去重（编号更准），老数据无编号时退化为 IP
    result.uniqueVisitors = idSet.size > 0 ? idSet.size : ipSet.size;

    all.sort((a, b) => b.t - a.t);
    result.recent = all
      .slice(0, 100)
      .map((v) => ({ t: v.t, ip: v.ip, city: v.city, visitorId: v.visitorId, device: v.device, deviceModel: v.deviceModel, network: v.network, path: v.path }));

    return new Response(JSON.stringify(result), {
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, err: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}