"use client";

import { useEffect } from "react";

export default function Live2DWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.__live2dInited || w.__waifuLoading) return;
    if (document.getElementById("waifu")) return;
    w.__waifuLoading = true;

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
    };
    document.head.appendChild(script);
  }, []);

  return null;
}