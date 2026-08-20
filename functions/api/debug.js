// 临时调试端点：查看 request.cf 地理信息字段（验证后删除）
export async function onRequestGet(context) {
  const { request, env } = context;
  return new Response(JSON.stringify({ cf: request.cf || null }), {
    headers: { 'content-type': 'application/json' },
  });
}