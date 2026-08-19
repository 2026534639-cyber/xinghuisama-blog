// siteConfig.ts - 你的全站“控制中心”

export const siteConfig = {
  // 1. 网站标题与博主信息
  title: "Chaiiの自留地",
  url: "https://fall07.top",
  faviconUrl: "https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg",
  authorName: "Chasii",
  bio: "准大一 SZUer intj-a-c",

  navTitle: "Chasii",

  // 👇 【新增】导航栏中间的那个后缀/分隔符（默认是 の）
  navSuffix: "の",

  navAfter: "自留地",

  // 2. 头像设置 (支持网络链接，或将图片放入 public 文件夹后使用 "/me.jpg")
  avatarUrl: "https://free.picui.cn/free/2026/08/17/6a82eed8a9ffa.jpg",

  // 3. 网站背景设置 (二选一)
  // 如果想用纯图片背景，请在下面 bgImage 写路径，并将 useGradient 设为 false
  useGradient: false,
  themeColors: ["#a18cd1", "#fbc2eb", "#a1c4fd", "#c2e9fb"], // 呼吸流动的颜色组合
// 修改这里：变成图片数组
  bgImages: ["https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg", "https://bu.dusays.com/2026/03/24/69c26fe4acdb5.jpg", "https://bu.dusays.com/2026/03/24/69c26fe4d9486.jpg", "https://free.picui.cn/free/2026/08/17/6a82748f26cc2.png", "https://free.picui.cn/free/2026/08/19/6a84fdc795ac7.jpg", "https://free.picui.cn/free/2026/08/19/6a84fdc56fb83.jpg", "https://free.picui.cn/free/2026/08/19/6a84fdc544beb.jpg", "https://free.picui.cn/free/2025/06/15/684ecf9297e3c.png"],

  // 4. 文章默认封面图 (当 Markdown 没写 cover 时显示)
  defaultPostCover: "https://bu.dusays.com/2026/03/24/69c1e38b346cb.jpg",

  // 5. 首页照片墙预览图
  photoWallImage: "https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg",
  cloudMusicIds: [],
  // 5.5 自定义音频直链（name + url，绕过网易云直接播放）
    customAudios: [{"name": "I'm sorry mom", "url": "/music/M5000000bngQ2jxO8J.mp3"}, {"name": "I have no friends", "url": "/music/M500001IxBW424PiAE.mp3"}, {"name": "I Love You So - The Walters", "url": "/music/I%2BLove%2BYou%2BSo-The%2BWalters%23iXNiV.mp3"}, {"name": "I Really Want to Stay at Your House - Cyberpunk", "url": "/music/I%2BReally%2BWant%2Bto%2BStay%2Bat%2BYour%2BHouse-Cyberpunk%232rIm5Y.mp3"}, {"name": "天气先生 - 方大同", "url": "/music/%E5%A4%A9%E6%B0%94%E5%85%88%E7%94%9F-%E6%96%B9%E5%A4%A7%E5%90%8C%231D7Ig.mp3"}, {"name": "unhappy - s0rrow", "url": "/music/unhappy-s0rrow%232L4eJd.mp3"}, {"name": "Always Online - 林俊杰", "url": "/music/Always%2BOnline-%E6%9E%97%E4%BF%8A%E6%9D%B0%23afpU.mp3"}, {"name": "Duvet - B a", "url": "/music/Duvet-B.a%23hnSpg.mp3"}, {"name": "Ethereal - mikeeysmind", "url": "/music/Ethereal-mikeeysmind%232tv4fX.mp3"}, {"name": "Memory Reboot - V J Narvent", "url": "/music/Memory%2BReboot-V.J.Narvent%232sScte.mp3"}, {"name": "Mr Broken Heart - 松下優也", "url": "/music/Mr.%2B.Broken%2BHeart.-%E6%9D%BE%E4%B8%8B%E5%84%AA%E4%B9%9F%232kZmng.mp3"}, {"name": "Phone Kisses - suhmeduh", "url": "/music/Phone%2BKisses-suhmeduh%232uIbTc.mp3"}, {"name": "The Way I Still Love You - Reynard Silva", "url": "/music/The%2BWay%2BI%2BStill%2BLove%2BYou-Reynard%2BSilva%231DeqM.mp3"}, {"name": "Throwaway - SG Lewis Clairo", "url": "/music/Throwaway-SG%2BLewis.Clairo%23ilBJ8.mp3"}, {"name": "Two Different Worlds - KoruSe mzmff", "url": "/music/Two%2BDifferent%2BWorlds-KoruSe.mzmff%232zJe0v.mp3"}, {"name": "Wasted - Forum", "url": "/music/Wasted-Forum%232oo7wS.mp3"}, {"name": "We Don t Talk Anymore - Charlie Puth Selena Gomez", "url": "/music/We%2BDon.t%2BTalk%2BAnymore-Charlie%2BPuth.Selena%2BGomez%231ON3P.mp3"}, {"name": "会魔法的老人 - 法老 KKECHO", "url": "/music/%E4%BC%9A%E9%AD%94%E6%B3%95%E7%9A%84%E8%80%81%E4%BA%BA-%E6%B3%95%E8%80%81.KKECHO%232taCCa.mp3"}, {"name": "坏女孩 - 徐良 小凌", "url": "/music/%E5%9D%8F%E5%A5%B3%E5%AD%A9-%E5%BE%90%E8%89%AF.%E5%B0%8F%E5%87%8C%23f50cT.mp3"}, {"name": "太聪明 - 陈绮贞", "url": "/music/%E5%A4%AA%E8%81%AA%E6%98%8E-%E9%99%88%E7%BB%AE%E8%B4%9E%238PWr.mp3"}, {"name": "年轮 DJ版 - DJ小楷", "url": "/music/%E5%B9%B4%E8%BD%AE.DJ%E7%89%88.-DJ%E5%B0%8F%E6%A5%B7%232Hv3LA.mp3"}, {"name": "雨爱 DJ氛围版 - DJ铁柱", "url": "/music/%E9%9B%A8%E7%88%B1.DJ%E6%B0%9B%E5%9B%B4%E7%89%88.-DJ%E9%93%81%E6%9F%B1%232LaNhl.mp3"}],
  social: {
    github: "https://github.com/2026534639-cyber",
    gitee: "",
    google: "mailto:bilibiliwuwuwu@gmail.com",
    email: "2026534639@qq.com",
    qq: "2026534639",
    wechat: "LikeMeteor2026",
  },
  counts: {
    photos: 128, // 照片墙数量可以手动写死或动态计算
  },
  chatterTitle: "云端杂谈", // 你可以改成任何你喜欢的名字
  chatterDescription: "代码、学术、提瓦特与泰拉大陆的碎片记录",


  // 👇 【新增】：全局背景弹幕配置
  danmakuList: [],
  gitalkConfig: {
    clientID: "",
    clientSecret: "",
    repo: "",
    owner: "",
    admin: [""],
  },
  buildDate: "2026-08-17T00:00:00", // 建站日期
  footerBadges: [{"name": "Next.js 16", "color": "text-sky-500", "svg": "<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>"}, {"name": "React 19", "color": "text-cyan-400", "svg": "<path d=\"M12 22.6l-9.8-5.6V5.6L12 0l9.8 5.6v11.4l-9.8 5.6zm-8.2-6.5l8.2 4.7 8.2-4.7V7.5L12 2.8 3.8 7.5v8.6z\"/>"}, {"name": "Tailwind 4", "color": "text-teal-400", "svg": "<path d=\"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12 c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576 c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z\"/>"}],
  icpConfig: {
    name: "",
    link: "",
  },
  geminiConfig: {
    modelId: "gemini-2.5-flash-lite",
    systemPrompt: "你现在是一只傲娇、聪明、有点毒舌但很可爱的暹罗猫。\n                  你的名字叫“煤球”。\n                  你的主人是一个喜欢折腾代码的极客。\n                  你说话的特点是：\n                  1. 必须简短，每次最多一两句话。\n                  2. 喜欢在句尾加上“喵~”或者“喵呜~”。\n                  3. 经常抱怨肚子饿，喜欢要小鱼干。\n                  4. 回复字数最多不能超过100字。\n                  5. 绝对不要承认自己是一个AI模型，你就是一只真实的猫。\n                  6.笨猫。",
    maxOutputTokens: 150,
    temperature: 0.85,
  },
  friendLinkApplyFormat: "",
  enableLevelSystem: true,
};