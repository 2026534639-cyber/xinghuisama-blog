// Cloudflare Pages Functions: 访客上报
// POST /api/visit  body: { path, visitorId, network }
// 记录 IP、城市（Cloudflare 原生地理信息 + 内置中文翻译表）、访客编号、
// 设备类型/型号、网络类型、时间、路径，按天存 KV（key: d:YYYY-MM-DD）

// 省份英→中（34 省级行政区）
const REGION_ZH = {
  Beijing: '北京', Shanghai: '上海', Tianjin: '天津', Chongqing: '重庆',
  Guangdong: '广东', Zhejiang: '浙江', Jiangsu: '江苏', Fujian: '福建',
  Shandong: '山东', Sichuan: '四川', Hubei: '湖北', Hunan: '湖南',
  Henan: '河南', Hebei: '河北', Liaoning: '辽宁', Jilin: '吉林',
  Heilongjiang: '黑龙江', Anhui: '安徽', Jiangxi: '江西', Guangxi: '广西',
  Yunnan: '云南', Guizhou: '贵州', Shaanxi: '陕西', Gansu: '甘肃',
  Qinghai: '青海', Ningxia: '宁夏', Xinjiang: '新疆', Tibet: '西藏',
  'Inner Mongolia': '内蒙古', Shanxi: '山西', Hainan: '海南',
  Taiwan: '台湾', 'Hong Kong': '香港', Macau: '澳门',
};
const CITY_ZH = {
  Guangzhou: '广州', Shenzhen: '深圳', Beijing: '北京', Shanghai: '上海',
  Hangzhou: '杭州', Chengdu: '成都', Wuhan: '武汉', Nanjing: '南京',
  Suzhou: '苏州', "Xi'an": '西安', Changsha: '长沙', Zhengzhou: '郑州',
  Qingdao: '青岛', Dalian: '大连', Xiamen: '厦门', Fuzhou: '福州',
  Jinan: '济南', Hefei: '合肥', Nanchang: '南昌', Kunming: '昆明',
  Guiyang: '贵阳', Nanning: '南宁', Haikou: '海口', Shijiazhuang: '石家庄',
  Taiyuan: '太原', Hohhot: '呼和浩特', Shenyang: '沈阳', Changchun: '长春',
  Harbin: '哈尔滨', Lanzhou: '兰州', Xining: '西宁', Yinchuan: '银川',
  Urumqi: '乌鲁木齐', Lhasa: '拉萨', Ningbo: '宁波', Wenzhou: '温州',
  Dongguan: '东莞', Foshan: '佛山', Zhuhai: '珠海', Zhongshan: '中山',
  Huizhou: '惠州', Shantou: '汕头', Quanzhou: '泉州', Wuxi: '无锡',
  Changzhou: '常州', Nantong: '南通', Xuzhou: '徐州', Yangzhou: '扬州',
  Yantai: '烟台', Weihai: '威海', Zibo: '淄博', Tangshan: '唐山',
  Baoding: '保定', Luoyang: '洛阳', Guilin: '桂林', Mianyang: '绵阳',
  Zunyi: '遵义', Weifang: '潍坊', Linyi: '临沂', Handan: '邯郸',
  Baoji: '宝鸡', Wuhu: '芜湖', Jiujiang: '九江', Nanchong: '南充',
  Jingzhou: '荆州', Yichang: '宜昌', Xiangyang: '襄阳', Xianyang: '咸阳',
  Zhongshan: '中山', Lianyungang: '连云港', Yancheng: '盐城', Taizhou: '泰州',
  Huzhou: '湖州', Jiaxing: '嘉兴', Shaoxing: '绍兴', Jinhua: '金华',
  Zhoushan: '舟山', Lishui: '丽水', Ganzhou: '赣州', Shangrao: '上饶',
  Nanping: '南平', Sanming: '三明', Putian: '莆田', Longyan: '龙岩',
  Ningde: '宁德', Chaozhou: '潮州', Jieyang: '揭阳', Maoming: '茂名',
  Zhanjiang: '湛江', Jiangmen: '江门', Zhaoqing: '肇庆', Heyuan: '河源',
  Shanwei: '汕尾', Meizhou: '梅州', Yunfu: '云浮', Yangjiang: '阳江',
  Shaoguan: '韶关', Qinzhou: '钦州', Beihai: '北海', Fangchenggang: '防城港',
  Wuzhou: '梧州', Yulin: '玉林', Baise: '百色', Hechi: '河池',
  Laibin: '来宾', Chongzuo: '崇左', Guigang: '贵港', Hezhou: '贺州',
  Changzhi: '长治', Jincheng: '晋城', Shuozhou: '朔州', Yuncheng: '运城',
  Xinzhou: '忻州', Linfen: '临汾', Lvliang: '吕梁', Zhangjiakou: '张家口',
  Chengde: '承德', Qinhuangdao: '秦皇岛', Langfang: '廊坊', Cangzhou: '沧州',
  Hengshui: '衡水', Xingtai: '邢台', Panjin: '盘锦', Yingkou: '营口',
  Fuxin: '阜新', Liaoyang: '辽阳', Tieling: '铁岭', Chaoyang: '朝阳',
  Huludao: '葫芦岛', Benxi: '本溪', Dandong: '丹东', Jinzhou: '锦州',
  Anshan: '鞍山', Fushun: '抚顺', Songyuan: '松原', Baicheng: '白城',
  Siping: '四平', Liaoyuan: '辽源', Tonghua: '通化', Baishan: '白山',
  Yanji: '延吉', Daqing: '大庆', Qiqihar: '齐齐哈尔', Mudanjiang: '牡丹江',
  Jiamusi: '佳木斯', Suihua: '绥化', Hegang: '鹤岗', Shuangyashan: '双鸭山',
  Qitaihe: '七台河', Jixi: '鸡西', Yichun: '伊春', "Daxing'anling": '大兴安岭',
  Chifeng: '赤峰', Tongliao: '通辽', Hulunbuir: '呼伦贝尔', Baotou: '包头',
  Ordos: '鄂尔多斯', Wuhai: '乌海', Bayannur: '巴彦淖尔', Ulanqab: '乌兰察布',
  Xilingol: '锡林郭勒', Alxa: '阿拉善', Jiaozuo: '焦作', Xinxiang: '新乡',
  Anyang: '安阳', Puyang: '濮阳', Hebi: '鹤壁', Shangqiu: '商丘',
  Zhoukou: '周口', Zhumadian: '驻马店', Nanyang: '南阳', Xinyang: '信阳',
  Sanmenxia: '三门峡', Pingdingshan: '平顶山', Luohe: '漯河', Xuchang: '许昌',
  Kaifeng: '开封', Heze: '菏泽', Liaocheng: '聊城', Dezhou: '德州',
  Binzhou: '滨州', Dongying: '东营', Zaozhuang: '枣庄', Rizhao: '日照',
  Jining: '济宁', "Tai'an": '泰安', "Huai'an": '淮安',
  Suqian: '宿迁', Zhenjiang: '镇江', Zhangzhou: '漳州', Sanming2: '三明',
  Xiangyang2: '襄阳', Huainan: '淮南', Huaibei: '淮北', Tongling: '铜陵',
  Chizhou: '池州', Xuancheng: '宣城', Huangshan: '黄山', "Lu'an": '六安',
  Bozhou: '亳州', Fuyang: '阜阳', SuzhouAnhui: '宿州', Bengbu: '蚌埠',
  "Ma'anshan": '马鞍山', Luan: '六安', YichunJX: '宜春', Xinyu: '新余',
  Yingtan: '鹰潭', FuzhouJX: '抚州', Jingdezhen: '景德镇', PingxiangJX: '萍乡',
};

