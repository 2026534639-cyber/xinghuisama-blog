"use client";

import { useEffect } from "react";

export default function Live2DWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).__live2dInited) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/live2d/lib/waifu.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.type = "module";
    script.src = "/live2d/lib/waifu-tips.js";
    script.onload = () => {
      (window as any).initWidget?.({
        cdnPath: "/live2d/",
        cubism5Path: "/live2d/lib/live2dcubismcore.min.js",
        waifuPath: "/live2d/waifu-tips.json",
        logLevel: "error",
        drag: true,
      });
      (window as any).__live2dInited = true;
    };
    document.head.appendChild(script);
  }, []);

  return null;
}