import 'katex/dist/katex.min.css';
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { MusicProvider } from "../components/MusicProvider";
import { siteConfig } from "../siteConfig";
import BackgroundSlider from "../components/BackgroundSlider";
import SplashScreen from "../components/SplashScreen";
import MobileBackButton from '../components/MobileBackButton';
import LazyDecorations from '../components/LazyDecorations';
// 弹幕组件（保留，以后需要弹幕时取消注释并往 siteConfig.danmakuList 填内容即可）
// import DanmakuBackground from '../components/DanmakuBackground';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.bio,
  icons: {
    icon: siteConfig.faviconUrl,
    apple: siteConfig.faviconUrl,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: siteConfig.title }],
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.bio,
    images: [{ url: siteConfig.avatarUrl, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.bio,
    images: [siteConfig.avatarUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              #app-mount-root { opacity: 0; visibility: hidden; pointer-events: none; }
              html.splash-seen #app-mount-root { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
            `
          }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('hasSeenSplash') === 'true') {
                  document.documentElement.classList.add('splash-seen');
                }
              } catch (e) {}
            `
          }}
        />
        <script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
      </head>

      <body className="w-screen overflow-x-hidden min-h-full flex flex-col relative transition-colors duration-1000 bg-slate-50 dark:bg-slate-950 font-serif">
        <ThemeProvider>

          <SplashScreen />

          <MusicProvider>
            <div id="app-mount-root" className="flex-1 flex flex-col transition-opacity duration-1000">
              <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
                {!siteConfig.useGradient && <BackgroundSlider />}
                <div className="absolute inset-0 z-[-9] bg-white/60 dark:bg-slate-900/70 transition-colors duration-1000"></div>

                <div
                  className="absolute inset-0 z-[-8] opacity-60 dark:opacity-20 transition-opacity duration-1000 transform-gpu"
                  style={{
                    background: `linear-gradient(-45deg, ${siteConfig.themeColors.join(', ')})`,
                    backgroundSize: '400% 400%'
                  }}
                ></div>

                <div
                  className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full z-[-7] [--glow1:rgba(255,255,255,0.4)] dark:[--glow1:rgba(49,46,129,0.5)]"
                  style={{ background: 'radial-gradient(circle, var(--glow1), transparent 70%)' }}
                ></div>
                <div
                  className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full z-[-7] [--glow2:rgba(129,140,248,0.35)] dark:[--glow2:rgba(88,28,135,0.4)]"
                  style={{ background: 'radial-gradient(circle, var(--glow2), transparent 70%)' }}
                ></div>
              </div>

              <LazyDecorations>
                <div className="relative z-10 flex-1 flex flex-col">
                  {children}
                </div>
              </LazyDecorations>

              {/* 弹幕挂载位（保留，以后需要弹幕时取消注释即可） */}
              {/* <DanmakuBackground /> */}

              <div className="md:hidden block">
                <MobileBackButton />
              </div>
            </div>

            <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
              @keyframes gradientMove { 
                0% { transform: translateX(0) translateY(0); } 
                25% { transform: translateX(-12.5%) translateY(-12.5%); } 
                50% { transform: translateX(-25%) translateY(0); } 
                75% { transform: translateX(-12.5%) translateY(12.5%); } 
                100% { transform: translateX(0) translateY(0); } 
              }
            `}} />
          </MusicProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
