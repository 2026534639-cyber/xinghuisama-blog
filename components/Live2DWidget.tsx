"use client";

import { useEffect } from "react";

export default function Live2DWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.__live2dInited || w.__waifuLoading) return;
    if (document.getElementById("waifu")) return;
    w.__waifuLoading = true;

    let sleepTimer: ReturnType<typeof setTimeout> | null = null;
    let sleeping = false;
    let lastMoveTs = 0;
    const model = () => w.__live2dModel;
    const goSleep = () => {
      if (!sleeping) {
        sleeping = true;
        model()?.stop?.();
      }
    };
    const wake = () => {
      if (sleeping) {
        sleeping = false;
        model()?.run?.();
      }
      if (sleepTimer) clearTimeout(sleepTimer);
      sleepTimer = setTimeout(goSleep, 4000);
    };
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTs < 100) return;
      lastMoveTs = now;
      const el = document.getElementById("waifu");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (
        e.clientX >= r.left - 60 && e.clientX <= r.right + 60 &&
        e.clientY >= r.top - 60 && e.clientY <= r.bottom + 60
      ) {
        wake();
      }
    };
    const onVis = () => {
      if (document.hidden) {
        if (sleepTimer) clearTimeout(sleepTimer);
        goSleep();
      } else {
        wake();
      }
    };

    if (!document.querySelector('link[href="/live2d/lib/waifu.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/live2d/lib/waifu.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = "/live2d/lib/waifu-tips.js";
    script.onload = () => {
      if (w.__live2dInited || document.getElementById("waifu")) return;
      w.initWidget?.({
        cdnPath: "/live2d/",
        cubism5Path: "/live2d/lib/live2dcubismcore.min.js",
        waifuPath: "/live2d/waifu-tips.json",
        logLevel: "error",
        drag: true,
      });
      w.__live2dInited = true;
      sleepTimer = setTimeout(goSleep, 4000);
      document.addEventListener("mousemove", onMove);
      document.addEventListener("visibilitychange", onVis);
    };
    document.head.appendChild(script);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      if (sleepTimer) clearTimeout(sleepTimer);
    };
  }, []);

  return null;
}