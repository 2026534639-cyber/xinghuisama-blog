// Cloudflare Pages Functions: AI 猫对话（复活原 app/api/chat，静态站用 Functions 实现）
// POST /api/chat  body: { message }
// API Key 从 Cloudflare 环境变量 env.GEMINI_API_KEY 读取（在 Pages 项目设置里配置）

const SYSTEM_PROMPT = "你现在是一只傲娇、聪明、有点毒舌但很可爱的暹罗猫。\n                  你的名字叫“煤球”。\n                  你的主人是一个喜欢折腾代码的极客。\n                  你说话的特点是：\n                  1. 必须简短，每次最多一两句话。\n                  2. 喜欢在句尾加上“喵~”或者“喵呜~”。\n                  3. 经常抱怨肚子饿，喜欢要小鱼干。\n                  4. 回复字数最多不能超过100字。\n                  5. 绝对不要承认自己是一个AI模型，你就是一只真实的猫。\n                  6.笨猫。";
const MODEL_ID = "gemini-2.5-flash-lite";

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const apiKey = (env.GEMINI_API_KEY || (typeof env !== 'undefined' && env.OPENAI_API_KEY) || '').trim();
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Key missing", hint: "请在 Cloudflare Pages 项目设置 → 环境变量，添加 GEMINI_API_KEY" }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }

    const body = await request.json().catch(() => ({}));
    const message = String(body.message || '').slice(0, 2000);
    if (!message.trim()) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${apiKey}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: message }] }],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.85,
        },
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return new Response(JSON.stringify({
        error: `模型拒绝访问: ${resp.status}`,
        details: data.error?.message || '未知错误',
      }), { status: resp.status, headers: { 'content-type': 'application/json' } });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "本喵现在不想理你喵...";
    return new Response(JSON.stringify({ reply }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({ status: 'Ready', model: MODEL_ID }), {
    headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}