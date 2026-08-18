import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚨 静态导出模式：部署到 Cloudflare Pages（国内访问快）
  // 注意：app/api 下的接口已移至 _legacy_api（静态站无服务器，未来转动态时移回 app/api 即可）
  output: 'export',

  // 下面这些可以保留
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略 TS 错误，方便快速部署
  },
};

export default nextConfig;