// 常见国家英→中
const COUNTRY_ZH = {
  CN: '中国', US: '美国', JP: '日本', KR: '韩国', GB: '英国',
  FR: '法国', DE: '德国', CA: '加拿大', AU: '澳大利亚', SG: '新加坡',
  MY: '马来西亚', TH: '泰国', VN: '越南', PH: '菲律宾', ID: '印尼',
  RU: '俄罗斯', IT: '意大利', ES: '西班牙', NL: '荷兰', TW: '台湾',
  HK: '香港', MO: '澳门', IN: '印度', AE: '阿联酋', SA: '沙特',
  BR: '巴西', MX: '墨西哥', NZ: '新西兰', CH: '瑞士', SE: '瑞典',
};

// Cloudflare 原生地理信息 → 中文显示
function getCityFromCf(cf) {
  if (!cf) return '';
  const region = REGION_ZH[cf.region] || cf.region || '';
  const city = CITY_ZH[cf.city] || cf.city || '';
  if (region && city && region !== city) return `${region}·${city}`;
  if (region) return region;
  if (city) return city;
  return COUNTRY_ZH[cf.country] || cf.country || '';
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.VISITS) {
      return new Response(
        JSON.stringify({ ok: false, err: 'VISITS_KV_NOT_BOUND' }),
        { status: 503, headers: { 'content-type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const ip = (request.headers.get('CF-Connecting-IP') || '').slice(0, 64);
    const ua = (request.headers.get('User-Agent') || '').slice(0, 300);
    const ref = (request.headers.get('Referer') || '').slice(0, 300);
    const device = /iPad|Tablet/i.test(ua)
      ? 'tablet'
      : (/Mobile|Android|iPhone|iPod/i.test(ua) ? 'mobile' : 'desktop');

    // 手机型号解析（轻量正则，够用即可）
    let deviceModel = '';
    if (device === 'mobile') {
      const iphone = ua.match(/iPhone[^;)]*/i);
      if (iphone) {
        deviceModel = 'iPhone';
      } else {
        const android = ua.match(/Android [\d.]+; ([^;)]+)/i);
        if (android) deviceModel = android[1].trim();
      }
    }

    const t = Date.now();
    const path = String(body.path || '/').slice(0, 200);
    const visitorId = String(body.visitorId || '').slice(0, 32);
    const network = ['wifi', 'cellular', 'ethernet', 'unknown'].includes(body.network)
      ? body.network
      : 'unknown';

    // IP 归属地（Cloudflare 原生地理信息 → 中文翻译）
    const city = getCityFromCf(request.cf);

    // 东八区日期
    const dayKey = 'd:' + new Date(t + 8 * 3600 * 1000).toISOString().slice(0, 10);

    const prev = await env.VISITS.get(dayKey);
    const arr = prev ? JSON.parse(prev) : [];
    arr.push({ t, ip, city, visitorId, device, deviceModel, network, path, ref });
    while (arr.length > 20000) arr.shift();
    await env.VISITS.put(dayKey, JSON.stringify(arr));

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, err: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}