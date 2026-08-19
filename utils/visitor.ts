"use client";

// =========================================================
// 🪪 访客编号系统 - 前端工具
// 给每个访客分配一个唯一编号（存 localStorage），
// 并依据 public/visitors.json 判断该编号的权限级别。
// =========================================================

const STORAGE_KEY = "fall07_visitor_id";

// 生成一个不依赖服务器的唯一访客编号：V- 后接 8 位随机 hex
function generateVisitorId(): string {
  let hex = "";
  const chars = "0123456789abcdef";
  for (let i = 0; i < 8; i++) hex += chars[Math.floor(Math.random() * chars.length)];
  return "V-" + hex;
}

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = generateVisitorId();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return generateVisitorId();
  }
}

export type VisitorLevel = "admin" | "vip" | "normal";

let cache: { id: string; level: VisitorLevel } | null = null;

export async function getVisitorInfo(): Promise<{ id: string; level: VisitorLevel }> {
  const id = getOrCreateVisitorId();
  if (cache && cache.id === id) return cache;
  let level: VisitorLevel = "normal";
  try {
    const res = await fetch(`/visitors.json?t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      const adminList: string[] = data.admin || [];
      const vipList: string[] = data.vip || [];
      if (adminList.includes(id)) level = "admin";
      else if (vipList.includes(id)) level = "vip";
    }
  } catch {
    // 拉取失败按普通访客处理
  }
  cache = { id, level };
  return { id, level };
}
