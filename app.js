/* ================== STARGO 线下追星一站式小助手 v2.0 ================== */
"use strict";

/* ---------------- 真实演出公告数据（2026-07 抓取整理，附来源链接） ---------------- */
const SHOWS = [
  { id:"leeyoungji-hk", artist:"李泳知 LEE YOUNGJI", title:"2026 LEE YOUNGJI WORLD TOUR IN HONG KONG", city:"中国香港",
    venue:"亚洲国际博览馆 5号展馆", venueKey:"awe-hk", date:"2026-08-01 19:00", open:null, platform:"官方渠道",
    source:"Vogue Hong Kong 演唱会情报", link:"https://www.voguehk.com?p=567899/",
    price:"HK$999 起（全企位）", realname:"以主办方公告为准", limit:"以售票平台规则为准" },
  { id:"henry-macau", artist:"HENRY 刘宪华", title:"HENRY 2026 ENJOY THE SHOW 华丽宪场世界巡回演唱会 · 中国澳门站", city:"中国澳门",
    venue:"澳门银河综艺馆", venueKey:"galaxy-macau", date:"2026-08-01 20:00", dateEnd:"2026-08-02", open:"2026-07-02 15:00", platform:"大麦",
    source:"澳门本地宝演出汇总", link:"https://m.am.bendibao.com/xiuxian/?search=%E6%BC%94%E5%94%B1%E4%BC%9A",
    price:"以大麦网 / 银河票务在售价为准", realname:"实名购票，入场核验", limit:"以平台限购规则为准" },
  { id:"p1h-macau", artist:"P1Harmony", title:"2026 P1Harmony ASIA STAGE [BE UNIQUE] IN MACAU", city:"中国澳门",
    venue:"新濠影汇综艺馆", venueKey:"studiocity-macau", date:"2026-08-01 19:00", open:null, platform:"大麦",
    source:"澳门本地宝演出汇总", link:"https://m.am.bendibao.com/xiuxian/?search=%E6%BC%94%E5%94%B1%E4%BC%9A",
    price:"以大麦网在售价为准", realname:"以主办方公告为准", limit:"以平台规则为准" },
  { id:"kun-macau", artist:"蔡徐坤 KUN", title:"2026 KUN [THE DEADMAN] 巡回 · 首站澳门", city:"中国澳门",
    venue:"澳门威尼斯人综艺馆", venueKey:"venetian-macau", date:"2026-08-02 19:30", dateEnd:"2026-08-03", open:null, platform:"官方渠道",
    source:"澳门本地宝演出汇总", link:"https://m.am.bendibao.com/xiuxian/?search=%E6%BC%94%E5%94%B1%E4%BC%9A",
    price:"以官方开票公告为准", realname:"以主办方公告为准", limit:"以平台规则为准" },
  { id:"top-hk", artist:"T.O.P（崔胜铉）", title:"「T.O.P Pre-Studio 2026」世界巡回演唱会 · 香港站", city:"中国香港",
    venue:"亚洲国际博览馆 Arena", venueKey:"awe-hk", date:"2026-08-15 18:00", open:null, platform:"官方渠道",
    source:"Vogue Hong Kong 演唱会情报", link:"https://www.voguehk.com?p=567899/",
    price:"HK$1,688 / 1,488 / 1,288 / 1,088 / 988", realname:"以主办方公告为准", limit:"以售票平台规则为准" },
  { id:"itzy-macau", artist:"ITZY", title:"ITZY 3RD WORLD TOUR <TUNNEL VISION> in MACAO", city:"中国澳门",
    venue:"澳门威尼斯人综艺馆", venueKey:"venetian-macau", date:"2026-08-15 18:00", open:"2026-07-07 12:00", platform:"大麦",
    source:"澳门售票网（在售中）", link:"https://www.macauticket.com/?d=m",
    price:"MOP$1,999 / 1,399 / 999 / 799", realname:"实名购票，入场核验证件", limit:"以平台限购规则为准" },
  { id:"lay-macau", artist:"张艺兴 LAY", title:"张艺兴「斗战胜佛」澳门限定演唱会", city:"中国澳门",
    venue:"澳门威尼斯人综艺馆", venueKey:"venetian-macau", date:"2026-08-22 20:00", open:"2026-07-24 13:14", platform:"猫眼",
    source:"澳门售票网 / 澳门本地宝（在售中）", link:"https://www.macauticket.com/?d=m",
    price:"$1,991 / 1,618 / 1,191 / 618", realname:"实名购票，入场核验", limit:"以平台限购规则为准" },
  { id:"illit-hk", artist:"ILLIT", title:"ILLIT 2026 'PRESS START♥' LIVE IN HONG KONG", city:"中国香港",
    venue:"亚洲国际博览馆 10号展馆", venueKey:"awe-hk", date:"2026-08-22 18:00", open:null, platform:"官方渠道",
    source:"腾讯新闻·港澳演出汇总", link:"https://news.qq.com/rain/a/20260603A04QR600",
    price:"以官方开票公告为准", realname:"以主办方公告为准", limit:"以售票平台规则为准" },
  { id:"ive-hk", artist:"IVE", title:"IVE WORLD TOUR IN HONG KONG", city:"中国香港",
    venue:"亚洲国际博览馆 Arena", venueKey:"awe-hk", date:"2026-09-04 20:00", dateEnd:"2026-09-05", open:null, platform:"官方渠道",
    source:"Vogue Hong Kong 演唱会情报", link:"https://www.voguehk.com?p=567899/",
    price:"HK$2,299(VIP) / 1,699 / 1,299 / 999 / 799", realname:"以主办方公告为准", limit:"以售票平台规则为准" },
  { id:"babymonster-macau", artist:"BABYMONSTER", title:"2026-27 BABYMONSTER WORLD TOUR [춤(CHOOM)] IN MACAO", city:"中国澳门",
    venue:"澳门威尼斯人综艺馆", venueKey:"venetian-macau", date:"2026-09-11 19:30", dateEnd:"2026-09-12", open:null, platform:"金光票务",
    source:"澳门本地宝演出汇总", link:"https://m.am.bendibao.com/xiuxian/?search=%E6%BC%94%E5%94%B1%E4%BC%9A",
    price:"以金光票务开票公告为准", realname:"以主办方公告为准", limit:"以平台规则为准" },
  { id:"treasure-hk", artist:"TREASURE", title:"TREASURE THE STAGE 2026 NEW WAV : LIVE 香港站", city:"中国香港",
    venue:"亚洲国际博览馆 Arena", venueKey:"awe-hk", date:"2026-09-12 18:00", open:null, platform:"官方渠道",
    source:"Vogue Hong Kong 演唱会情报", link:"https://www.voguehk.com?p=567899/",
    price:"HK$1,899 / 1,599 / 1,299 / 999 / 799", realname:"以主办方公告为准", limit:"以售票平台规则为准" },
  { id:"backnumber-hk", artist:"back number", title:"back number “Grateful Yesterdays” 亚洲巡回演唱会 2026 香港站", city:"中国香港",
    venue:"亚洲国际博览馆 Arena", venueKey:"awe-hk", date:"2026-09-26 19:00", open:null, platform:"官方渠道",
    source:"Vogue Hong Kong 演唱会情报", link:"https://www.voguehk.com?p=567899/",
    price:"以官方开票公告为准", realname:"以主办方公告为准", limit:"以售票平台规则为准" },
  { id:"enhypen-macau", artist:"ENHYPEN", title:"ENHYPEN WORLD TOUR 'BLOOD SAGA' IN MACAU", city:"中国澳门",
    venue:"澳门银河综艺馆", venueKey:"galaxy-macau", date:"2026-10-16 19:00", dateEnd:"2026-10-18", open:"2026-05-20 12:00", platform:"大麦",
    source:"澳门本地宝演出汇总（在售中）", link:"https://m.am.bendibao.com/xiuxian/?search=%E6%BC%94%E5%94%B1%E4%BC%9A",
    price:"以银河票务 / 大麦网在售价为准", realname:"实名购票，入场核验", limit:"以平台限购规则为准" },

  /* ===== 新增地区：首尔 / 新加坡 / 东京 / 曼谷（2026 真实巡演，来源官方公告/场馆日程） ===== */
  { id:"twice-seoul", artist:"TWICE", title:"TWICE <THIS IS FOR> WORLD TOUR FINALE in SEOUL", city:"韩国首尔",
    venue:"首尔 KSPO DOME", venueKey:"kspo-seoul", date:"2026-07-10 19:00", dateEnd:"2026-07-12", open:"2026-06-11 20:00", platform:"NOL(Interpark)",
    source:"TWICE 官方公告 / JYP", link:"https://twice.jype.com/", buy:"https://world.nol.com/",
    price:"₩154,000（站席/对号）", realname:"实名购票，人证合一", limit:"宏程序/违规购票将被取消" },
  { id:"skz-seoul", artist:"Stray Kids", title:"Stray Kids WORLD TOUR <RUN IT> in SEOUL", city:"韩国首尔",
    venue:"首尔 KSPO DOME", venueKey:"kspo-seoul", date:"2026-07-25 18:00", dateEnd:"2026-08-02", open:"2026-06-15 20:00", platform:"NOL(Interpark)",
    source:"NOL（原 Interpark Global）官方", link:"https://world.nol.com/", buy:"https://world.nol.com/",
    price:"以官方开票为准", realname:"实名购票，入场核验", limit:"以平台规则为准" },
  { id:"itzy-sg", artist:"ITZY", title:"ITZY 3RD WORLD TOUR <TUNNEL VISION> in SINGAPORE", city:"新加坡",
    venue:"新加坡室内体育馆", venueKey:"sg-indoor", date:"2026-10-03 18:00", open:null, platform:"Ticketmaster",
    source:"Live Nation Singapore / Ticketmaster", link:"https://www.ticketmaster.sg/", buy:"https://www.ticketmaster.sg/",
    price:"以 Ticketmaster 在售价为准", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"babymonster-sg", artist:"BABYMONSTER", title:"BABYMONSTER WORLD TOUR [춤(CHOOM)] IN SINGAPORE", city:"新加坡",
    venue:"新加坡室内体育馆", venueKey:"sg-indoor", date:"2026-11-28 19:00", dateEnd:"2026-11-29", open:null, platform:"Ticketmaster",
    source:"Live Nation Singapore / Ticketmaster", link:"https://www.ticketmaster.sg/", buy:"https://www.ticketmaster.sg/",
    price:"以 Ticketmaster 在售价为准", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"enhypen-tokyo", artist:"ENHYPEN", title:"ENHYPEN WORLD TOUR 'BLOOD SAGA' IN JAPAN", city:"日本东京",
    venue:"东京巨蛋", venueKey:"tokyodome", date:"2026-12-01 18:30", dateEnd:"2026-12-02", open:null, platform:"e+",
    source:"东京巨蛋官方日程", link:"https://www.tokyo-dome.co.jp/", buy:"https://eplus.jp/",
    price:"以日本官方票务为准", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"ini-tokyo", artist:"INI", title:"2026 INI DOME LIVE TOUR", city:"日本东京",
    venue:"东京巨蛋", venueKey:"tokyodome", date:"2026-09-16 18:30", dateEnd:"2026-09-17", open:null, platform:"e+",
    source:"东京巨蛋官方日程", link:"https://www.tokyo-dome.co.jp/", buy:"https://eplus.jp/",
    price:"以日本官方票务为准", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"sekai-tokyo", artist:"SEKAI NO OWARI", title:"SEKAI NO OWARI DOME TOUR 2026 \"THE CINEMA\"", city:"日本东京",
    venue:"东京巨蛋", venueKey:"tokyodome", date:"2026-08-15 18:00", dateEnd:"2026-08-16", open:null, platform:"e+",
    source:"东京巨蛋官方日程", link:"https://www.tokyo-dome.co.jp/", buy:"https://eplus.jp/",
    price:"以日本官方票务为准", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"nct-bkk", artist:"NCT JNJM", title:"2026 NCT JNJM FANMEETING TOUR [DUALITY] in BANGKOK", city:"泰国曼谷",
    venue:"曼谷 IMPACT Arena", venueKey:"bangkok-impact", date:"2026-08-07 18:00", dateEnd:"2026-08-09", open:null, platform:"Thai Ticket Major",
    source:"IMPACT 官方日程", link:"https://www.impact.co.th/", buy:"https://www.thaiticketmajor.com/",
    price:"THB 2,000 起", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"forever-bkk", artist:"F✦FOREVER", title:"F✦FOREVER 1st World Tour in Bangkok", city:"泰国曼谷",
    venue:"曼谷 IMPACT Arena", venueKey:"bangkok-impact", date:"2026-08-01 18:00", dateEnd:"2026-08-02", open:null, platform:"Thai Ticket Major",
    source:"IMPACT 官方日程", link:"https://www.impact.co.th/", buy:"https://www.thaiticketmajor.com/",
    price:"THB 2,500 起", realname:"以官方公告为准", limit:"以平台限购规则为准" },
  { id:"babymonster-bkk", artist:"BABYMONSTER", title:"BABYMONSTER WORLD TOUR [춤(CHOOM)] IN BANGKOK", city:"泰国曼谷",
    venue:"曼谷 IMPACT Arena", venueKey:"bangkok-impact", date:"2026-11-07 19:00", dateEnd:"2026-11-08", open:null, platform:"Thai Ticket Major",
    source:"IMPACT 官方日程", link:"https://www.impact.co.th/", buy:"https://www.thaiticketmajor.com/",
    price:"THB 2,800 起", realname:"以官方公告为准", limit:"以平台限购规则为准" },
];

const PREP_ITEMS = [
  { t:"实名信息预填", d:"提前在购票平台完善本人+同行观演人的姓名、证件号，开票时零输入" },
  { t:"观演人设置", d:"大麦/猫眼「观演人」列表提前添加并核对，强实名场次不可改" },
  { t:"支付方式开通", d:"开通大额免密/指纹支付，绑定至少 2 种支付方式防单通道故障" },
  { t:"网络测速", d:"提前测试 WiFi 与 4G/5G 速度，抢票时优先用更快更稳的一路" },
  { t:"设备备用方案", d:"手机+平板/电脑双设备登录，家人朋友同助力（都用自己账号）" },
  { t:"提前进入候场", d:"开票前 5 分钟进入购票页面刷新等待，不要频繁切换后台" },
  { t:"确认退改规则", d:"看清「不支持退换」条款再下单，冲动是魔鬼" },
];

/* ---------------- 场馆资料 ---------------- */
const VENUES = {
  "awe-hk": {
    name:"亚洲国际博览馆（AsiaWorld-Expo）", city:"中国香港", addr:"香港大屿山机场博览馆",
    mapQuery:"亚洲国际博览馆",
    points:[["🚇 机场快线 博览馆站",20,58],["🎪 Arena 入口",50,42],["📍 粉丝集合点(1号馆外)",68,30],["💜 应援区",60,52],["📦 寄存点",34,30],["🚻 卫生间",44,60],["🏥 医疗点",56,66]],
    hotels:[
      { n:"香港天际万豪(机场旁)", p:1350, d:"机场快线 1 站", metro:true, cancel:true, bf:true },
      { n:"东涌昂坪酒店", p:880, d:"东涌线+步行 20 分钟", metro:true, cancel:true, bf:false },
      { n:"青衣站商圈酒店", p:760, d:"机场快线 2 站", metro:true, cancel:false, bf:true },
      { n:"油麻地经济宾馆", p:480, d:"机场快线+地铁约 50 分钟", metro:true, cancel:false, bf:false },
    ],
    routes:[
      ["✈️ 香港机场 → 场馆","机场快线 1 站直达博览馆站，2 分钟 / HK$6","散场加开班次，仍建议速走"],
      ["🚇 市区 → 场馆","机场快线香港站→博览馆约 28 分钟 / HK$115","末班 00:48（以当日公告为准）"],
      ["🚄 西九龙高铁站 → 场馆","高铁站→柯士甸→机场快线，约 45 分钟","注意高铁返程末班车 22:00 前"],
      ["🚕 打车","市区→场馆约 HK$350，散场排队 1 小时+","强烈建议地铁"],
    ],
    bring:["港澳通行证+签注 或 回乡证","身份证原件","电子票（订单可登录状态）","八达通（地铁必备）","应援棒","HK$ 现金少量","禁止：食物饮料、专业相机"],
    weather:"8~9 月香港 27~33℃，湿热有台风可能，出发前查天气信号。",
    entry:"一般开演前 1~1.5 小时开放入场；博览馆站散场限流，记住返程末班时间并预留缓冲。"
  },
  "galaxy-macau": {
    name:"澳门银河综艺馆（Galaxy Arena）", city:"中国澳门", addr:"澳门路氹城银河度假城",
    mapQuery:"澳门银河综艺馆",
    points:[["🚌 度假村穿梭巴士站",18,60],["🎪 场馆入口·安检",50,42],["📍 粉丝集合点(东翼广场)",70,30],["💜 应援区",60,54],["📦 寄存点(酒店礼宾部)",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"银河酒店(场馆同楼)", p:1580, d:"步行 3 分钟", metro:false, cancel:true, bf:true },
      { n:"路氹金沙城酒店", p:1100, d:"步行 15 分钟", metro:false, cancel:true, bf:true },
      { n:"氹仔旧城区民宿", p:560, d:"打车 8 分钟", metro:false, cancel:false, bf:false },
      { n:"澳门半岛经济酒店", p:420, d:"打车 20 分钟", metro:false, cancel:true, bf:false },
    ],
    routes:[
      ["✈️ 澳门机场 → 场馆","打车约 10 分钟 / MOP 50；或机场穿梭巴士直达银河","穿梭巴士约 30 分钟一班"],
      ["🛳️ 港珠澳大桥口岸 → 场馆","口岸穿梭巴士→银河，约 25 分钟，免费","末班约 23:30（以当日为准）"],
      ["🚄 横琴口岸(珠海) → 场馆","过关后乘银河免费穿梭巴士约 15 分钟","口岸通关至 24:00，散场请赶早"],
      ["🚕 打车","散场后排队久，建议步行至金沙城方向再叫车","备用：澳门的士电召 +853 8500 0000"],
    ],
    bring:["港澳通行证+有效签注（原件！）","身份证原件（内地购票实名）","电子票+订单截图","澳门通或电子支付","应援棒","少量港币/澳门币现金","禁止：无人机、专业摄影设备"],
    weather:"8~10 月澳门 26~33℃，湿热多雨带伞；场馆冷气强，备薄外套。",
    entry:"通常开演前 1.5 小时开放入场，人证核验预留 45 分钟；散场口岸方向人流大，注意末班通关时间。"
  },
  "venetian-macau": {
    name:"澳门威尼斯人综艺馆（Venetian Cotai Arena）", city:"中国澳门", addr:"澳门路氹金光大道望德圣母湾大马路",
    mapQuery:"澳门威尼斯人综艺馆",
    points:[["🚌 金光大道穿梭巴士站",18,60],["🎪 综艺馆入口·安检",50,42],["📍 粉丝集合点(西翼广场)",70,30],["💜 应援区",60,54],["📦 寄存点(酒店礼宾部)",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"威尼斯人酒店(场馆同楼)", p:1450, d:"步行 5 分钟", metro:false, cancel:true, bf:true },
      { n:"巴黎人酒店", p:1050, d:"步行 10 分钟(室内连廊)", metro:false, cancel:true, bf:true },
      { n:"伦敦人酒店", p:1180, d:"步行 12 分钟(室内连廊)", metro:false, cancel:true, bf:true },
      { n:"氹仔旧城区民宿", p:560, d:"打车 8 分钟", metro:false, cancel:false, bf:false },
    ],
    routes:[
      ["✈️ 澳门机场 → 场馆","威尼斯人免费穿梭巴士约 10 分钟；打车 MOP 45","穿梭巴士约 20~30 分钟一班"],
      ["🛳️ 港珠澳大桥口岸 → 场馆","口岸→威尼斯人免费穿梭巴士约 25 分钟","末班约 23:30（以当日为准）"],
      ["🚄 横琴口岸(珠海) → 场馆","过关后乘金光大道免费穿梭巴士约 12 分钟","口岸通关至 24:00，散场请赶早"],
      ["🚕 打车","散场极难叫车，建议走连廊到巴黎人/伦敦人门口再叫","备用：澳门的士电召 +853 8500 0000"],
    ],
    bring:["港澳通行证+有效签注（原件！）","身份证原件","电子票+订单截图","电子支付（支付宝/微信通用）","应援棒","少量现金","禁止：无人机、专业摄影设备、自拍杆"],
    weather:"8~9 月澳门 26~33℃，湿热多雨带伞；场馆冷气强，备薄外套。",
    entry:"通常开演前 1.5 小时开放入场，散场沿指示走室内连廊分流最快。"
  },
  "studiocity-macau": {
    name:"新濠影汇综艺馆（Studio City Event Center）", city:"中国澳门", addr:"澳门路氹连贯公路新濠影汇",
    mapQuery:"澳门新濠影汇综艺馆",
    points:[["🚌 影汇穿梭巴士站",18,60],["🎪 综艺馆入口·安检",50,42],["📍 粉丝集合点(星光大道口)",70,30],["💜 应援区",60,54],["📦 寄存点(礼宾部)",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"新濠影汇酒店(场馆同楼)", p:1280, d:"步行 3 分钟", metro:false, cancel:true, bf:true },
      { n:"摩珀斯/新濠天地", p:1680, d:"打车 5 分钟", metro:false, cancel:true, bf:true },
      { n:"氹仔旧城区民宿", p:560, d:"打车 6 分钟", metro:false, cancel:false, bf:false },
      { n:"澳门半岛经济酒店", p:420, d:"打车 18 分钟", metro:false, cancel:true, bf:false },
    ],
    routes:[
      ["✈️ 澳门机场 → 场馆","新濠影汇免费穿梭巴士约 8 分钟；打车 MOP 40","穿梭巴士约 30 分钟一班"],
      ["🛳️ 港珠澳大桥口岸 → 场馆","口岸→新濠影汇免费穿梭巴士约 30 分钟","末班约 23:00（以当日为准）"],
      ["🚄 横琴口岸(珠海) → 场馆","步行/接驳至莲花口岸方向，穿梭巴士约 10 分钟","横琴 24 小时通关，散场仍建议赶早"],
      ["🚕 打车","散场排队久，可先逛影汇商场错峰再走","备用：澳门的士电召 +853 8500 0000"],
    ],
    bring:["港澳通行证+有效签注（原件！）","身份证原件","电子票+订单截图","电子支付","应援棒","少量现金","禁止：无人机、专业摄影设备"],
    weather:"8 月澳门 27~33℃，湿热多雨带伞；场馆冷气强，备薄外套。",
    entry:"通常开演前 1~1.5 小时开放入场，人证核验预留 40 分钟。"
  },

  /* ===== 新增地区场馆 ===== */
  "kspo-seoul": {
    name:"首尔 KSPO DOME（奥林匹克体操竞技场）", city:"韩国首尔", addr:"首尔松坡区奥林匹克路 424（奥林匹克公园内）",
    mapQuery:"KSPO DOME",
    points:[["🚇 奥林匹克公园站(5/9号线)",20,58],["🎪 场馆入口·安检",50,42],["📍 粉丝集合点(主大厅)",70,30],["💜 应援区",60,54],["📦 寄存处(1F)",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"首尔乐天世界酒店", p:980, d:"步行 10 分钟至蚕室站", metro:true, cancel:true, bf:true },
      { n:"首尔 Oakwood Premier Coex", p:1050, d:"三成站直连", metro:true, cancel:true, bf:true },
      { n:"首尔君悦酒店(狎鸥亭)", p:1200, d:"打车 15 分钟", metro:false, cancel:true, bf:true } ],
    routes:[
      ["🚇 市区 → 场馆","地铁 5/9 号线至奥林匹克公园站，3 号出口步行 5 分钟","末班约 23:50（以当日为准）"],
      ["✈️ 仁川机场 → 场馆","机场铁路 AREX 至首尔站转地铁，约 80 分钟","夜间有深夜巴士"],
      ["🚕 打车","江南→场馆约 ₩15,000，散场排队久","建议坐地铁"] ],
    bring:["护照原件","电子票（二维码）","T-money 交通卡","应援棒（部分场次需官方正版）","现金 ₩ 少量","禁止：外带食物饮料（KSPO 规定）、专业相机"],
    weather:"7~8 月首尔 25~33℃，湿热多雨带伞；场馆冷气强备薄外套。",
    entry:"通常开演前 1.5 小时开放入场；KSPO 各馆禁止携带任何饮食，安检严格。" },
  "sg-indoor": {
    name:"新加坡室内体育馆（Singapore Indoor Stadium）", city:"新加坡", addr:"Singapore Sports Hub, 2 Stadium Walk",
    mapQuery:"Singapore Indoor Stadium",
    points:[["🚇 Stadium 站(CC/CE 线)",20,58],["🎪 场馆入口·安检",50,42],["📍 粉丝集合点(外广场)",70,30],["💜 应援区",60,54],["📦 寄存处",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"新加坡体育中心臻品之选酒店", p:1100, d:"步行 8 分钟", metro:true, cancel:true, bf:true },
      { n:"新加坡滨海湾金沙", p:1900, d:"地铁 2 站", metro:true, cancel:true, bf:true },
      { n:"新加坡芽笼经济酒店", p:520, d:"地铁 1 站", metro:true, cancel:false, bf:false } ],
    routes:[
      ["🚇 市区 → 场馆","地铁环线 CC/滨海市区线至 Stadium 站，步行 5 分钟","末班约 23:40"],
      ["✈️ 樟宜机场 → 场馆","地铁东西线转环线，约 35 分钟","24 小时机场线"],
      ["🚕 打车","乌节路→场馆约 S$12，散场排队久","建议坐地铁"] ],
    bring:["护照原件","电子票","EZ-Link/交通卡或信用卡","应援棒","少量现金","禁止：专业相机、外带食物（场内餐饮贵）"],
    weather:"全年 26~32℃ 湿热；午后多雷阵雨带伞。",
    entry:"通常开演前 1.5 小时开放入场；新加坡场馆安检规范，提前到。" },
  "tokyodome": {
    name:"东京巨蛋（Tokyo Dome）", city:"日本东京", addr:"东京都文京区后乐 1-3-61",
    mapQuery:"Tokyo Dome",
    points:[["🚇 水道桥站(JR/都营)",20,58],["🎪 场馆入口·安检",50,42],["📍 粉丝集合点(黄城门)",70,30],["💜 应援区",60,54],["📦 寄存柜",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"东京巨蛋酒店", p:1500, d:"场馆同楼", metro:true, cancel:true, bf:true },
      { n:"东京后乐园王子大饭店", p:980, d:"步行 3 分钟", metro:true, cancel:true, bf:true },
      { n:"东京水道桥经济酒店", p:600, d:"步行 6 分钟", metro:true, cancel:false, bf:false } ],
    routes:[
      ["🚇 市区 → 场馆","JR 总武线/都营三田线至水道桥站，步行 3 分钟","末班约 23:50"],
      ["✈️ 成田/羽田 → 场馆","机场快线/京成电铁转地铁，约 60 分钟","机场线运营至较晚"],
      ["🚕 打车","新宿→场馆约 ¥3,500，散场难叫车","建议坐地铁"] ],
    bring:["护照原件","电子票（二维码）","Suica/Pasmo 交通卡","应援棒（日本场次常要求官方）","现金日元少量","禁止：可换镜头相机、自拍杆、外带饮食"],
    weather:"东京夏季 28~35℃ 闷热；冬季干冷。场馆冷气强备外套。",
    entry:"通常开演前 1.5~2 小时开放入场；日本粉丝应援整齐，跟 call 谱，散场带走垃圾。" },
  "bangkok-impact": {
    name:"曼谷 IMPACT Arena", city:"泰国曼谷", addr:"Ban Mai, Pak Kret, Nonthaburi（MRT 粉线 Impact 站）",
    mapQuery:"IMPACT Arena Bangkok",
    points:[["🚇 MRT 粉线 Impact 站",20,58],["🎪 场馆入口·安检",50,42],["📍 粉丝集合点(中庭)",70,30],["💜 应援区",60,54],["📦 寄存处",32,28],["🚻 卫生间",42,60],["🏥 医疗点",58,66]],
    hotels:[
      { n:"曼谷 IMPACT 会展中心酒店", p:680, d:"场馆步行 5 分钟", metro:true, cancel:true, bf:true },
      { n:"曼谷湄南河畔假日酒店", p:750, d:"打车 15 分钟", metro:false, cancel:true, bf:true },
      { n:"曼谷恰图恰经济酒店", p:360, d:"MRT 2 站", metro:true, cancel:false, bf:false } ],
    routes:[
      ["🚇 市区 → 场馆","MRT 粉线至 Impact 站，步行即达","末班约 23:30"],
      ["✈️ 素万那普机场 → 场馆","机场快线转 MRT，约 50 分钟","机场线运营至较晚"],
      ["🚕 打车","市中心→场馆约 ฿250，散场排队久","建议坐 MRT"] ],
    bring:["护照原件","电子票","Rabbit/交通卡或现金","应援棒","禁止：电子烟（泰国违法）、专业相机、外带食物"],
    weather:"曼谷全年 28~35℃ 湿热；雨季（5~10月）多雷阵雨带伞。",
    entry:"通常开演前 1.5 小时开放入场；电子烟严禁携带入境/入场。" },
};

/* ---------------- 花销计算数据 ---------------- */
const BUDGET_ITEMS = {
  fixed: [
    { k:"ticket", label:"门票", v:1299, shared:false },
    { k:"flight", label:"大交通（机票/高铁往返）", v:1500, shared:false },
    { k:"taxi", label:"市内交通（打车/地铁合计）", v:200, shared:true, hint:"可拼车分摊" },
    { k:"hotel", label:"酒店（每晚单价）", v:500, shared:true, perNight:true, hint:"可拼房分摊 · 按晚计" },
    { k:"food", label:"餐饮（每天预算）", v:150, shared:false, perDay:true },
  ],
  float: [
    { k:"support", label:"应援物（灯牌/手幅/装扮）", v:150 },
    { k:"goods", label:"官方周边", v:400 },
    { k:"shopping", label:"购物（专辑/代购/伴手礼）", v:300 },
    { k:"visa", label:"签证费（出国追星）", v:0 },
    { k:"insurance", label:"旅行保险", v:0 },
    { k:"sim", label:"通讯（电话卡/漫游）", v:0 },
  ],
  hidden: [
    { k:"refund", label:"退票手续费风险金", v:0, hint:"梯次退票费最高 50%" },
    { k:"rushvisa", label:"加急签证费", v:0, hint:"韩国加急约 +¥300" },
    { k:"storage", label:"现场寄存费", v:20, hint:"大包寄存 ¥10~30/件" },
    { k:"daipai", label:"代拍/高价周边溢价 ⚠️", v:0, hint:"不建议！理性消费" },
    { k:"emergency", label:"应急备用金", v:300, hint:"建议为总预算 10%" },
  ],
};

const SAVE_TIPS = [
  "🎫 官方渠道原价购票，拒绝任何溢价「代拍/黄牛」，这是最大的一笔省钱",
  "🏨 拼房拼车：2 人拼房立省 50%，行程前在互助社区找同好",
  "🛍️ 专辑/小卡先看「收纳台账」里本月已花多少，设红线再下单",
  "🧋 场馆内饮食贵 2~3 倍，提前在便利店买好水和补给",
  "💱 境外刷卡选「当地货币结算」，拒绝 DCC 动态转换，省 3~5% 手续费",
  "📦 周边先收藏 24 小时再决定：还想要就买，忘了就是不需要",
  "♻️ 不需要的物料挂闲鱼回血，或到互助社区免费互换",
];

/* ---------------- 跨国追星数据 ---------------- */
const DESTS = [
  { id:"kr", name:"🇰🇷 韩国·首尔",
    quick:{ "语言":"韩语（景区基本中文/英文可通）","货币":"韩元 ₩（1¥≈190₩）","签证":"旅游签 C-3，单次约5个工作日","电源":"220V 德标圆两孔（中国插头需转换头）","入境卡":"飞机上填写入境卡+海关申报单（家庭一份）","交通卡":"T-money 卡，便利店有售可充值","电话卡":"KT/SKT 机场柜台或提前网购 eSIM" },
    etiquette:["地铁内不打电话、小声交谈；博爱座空着也不要坐","餐厅给长辈倒酒要双手，碰杯杯沿要低于长辈","演唱会应援：跟随粉丝团口号节奏，禁止私生行为（跟车、堵后台）","拍照先问：不要怼脸拍艺人和别人","垃圾分类严格，街头垃圾桶少，垃圾随身带走"],
    spots:["【非遗】北村韩屋村+韩服体验（半日）：景福宫守门将换岗仪式 14:00","【景点】汉江公园野餐（半日）：租野餐垫+炸鸡啤酒","【美食】广藏市场：绿豆煎饼、麻药紫菜包饭；弘大烤肉一条街","【打卡】HYBE INSIGHT / SM TOWN / JYP 大楼（外观打卡，不要蹲守艺人）"],
    emergency:{ police:"112", ambulance:"119", embassy:"中国驻韩国大使馆 +82-2-755-0572", tips:"翻译推荐 Papago（韩语最强）；地图用 Naver Map" },
    phrases:[["你好","안녕하세요 (an-nyeong-ha-se-yo)"],["多少钱？","얼마예요? (eol-ma-ye-yo)"],["请给我这个","이거 주세요 (i-geo ju-se-yo)"],["洗手间在哪里？","화장실 어디예요? (hwa-jang-sil eo-di-ye-yo)"],["救命/帮帮我","도와주세요 (do-wa-ju-se-yo)"]],
    compliance:["肉类、水果、蛋制品禁止入境韩国（火腿肠零食也不行）","携带现金超过 USD 10,000 需申报","退税：单笔满 ₩15,000 可退，机场自助退税机","应援棒锂电池请随身携带，不要托运"] },
  { id:"jp", name:"🇯🇵 日本·东京",
    quick:{ "语言":"日语（汉字可猜，英文一般）","货币":"日元（1¥≈21円）","签证":"单次旅游签，旅行社代办约5-7个工作日","电源":"110V 双平脚（两脚扁插可直插）","入境卡":"提前在 Visit Japan Web 填写生成二维码","交通卡":"Suica/PASMO（iPhone 可开电子卡）","电话卡":"docomo/SoftBank eSIM 提前网购" },
    etiquette:["电车内手机静音，不打电话","自动扶梯东京靠左站立","演唱会：日本粉丝应援极整齐，提前学打 call 谱；终演后自觉带走垃圾","路上不边走边吃；便利店门口可以","温泉：先洗净身体再入池，纹身可能被拒"],
    spots:["【非遗】浅草寺+雷门（半日）：和服体验，仲见世商店街小吃","【景点】涩谷 SKY 观景台（黄昏场提前2周订票）","【美食】筑地场外市场海鲜丼；一兰/阿夫利拉面","【打卡】原宿竹下通（偶像周边店）、中野百老汇（中古小卡圣地）"],
    emergency:{ police:"110", ambulance:"119", embassy:"中国驻日本大使馆 +81-3-3403-3388", tips:"翻译用 Google 翻译拍照模式；地图 Google Maps" },
    phrases:[["你好","こんにちは (kon-ni-chi-wa)"],["多少钱？","いくらですか (i-ku-ra de-su-ka)"],["请给我这个","これをください (ko-re o ku-da-sai)"],["洗手间在哪里？","トイレはどこですか (toire wa doko desu ka)"],["请帮帮我","助けてください (ta-su-ke-te ku-da-sai)"]],
    compliance:["肉制品严禁入境日本（含真空包装），机场有检疫犬","现金超 100 万日元需申报","退税：单店满 5,000円 免税，护照+本人支付","中古店小卡/专辑大量携带可能被认定商业用途"] },
  { id:"th", name:"🇹🇭 泰国·曼谷",
    quick:{ "语言":"泰语（旅游区英文/中文可通）","货币":"泰铢 ฿（1¥≈4.9฿）","签证":"对中国游客免签（出行前再次确认政策）","电源":"220V 美标两脚/三脚混用（基本可直插）","入境卡":"TDAC 电子入境卡，起飞前3天内在线填写","交通卡":"BTS 兔子卡 Rabbit Card","电话卡":"AIS/TrueMove 机场柜台，7天约 ฿299" },
    etiquette:["女性不可触碰僧侣及其衣物","头是神圣的，不要摸别人的头","进寺庙：脱鞋、遮肩过膝","演唱会：泰国粉丝热情开放，但同样禁止私生行为","王室相关话题绝对不要议论（违法）"],
    spots:["【非遗】大皇宫+玉佛寺（半日）：着装要求严格","【景点】湄南河游船夜景 / ICONSIAM 水上市场","【美食】建兴酒家咖喱蟹、芒果糯米饭","【打卡】暹罗商圈（常有偶像见面会快闪）"],
    emergency:{ police:"191（旅游警察 1155 有中文）", ambulance:"1669", embassy:"中国驻泰国大使馆 +66-2-245-7010", tips:"打车用 Grab/Bolt；地图 Google Maps" },
    phrases:[["你好","สวัสดีค่ะ/ครับ (sa-wa-dee-ka/krab)"],["多少钱？","เท่าไหร่ (tao-rai)"],["太贵了","แพงไป (paeng-pai)"],["洗手间在哪里？","ห้องน้ำอยู่ไหน (hong-nam yu-nai)"],["救命","ช่วยด้วย (chuay-duay)"]],
    compliance:["电子烟在泰国违法，携带入境可能被拘留罚款！","入境可能抽查现金（每人不少于 ฿10,000 或等值）","榴莲等气味重水果不能带上 BTS 和酒店","退税：满 ฿2,000/店，机场 VAT Refund 柜台"] },
  { id:"hk", name:"🇨🇳 中国香港",
    quick:{ "语言":"粤语/普通话/英语","货币":"港币 HK$（1¥≈1.08HK$）","签证":"港澳通行证+有效签注（个人旅游 G 签）","电源":"220V 英标三脚方插（需转换头！）","入境卡":"电子通关，通行证直接刷","交通卡":"八达通（支持内地手机 App 开卡）","电话卡":"内地卡漫游或本地储值卡" },
    etiquette:["扶手电梯靠右站，左侧通行","茶餐厅高峰期拼桌正常，点餐爽快","演唱会：亚博/红馆散场秩序好但人多，跟指引走","地铁内禁饮食（包括喝水），罚款 HK$2,000","说「唔该」= 谢谢/劳驾，万能礼貌用语"],
    spots:["【非遗】叮叮车游港岛（半日）：上环→铜锣湾 HK$3 慢游","【景点】太平山顶夜景 / 星光大道维港","【美食】添好运点心、九记牛腩、兰芳园丝袜奶茶","【打卡】旺角信和中心（粉丝周边/小卡店聚集地）"],
    emergency:{ police:"999", ambulance:"999", embassy:"外交部驻港特派员公署 +852-3413-2424", tips:"地图 Google Maps；打车用 HKTaxi App" },
    phrases:[["谢谢（服务）","唔该 (m-goi)"],["谢谢（礼物）","多谢 (do-ze)"],["多少钱？","几多钱？(gei-do-cin)"],["埋单","唔该埋单 (m-goi maai-daan)"]],
    compliance:["每人限带 19 支香烟入境香港，超量重罚","现金出入境超 HK$120,000 需申报","部分药品（含可待因止咳水）管制","强实名演出门票不可转售"] },
  { id:"mo", name:"🇨🇳 中国澳门",
    quick:{ "语言":"粤语/普通话/葡语","货币":"澳门币 MOP（港币/人民币基本通用）","签证":"港澳通行证+澳门签注","电源":"220V 英标三脚方插（需转换头）","入境卡":"电子通关","交通卡":"澳门通 / 电子支付（支付宝微信通用）","电话卡":"内地卡漫游即可，或 CTM 本地卡" },
    etiquette:["赌场 21 岁以下禁止进入（穿过大堂也会查证件）","度假村内禁烟区严格","演唱会散场跟穿梭巴士指引，别乱穿马路","教堂参观保持安静"],
    spots:["【非遗】妈阁庙+郑家大屋（半日）：世遗历史城区徒步线","【景点】大三巴→恋爱巷→议事亭前地","【美食】安德鲁蛋挞（路环总店）、义顺牛奶、水蟹粥","【打卡】伦敦人/威尼斯人（免费穿梭巴士串联）"],
    emergency:{ police:"999", ambulance:"999", embassy:"外交部驻澳门特派员公署 +853-8791-1201", tips:"各大度假村免费穿梭巴士是神器，善用可省下所有交通费" },
    phrases:[["谢谢","唔该 (m-goi)"],["多少钱？","几多钱？(gei-do-cin)"],["请问洗手间","唔该，洗手间喺边度？"]],
    compliance:["现金出入境超 MOP 120,000 需申报","烟草限量同香港（19支）","门票强实名场次人证合一，切勿购买黄牛座位"] },
];

/* ---------------- 追星外语短句库 ---------------- */
const PHRASE_LANGS = [
  { id:"ko", name:"🇰🇷 韩语", tts:"ko-KR" },
  { id:"ja", name:"🇯🇵 日语", tts:"ja-JP" },
  { id:"th", name:"🇹🇭 泰语", tts:"th-TH" },
  { id:"yue", name:"🇨🇳 粤语(港澳)", tts:"zh-HK" },
];
const PHRASES = [
  /* 韩语 */
  { lang:"ko", cat:"🎤 演唱会喊话", cn:"我爱你！", fo:"사랑해요!", ro:"sa-rang-hae-yo" },
  { lang:"ko", cat:"🎤 演唱会喊话", cn:"你最棒！", fo:"최고예요!", ro:"choe-go-ye-yo" },
  { lang:"ko", cat:"🎤 演唱会喊话", cn:"看这边！", fo:"이쪽 봐 주세요!", ro:"i-jjok bwa ju-se-yo" },
  { lang:"ko", cat:"🎤 演唱会喊话", cn:"安可！安可！", fo:"앵콜! 앵콜!", ro:"aeng-kol" },
  { lang:"ko", cat:"🎤 演唱会喊话", cn:"今天也辛苦了！", fo:"오늘도 수고했어요!", ro:"o-neul-do su-go-hae-sseo-yo" },
  { lang:"ko", cat:"🧭 问路交通", cn:"地铁站在哪里？", fo:"지하철역이 어디예요?", ro:"ji-ha-cheol-yeok-i eo-di-ye-yo" },
  { lang:"ko", cat:"🧭 问路交通", cn:"到演出场馆怎么走？", fo:"공연장까지 어떻게 가요?", ro:"gong-yeon-jang-kka-ji eo-tteo-ke ga-yo" },
  { lang:"ko", cat:"🧭 问路交通", cn:"打车的地方在哪里？", fo:"택시 타는 곳이 어디예요?", ro:"taek-si ta-neun gos-i eo-di-ye-yo" },
  { lang:"ko", cat:"🛍️ 买周边", cn:"这个多少钱？", fo:"이거 얼마예요?", ro:"i-geo eol-ma-ye-yo" },
  { lang:"ko", cat:"🛍️ 买周边", cn:"有小卡吗？", fo:"포토카드 있어요?", ro:"po-to-ka-deu iss-eo-yo" },
  { lang:"ko", cat:"🛍️ 买周边", cn:"请给我一个应援棒", fo:"응원봉 하나 주세요", ro:"eung-won-bong ha-na ju-se-yo" },
  { lang:"ko", cat:"🛍️ 买周边", cn:"能刷卡吗？", fo:"카드 돼요?", ro:"ka-deu dwae-yo" },
  { lang:"ko", cat:"↩️ 退换货", cn:"我想退款", fo:"환불하고 싶어요", ro:"hwan-bul-ha-go sip-eo-yo" },
  { lang:"ko", cat:"↩️ 退换货", cn:"可以换货吗？", fo:"교환할 수 있어요?", ro:"gyo-hwan-hal su iss-eo-yo" },
  { lang:"ko", cat:"↩️ 退换货", cn:"收据在这里", fo:"영수증 여기 있어요", ro:"yeong-su-jeung yeo-gi iss-eo-yo" },
  { lang:"ko", cat:"🆘 应急求助", cn:"请帮帮我！", fo:"도와주세요!", ro:"do-wa-ju-se-yo" },
  { lang:"ko", cat:"🆘 应急求助", cn:"我迷路了", fo:"길을 잃었어요", ro:"gil-eul ilh-eoss-eo-yo" },
  { lang:"ko", cat:"🆘 应急求助", cn:"有会说中文的人吗？", fo:"중국어 하시는 분 있나요?", ro:"jung-gug-eo ha-si-neun bun in-na-yo" },
  /* 日语 */
  { lang:"ja", cat:"🎤 演唱会喊话", cn:"最喜欢你了！", fo:"大好き！", ro:"dai-su-ki" },
  { lang:"ja", cat:"🎤 演唱会喊话", cn:"好帅！", fo:"かっこいい！", ro:"kak-ko-ii" },
  { lang:"ja", cat:"🎤 演唱会喊话", cn:"看这边！", fo:"こっち見て！", ro:"kocchi mite" },
  { lang:"ja", cat:"🎤 演唱会喊话", cn:"安可！", fo:"アンコール！", ro:"an-ko-ru" },
  { lang:"ja", cat:"🧭 问路交通", cn:"车站在哪里？", fo:"駅はどこですか", ro:"eki wa doko desu ka" },
  { lang:"ja", cat:"🧭 问路交通", cn:"到会场怎么去？", fo:"会場までどうやって行きますか", ro:"kaijou made dou yatte ikimasu ka" },
  { lang:"ja", cat:"🛍️ 买周边", cn:"这个多少钱？", fo:"これはいくらですか", ro:"kore wa ikura desu ka" },
  { lang:"ja", cat:"🛍️ 买周边", cn:"有小卡吗？", fo:"トレカはありますか", ro:"toreka wa arimasu ka" },
  { lang:"ja", cat:"🛍️ 买周边", cn:"能刷卡吗？", fo:"カードで払えますか", ro:"kaado de haraemasu ka" },
  { lang:"ja", cat:"↩️ 退换货", cn:"我想退货", fo:"返品したいです", ro:"henpin shitai desu" },
  { lang:"ja", cat:"↩️ 退换货", cn:"可以换吗？", fo:"交換できますか", ro:"koukan dekimasu ka" },
  { lang:"ja", cat:"🆘 应急求助", cn:"请帮帮我", fo:"助けてください", ro:"tasukete kudasai" },
  { lang:"ja", cat:"🆘 应急求助", cn:"我迷路了", fo:"道に迷いました", ro:"michi ni mayoimashita" },
  { lang:"ja", cat:"🆘 应急求助", cn:"有会说中文的人吗？", fo:"中国語が話せる人はいますか", ro:"chuugokugo ga hanaseru hito wa imasu ka" },
  /* 泰语 */
  { lang:"th", cat:"🎤 演唱会喊话", cn:"爱你哦！", fo:"รักนะ!", ro:"rak na" },
  { lang:"th", cat:"🎤 演唱会喊话", cn:"太棒了！", fo:"สุดยอด!", ro:"sud yod" },
  { lang:"th", cat:"🎤 演唱会喊话", cn:"看这边一下！", fo:"มองทางนี้หน่อย!", ro:"mong thang nee noi" },
  { lang:"th", cat:"🧭 问路交通", cn:"BTS 站在哪里？", fo:"สถานีรถไฟฟ้าอยู่ที่ไหน", ro:"sa-tha-nee rot-fai-fa yu tee nai" },
  { lang:"th", cat:"🧭 问路交通", cn:"去场馆怎么走？", fo:"ไปฮอลล์ยังไง", ro:"pai hall yang-ngai" },
  { lang:"th", cat:"🛍️ 买周边", cn:"这个多少钱？", fo:"อันนี้เท่าไหร่", ro:"an-nee tao-rai" },
  { lang:"th", cat:"🛍️ 买周边", cn:"能便宜点吗？", fo:"ลดได้ไหม", ro:"lot dai mai" },
  { lang:"th", cat:"🛍️ 买周边", cn:"有小卡吗？", fo:"มีการ์ดไหม", ro:"mee card mai" },
  { lang:"th", cat:"↩️ 退换货", cn:"能退款吗？", fo:"ขอคืนเงินได้ไหม", ro:"kho kuen ngern dai mai" },
  { lang:"th", cat:"↩️ 退换货", cn:"能换一个吗？", fo:"เปลี่ยนได้ไหม", ro:"plian dai mai" },
  { lang:"th", cat:"🆘 应急求助", cn:"救命！", fo:"ช่วยด้วย!", ro:"chuay duay" },
  { lang:"th", cat:"🆘 应急求助", cn:"我迷路了", fo:"ฉันหลงทาง", ro:"chan long thang" },
  /* 粤语 */
  { lang:"yue", cat:"🎤 演唱会喊话", cn:"我们永远支持你！", fo:"我哋永远支持你！", ro:"ngo dei wing jyun zi ci nei" },
  { lang:"yue", cat:"🎤 演唱会喊话", cn:"好帅啊！", fo:"好靓仔啊！", ro:"hou leng zai a" },
  { lang:"yue", cat:"🎤 演唱会喊话", cn:"看这边！", fo:"望呢边啊！", ro:"mong ni bin a" },
  { lang:"yue", cat:"🧭 问路交通", cn:"请问地铁站怎么走？", fo:"唔该，地铁站点去啊？", ro:"m-goi, dei-tit-zaam dim heoi a" },
  { lang:"yue", cat:"🧭 问路交通", cn:"去亚博怎么坐车？", fo:"去亚博点搭车啊？", ro:"heoi aa-bok dim daap ce a" },
  { lang:"yue", cat:"🛍️ 买周边", cn:"这个多少钱？", fo:"呢个几多钱啊？", ro:"ni go gei do cin a" },
  { lang:"yue", cat:"🛍️ 买周边", cn:"有没有小卡？", fo:"有冇小卡啊？", ro:"jau mou siu kaa a" },
  { lang:"yue", cat:"🛍️ 买周边", cn:"能便宜点吗？", fo:"可唔可以平啲啊？", ro:"ho m ho ji peng di a" },
  { lang:"yue", cat:"↩️ 退换货", cn:"我想退货", fo:"唔该我想退货", ro:"m-goi ngo soeng teoi fo" },
  { lang:"yue", cat:"↩️ 退换货", cn:"可以换一件吗？", fo:"可唔可以换过件啊？", ro:"ho m ho ji wun gwo gin a" },
  { lang:"yue", cat:"🆘 应急求助", cn:"请帮帮忙！", fo:"唔该帮帮手！", ro:"m-goi bong bong sau" },
  { lang:"yue", cat:"🆘 应急求助", cn:"我迷路了", fo:"我荡失路啊", ro:"ngo dong sat lou a" },
];
const BILI_LINKS = [
  { t:"韩语应援口号教学（收藏最多）", k:"韩语应援口号教学", o:"stow" },
  { t:"韩语追星常用语速成（收藏最多）", k:"韩语追星常用语", o:"stow" },
  { t:"日语演唱会常用语（收藏最多）", k:"日语演唱会常用语", o:"stow" },
  { t:"泰语旅游常用语（收藏最多）", k:"泰语旅游常用语教学", o:"stow" },
  { t:"粤语日常用语速成（收藏最多）", k:"粤语日常用语速成", o:"stow" },
  { t:"韩国购物退税攻略（播放最多）", k:"韩国购物退税攻略", o:"click" },
  { t:"日本中古店淘小卡攻略（播放最多）", k:"日本中古店小卡攻略", o:"click" },
];

/* ---------------- 行李分类清单 ---------------- */
const LUGGAGE = {
  carry: { title:"🎒 随身（安检可带）", items:["护照/通行证/身份证原件","充电宝（≤100Wh≈20000mAh，标识清晰，必须随身）","应援棒（锂电池随身不托运）","手机/平板/相机（民用非专业）","小卡/手幅（少量自用）","少量现金 + 银行卡","处方药（附处方单据）","眼镜/望远镜（部分场馆限倍数）","空水瓶（过安检后接水）"] },
  checkin: { title:"🧳 托运（不能随身）", items:["洗护液体 >100ml（防晒/卸妆水等）","剪刀/美工刀/胶带","灯牌支架/金属杆","雨伞（长柄伞多数场馆禁入）","喷雾类（非易燃标识）","专辑/杂志（重！放行李箱）","衣物鞋帽/穿搭道具","folding 小板凳（排队神器）"] },
  banned: { title:"🚫 禁止入境（目的地海关）", items:["肉制品：韩国/日本严查（火腿肠、肉松零食都不行）","新鲜水果/蔬菜/蛋制品","电子烟：泰国违法，可能被拘留罚款","超量香烟（港澳每人仅 19 支）","超额现金不申报（各地限额见目的地攻略）","盗版周边/盗摄制品","管制药品（部分止咳水/安眠药需处方）"] },
};
const LUGGAGE_FAN = [
  "🪄 应援棒：锂电池必须随身携带，不可托运；过安检时主动取出",
  "🃏 小卡：自用少量没问题；整盒/大量携带可能被海关认定为商业用途要求申报补税",
  "📼 胶带/拍立得相纸：托运更稳妥；大量胶带可能被开箱问询用途",
  "💡 灯牌：可拆卸电池的随身带电池、灯体托运；尺寸超 A4 多数场馆禁入",
  "📸 相机：可换镜头相机（微单/单反）多数演唱会禁止入场，出发前查场馆规定",
  "💰 现金：韩国 USD1万 / 日本 100万円 / 港澳 12万(HKD/MOP) 以上必须申报",
];

/* ---------------- 境外省钱工具 ---------------- */
const FX_RATES = [
  { c:"KRW 韩元", code:"KRW", r:0.0053 }, { c:"JPY 日元", code:"JPY", r:0.048 }, { c:"THB 泰铢", code:"THB", r:0.205 },
  { c:"HKD 港币", code:"HKD", r:0.92 }, { c:"MOP 澳门币", code:"", r:0.90 }, { c:"SGD 新加坡元", code:"SGD", r:5.4 },
  { c:"USD 美元", code:"USD", r:7.15 },
];
const TRANSIT_CARDS = [
  ["🇰🇷 首尔 T-money","便利店(GS25/CU)购卡 ₩2,500，充值现金；地铁单程比现金票省 ₩100+，公交地铁 30 分钟内换乘免费/折扣","退卡：便利店可退余额（手续费 ₩500）","https://www.t-money.co.kr/"],
  ["🇯🇵 东京 Suica/PASMO","iPhone 钱包 App 可直接开通电子卡免押金；实体卡机场有售；JR/地铁/便利店通用","短期游客卡 Welcome Suica 免押金（28天有效）","https://www.jreast.co.jp/multi/zh-CHS/suica/welcome.html"],
  ["🇹🇭 曼谷 Rabbit Card","BTS 站台购卡 ฿100 工本费；比单程票省时省钱；便利店/麦当劳也能刷","MRT 另一套系统，用银联/Visa 拍卡进站即可","https://www.bts.co.th/"],
  ["🇨🇳 香港 八达通","内地手机 App 可开电子八达通（支付宝/微信内搜）；地铁便利店茶餐厅通用","机场快线用「二维码单程票」网上买有折扣","https://www.octopus.com.hk/"],
  ["🇨🇳 澳门 免费穿梭巴","各大度假村免费穿梭巴士覆盖机场/口岸/景点，善用 = 交通全免费","支付宝/微信在澳门大部分场景直接可用","https://www.macaotourism.gov.mo/"],
];
const CHEAP_STORES = [
  ["香港·亚博","东涌站东荟城名店仓（1 站）有平价超市 & 麦当劳；亚博场内水 HK$20+，东涌便利店 HK$8","演出日 3 号馆外有临时补给车，价格略高"],
  ["澳门·金光大道","氹仔旧城区「大利来记」周边有本地超市来来/大昌，比度假村便利店便宜一半","威尼斯人/银河美食广场比正餐餐厅便宜 60%"],
  ["首尔·高尺/KSPO","场馆周边 GS25/CU 便利店密集，紫菜包饭 ₩2,500 解决一餐；奶茶选 MEGA COFFEE（₩2,000 级）","演出日场馆门口小摊溢价高，提前 1 站买好"],
  ["东京·各会场","7-11/全家/罗森饭团 ¥130~180，OK Store/业务超市更便宜；自动贩卖机水比便利店便宜","Tokyo Dome 周边 LaQua 有平价连锁餐厅"],
  ["曼谷·IMPACT","场馆在郊区！务必在市区 7-11 买好水和小吃再出发；场内餐饮排队 30 分钟起","IMPACT 商场 Food Court 充值卡制，比档口便宜"],
];

/* ---------------- 境外应急包 ---------------- */
const SOS_PACKS = [
  { id:"kr", name:"🇰🇷 韩国", rows:[
    ["🚔 当地报警","112（可要求中文翻译服务）"],["🚑 急救/火警","119"],
    ["🏛️ 中国驻韩国大使馆","+82-2-755-0572（首尔中区明洞）"],["🌏 领保应急热线","+86-10-12308"],
    ["🏥 有中文服务的医院","首尔severance医院国际诊疗中心 +82-2-2228-5800"],
    ["🪪 护照丢失怎么办","1️⃣ 就近警察署报案取「遗失证明」→ 2️⃣ 带证件照2张+身份证明到大使馆办「旅行证」（约2~4个工作日）→ 3️⃣ 凭旅行证+遗失证明出境"]]},
  { id:"jp", name:"🇯🇵 日本", rows:[
    ["🚔 当地报警","110"],["🚑 急救/火警","119"],
    ["🏛️ 中国驻日本大使馆","+81-3-3403-3388（东京港区）"],["🌏 领保应急热线","+86-10-12308"],
    ["🏥 有中文服务的医院","东京圣路加国际医院 +81-3-3541-5151"],
    ["🪪 护照丢失怎么办","1️⃣ 交番（派出所）报案取「遗失届受理证明」→ 2️⃣ 大使馆办旅行证 → 3️⃣ 机场出境时向入国管理局说明"]]},
  { id:"th", name:"🇹🇭 泰国", rows:[
    ["🚔 当地报警","191 ｜ 旅游警察 1155（有中文）"],["🚑 急救","1669"],
    ["🏛️ 中国驻泰国大使馆","+66-2-245-7010（曼谷）"],["🌏 领保应急热线","+86-10-12308"],
    ["🏥 有中文服务的医院","曼谷医院 Bangkok Hospital +66-2-310-3000（有中文部）"],
    ["🪪 护照丢失怎么办","1️⃣ 就近警局报案 → 2️⃣ 大使馆办旅行证 → 3️⃣ 泰国移民局补办入境章（重要！否则出境罚款）"]]},
  { id:"hk", name:"🇨🇳 中国香港", rows:[
    ["🚔 报警/急救","999"],
    ["🏛️ 外交部驻港特派员公署","+852-3413-2424"],["🌏 领保应急热线","+86-10-12308"],
    ["🏥 公立医院急症室","玛嘉烈医院 +852-2990-1111（近机场方向）"],
    ["🪪 通行证丢失怎么办","1️⃣ 警署报案取报失纸 → 2️⃣ 中国旅行社（中旅社）办「入出境通行证」→ 3️⃣ 凭证件经口岸返回内地补办"]]},
  { id:"mo", name:"🇨🇳 中国澳门", rows:[
    ["🚔 报警/急救","999"],
    ["🏛️ 外交部驻澳门特派员公署","+853-8791-1201"],["🌏 领保应急热线","+86-10-12308"],
    ["🏥 医院","仁伯爵综合医院（山顶医院）+853-2831-3731"],
    ["🪪 通行证丢失怎么办","1️⃣ 治安警察局报案 → 2️⃣ 中旅社（澳门）办一次性「入出境通行证」→ 3️⃣ 经口岸返回内地补办"]]},
];

/* ---------------- 现场工具箱数据 ---------------- */
/* 应援色 / 粉丝色（结合官方公告与公开资料核对，o 字段说明来源/是否官方） */
const FAN_COLORS = [
  { n:"TWICE", c:"#FBCEB1", o:"官方粉丝色 Apricot（杏色）" },
  { n:"SEVENTEEN", c:"#F7CAC9", o:"官方粉丝色 Rose Quartz（玫瑰石英粉）" },
  { n:"BTS", c:"#8A2BE2", o:"粉丝色 Purple（紫）" },
  { n:"BLACKPINK", c:"#F19CBB", o:"黑 + 粉（官方 LOGO / 周边用色）" },
  { n:"NCT", c:"#E6DFD3", o:"官方粉丝色 Pearl Neo Champagne（珍珠香槟）" },
  { n:"EXO", c:"#C0C0C0", o:"官方周边用色 Silver（银）" },
  { n:"aespa", c:"#5A7FE7", o:"MY 粉丝，官方手灯蓝紫" },
  { n:"(G)I-DLE", c:"#C026D3", o:"官方粉丝色 Neon Red & Chic Violet" },
  { n:"IVE", c:"#E84A5F", o:"（暂无官方粉丝色，以官方手灯为准）" },
  { n:"ITZY", c:"#E4CDBA", o:"（暂无官方粉丝色，以官方手灯为准）" },
  { n:"ENHYPEN", c:"#8E9FD6", o:"（官方未定应援色，ENGENE 手灯球体）" },
  { n:"Stray Kids", c:"#C0392B", o:"（官方未定，Nachimbong 手灯红/银/白）" },
  { n:"BABYMONSTER", c:"#E02424", o:"官方粉丝色 Red & Black（红+黑）" },
  { n:"TREASURE", c:"#34495E", o:"（暂无官方粉丝色，以官方手灯为准）" },
  { n:"ILLIT", c:"#FF9EBB", o:"（暂无官方粉丝色，以官方手灯为准）" },
  { n:"INI", c:"#DCE6F2", o:"日本官方手灯默认白光（可 App 自定义）" },
  { n:"SEKAI NO OWARI", c:"#FFD1DC", o:"官方应援棒灯光色 ライトピンク（浅粉）" },
];
const BAN_DATA = {
  "香港·亚洲国际博览馆":[
    ["专业相机/可换镜头相机","禁止","演唱会场次禁止专业摄影摄像设备"],
    ["自拍杆/三脚架/稳定器","禁止","一律禁止入场"],
    ["外带食物饮品","禁止","场内有售卖点（价格较高，进场前吃饱）"],
    ["充电宝","限制","≤20000mAh(100Wh) 且标识清晰可随身"],
    ["大型背包/行李箱","限制","超过 A3 尺寸需寄存，寄存位有限请早到"],
    ["灯牌","限制","通常限 A4 内、不可带电池闪烁（以场次公告为准）"],
    ["激光笔/无人机","禁止","绝对禁止"],
    ["雨伞","限制","长柄伞禁入，折叠伞需收纳入包"]],
  "澳门·银河综艺馆":[
    ["专业摄影/录影设备","禁止","含长焦镜头相机"],
    ["外带食物饮品","禁止","可在度假村美食广场用餐后入场"],
    ["自拍杆/脚架","禁止","一律禁止"],
    ["充电宝","限制","≤20000mAh 随身可带"],
    ["横幅/灯牌","限制","尺寸超 A3 或杆状支架禁入（以场次公告为准）"],
    ["无人机","禁止","全澳门禁飞区多，别带"],
    ["打火机/喷雾","限制","安检可能暂存"]],
  "澳门·威尼斯人综艺馆":[
    ["专业相机","禁止","可换镜头相机禁止入场"],
    ["外带食物饮品","禁止","场内及商场餐饮丰富"],
    ["自拍杆/三脚架","禁止","一律禁止"],
    ["充电宝","限制","≤20000mAh 随身"],
    ["灯牌/横幅","限制","以当场公告为准，杆状支架禁入"],
    ["大件行李","限制","请寄存酒店礼宾部（免费）"]],
  "澳门·新濠影汇综艺馆":[
    ["专业相机","禁止","可换镜头相机禁止"],
    ["外带食物饮品","禁止","影汇美食广场可提前用餐"],
    ["自拍杆/脚架","禁止","一律禁止"],
    ["充电宝","限制","≤20000mAh 随身"],
    ["灯牌","限制","以当场公告为准"]],
  "内地场馆通用（上海/广州等）":[
    ["专业相机/长焦","禁止","「一米三炮」一律禁入，手机拍摄OK"],
    ["无人机","禁止","场馆均为禁飞区"],
    ["自拍杆/三脚架","禁止","含八爪鱼支架"],
    ["充电宝","限制","部分场馆禁入或限 1 个≤20000mAh，看当场公告"],
    ["外带食品饮料","禁止","瓶装水通常需去盖或禁入"],
    ["灯牌","限制","多数限 A4 内、禁带电池灯牌"],
    ["玻璃瓶/易拉罐","禁止","安检没收"],
    ["应援棒","限制","官方应援棒OK，改装/超大尺寸可能被拦"]],
  "首尔·高尺天空巨蛋/KSPO DOME":[
    ["可换镜头相机","禁止","饭拍严查场次连微单都禁"],
    ["外带食物","限制","简单零食通常OK，外卖/酒类禁止"],
    ["应援棒","限制","需官方正版+当场专辑核验（部分场次）"],
    ["灯牌","限制","LED 灯牌多数禁止，纸质手幅OK"],
    ["充电宝","限制","随身可带，注意容量标识"],
    ["横幅","禁止","个人横幅悬挂禁止"]],
  "曼谷·IMPACT Arena":[
    ["专业相机","禁止","可换镜头相机禁止"],
    ["外带食物饮品","禁止","安检严格，场外喝完再进"],
    ["自拍杆","禁止","一律禁止"],
    ["iPad/平板拍摄","限制","部分场次禁止举平板拍摄"],
    ["灯牌","限制","以主办方公告为准"],
    ["雨伞","限制","需寄存"]],
  "东京·东京巨蛋":[
    ["可换镜头相机/单反","禁止","演唱会场次严查，连微单都可能禁"],
    ["外带食物饮品","禁止","场内餐饮丰富，开场前用餐"],
    ["自拍杆/三脚架","禁止","含八爪鱼支架"],
    ["充电宝","限制","随身可带，注意容量标识"],
    ["应援棒","限制","官方应援棒OK，超大/改装可能被拦"],
    ["横幅/灯牌","禁止","个人大型横幅禁止"]],
  "新加坡·室内体育馆":[
    ["专业相机","禁止","可换镜头相机禁止入场"],
    ["外带食物饮品","禁止","场馆内餐饮选择多"],
    ["自拍杆","禁止","一律禁止"],
    ["充电宝","限制","≤20000mAh 随身"],
    ["灯牌/横幅","限制","以当场公告为准"]],
  "首尔·KSPO DOME":[
    ["可换镜头相机","禁止","KSPO 各馆禁止携带任何饮食与专业摄影"],
    ["外带食物饮料","禁止","场内禁止携带任何饮食"],
    ["应援棒","限制","部分场次需官方正版+专辑核验"],
    ["灯牌","限制","LED 灯牌多数禁止，纸质手幅OK"],
    ["充电宝","限制","随身可带，注意容量标识"],
    ["横幅","禁止","个人横幅悬挂禁止"]],
};

/* ---------------- 社区种子数据 ---------------- */
const BLOCKED_WORDS = ["黄牛","代抢","加价出","溢价出","私生","跟机","跟车","住址","航班号出","代拍视频","内部票","预留票","转账","定金","傻逼","滚","脑残","去死","诈骗","赌博","博彩","色情","裸聊","涉黄","代付","套现","刷单","杀猪盘","高价收票","求购门票","门票转让","ticket转","代购有售","私下交易","私下金钱"];
const SEED_POSTS = [
  { id:1, show:"itzy-macau", type:"🚪 入场调整", title:"【置顶】ITZY 澳门场 8/15 入场时间与安检提示", content:"根据澳门售票网公告，威尼斯人综艺馆通常提前 1.5 小时开放入场；人流高峰在开演前 40 分钟，建议早到。大件行李请先寄存酒店礼宾部。", time:"2026-07-28 20:15", pinned:true, likes:328, by:"管理员" },
  { id:2, show:"enhypen-macau", type:"🚌 交通变更", title:"【置顶】ENHYPEN 澳门场 横琴口岸穿梭巴士提示", content:"演出日银河免费穿梭巴士高峰加密；散场后口岸方向人流大，横琴口岸通关至 24:00，建议预留 1 小时缓冲。", time:"2026-07-27 15:40", pinned:true, likes:207, by:"管理员" },
  { id:3, show:"ive-hk", type:"🏨 拼房拼车", title:"IVE 香港场 9/4-9/6 找 1 位女生拼房", content:"已订东涌希尔顿花园大床改双床，人均约 ¥440/晚。要求作息正常、不带外人。站内信联系～", time:"2026-07-26 22:10", pinned:false, likes:43, by:"小蓝莓拿铁" },
  { id:4, show:"top-hk", type:"💡 经验分享", title:"亚博 Arena 散场攻略（去过 5 次的经验）", content:"散场别挤博览馆站第一波！先去 1 号馆星巴克坐 20 分钟，机场快线会加开班次，20 分钟后进站几乎不用排队。", time:"2026-07-25 18:05", pinned:false, likes:501, by:"亚博常客" },
  { id:5, show:"lay-macau", type:"📣 应援时间", title:"张艺兴澳门场应援物领取通知（群通知汇总）", content:"站子通知：演出日 15:00 威尼斯人西翼广场集合发放手幅，先到先得，凭票根领取。", time:"2026-07-28 09:22", pinned:false, likes:156, by:"兴迷站子" },
];
const SEED_SWAPS = [
  { id:1, name:"ITZY 澳门场限定手幅（留真ver.）", type:"手幅", idol:"ITZY", show:"itzy-macau", count:2, want:"换礼志 or 彩领 ver. 1:1", place:"演出当天 15:00 威尼斯人西翼广场", status:"求换", time:"2026-07-28" },
  { id:2, name:"IVE 专辑特典小卡（张员瑛）", type:"小卡", idol:"IVE", show:"ive-hk", count:1, want:"换安兪真同专小卡", place:"9/4 中午 东涌东荟城星巴克", status:"求换", time:"2026-07-27" },
  { id:3, name:"ENHYPEN 应援横幅贴纸 20 张", type:"灯牌配件", idol:"ENHYPEN", show:"enhypen-macau", count:20, want:"免费送！关注站子即可", place:"演出当天 16:00 银河东翼广场", status:"求换", time:"2026-07-26" },
  { id:4, name:"TREASURE 官方小卡保护壳（已换出）", type:"徽章/挂件", idol:"TREASURE", show:"treasure-hk", count:1, want:"已完成互换", place:"—", status:"已换", time:"2026-07-24" },
];

/* ---------------- 工具函数 ---------------- */
const $ = (id) => document.getElementById(id);
function toast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove("show"), 2600); }
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
function store(key, val) { localStorage.setItem("stargo_" + key, JSON.stringify(val)); }
function load(key, def) { try { const v = localStorage.getItem("stargo_" + key); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
function parseDT(s) { return new Date(s.replace(" ", "T") + ":00"); }
function pad(n) { return String(n).padStart(2, "0"); }
function fmtICS(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00"; }
function showById(id) { return SHOWS.find((s) => s.id === id); }
function hasBlocked(text) { return BLOCKED_WORDS.find((w) => text.includes(w)); }
function showModal(html) { $("modal-body").innerHTML = html; $("modal-mask").classList.add("show"); }
function closeModal() { $("modal-mask").classList.remove("show"); }

/* ---------------- 页面切换（未登录仅可浏览首页） ---------------- */
function switchTab(tab) {
  if (tab !== "home" && !currentUser()) {
    openAuth("login");
    toast("🔒 请先登录 / 注册，登录后可解锁全部功能");
    return;
  }
  document.querySelectorAll(".tab-page").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  $("tab-" + tab).classList.add("active");
  if (tab === "mine") renderMine();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function switchSub(sub) {
  const page = $("sub-" + sub).closest(".tab-page");
  page.querySelectorAll(".sub-page").forEach((p) => p.classList.remove("active"));
  page.querySelectorAll(".sub-tab").forEach((b) => b.classList.toggle("active", b.dataset.sub === sub));
  $("sub-" + sub).classList.add("active");
}

/* ================================================================
   模块1：抢票提醒（真实数据 + 时间筛选 + 分页加载）
================================================================ */
const PLATFORM_TAG = { "大麦":"tag-pink", "猫眼":"tag-red", "金光票务":"tag-blue", "官方渠道":"tag-purple" };
let showPage = 1, timeRangeDays = 0;
const PAGE_SIZE = 10;

function initTicket() {
  const cities = [...new Set(SHOWS.map((s) => s.city))];
  $("f-city").innerHTML = '<option value="">全部城市</option>' + cities.map((c) => `<option>${c}</option>`).join("");
  const plats = [...new Set(SHOWS.map((s) => s.platform))];
  $("f-platform").innerHTML = '<option value="">全部平台</option>' + plats.map((p) => `<option>${p}</option>`).join("");
  renderShows();
  renderChecklist();
  renderReminders();
  setInterval(tickCountdowns, 1000);
  setInterval(checkReminders, 20000);
  checkReminders();
}
function setTimeRange(days, btn) {
  timeRangeDays = days;
  document.querySelectorAll(".time-chip").forEach((b) => b.classList.toggle("active", b === btn));
  resetShowPage();
}
function resetShowPage() { showPage = 1; renderShows(); }
function loadMoreShows() { showPage++; renderShows(); }

function filteredShows() {
  const p = $("f-platform").value, c = $("f-city").value, a = $("f-artist").value.trim().toLowerCase();
  const now = Date.now();
  return SHOWS.filter((s) => {
    if (p && s.platform !== p) return false;
    if (c && s.city !== c) return false;
    if (a && !s.artist.toLowerCase().includes(a) && !s.title.toLowerCase().includes(a)) return false;
    const showTime = parseDT(s.date).getTime();
    if (showTime < now - 86400000) return false; // 已结束的不展示
    if (timeRangeDays > 0 && showTime > now + timeRangeDays * 86400000) return false;
    return true;
  }).sort((x, y) => parseDT(x.date) - parseDT(y.date));
}
function renderShows() {
  const all = filteredShows();
  const list = all.slice(0, showPage * PAGE_SIZE);
  $("show-list").innerHTML = list.length ? list.map((s) => `
    <div class="show-card">
      <div class="show-top">
        <div>
          <span class="tag ${PLATFORM_TAG[s.platform] || "tag-purple"}">${esc(s.platform)}</span>
          <span class="tag tag-green">${esc(s.city)}</span>
          ${s.open && parseDT(s.open) <= new Date() ? '<span class="tag tag-orange">在售中</span>' : ""}
        </div>
      </div>
      <div class="show-title">${esc(s.title)}</div>
      <div class="show-meta">
        🎤 <b>${esc(s.artist)}</b> · 📍 ${esc(s.venue)}<br>
        🗓️ 演出：<b>${s.date}${s.dateEnd ? " ~ " + s.dateEnd.slice(5) : ""}</b><br>
        ⏰ 开票：<b>${s.open || "待官宣（关注来源公告）"}</b><br>
        💴 票价：${esc(s.price)}
      </div>
      <div class="countdown" data-open="${s.open || ""}" data-date="${s.date}">计算中...</div>
      <div class="show-rules">🪪 ${esc(s.realname)}<br>🎫 ${esc(s.limit)}</div>
      <a class="source-link" href="${esc(s.link)}" target="_blank" rel="noopener">📡 信息来源：${esc(s.source)} · 查看来源公告 →</a>
      <div class="show-actions">
        <button class="btn btn-primary" onclick="addReminder('${s.id}')">🔔 多级提醒</button>
        <button class="btn btn-ghost" onclick="downloadICS('${s.id}')">📅 同步日历(.ics)</button>
        <button class="btn btn-ghost" onclick="googleCal('${s.id}')">🗓 Google 日历</button>
        <button class="btn btn-ghost" onclick="window.open('${esc(s.buy || PLATFORM_MAP[s.platform] || s.link || "")}','_blank')">🎟️ 去${esc(s.platform)}购票</button>
      </div>
    </div>`).join("") : '<p class="empty">该时间范围内暂无演出，试试放宽筛选条件～</p>';
  $("load-more-btn").style.display = all.length > list.length ? "inline-block" : "none";
  $("show-count-text").textContent = `已显示 ${list.length} / ${all.length} 场（信息持续更新中）`;
  tickCountdowns();
}
function tickCountdowns() {
  const now = Date.now();
  document.querySelectorAll(".countdown").forEach((el) => {
    el.classList.remove("soon", "opened");
    const showTime = parseDT(el.dataset.date).getTime();
    if (!el.dataset.open) {
      const dd = Math.max(0, Math.ceil((showTime - now) / 86400000));
      el.textContent = `📢 开票时间待官宣 · 距演出还有 ${dd} 天，点下方来源链接关注最新公告`;
      return;
    }
    const open = parseDT(el.dataset.open).getTime();
    const diff = open - now;
    if (diff <= 0) {
      const dd = Math.max(0, Math.ceil((showTime - now) / 86400000));
      el.textContent = `✅ 已开票（在售中）· 距演出还有 ${dd} 天，售罄可蹲回流票时段`;
      el.classList.add("opened");
    } else {
      const d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24,
            m = Math.floor(diff / 60000) % 60, sec = Math.floor(diff / 1000) % 60;
      el.textContent = `⏳ 距开票还有 ${d} 天 ${h} 时 ${m} 分 ${sec} 秒`;
      if (diff < 3600000) el.classList.add("soon");
    }
  });
}

/* --- 多级提醒 --- */
function askNotifyPermission() {
  if (!("Notification" in window)) return toast("当前浏览器不支持通知，建议使用 Chrome/Edge");
  Notification.requestPermission().then((p) => toast(p === "granted" ? "✅ 浏览器通知已开启！" : "未授权通知，将只用页面弹窗提醒"));
}
function notify(title, body) {
  if ("Notification" in window && Notification.permission === "granted") { try { new Notification(title, { body }); } catch (e) {} }
  toast("🔔 " + title + " — " + body);
}
function addReminder(showId) {
  const s = showById(showId);
  if (!s.open) { window.open(s.link, "_blank"); return toast("该场次开票时间待官宣，已为你打开来源公告页，官宣后回来设提醒～"); }
  const rs = load("reminders", []);
  if (rs.find((r) => r.showId === showId && r.kind === "open")) return toast("已设置过该演出的开票提醒啦～");
  rs.push({ id: Date.now(), kind: "open", showId, title: s.artist + " · " + s.city, openTime: s.open, fired: [] });
  store("reminders", rs);
  renderReminders();
  toast("✅ 已设置多级提醒：开票前 1天 / 3小时 / 30分钟 / 5分钟");
  if (Notification.permission !== "granted") askNotifyPermission();
}
function setFlowReminder() {
  const rs = load("reminders", []);
  const base = Date.now();
  [5, 10, 15].forEach((m) => rs.push({ id: base + m, kind: "flow", title: `回流票蹲守 · 第 ${m} 分钟档`, at: base + m * 60000, fired: [] }));
  store("reminders", rs);
  renderReminders();
  toast("✅ 回流票蹲守提醒已开启：5 / 10 / 15 分钟后依次提醒（请保持页面开启）");
  if (Notification.permission !== "granted") askNotifyPermission();
}
const OPEN_OFFSETS = [[1440, "开票前 1 天"], [180, "开票前 3 小时"], [30, "开票前 30 分钟"], [5, "开票前 5 分钟！！准备进入购票页"]];
function checkReminders() {
  const rs = load("reminders", []);
  const now = Date.now();
  let changed = false;
  rs.forEach((r) => {
    if (r.kind === "open") {
      const open = parseDT(r.openTime).getTime();
      OPEN_OFFSETS.forEach(([mins, label]) => {
        const t = open - mins * 60000;
        if (now >= t && now < open && !r.fired.includes(mins)) { r.fired.push(mins); changed = true; notify(r.title, label); }
      });
    } else if (r.kind === "flow") {
      if (now >= r.at && !r.fired.includes(1)) { r.fired.push(1); changed = true; notify("♻️ 回流票提醒", r.title + "，快去官方渠道刷新看看！"); }
    }
  });
  if (changed) store("reminders", rs);
}
function renderReminders() {
  const rs = load("reminders", []);
  $("reminder-list").innerHTML = rs.length ? rs.map((r) => `
    <div class="reminder-item">
      <span>${r.kind === "open" ? "🎫" : "♻️"} <b>${esc(r.title)}</b> ${r.kind === "open" ? "· 开票 " + r.openTime + "（1天/3h/30m/5m 四级提醒）" : "· " + new Date(r.at).toLocaleTimeString()}</span>
      <button onclick="delReminder(${r.id})">删除</button>
    </div>`).join("") : '<p class="empty">暂无提醒。在上方演出卡片点「🔔 多级提醒」即可添加。</p>';
}
function delReminder(id) { store("reminders", load("reminders", []).filter((r) => r.id !== id)); renderReminders(); toast("已删除提醒"); }

/* --- 日历导出 --- */
function downloadICS(showId) {
  const s = showById(showId);
  const base = s.open ? parseDT(s.open) : parseDT(s.date);
  const end = new Date(base.getTime() + 30 * 60000);
  const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//STARGO//CN","BEGIN:VEVENT",
    "UID:" + s.id + "@stargo","DTSTART:" + fmtICS(base),"DTEND:" + fmtICS(end),
    "SUMMARY:" + (s.open ? "🎫开票｜" : "🎤演出｜") + s.title,
    "DESCRIPTION:平台：" + s.platform + "｜票价：" + s.price + "｜来源：" + s.link + "（仅官方渠道购票，谨防黄牛诈骗）",
    "LOCATION:" + s.venue,
    "BEGIN:VALARM","TRIGGER:-P1D","ACTION:DISPLAY","DESCRIPTION:提前1天提醒","END:VALARM",
    "BEGIN:VALARM","TRIGGER:-PT3H","ACTION:DISPLAY","DESCRIPTION:提前3小时提醒","END:VALARM",
    "BEGIN:VALARM","TRIGGER:-PT30M","ACTION:DISPLAY","DESCRIPTION:提前30分钟提醒","END:VALARM",
    "BEGIN:VALARM","TRIGGER:-PT5M","ACTION:DISPLAY","DESCRIPTION:提前5分钟！","END:VALARM",
    "END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "提醒-" + s.artist + ".ics";
  a.click();
  toast("📅 已下载 .ics 文件，打开即可导入系统/苹果/Outlook 日历（自带四级提醒）");
}
function googleCal(showId) {
  const s = showById(showId);
  const base = s.open ? parseDT(s.open) : parseDT(s.date);
  const end = new Date(base.getTime() + 30 * 60000);
  const url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent((s.open ? "🎫开票｜" : "🎤演出｜") + s.title) +
    "&dates=" + fmtICS(base) + "/" + fmtICS(end) +
    "&details=" + encodeURIComponent("平台：" + s.platform + "｜票价：" + s.price + "｜来源：" + s.link) +
    "&location=" + encodeURIComponent(s.venue);
  window.open(url, "_blank");
}

/* --- 准备清单 --- */
function renderChecklist() {
  const done = load("prep", []);
  $("prep-checklist").innerHTML = PREP_ITEMS.map((it, i) => `
    <label class="check-item ${done.includes(i) ? "done" : ""}">
      <input type="checkbox" ${done.includes(i) ? "checked" : ""} onchange="togglePrep(${i})">
      <span><span class="ci-title">${it.t}</span><br><span class="ci-desc">${it.d}</span></span>
    </label>`).join("");
  const pct = Math.round(done.length / PREP_ITEMS.length * 100);
  $("prep-progress").style.width = pct + "%";
  $("prep-text").textContent = `已完成 ${done.length}/${PREP_ITEMS.length} 项（${pct}%）` + (pct === 100 ? " 🎉 万事俱备，祝抢票成功！" : "");
}
function togglePrep(i) {
  let done = load("prep", []);
  done = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
  store("prep", done);
  renderChecklist();
}

/* ================================================================
   模块2：观演出行
================================================================ */
function initTrip() {
  const keys = [...new Set(SHOWS.map((s) => s.venueKey))];
  $("venue-select").innerHTML = keys.map((k) => `<option value="${k}">${VENUES[k].name}（${VENUES[k].city}）</option>`).join("");
  renderVenue();
}
function renderVenue() {
  const id = $("venue-select").value || Object.keys(VENUES)[0];
  const v = VENUES[id];
  const venueShows = SHOWS.filter((s) => s.venueKey === id && parseDT(s.date) > new Date()).sort((a, b) => parseDT(a.date) - parseDT(b.date));
  const filter = $("hotel-filter").value, sort = $("hotel-sort").value;
  let hotels = v.hotels.filter((h) => filter === "cancel" ? h.cancel : filter === "metro" ? h.metro : filter === "breakfast" ? h.bf : true);
  hotels = [...hotels].sort((a, b) => sort === "price" ? a.p - b.p : 0);

  const mapSVG = `
  <svg viewBox="0 0 100 78" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="场馆周边示意图">
    <rect x="0" y="0" width="100" height="78" fill="#eef4ea"/>
    <path d="M0,68 Q30,60 55,66 T100,62" stroke="#bcd6f0" stroke-width="5" fill="none"/>
    <path d="M10,0 L14,78" stroke="#e3dcc8" stroke-width="3"/>
    <path d="M0,22 L100,16" stroke="#e3dcc8" stroke-width="3"/>
    <ellipse cx="50" cy="44" rx="17" ry="11" fill="#c9b8f5" stroke="#8b5cf6" stroke-width="1"/>
    <text x="50" y="45.5" font-size="3.4" text-anchor="middle" fill="#4c1d95" font-weight="bold">${esc(v.name.split("（")[0])}</text>
    ${v.points.map(([label, x, y]) => `
      <circle cx="${x}" cy="${y}" r="1.6" fill="#ec4899"/>
      <text x="${x + 2.4}" y="${y + 1}" font-size="2.9" fill="#2d2a3e">${esc(label)}</text>`).join("")}
  </svg>`;

  $("venue-detail").innerHTML = `
  <div class="venue-map">
    <h3 style="margin-bottom:4px">📍 ${esc(v.name)} <span class="tag tag-green">${esc(v.city)}</span></h3>
    <p class="panel-sub">${esc(v.addr)} ·
      <a href="https://uri.amap.com/search?keyword=${encodeURIComponent(v.mapQuery)}" target="_blank">高德地图打开</a> ·
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapQuery)}" target="_blank">Google Maps 打开</a> ·
      ${VENUE_SITE[v.name] ? `<a href="${VENUE_SITE[v.name]}" target="_blank" rel="noopener">🏟️ 场馆官网</a>` : ""}</p>
    ${venueShows.length ? `<p class="panel-sub">🎤 近期演出：${venueShows.map((s) => esc(s.artist) + "（" + s.date.slice(5, 10) + "）").join(" · ")}</p>` : ""}
    <div class="map-canvas">${mapSVG}</div>
    <div class="map-legend"><span>🎪 入口/安检</span><span>📍 集合点</span><span>💜 应援区</span><span>📦 寄存</span><span>🚻 卫生间</span><span>🏥 医疗点</span><span>（示意图，具体以现场为准）</span></div>
  </div>

  <div class="grid-3">
    <section class="panel">
      <h3>🏨 酒店推荐 <span class="tag tag-purple">步行/地铁15分钟圈优先</span></h3>
      <p class="panel-sub">价格为演出档期参考价，实际以预订平台为准</p>
      ${hotels.length ? hotels.map((h) => `
      <div class="hotel-card">
        <div>
          <div class="hotel-name">${esc(h.n)}</div>
          <div class="hotel-meta">📍 ${esc(h.d)} ${h.metro ? '<span class="tag tag-blue">近地铁</span>' : ""}${h.cancel ? '<span class="tag tag-green">免费取消</span>' : ""}${h.bf ? '<span class="tag tag-orange">含早</span>' : ""}<br><a class="hotel-book" href="https://www.booking.com/searchresults.html?ss=${encodeURIComponent(h.n)}" target="_blank" rel="noopener">查看/预订 ↗</a></div>
        </div>
        <div class="hotel-price">¥${h.p}<small>/晚</small></div>
      </div>`).join("") : '<p class="empty">该筛选条件下暂无酒店</p>'}
    </section>

    <section class="panel">
      <h3>🚇 出行方案对比</h3>
      <p class="panel-sub">标注末班车时间，散场务必提前规划！</p>
      ${v.routes.map((r) => `<div class="route-card"><b>${esc(r[0])}</b><br>${esc(r[1])}<br><span class="route-last">⏰ ${esc(r[2])}</span></div>`).join("")}
    </section>

    <section class="panel">
      <h3>🎒 必带清单与注意事项</h3>
      <div class="checklist">
        ${v.bring.map((b) => `<div class="check-item" style="cursor:default"><span>${b.startsWith("禁止") ? "🚫" : "✅"}</span><span style="font-size:13.5px">${esc(b)}</span></div>`).join("")}
      </div>
      <div class="advice-box" style="margin-top:12px">🌤️ <b>天气与穿搭：</b>${esc(v.weather)}</div>
      <div class="advice-box warn2" style="margin-top:8px">🚪 <b>入场与安检：</b>${esc(v.entry)}</div>
    </section>
  </div>

  <section class="panel" style="margin-top:18px">
    <h3>🗓️ 我的行程单预览（导出 PDF 即打印此页）</h3>
    <p style="font-size:14px;line-height:2">
      ${venueShows.length ? `<b>演出：</b>${esc(venueShows[0].title)}<br><b>时间：</b>${venueShows[0].date} · ` : ""}<b>场馆：</b>${esc(v.name)}（${esc(v.addr)}）<br>
      <b>入场：</b>${esc(v.entry)}<br>
      <b>提示：</b>证件原件、电子票备份已确认 ✅ · 末班车时间已记牢 ✅
    </p>
    <p class="mini-tip">点击上方「📄 导出 PDF 行程单」，在打印对话框选择「另存为 PDF」即可生成可分享的行程单。</p>
  </section>`;
}
function exportItinerary() { window.print(); }

/* ================================================================
   模块3A：行程花销计算器（含预算红线）
================================================================ */
let redlineWarned = false;
function initBudget() {
  const render = (items, mount) => {
    $(mount).innerHTML = items.map((it) => `
      <div class="b-item">
        <label>${it.label}${it.shared ? " 🤝" : ""}</label>
        <input type="number" min="0" id="b-${it.k}" value="${it.v}" oninput="calcBudget()">
        ${it.hint ? `<span class="hint">💡 ${it.hint}</span>` : ""}
      </div>`).join("");
  };
  render(BUDGET_ITEMS.fixed, "budget-fixed");
  render(BUDGET_ITEMS.float, "budget-float");
  render(BUDGET_ITEMS.hidden, "budget-hidden");
  const rl = load("redline", "");
  if (rl) $("b-redline").value = rl;
  calcBudget();
}
function getBudgetData() {
  const people = Math.max(1, +$("b-people").value || 1);
  const days = Math.max(1, +$("b-days").value || 1);
  const val = (k) => Math.max(0, +($("b-" + k).value) || 0);
  const rows = [];
  let personal = 0, shared = 0;
  const all = [...BUDGET_ITEMS.fixed.map((i) => ({ ...i, cat: "固定项" })), ...BUDGET_ITEMS.float.map((i) => ({ ...i, cat: "浮动项" })), ...BUDGET_ITEMS.hidden.map((i) => ({ ...i, cat: "隐性成本" }))];
  all.forEach((it) => {
    let amt = val(it.k);
    if (it.perNight) amt *= Math.max(1, days);
    if (it.perDay) amt *= days;
    if (amt <= 0) return;
    rows.push({ cat: it.cat, label: it.label, amt, shared: !!it.shared });
    if (it.shared) shared += amt; else personal += amt;
  });
  const total = personal + shared;
  const perPerson = personal + shared / people;
  return { rows, personal, shared, total, perPerson, people, days };
}
function calcBudget() {
  const d = getBudgetData();
  const catSum = {};
  d.rows.forEach((r) => catSum[r.cat] = (catSum[r.cat] || 0) + r.amt);
  const redline = Math.max(0, +$("b-redline").value || 0);
  store("redline", redline || "");
  let redlineHtml = "";
  if (redline > 0) {
    const pct = Math.min(100, Math.round(d.total / redline * 100));
    redlineHtml = `<div class="sum-row"><span>🚨 预算红线</span><b>¥${redline.toLocaleString()}（已用 ${pct}%）</b></div>
      <div class="progress-wrap" style="margin:4px 0 8px"><div class="progress-bar ${pct >= 100 ? "over" : ""}" style="width:${pct}%"></div></div>`;
  }
  $("budget-summary").innerHTML =
    Object.entries(catSum).map(([c, v]) => `<div class="sum-row"><span>${c}</span><b>¥${v.toLocaleString()}</b></div>`).join("") +
    `<div class="sum-row"><span>其中可拼团分摊 🤝</span><b>¥${d.shared.toLocaleString()}</b></div>
     <div class="sum-row total"><span>预算总计（1人承担全部）</span><span>¥${d.total.toLocaleString()}</span></div>
     <div class="sum-row per"><span>拼团人均（${d.people}人 · ${d.days}天）</span><span>¥${Math.round(d.perPerson).toLocaleString()}</span></div>` + redlineHtml;

  const tips = [];
  const emg = +($("b-emergency").value) || 0;
  const suggest = Math.round(d.total * 0.1);
  if (emg < suggest) tips.push(`⚠️ 应急备用金建议 ≥ 总预算 10%（约 ¥${suggest.toLocaleString()}），当前仅 ¥${emg}`);
  if (d.people === 1 && d.shared > 0) tips.push(`💰 省钱方案：酒店+打车共 ¥${d.shared.toLocaleString()} 可拼团分摊，2 人拼省 ¥${Math.round(d.shared / 2).toLocaleString()}，4 人拼省 ¥${Math.round(d.shared * 3 / 4).toLocaleString()}`);
  const daipai = +($("b-daipai").value) || 0;
  if (daipai > 0) tips.push("🚨 检测到代拍/溢价支出——代拍溢价风险高、无保障，强烈建议官方渠道理性消费！");
  tips.push(`📊 人均参考：国内跟场约 ¥2,500~4,500 / 次；港澳场约 ¥4,000~7,000；日韩泰场约 ¥6,000~12,000（含机酒）`);
  tips.push(`🎯 弹性预算建议：在总预算上浮 15%（约 ¥${Math.round(d.total * 1.15).toLocaleString()}）设为心理上限，超过即止损`);
  $("budget-advice").innerHTML = tips.map((t) => `<div class="advice-box ${t.startsWith("⚠️") || t.startsWith("🚨") ? "warn2" : ""}">${t}</div>`).join("");

  /* 冲动消费弹窗 */
  if (redline > 0 && d.total > redline) {
    if (!redlineWarned) {
      redlineWarned = true;
      showModal(`<h3 style="margin-bottom:10px">🚨 冲动消费提醒</h3>
        <p style="font-size:14px;margin-bottom:10px">本次行程预算 <b style="color:#dc2626">¥${d.total.toLocaleString()}</b> 已超过你设定的红线 <b>¥${redline.toLocaleString()}</b>（超出 ¥${(d.total - redline).toLocaleString()}）。<br>为爱发电也要量力而行，先看看能省哪里？</p>
        <div class="modal-tips">${SAVE_TIPS.slice(0, 4).map((t) => `<div class="advice-box" style="margin-top:8px">${t}</div>`).join("")}</div>`);
    }
  } else { redlineWarned = false; }
}
function exportBudgetCSV() {
  const d = getBudgetData();
  let csv = "\uFEFF分类,项目,金额(元),是否可分摊\n";
  d.rows.forEach((r) => csv += `${r.cat},${r.label.replace(/,/g, "，")},${r.amt},${r.shared ? "是" : "否"}\n`);
  csv += `合计,总预算,${d.total},\n合计,拼团人均(${d.people}人),${Math.round(d.perPerson)},\n`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "追星花销账单.csv";
  a.click();
  toast("📥 账单已导出为 CSV，可用 Excel/WPS 打开");
}
function copyBudgetText() {
  const d = getBudgetData();
  let txt = "🌟 追星花销账单（STARGO）\n";
  d.rows.forEach((r) => txt += `· ${r.label}：¥${r.amt}${r.shared ? "（可分摊）" : ""}\n`);
  txt += `—— 总计：¥${d.total} ｜ ${d.people}人拼团人均：¥${Math.round(d.perPerson)}`;
  navigator.clipboard.writeText(txt).then(() => toast("📋 账单文本已复制，去粘贴给小伙伴吧！")).catch(() => toast("复制失败，请手动截图"));
}

/* ================================================================
   模块3B：追星收纳台账
================================================================ */
const LG_CATS = ["小卡","手幅","专辑","杂志","官方周边","闲鱼二手·买入","闲鱼二手·卖出（回血）","代购/其他"];
const LG_COLORS = { "小卡":"#ec4899","手幅":"#8b5cf6","专辑":"#3b82f6","杂志":"#06b6d4","官方周边":"#f59e0b","闲鱼二手·买入":"#ef4444","闲鱼二手·卖出（回血）":"#10b981","代购/其他":"#6b7280" };
let lgOffset = 0; /* 期数偏移：0=当期，-1=上一期 */
let lgWarnedPeriod = "";

function initLedger() {
  $("lg-date").value = new Date().toISOString().slice(0, 10);
  const b = load("lgbudget", "");
  if (b) $("lg-budget").value = b;
  if (!load("ledger", null)) {
    /* 首次演示数据 */
    const today = new Date(), ym = today.toISOString().slice(0, 8);
    store("ledger", [
      { id:1, date: ym + "05", cat:"专辑", name:"ITZY 新专辑 ×2（示例数据，可删除）", amt:196 },
      { id:2, date: ym + "12", cat:"小卡", name:"张员瑛特典卡（示例数据，可删除）", amt:88 },
      { id:3, date: ym + "18", cat:"闲鱼二手·卖出（回血）", name:"重复小卡出掉（示例数据）", amt:45 },
    ]);
  }
  renderLedger();
}
function getLedger() { return load("ledger", []); }
function saveLedgerBudget() { store("lgbudget", Math.max(0, +$("lg-budget").value || 0) || ""); lgWarnedPeriod = ""; renderLedger(true); }
function addLedger() {
  const date = $("lg-date").value, cat = $("lg-cat").value, name = $("lg-name").value.trim(), amt = Math.abs(+$("lg-amt").value || 0);
  if (!date || !name || !amt) return toast("请填写日期、名称和金额～");
  const list = getLedger();
  list.unshift({ id: Date.now(), date, cat, name, amt });
  store("ledger", list);
  $("lg-name").value = ""; $("lg-amt").value = "";
  lgOffset = 0;
  renderLedger(true);
  toast("✅ 已记入台账");
}
function delLedger(id) { store("ledger", getLedger().filter((r) => r.id !== id)); renderLedger(); toast("已删除该笔记录"); }
function ledgerNav(dir) { lgOffset += dir; if (lgOffset > 0) lgOffset = 0; renderLedger(); }

function periodInfo() {
  const mode = $("lg-period").value;
  const now = new Date();
  if (mode === "month") {
    const d = new Date(now.getFullYear(), now.getMonth() + lgOffset, 1);
    const key = d.getFullYear() + "-" + pad(d.getMonth() + 1);
    return { mode, key, label: d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月",
      match: (r) => r.date.startsWith(key),
      trendKeys: Array.from({ length: 6 }, (_, i) => { const t = new Date(d.getFullYear(), d.getMonth() - 5 + i, 1); return { k: t.getFullYear() + "-" + pad(t.getMonth() + 1), l: (t.getMonth() + 1) + "月" }; }) };
  }
  if (mode === "quarter") {
    const qBase = Math.floor(now.getMonth() / 3) + lgOffset;
    const y = now.getFullYear() + Math.floor(qBase / 4) - (qBase < 0 && qBase % 4 !== 0 ? 0 : 0);
    const yy = now.getFullYear() + Math.floor(qBase / 4);
    const q = ((qBase % 4) + 4) % 4;
    const months = [q * 3, q * 3 + 1, q * 3 + 2].map((m) => yy + "-" + pad(m + 1));
    return { mode, key: yy + "Q" + (q + 1), label: yy + " 年 Q" + (q + 1),
      match: (r) => months.some((m) => r.date.startsWith(m)),
      trendKeys: Array.from({ length: 4 }, (_, i) => { const qq = qBase - 3 + i; const ty = now.getFullYear() + Math.floor(qq / 4); const tq = ((qq % 4) + 4) % 4; return { k: "Q", months: [tq * 3, tq * 3 + 1, tq * 3 + 2].map((m) => ty + "-" + pad(m + 1)), l: ty + "Q" + (tq + 1) }; }) };
  }
  const y = now.getFullYear() + lgOffset;
  return { mode, key: String(y), label: y + " 年",
    match: (r) => r.date.startsWith(String(y)),
    trendKeys: Array.from({ length: 4 }, (_, i) => ({ k: String(y - 3 + i), l: (y - 3 + i) + "年" })) };
}
function rowNet(r) { return r.cat.includes("卖出") ? -r.amt : r.amt; }
function renderLedger(checkWarn) {
  const p = periodInfo();
  $("lg-period-label").textContent = p.label;
  const rows = getLedger().filter(p.match);
  const spend = rows.filter((r) => !r.cat.includes("卖出")).reduce((a, r) => a + r.amt, 0);
  const back = rows.filter((r) => r.cat.includes("卖出")).reduce((a, r) => a + r.amt, 0);
  const net = spend - back;
  const budget = +load("lgbudget", 0) || 0;

  $("lg-stats").innerHTML = `
    <div class="lg-stat-row">
      <div class="lg-stat"><small>本期支出</small><b>¥${spend.toLocaleString()}</b></div>
      <div class="lg-stat green"><small>二手回血</small><b>+¥${back.toLocaleString()}</b></div>
      <div class="lg-stat pink"><small>净支出</small><b>¥${net.toLocaleString()}</b></div>
      <div class="lg-stat"><small>笔数</small><b>${rows.length}</b></div>
    </div>
    ${budget > 0 && p.mode === "month" ? `<div class="sum-row"><span>🚨 月度红线 ¥${budget.toLocaleString()}</span><b>${net > budget ? '<span style="color:#dc2626">已超支 ¥' + (net - budget).toLocaleString() + "</span>" : "剩余 ¥" + (budget - net).toLocaleString()}</b></div>
    <div class="progress-wrap" style="margin-top:4px"><div class="progress-bar ${net > budget ? "over" : ""}" style="width:${Math.min(100, Math.round(net / budget * 100))}%"></div></div>` : ""}`;

  /* 分类条形图 */
  const catSum = {};
  rows.forEach((r) => { catSum[r.cat] = (catSum[r.cat] || 0) + r.amt; });
  const maxV = Math.max(1, ...Object.values(catSum));
  $("lg-chart").innerHTML = Object.keys(catSum).length ? '<h4 class="lg-sub">📊 分类占比</h4>' + LG_CATS.filter((c) => catSum[c]).map((c) => `
    <div class="lg-bar-row">
      <span class="lg-bar-label">${c.replace("（回血）", "")}</span>
      <div class="lg-bar-track"><div class="lg-bar-fill" style="width:${Math.round(catSum[c] / maxV * 100)}%;background:${LG_COLORS[c]}"></div></div>
      <span class="lg-bar-val">¥${catSum[c].toLocaleString()}</span>
    </div>`).join("") : '<p class="empty">本期暂无记录，左侧记一笔试试～</p>';

  /* 趋势图 */
  const all = getLedger();
  const trendData = p.trendKeys.map((tk) => {
    const match = tk.months ? (r) => tk.months.some((m) => r.date.startsWith(m)) : (r) => r.date.startsWith(tk.k);
    return { l: tk.l, v: all.filter(match).reduce((a, r) => a + rowNet(r), 0) };
  });
  const tMax = Math.max(1, ...trendData.map((t) => Math.abs(t.v)));
  $("lg-trend").innerHTML = '<h4 class="lg-sub">📈 净支出趋势</h4><div class="lg-trend-wrap">' + trendData.map((t) => `
    <div class="lg-trend-col">
      <span class="lg-trend-val">${t.v ? "¥" + t.v.toLocaleString() : ""}</span>
      <div class="lg-trend-bar" style="height:${Math.max(4, Math.round(Math.abs(t.v) / tMax * 90))}px;background:${t.v < 0 ? "#10b981" : "linear-gradient(180deg,#8b5cf6,#ec4899)"}"></div>
      <span class="lg-trend-label">${t.l}</span>
    </div>`).join("") + "</div>";

  /* 明细 */
  $("lg-list").innerHTML = rows.length ? rows.map((r) => `
    <div class="reminder-item">
      <span><span class="lg-dot" style="background:${LG_COLORS[r.cat]}"></span> <b>${esc(r.name)}</b> · ${r.cat} · ${r.date} · <b style="color:${r.cat.includes("卖出") ? "#10b981" : "#db2777"}">${r.cat.includes("卖出") ? "+" : "-"}¥${r.amt.toLocaleString()}</b></span>
      <button onclick="delLedger(${r.id})">删除</button>
    </div>`).join("") : '<p class="empty">本期暂无明细</p>';

  /* 冲动消费弹窗（按月红线） */
  if (checkWarn && budget > 0 && p.mode === "month" && lgOffset === 0 && net > budget && lgWarnedPeriod !== p.key) {
    lgWarnedPeriod = p.key;
    showModal(`<h3 style="margin-bottom:10px">🚨 冲动消费提醒</h3>
      <p style="font-size:14px;margin-bottom:10px">${p.label}追星净支出已达 <b style="color:#dc2626">¥${net.toLocaleString()}</b>，超过你设定的月度红线 <b>¥${budget.toLocaleString()}</b>。<br>爱TA不需要证明消费力，理智追星才能追得更久 💜</p>
      <div class="modal-tips">${SAVE_TIPS.slice(2).map((t) => `<div class="advice-box" style="margin-top:8px">${t}</div>`).join("")}</div>`);
  }
}
function exportLedgerCSV() {
  const rows = getLedger();
  if (!rows.length) return toast("台账还没有记录哦～");
  let csv = "\uFEFF日期,分类,名称,金额(元),方向\n";
  rows.forEach((r) => csv += `${r.date},${r.cat},${r.name.replace(/,/g, "，")},${r.amt},${r.cat.includes("卖出") ? "收入" : "支出"}\n`);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "追星收纳台账.csv";
  a.click();
  toast("📥 台账已导出 CSV");
}

/* ================================================================
   模块4：跨国追星
================================================================ */
function initCulture() {
  $("dest-tabs").innerHTML = DESTS.map((d, i) => `<button class="dest-tab ${i === 0 ? "active" : ""}" data-dest="${d.id}" onclick="renderDest('${d.id}')">${d.name}</button>`).join("");
  renderDest(DESTS[0].id);
  initPhrases();
  initTrans();
  initLuggage();
  initSaveTools();
  initSOS();
}
function renderDest(id) {
  document.querySelectorAll("#dest-tabs .dest-tab").forEach((b) => b.classList.toggle("active", b.dataset.dest === id));
  const d = DESTS.find((x) => x.id === id);
  const xhsKw = (d.name.replace(/[^\u4e00-\u9fa5A-Za-z·\s]/g, "").replace(/·/g, " ").replace(/\s+/g, " ").trim()) + " 追星攻略";
  const xhsUrl = "https://www.xiaohongshu.com/search_result?keyword=" + encodeURIComponent(xhsKw);
  $("dest-detail").innerHTML = `
  <section class="panel xhs-box">
    <h3>🔍 小红书攻略直达</h3>
    <p class="panel-sub">小红书上有大量真实追星 / 旅行攻略笔记，点按钮直达搜索结果（需在网页或 App 登录后查看完整内容）。</p>
    <a class="xhs-btn" href="${xhsUrl}" target="_blank" rel="noopener">🔍 在小红书搜「${esc(xhsKw)}」 →</a>
  </section>
  <section class="panel">
    <h3>⚡ 目的地速览</h3>
    <div class="info-grid">${Object.entries(d.quick).map(([k, v]) => `<div class="info-cell"><b>${k}</b>${esc(v)}</div>`).join("")}</div>
  </section>
  <div class="grid-3">
    <section class="panel">
      <h3>🙏 礼仪与禁忌</h3>
      <div class="checklist">${d.etiquette.map((e) => `<div class="check-item" style="cursor:default"><span>📌</span><span style="font-size:13.5px">${esc(e)}</span></div>`).join("")}</div>
    </section>
    <section class="panel">
      <h3>🏮 非遗 · 景点 · 美食（追星顺路轻行程）</h3>
      <div class="checklist">${d.spots.map((e) => `<div class="check-item" style="cursor:default"><span>✨</span><span style="font-size:13.5px">${esc(e)}</span></div>`).join("")}</div>
    </section>
    <section class="panel">
      <h3>🆘 应急工具</h3>
      <div class="info-grid" style="margin-bottom:12px">
        <div class="info-cell"><b>报警</b>${esc(d.emergency.police)}</div>
        <div class="info-cell"><b>急救</b>${esc(d.emergency.ambulance)}</div>
        <div class="info-cell" style="grid-column:1/-1"><b>使领馆</b>${esc(d.emergency.embassy)}</div>
        <div class="info-cell" style="grid-column:1/-1"><b>实用工具</b>${esc(d.emergency.tips)}</div>
      </div>
      <h3 style="font-size:14px;margin-bottom:8px">🗣️ 常用语卡片（更多请看「外语短句库」）</h3>
      ${d.phrases.map((p) => `<div class="phrase-card"><span>${esc(p[0])}</span><i>${esc(p[1])}</i></div>`).join("")}
    </section>
  </div>
  <section class="panel" style="margin-top:18px">
    <h3>📋 合规提示（入境 / 现金 / 退税）</h3>
    <div class="checklist">${d.compliance.map((c) => `<div class="check-item" style="cursor:default"><span>⚖️</span><span style="font-size:13.5px">${esc(c)}</span></div>`).join("")}</div>
    </section>`;
  const cta = $("cdest-note");
  if (cta) { cta.value = loadNote("cdest_" + id); cta.oninput = () => saveNote("cdest_" + id, cta.value); }
}

/* --- 4.1 外语短句库 --- */
let phraseLang = "ko", favOnly = false;
function initPhrases() {
  $("phrase-langs").innerHTML = PHRASE_LANGS.map((l, i) => `<button class="time-chip ${i === 0 ? "active" : ""}" data-plang="${l.id}" onclick="setPhraseLang('${l.id}',this)">${l.name}</button>`).join("");
  $("bili-links").innerHTML = BILI_LINKS.map((b) => `
    <a class="bili-card" href="https://search.bilibili.com/all?keyword=${encodeURIComponent(b.k)}&order=${b.o}" target="_blank" rel="noopener">
      <span class="bili-icon">📺</span><span>${esc(b.t)}</span><span class="bili-go">B站 →</span>
    </a>`).join("");
  renderPhrases();
}
function setPhraseLang(id, btn) {
  phraseLang = id;
  document.querySelectorAll("#phrase-langs .time-chip").forEach((b) => b.classList.toggle("active", b === btn));
  renderPhrases();
}
function toggleFavView() { favOnly = !favOnly; $("fav-toggle").classList.toggle("btn-primary", favOnly); renderPhrases(); }
function phraseKey(p) { return p.lang + "|" + p.fo; }
function getFavs() { return load("phrasefavs", []); }
function toggleFav(key) {
  let f = getFavs();
  f = f.includes(key) ? f.filter((x) => x !== key) : [...f, key];
  store("phrasefavs", f);
  renderPhrases();
}
function speakPhrase(text, lang) {
  if (!("speechSynthesis" in window)) return toast("当前浏览器不支持语音朗读");
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  const voices = speechSynthesis.getVoices();
  const v = voices.find((vv) => vv.lang.replace("_", "-").startsWith(lang)) || voices.find((vv) => vv.lang.startsWith(lang.split("-")[0]));
  if (v) u.voice = v;
  else if (!voices.length) { /* 声音列表未加载完成，直接播放让系统选择 */ }
  speechSynthesis.speak(u);
}
function renderPhrases() {
  const cat = $("phrase-cat").value;
  const favs = getFavs();
  $("fav-count").textContent = favs.length;
  let list = PHRASES.filter((p) => favOnly ? favs.includes(phraseKey(p)) : p.lang === phraseLang);
  if (cat) list = list.filter((p) => p.cat === cat);
  const langOf = (p) => PHRASE_LANGS.find((l) => l.id === p.lang);
  $("phrase-list").innerHTML = list.length ? `<div class="phrase-grid">` + list.map((p) => {
    const key = phraseKey(p), faved = favs.includes(key);
    return `
    <div class="phrase-big">
      <div class="pb-top"><span class="tag tag-purple">${esc(p.cat)}</span>${favOnly ? `<span class="tag tag-blue">${langOf(p).name}</span>` : ""}</div>
      <div class="pb-cn">${esc(p.cn)}</div>
      <div class="pb-fo">${esc(p.fo)}</div>
      <div class="pb-ro">${esc(p.ro)}</div>
      <div class="pb-actions">
        <button class="btn btn-sm btn-ghost" onclick="speakPhrase('${esc(p.fo).replace(/'/g, "\\'")}','${langOf(p).tts}')">🔊 朗读</button>
        <button class="btn btn-sm ${faved ? "btn-primary" : "btn-ghost"}" onclick="toggleFav('${key.replace(/'/g, "\\'")}')">${faved ? "⭐ 已收藏" : "☆ 收藏"}</button>
      </div>
    </div>`;
  }).join("") + "</div>" : '<p class="empty">' + (favOnly ? "还没有收藏短句，点各短句的「☆ 收藏」即可加入～" : "该分类下暂无短句") + "</p>";
}

/* --- 4.1b 自动翻译（MyMemory 免费引擎，无需 key） --- */
let transLang = "ko";
function initTrans() {
  $("trans-langs").innerHTML = PHRASE_LANGS.map((l, i) => `<button class="time-chip ${i === 0 ? "active" : ""}" data-tl="${l.id}" onclick="setTransLang('${l.id}',this)">${l.name}</button>`).join("");
}
function setTransLang(id, btn) {
  transLang = id;
  document.querySelectorAll("#trans-langs .time-chip").forEach((b) => b.classList.toggle("active", b === btn));
}
async function doTranslate() {
  const ta = $("trans-input");
  const text = (ta.value || "").trim();
  if (!text) return toast("请先输入要翻译的内容");
  const langOf = PHRASE_LANGS.find((l) => l.id === transLang);
  const target = transLang === "yue" ? "zh-HK" : transLang;
  const box = $("trans-result");
  box.innerHTML = `<div class="trans-loading">🌐 翻译中…</div>`;
  try {
    const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=zh-CN%7C" + target;
    const resp = await fetch(url);
    const j = await resp.json();
    const t = j && j.responseData && j.responseData.translatedText;
    if (!t || (j.responseStatus && j.responseStatus !== 200) || /MYMEMORY WARNING/i.test(t)) {
      box.innerHTML = `<div class="trans-err">⚠️ 翻译服务暂不可用（免费额度可能已用尽或网络异常）。请稍后重试，或改用上方「外语短句库」里的现成常用句。</div>`;
      return;
    }
    box.innerHTML = `
      <div class="trans-card">
        <div class="trans-fo">${esc(t)}</div>
        <div class="pb-actions">
          <button class="btn btn-sm btn-ghost" id="trans-speak">🔊 朗读</button>
          <button class="btn btn-sm btn-ghost" id="trans-save">📋 存到我的短句</button>
        </div>
      </div>`;
    document.getElementById("trans-speak").addEventListener("click", () => speakPhrase(t, langOf.tts));
    document.getElementById("trans-save").addEventListener("click", () => saveTransToNote(t));
  } catch (e) {
    box.innerHTML = `<div class="trans-err">⚠️ 翻译请求失败：${esc(e.message || String(e))}。请检查网络后重试。</div>`;
  }
}
function saveTransToNote(text) {
  const ta = document.querySelector('textarea[data-note="cphrase"]');
  if (!ta) return toast("未找到备忘录输入框");
  const cur = ta.value || "";
  ta.value = cur ? cur.replace(/\s*$/, "") + "\n" + text : text;
  saveNote("cphrase", ta.value);
  ta.dispatchEvent(new Event("input"));
  toast("✅ 已存入「我的补充短句」");
}

/* --- 4.2 行李清单 --- */
function initLuggage() {
  const done = load("luggage", []);
  $("luggage-cols").innerHTML = Object.entries(LUGGAGE).map(([key, col]) => `
    <section class="panel">
      <h3>${col.title}</h3>
      <div class="checklist">
        ${col.items.map((it, i) => {
          const k = key + "-" + i;
          return `<label class="check-item ${done.includes(k) ? "done" : ""}">
            <input type="checkbox" ${done.includes(k) ? "checked" : ""} onchange="toggleLuggage('${k}')">
            <span style="font-size:13.5px">${esc(it)}</span>
          </label>`;
        }).join("")}
      </div>
    </section>`).join("");
  $("luggage-fan").innerHTML = LUGGAGE_FAN.map((f) => `<div class="check-item" style="cursor:default"><span>⚠️</span><span style="font-size:13.5px">${esc(f)}</span></div>`).join("");
}
function toggleLuggage(k) {
  let done = load("luggage", []);
  done = done.includes(k) ? done.filter((x) => x !== k) : [...done, k];
  store("luggage", done);
  initLuggage();
}

/* --- 4.3 境外省钱工具 --- */
function initSaveTools() {
  $("fx-cur").innerHTML = FX_RATES.map((f, i) => `<option value="${i}">${f.c}</option>`).join("");
  applyRates(false);
  fetchLiveRates();
  $("save-transit").innerHTML = TRANSIT_CARDS.map((t) => `<div class="route-card"><b>${esc(t[0])}</b><br>${esc(t[1])}${t[3] ? `<br><a class="hotel-book" href="${t[3]}" target="_blank" rel="noopener">🔗 官方网站（查余额/退卡/适用范围）→</a>` : ""}<br><span class="route-last">💡 ${esc(t[2])}</span></div>`).join("");
  $("save-stores").innerHTML = CHEAP_STORES.map((t) => `<div class="route-card"><b>${esc(t[0])}</b><br>${esc(t[1])}<br><span class="route-last">💡 ${esc(t[2])}</span></div>`).join("");
}
function fxManual() {
  const i = +$("fx-cur").value;
  const v = +$("fx-rate").value || 0;
  const key = FX_RATES[i].code || FX_RATES[i].c;
  const m = load("fxmanual", {});
  if (v && Math.abs(v - FX_RATES[i].r) > 1e-9) m[key] = v; else delete m[key];
  store("fxmanual", m);
  $("fx-status").textContent = "✏️ 已手动修正，刷新实时汇率不会覆盖你的数值";
  calcFx();
}
function applyRates(silent) {
  const i = +$("fx-cur").value;
  const key = FX_RATES[i].code || FX_RATES[i].c;
  const m = load("fxmanual", {});
  $("fx-rate").value = (m[key] != null ? m[key] : FX_RATES[i].r);
  calcFx();
  if (!silent) $("fx-status").textContent = "基准汇率（可手动修改，刷新实时会更新）";
}
async function fetchLiveRates() {
  try {
    const codes = FX_RATES.map((f) => f.code).filter(Boolean).join(",");
    const res = await fetch("https://api.frankfurter.app/latest?from=CNY&to=" + codes);
    if (!res.ok) throw 0;
    const rates = (await res.json()).rates || {};
    let updated = 0;
    FX_RATES.forEach((f) => { if (f.code && rates[f.code]) { f.r = 1 / rates[f.code]; updated++; } });
    applyRates(true);
    const now = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    $("fx-status").innerHTML = `✅ 实时汇率已更新（${now}）· 覆盖 ${updated} 种货币 · <a href="https://www.frankfurter.app" target="_blank" rel="noopener" style="color:var(--primary)">数据来源</a> · 可手动修改`;
  } catch (e) {
    $("fx-status").textContent = "⚠️ 实时汇率获取失败（可能网络受限），已用内置基准汇率，可手动修改";
  }
}
function fxCurChange() { applyRates(false); }
function calcFx() {
  const amt = Math.max(0, +$("fx-amt").value || 0), rate = Math.max(0, +$("fx-rate").value || 0);
  const cny = amt * rate;
  $("fx-result").textContent = "≈ ¥ " + cny.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
  $("fx-result").dataset.cny = Math.round(cny);
}
function fxToBudget() {
  const cny = +$("fx-result").dataset.cny || 0;
  if (!cny) return toast("请先输入金额～");
  const cur = ($("b-shopping").value ? +$("b-shopping").value : 0) + cny;
  $("b-shopping").value = cur;
  calcBudget();
  switchTab("budget");
  switchSub("btrip");
  toast(`✅ 已把 ¥${cny.toLocaleString()} 计入花销计算器「购物」项`);
}

/* --- 4.4 境外应急包 --- */
function initSOS() {
  $("sos-tabs").innerHTML = SOS_PACKS.map((s, i) => `<button class="dest-tab ${i === 0 ? "active" : ""}" data-sos="${s.id}" onclick="renderSOS('${s.id}')">${s.name}</button>`).join("");
  renderSOS(SOS_PACKS[0].id);
}
function renderSOS(id) {
  document.querySelectorAll("#sos-tabs .dest-tab").forEach((b) => b.classList.toggle("active", b.dataset.sos === id));
  const s = SOS_PACKS.find((x) => x.id === id);
  $("sos-detail").innerHTML = `<section class="panel sos-card">
    <h3>${s.name} 应急速查（建议截图保存）</h3>
    ${s.rows.map((r) => `<div class="sos-row"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join("")}
  </section>`;
}

/* ================================================================
   模块5：现场工具箱
================================================================ */
let wakeLock = null, audioCtx = null, analyser = null, micStream = null, dbTimer = null, stickTimer = null;

async function requestWakeLock() {
  try { if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen"); } catch (e) {}
}
function releaseWakeLock() { try { wakeLock && wakeLock.release(); } catch (e) {} wakeLock = null; }
async function goFullscreen(el) { try { await el.requestFullscreen(); } catch (e) {} }
function exitFullscreen() { try { document.fullscreenElement && document.exitFullscreen(); } catch (e) {} }

function initTools() {
  $("led-colors").innerHTML = FAN_COLORS.map((f) => `<button class="color-chip" style="--cc:${f.c}" title="${f.n}｜${f.o || "参考色"}" onclick="$('led-color').value='${f.c}';toast('已选 ${f.n} 应援色')">${f.n}</button>`).join("");
  $("stick-colors").innerHTML = FAN_COLORS.map((f) => `<button class="color-chip" style="--cc:${f.c}" title="${f.n}｜${f.o || "参考色"}" onclick="$('stick-color').value='${f.c}';toast('已选 ${f.n} 应援色')">${f.n}</button>`).join("");
  $("ban-venue").innerHTML = Object.keys(BAN_DATA).map((k) => `<option>${k}</option>`).join("");
  renderBans();
  initPlaylist();
  initChecklist();
}

/* --- 歌单配套：搜歌单 + 歌词大屏 --- */
const MUSIC_PLATFORMS = [
  { n: "网易云音乐", url: (q) => `https://music.163.com/#/search/m/?s=${encodeURIComponent(q)}` },
  { n: "QQ音乐", url: (q) => `https://y.qq.com/n/ryqq/search?w=${encodeURIComponent(q)}` },
  { n: "YouTube Music", url: (q) => `https://music.youtube.com/search?q=${encodeURIComponent(q)}` },
  { n: "Spotify", url: (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}` },
];
const PLAYLIST_GROUPS = ["TWICE", "SEVENTEEN", "BTS", "BLACKPINK", "NCT", "aespa", "(G)I-DLE", "IVE", "ITZY", "Stray Kids", "BABYMONSTER"];
function initPlaylist() {
  $("pl-groups").innerHTML = PLAYLIST_GROUPS.map((g) => `<button class="time-chip" onclick="renderPlaylistLinks('${g}')">${g}</button>`).join("");
}
function renderPlaylistLinks(preset) {
  const q = (preset || ($("pl-input").value || "").trim());
  if (!q) return toast("请输入艺人 / 歌曲，或点上方常用团");
  $("pl-input").value = q;
  $("pl-links").innerHTML = MUSIC_PLATFORMS.map((p) => `
    <a class="bili-card" href="${p.url(q)}" target="_blank" rel="noopener">
      <span class="bili-icon">🎵</span><span>在${p.n}搜「${esc(q)}」歌单</span><span class="bili-go">→</span>
    </a>`).join("");
}
async function fetchLyrics() {
  const q = ($("ly-input").value || "").trim();
  if (!q) return toast("请输入 歌曲名 或 歌曲名 - 艺人");
  const box = $("lyric-box");
  box.innerHTML = `<div class="trans-loading">🔍 正在搜索歌词…</div>`;
  const parts = q.split(" - ").map((s) => s.trim());
  const track = parts[0], artist = parts[1] || "";
  let lyrics = null;
  try {
    // 1) lrclib（免费，社区歌词库）
    const lq = "https://lrclib.net/api/search?track=" + encodeURIComponent(track) + (artist ? ("&artist=" + encodeURIComponent(artist)) : "");
    const d = await (await fetch(lq)).json();
    let hit = Array.isArray(d) && d.find((t) => t.plainLyrics);
    if (!hit && artist) {
      const d2 = await (await fetch("https://lrclib.net/api/search?artist=" + encodeURIComponent(artist))).json();
      hit = Array.isArray(d2) && d2.find((t) => t.plainLyrics && (!track || t.title.toLowerCase().includes(track.toLowerCase())));
    }
    if (hit) lyrics = hit.plainLyrics;
    // 2) lyrics.ovh 兜底（以英文歌为主）
    if (!lyrics && artist) {
      try {
        const jo = await (await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(track)}`)).json();
        if (jo && jo.lyrics) lyrics = jo.lyrics;
      } catch (e) {}
    }
  } catch (e) {}
  if (lyrics && lyrics.trim()) {
    box.innerHTML = `<div class="lyric-text">${esc(lyrics)}</div><div class="pb-actions"><button class="btn btn-sm btn-primary" onclick="showLyricsBig()">🖥️ 大屏呈现</button></div>`;
    window._lyrics = lyrics;
  } else {
    box.innerHTML = `<div class="trans-err">😢 免费歌词库暂未收录「${esc(q)}」（以英文歌为主，K-pop / J-pop 多数未收录）。可前往：<a href="https://music.163.com/#/search/m/?s=${encodeURIComponent(q)}" target="_blank" rel="noopener">网易云音乐</a> 或 <a href="https://y.qq.com/n/ryqq/search?w=${encodeURIComponent(q)}" target="_blank" rel="noopener">QQ音乐</a> 查看完整歌词。</div>`;
    window._lyrics = null;
  }
}
function showLyricsBig() {
  if (!window._lyrics) return;
  $("lyric-big").textContent = window._lyrics;
  const ov = $("lyric-overlay");
  ov.classList.add("show");
  goFullscreen(ov);
  requestWakeLock();
}

/* --- 歌词模块：浏览器搜歌词 + 离线收藏 --- */
function searchLyricsWeb() {
  const title = ($("lyr-title").value || "").trim();
  const artist = ($("lyr-artist").value || "").trim();
  if (!title && !artist) return toast("请先填歌名或歌手");
  const q = (title + " " + artist + " 歌词").trim();
  const eng = $("lyr-engine").value;
  const urls = {
    baidu: "https://www.baidu.com/s?wd=" + encodeURIComponent(q),
    bing: "https://www.bing.com/search?q=" + encodeURIComponent(q),
    google: "https://www.google.com/search?q=" + encodeURIComponent(q)
  };
  window.open(urls[eng] || urls.baidu, "_blank", "noopener");
}
async function tryFetchLyrics() {
  const title = ($("lyr-title").value || "").trim();
  const artist = ($("lyr-artist").value || "").trim();
  if (!title) return toast("请先填歌名");
  const ta = $("lyr-text");
  ta.value = "🔍 正在尝试抓取…";
  let lyrics = null;
  try {
    const lq = "https://lrclib.net/api/search?track=" + encodeURIComponent(title) + (artist ? ("&artist=" + encodeURIComponent(artist)) : "");
    const d = await (await fetch(lq)).json();
    let hit = Array.isArray(d) && d.find((t) => t.plainLyrics);
    if (!hit && artist) {
      const d2 = await (await fetch("https://lrclib.net/api/search?artist=" + encodeURIComponent(artist))).json();
      hit = Array.isArray(d2) && d2.find((t) => t.plainLyrics && (!title || t.title.toLowerCase().includes(title.toLowerCase())));
    }
    if (hit) lyrics = hit.plainLyrics;
    if (!lyrics && artist) {
      try {
        const jo = await (await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)).json();
        if (jo && jo.lyrics) lyrics = jo.lyrics;
      } catch (e) {}
    }
  } catch (e) {}
  if (lyrics && lyrics.trim()) {
    ta.value = lyrics;
    toast("✅ 已抓取，可收藏到歌词库");
  } else {
    ta.value = "";
    toast("😢 免费库未收录，请用上方「浏览器搜歌词」按钮");
  }
}
function getLyricsLib() { return load("lyrics", []); }
function saveLyric() {
  const title = ($("lyr-title").value || "").trim();
  const artist = ($("lyr-artist").value || "").trim();
  const text = ($("lyr-text").value || "").trim();
  if (!text) return toast("歌词内容为空，先搜到并粘贴进来");
  const lib = getLyricsLib();
  lib.unshift({ id: Date.now(), title: title || "未命名", artist, text, time: new Date().toLocaleString("zh-CN", { hour12: false }).slice(0, 16) });
  store("lyrics", lib);
  renderLyricsLib();
  toast("✅ 已收藏到歌词库（离线可看）");
}
function renderLyricsLib() {
  const lib = getLyricsLib();
  const box = $("lyr-library");
  if (!box) return;
  if (!lib.length) { box.innerHTML = '<p class="empty">还没有收藏歌词，搜到后粘贴并点「存到我的歌词库」即可～</p>'; return; }
  box.innerHTML = lib.map((l) => `
    <div class="lyr-item">
      <div class="lyr-meta"><b>${esc(l.title)}</b>${l.artist ? " · " + esc(l.artist) : ""}<span class="lyr-time">${esc(l.time)}</span></div>
      <div class="lyr-actions">
        <button class="btn btn-sm btn-ghost" onclick="viewLyric(${l.id})">👁 查看</button>
        <button class="btn btn-sm btn-ghost" onclick="downloadLyric(${l.id})">📥 下载</button>
        <button class="btn btn-sm btn-ghost" onclick="delLyric(${l.id})">🗑 删除</button>
      </div>
    </div>`).join("");
}
function viewLyric(id) {
  const l = getLyricsLib().find((x) => x.id === id);
  if (!l) return;
  const ov = $("lyr-view-overlay");
  ov.querySelector(".lyr-view-title").textContent = l.title + (l.artist ? " · " + l.artist : "");
  ov.querySelector(".lyr-view-body").textContent = l.text;
  ov.classList.add("show");
}
function closeLyricView() {
  const ov = $("lyr-view-overlay");
  if (ov) ov.classList.remove("show");
}
function downloadLyric(id) {
  const l = getLyricsLib().find((x) => x.id === id);
  if (!l) return;
  const name = (l.title + (l.artist ? " - " + l.artist : "")).replace(/[\\/:*?"<>|]/g, "_") + ".txt";
  const blob = new Blob([l.text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  toast("📥 已开始下载：" + name);
}
function delLyric(id) {
  if (!confirm("确定删除这首歌词收藏？")) return;
  const lib = getLyricsLib().filter((x) => x.id !== id);
  store("lyrics", lib);
  renderLyricsLib();
  toast("🗑 已删除");
}
function clearLyricInput() { $("lyr-text").value = ""; }
function initLyrics() { renderLyricsLib(); }

/* --- 应援物料出发清单 --- */
const CHECK_DEFAULTS = [
  "应援棒（充满电 / 装好电池）", "充电宝 + 充电线", "手机 + 备用电池", "身份证件 / 实名票",
  "现金零钱（当地货币）", "耳塞 / 防噪耳罩", "润喉糖 / 水杯", "湿巾 / 纸巾",
  "应援手幅 / 小卡", "确认充电宝已充满", "舒适鞋子（久站）", "外套（场馆冷气 / 夜间降温）",
  "口罩 / 消毒凝胶", "折叠小风扇（夏季露天）"
];
function getChecklist() { return load("checklist", null); }
function initChecklist() {
  if (getChecklist() === null) store("checklist", CHECK_DEFAULTS.map((t) => ({ t, done: false })));
  renderChecklist();
}
function renderChecklist() {
  const arr = getChecklist() || [];
  const box = $("checklist-box");
  if (!box) return;
  const done = arr.filter((x) => x.done).length;
  if ($("checklist-count")) $("checklist-count").textContent = done + "/" + arr.length;
  const pct = arr.length ? Math.round(done / arr.length * 100) : 0;
  const bar = $("checklist-bar-fill");
  if (bar) { bar.style.width = pct + "%"; bar.style.background = pct === 100 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#a855f7,#7c3aed)"; }
  box.innerHTML = arr.length ? arr.map((x, i) => `
    <label class="check-item ${x.done ? "done" : ""}">
      <input type="checkbox" ${x.done ? "checked" : ""} onchange="toggleCheck(${i})">
      <span class="check-txt">${esc(x.t)}</span>
      <button class="check-del" title="删除" onclick="delCheckItem(${i})">✕</button>
    </label>`).join("") : '<p class="empty">清单空了，下面加几样吧～</p>';
}
function toggleCheck(i) { const a = getChecklist(); if (!a) return; a[i].done = !a[i].done; store("checklist", a); renderChecklist(); }
function addCheckItem() {
  const v = ($("checklist-input").value || "").trim();
  if (!v) return;
  const a = getChecklist() || [];
  a.push({ t: v, done: false });
  store("checklist", a);
  $("checklist-input").value = "";
  renderChecklist();
}
function delCheckItem(i) { const a = getChecklist(); if (!a) return; a.splice(i, 1); store("checklist", a); renderChecklist(); }

/* --- 个人中心（聚合收藏与发布内容） --- */
function renderMine() {
  const u = currentUser();
  const acc = $("mine-account");
  if (!u) {
    acc.innerHTML = `<div class="mine-empty">你还没有登录。<button class="btn btn-sm btn-primary" onclick="openAuth('login')">👤 登录 / 注册</button> 后可查看与管理你的内容。</div>`;
  } else {
    acc.innerHTML = `<div class="mine-user"><span class="mine-avatar">👤</span><div class="mine-uid"><div class="mine-login">${esc(u.login)}</div><div class="muted">已登录 · 内容本机隔离保存</div></div><button class="btn btn-sm btn-ghost" onclick="doLogout()">退出登录</button></div>`;
  }

  // 收藏短句
  const favs = getFavs();
  const phraseMap = {};
  PHRASES.forEach((p) => { phraseMap[phraseKey(p)] = p; });
  $("mine-phrase-n").textContent = favs.length;
  $("mine-phrases").innerHTML = favs.length ? favs.map((k) => {
    const p = phraseMap[k];
    if (!p) return "";
    const fo = (p.fo || "").replace(/'/g, "\\'");
    const tts = (PHRASE_LANGS.find((l) => l.id === p.lang) || {}).tts || p.lang;
    return `<div class="mine-row"><div class="mine-row-main"><div class="mine-cn">${esc(p.cn)}</div><div class="mine-fo">${esc(p.fo)} <span class="muted">${esc(p.ro || "")}</span></div></div><button class="btn btn-sm btn-ghost" onclick="speakPhrase('${fo}','${tts}')">🔊</button></div>`;
  }).join("") : '<p class="empty">还没有收藏短句，去「跨国追星 → 外语短句库」点 ☆ 收藏吧～</p>';

  // 歌词库
  const lib = getLyricsLib();
  $("mine-lyric-n").textContent = lib.length;
  $("mine-lyrics").innerHTML = lib.length ? lib.map((l) => `<div class="mine-row"><div class="mine-row-main"><div class="mine-cn">${esc(l.title)}</div><div class="mine-fo muted">${esc(l.artist || "未知艺人")} · ${esc(l.time)}</div></div><button class="btn btn-sm btn-ghost" onclick="viewLyric(${l.id})">👁 查看</button></div>`).join("") : '<p class="empty">还没有收藏歌词，去「现场工具箱 → 歌词模块」收藏吧～</p>';

  // 我的帖子
  const posts = getPosts().filter((p) => p.by === "我");
  $("mine-post-n").textContent = posts.length;
  $("mine-posts").innerHTML = posts.length ? posts.map((p) => `<div class="mine-row"><div class="mine-row-main"><div class="mine-cn">${esc(p.title)}</div><div class="mine-fo muted">${esc(p.type)} · ${esc(p.time)} · ❤️ ${p.likes || 0}</div></div><button class="btn btn-sm btn-ghost" onclick="switchTab('community')">前往</button></div>`).join("") : '<p class="empty">还没有发布帖子，去「互助社区」发一条吧～</p>';

  // 备忘录
  const mb = load("memo", []);
  const mbCount = Array.isArray(mb) ? mb.length : 0;
  $("mine-memo-n").textContent = mbCount;
  $("mine-memo").innerHTML = mbCount ? `<div class="mine-row"><div class="mine-row-main"><div class="mine-cn">已记录 ${mbCount} 个内容块</div><div class="mine-fo muted">标题 / 清单 / 颜色高光等</div></div><button class="btn btn-sm btn-ghost" onclick="switchTab('memo')">前往</button></div>` : '<p class="empty">备忘录还是空的，去「备忘录」记点东西吧～</p>';
}

/* --- LED 弹幕 --- */
function openLED() {
  const text = $("led-text").value.trim() || "♥";
  const color = $("led-color").value;
  const size = +$("led-size").value;
  const speed = +$("led-speed").value;
  const blink = $("led-blink").value;
  const span = $("led-span");
  span.textContent = text + "　　　" + text + "　　　" + text;
  span.style.color = color;
  span.style.textShadow = `0 0 20px ${color}, 0 0 60px ${color}`;
  span.style.fontSize = size + (($("led-rotate") && $("led-rotate").checked) ? "vh" : "vw");
  span.style.animationDuration = speed + "s" + (blink !== "0" ? "," + (blink === "1" ? "1.2s" : "0.35s") : "");
  span.className = blink === "0" ? "" : "led-blink";
  const ov = $("led-overlay");
  if ($("led-rotate") && $("led-rotate").checked) ov.classList.add("led-rotate");
  ov.classList.add("show");
  goFullscreen(ov);
  requestWakeLock();
}
/* --- 应援棒 --- */
async function openStick() {
  const color = $("stick-color").value;
  const mode = $("stick-mode").value;
  const glow = $("stick-glow");
  glow.style.background = color;
  glow.className = "stick-glow mode-" + mode;
  const ov = $("stick-overlay");
  ov.classList.add("show");
  goFullscreen(ov);
  requestWakeLock();
  if (mode === "music") {
    const ok = await initMic();
    if (!ok) { glow.className = "stick-glow mode-breath"; toast("未获得麦克风权限，已切换为呼吸模式"); return; }
    const data = new Uint8Array(analyser.frequencyBinCount);
    stickTimer = setInterval(() => {
      analyser.getByteFrequencyData(data);
      let sum = 0; for (let i = 0; i < data.length; i++) sum += data[i];
      const level = sum / data.length / 255;
      glow.style.opacity = 0.35 + level * 0.65;
    }, 50);
  }
}
function closeOverlay() {
  $("led-overlay").classList.remove("show");
  $("led-overlay").classList.remove("led-rotate");
  $("stick-overlay").classList.remove("show");
  $("lyric-overlay").classList.remove("show");
  closeLyricView();
  exitFullscreen();
  releaseWakeLock();
  if (stickTimer) { clearInterval(stickTimer); stickTimer = null; }
}
/* --- 麦克风 & 分贝计 --- */
async function initMic() {
  try {
    if (!micStream) {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const src = audioCtx.createMediaStreamSource(micStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      src.connect(analyser);
    }
    if (audioCtx.state === "suspended") await audioCtx.resume();
    return true;
  } catch (e) { return false; }
}
async function startDB() {
  const ok = await initMic();
  if (!ok) return toast("需要麦克风权限才能检测分贝（声音只在本机处理）");
  if (dbTimer) clearInterval(dbTimer);
  const data = new Float32Array(analyser.fftSize);
  dbTimer = setInterval(() => {
    analyser.getFloatTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
    const rms = Math.sqrt(sum / data.length);
    let db = rms > 0 ? Math.round(20 * Math.log10(rms) + 100) : 0;
    db = Math.max(30, Math.min(120, db));
    $("db-value").textContent = db;
    $("db-bar").style.width = Math.round((db - 30) / 90 * 100) + "%";
    $("db-bar").style.background = db < 60 ? "#10b981" : db < 80 ? "#f59e0b" : db < 100 ? "#f97316" : "#dc2626";
    $("db-hint").textContent = db < 60 ? "🤫 安静环境 —— VCR/慢歌环节，别喊口号" : db < 80 ? "🙂 正常氛围 —— 可以小声跟唱" : db < 100 ? "🔥 气氛热烈 —— 应援口号跟上！" : "🌋 巅峰时刻 —— 尽情喊！注意保护听力";
  }, 200);
  toast("🎙️ 分贝检测中（估算值仅供参考，声音不会上传）");
}
function stopDB() {
  if (dbTimer) { clearInterval(dbTimer); dbTimer = null; }
  $("db-value").textContent = "--";
  $("db-bar").style.width = "0";
  $("db-hint").textContent = "已停止检测";
}
/* --- 违禁品速查 --- */
function renderBans() {
  const venue = $("ban-venue").value || Object.keys(BAN_DATA)[0];
  const q = ($("ban-search").value || "").trim();
  const list = (BAN_DATA[venue] || []).filter((b) => !q || b[0].includes(q) || b[2].includes(q));
  $("ban-list").innerHTML = list.length ? list.map((b) => `
    <div class="ban-row">
      <span class="tag ${b[1] === "禁止" ? "tag-red" : "tag-orange"}">${b[1]}</span>
      <div><b>${esc(b[0])}</b><br><span style="font-size:12.5px;color:var(--muted)">${esc(b[2])}</span></div>
    </div>`).join("") + (BAN_SITE[venue] ? `<p class="mini-tip">🏟️ <a href="${BAN_SITE[venue]}" target="_blank" rel="noopener">查看 ${esc(venue)} 官网安检细则 →</a></p>` : "") + '<p class="mini-tip">⚠️ 以上为常见规定汇总，具体以当场安检公告为准。</p>' : '<p class="empty">没搜到相关物品，换个关键词试试</p>';
}

/* ================================================================
   模块6：追星备忘录
================================================================ */
const MEMO_DEFAULT = [
  { type:"h1", text:"⭐ 我的追星备忘录" },
  { type:"text", text:"这是一篇可以自由编辑的文档：点击任意文字直接修改，用上方工具栏插入标题、待办、引用等内容块。所有修改自动保存。" },
  { type:"h2", text:"🎫 想看的演出" },
  { type:"todo", text:"ITZY 澳门场 8/15（已开票，快去看）", done:false },
  { type:"todo", text:"IVE 香港场 9/4-9/5（等开票公告）", done:false },
  { type:"quote", text:"追星是为了让自己开心，量力而行，理智消费 💜" },
];
let memoBlocks = null, memoSaveTm = null;
function initMemo() {
  memoBlocks = load("memo", MEMO_DEFAULT);
  renderMemo();
}
function saveMemo() {
  store("memo", memoBlocks);
  $("memo-saved").textContent = "已自动保存 ✅ " + new Date().toLocaleTimeString();
}
function scheduleSave() { clearTimeout(memoSaveTm); memoSaveTm = setTimeout(saveMemo, 400); }
function renderMemo() {
  $("memo-doc").innerHTML = memoBlocks.map((b, i) => {
    const ctrl = `<div class="mb-ctrl">
      <button title="上移" onclick="moveBlock(${i},-1)">↑</button>
      <button title="下移" onclick="moveBlock(${i},1)">↓</button>
      <button title="删除" onclick="delBlock(${i})">✕</button>
    </div>`;
    const content = b.html ? sanitizeMemoHtml(b.html) : esc(b.text);
    if (b.type === "divider") return `<div class="memo-block"><hr class="mb-divider">${ctrl}</div>`;
    if (b.type === "todo") return `<div class="memo-block mb-todo-wrap">
      <input type="checkbox" ${b.done ? "checked" : ""} onchange="toggleTodo(${i})">
      <div class="mb-el mb-todo ${b.done ? "done" : ""}" contenteditable="true" data-i="${i}" oninput="editBlock(this)">${content}</div>${ctrl}</div>`;
    const cls = { h1:"mb-h1", h2:"mb-h2", h3:"mb-h3", text:"mb-text", quote:"mb-quote" }[b.type] || "mb-text";
    return `<div class="memo-block"><div class="mb-el ${cls}" contenteditable="true" data-i="${i}" oninput="editBlock(this)">${content}</div>${ctrl}</div>`;
  }).join("");
}
function editBlock(el) { const i = +el.dataset.i; if (memoBlocks[i]) { memoBlocks[i].html = el.innerHTML; memoBlocks[i].text = el.innerText; } scheduleSave(); }
function toggleTodo(i) { memoBlocks[i].done = !memoBlocks[i].done; saveMemo(); renderMemo(); }
function addBlock(type) {
  memoBlocks.push(type === "divider" ? { type } : { type, text: type === "h1" ? "新标题" : type === "h2" ? "新子标题" : type === "h3" ? "新小标题" : type === "todo" ? "新的待办事项" : type === "quote" ? "写一句想说的话" : "开始输入...", done: false });
  saveMemo(); renderMemo();
  const els = document.querySelectorAll("#memo-doc .mb-el");
  const last = els[els.length - 1];
  if (last) { last.focus(); document.execCommand && document.execCommand("selectAll", false, null); }
}
function sanitizeMemoHtml(html) {
  return String(html || "")
    .replace(/<\/?(script|style|iframe|object|embed|link|meta)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/javascript:/gi, "");
}
function syncMemoFromDOM() {
  document.querySelectorAll("#memo-doc .mb-el").forEach((el) => {
    const i = +el.dataset.i;
    if (memoBlocks[i]) { memoBlocks[i].html = el.innerHTML; memoBlocks[i].text = el.innerText; }
  });
  scheduleSave();
}
function fmtMemo(cmd, val) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return toast("请先选中要格式化的文字");
  try {
    if (cmd === "foreColor") document.execCommand("foreColor", false, val);
    else if (cmd === "hiliteColor") { try { document.execCommand("hiliteColor", false, val); } catch (e) { document.execCommand("backColor", false, val); } }
    else if (cmd === "fontSize") document.execCommand("fontSize", false, val);
    else if (cmd === "removeFormat") document.execCommand("removeFormat", false, null);
  } catch (e) { return toast("当前浏览器不支持该格式化"); }
  syncMemoFromDOM();
}
function moveBlock(i, dir) {
  const j = i + dir;
  if (j < 0 || j >= memoBlocks.length) return;
  [memoBlocks[i], memoBlocks[j]] = [memoBlocks[j], memoBlocks[i]];
  saveMemo(); renderMemo();
}
function delBlock(i) { memoBlocks.splice(i, 1); saveMemo(); renderMemo(); }
const MEMO_TPLS = {
  ticket: [
    { type:"h2", text:"🎫 抢票信息卡" },
    { type:"text", text:"演出：＿＿＿ ｜ 场次：＿＿＿ ｜ 开票时间：＿＿＿" },
    { type:"todo", text:"实名信息已预填", done:false },
    { type:"todo", text:"观演人已添加", done:false },
    { type:"todo", text:"支付方式已开通免密", done:false },
    { type:"todo", text:"开票前 5 分钟进入候场", done:false },
  ],
  trip: [
    { type:"h2", text:"🗺️ 行程规划" },
    { type:"text", text:"Day 1：抵达 → 酒店 check-in → 场馆踩点 → 应援物领取" },
    { type:"text", text:"Day 2：演出日！＿＿点出发 → ＿＿点入场 → 散场路线：＿＿＿" },
    { type:"todo", text:"证件原件已带", done:false },
    { type:"todo", text:"电子票已截图备份", done:false },
    { type:"todo", text:"末班车时间已记牢", done:false },
  ],
  goods: [
    { type:"h2", text:"🎀 物料清单" },
    { type:"todo", text:"应援棒（电池已换新）", done:false },
    { type:"todo", text:"手幅 / 小卡（互换用）", done:false },
    { type:"todo", text:"充电宝（≤20000mAh）", done:false },
    { type:"todo", text:"便携风扇 / 雨具", done:false },
    { type:"quote", text:"想换的物料：＿＿＿ ；能出的物料：＿＿＿" },
  ],
  budget: [
    { type:"h2", text:"💰 追星预算表" },
    { type:"text", text:"总预算红线：¥＿＿＿ ｜ 已花：¥＿＿＿ ｜ 剩余：¥＿＿＿" },
    { type:"todo", text:"门票", done:false },
    { type:"todo", text:"大交通（机票/高铁）", done:false },
    { type:"todo", text:"酒店（可拼房分摊）", done:false },
    { type:"todo", text:"周边/应援物", done:false },
    { type:"quote", text:"先记预算再下单，超过红线就停手 💜" },
  ],
  rehearsal: [
    { type:"h2", text:"🪄 应援排练清单" },
    { type:"text", text:"演出：＿＿＿ ｜ 日期：＿＿＿ ｜ 应援色：＿＿＿" },
    { type:"todo", text:"应援口号/打 call 谱已练熟", done:false },
    { type:"todo", text:"手幅/灯牌制作完成", done:false },
    { type:"todo", text:"应援棒电量充满+备用电池", done:false },
    { type:"todo", text:"集合时间地点已和同好确认", done:false },
  ],
  drama: [
    { type:"h2", text:"📺 看剧/综艺打卡" },
    { type:"text", text:"剧名：＿＿＿ ｜ 追更进度：＿＿＿" },
    { type:"todo", text:"本周更新已看", done:false },
    { type:"todo", text:"名场面截图收藏", done:false },
    { type:"quote", text:"快乐追星，理性打投，不引战 💜" },
  ],
  birthday: [
    { type:"h2", text:"🎂 生日应援企划" },
    { type:"text", text:"寿星：＿＿＿ ｜ 生日：＿＿＿" },
    { type:"todo", text:"生日咖啡车/应援屏预算", done:false },
    { type:"todo", text:"同城线下集合报名", done:false },
    { type:"todo", text:"线上祝福接龙发起", done:false },
  ],
  resale: [
    { type:"h2", text:"🔁 二手交易记录" },
    { type:"text", text:"买入/卖出：＿＿＿ ｜ 物品：＿＿＿ ｜ 价格：¥＿＿＿" },
    { type:"todo", text:"已确认对方信用（走平台/面交）", done:false },
    { type:"quote", text:"二手交易务必面交或走担保，绝不私下转账！" },
  ],
};
function insertTemplate(key) {
  memoBlocks.push({ type:"divider" }, ...MEMO_TPLS[key].map((b) => ({ ...b })));
  saveMemo(); renderMemo();
  toast("⚡ 模板已插入到文档末尾");
}
function exportMemo() {
  const md = memoBlocks.map((b) => {
    if (b.type === "h1") return "# " + b.text;
    if (b.type === "h2") return "## " + b.text;
    if (b.type === "h3") return "### " + (b.text || "");
    if (b.type === "todo") return `- [${b.done ? "x" : " "}] ` + b.text;
    if (b.type === "quote") return "> " + b.text;
    if (b.type === "divider") return "---";
    return b.text;
  }).join("\n\n");
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "追星备忘录.md";
  a.click();
  toast("📥 已导出 Markdown 备份，可导入飞书/Notion 等文档工具");
}

/* ================================================================
   模块7：社区
================================================================ */
function initCommunity() {
  const opts = SHOWS.map((s) => `<option value="${s.id}">${s.artist} · ${s.city}</option>`).join("");
  $("post-show").innerHTML = opts;
  $("swap-show").innerHTML = opts;
  $("board-filter-show").innerHTML = '<option value="">全部场次</option>' + opts;
  renderPosts();
  renderSwaps();
}
function getPosts() { return load("posts2", SEED_POSTS); }
function getSwaps() { return load("swaps2", SEED_SWAPS); }
function reviewContent(text) {
  const bad = BLOCKED_WORDS.find((w) => text.includes(w));
  if (bad) return { ok:false, reason:`包含违禁/风险关键词「${bad}」` };
  if (/(微信|vx|VX|qq|QQ|手机号|电话|加我|私聊|支付宝|银行|卡号|密码|转账|定金|汇款|私下)/.test(text)) return { ok:false, reason:"含联系方式或金钱交易词（微信/QQ/电话/银行/转账等），请走站内信，禁止公开留联系方式与私下金钱交易" };
  if (/\d{5,}/.test(text) && /(微信|qq|QQ|vx|VX|电话|手机|支付宝)/.test(text)) return { ok:false, reason:"含疑似联系方式数字串，请移除后再发布" };
  return { ok:true };
}
function submitPost() {
  const title = $("post-title").value.trim(), content = $("post-content").value.trim();
  if (!title || !content) return toast("请填写标题和内容～");
  const rev = reviewContent(title + content);
  if (!rev.ok) return toast("🚫 智能审核未通过：" + rev.reason + "。请修改后重试。");
  const posts = getPosts();
  posts.unshift({ id: Date.now(), show: $("post-show").value, type: $("post-type").value, title, content, time: new Date().toLocaleString("zh-CN", { hour12: false }).slice(0, 16), pinned: false, likes: 0, by: "我", status: "已通过审核" });
  store("posts2", posts);
  $("post-title").value = ""; $("post-content").value = "";
  renderPosts();
  toast("✅ 已通过 AI 智能审核，发布成功！");
}
/* --- 社区发布默认模板（按信息类型结构化） --- */
const POST_TPLS = {
  car: { type: "🏨 拼房拼车", t: "【拼房拼车】\n场次：\n入住时间：\n酒店位置：\n人均预算：\n性别偏好：\n联系方式：仅站内私信（请勿公开手机号/微信）\n其他说明：" },
  traffic: { type: "🚌 交通变更", t: "【交通变更】\n涉及场次：\n变更内容：\n替代路线/方案：\n建议出发时间：\n备注：" },
  entry: { type: "🚪 入场调整", t: "【入场调整】\n场次：\n入场时间变化：\n安检/通道调整：\n注意事项：" },
  cheer: { type: "📣 应援时间", t: "【应援时间】\n场次：\n集合/应援时间：\n集合地点：\n应援物准备：" },
  share: { type: "💡 经验分享", t: "【经验分享】\n主题：\n我的经验：\n踩坑提醒：\n推荐：" },
  help: { type: "❓ 求助提问", t: "【求助提问】\n问题：\n背景/场次：\n已尝试：\n希望得到的帮助：" },
};
function fillPostTemplate() {
  const k = $("post-template").value;
  if (!k) return;
  const tp = POST_TPLS[k];
  $("post-type").value = tp.type;
  const ta = $("post-content");
  ta.value = tp.t;
  ta.focus();
  toast("📋 已套用「" + tp.type + "」模板，可直接修改");
}
function renderPosts() {
  const fs = $("board-filter-show").value, ft = $("board-filter-type").value;
  let posts = getPosts().filter((p) => (!fs || p.show === fs) && (!ft || p.type === ft));
  posts = [...posts.filter((p) => p.pinned), ...posts.filter((p) => !p.pinned)];
  $("post-list").innerHTML = posts.length ? posts.map((p) => {
    const s = showById(p.show);
    return `
    <div class="post-card ${p.pinned ? "pinned" : ""}">
      <div class="post-head">
        <span class="post-title">${p.pinned ? "📌 " : ""}${esc(p.title)}</span>
        <span class="tag tag-purple">${esc(p.type)}</span>
      </div>
      <div class="post-meta">${s ? s.artist + " · " + s.city : ""} · ${esc(p.time)} · by ${esc(p.by)}</div>
      <div class="post-body">${esc(p.content)}</div>
      <div class="post-foot">
        <button onclick="likePost(${p.id})">👍 有用 (${p.likes})</button>
        <button onclick="reportPost(${p.id})">🚩 举报</button>
      </div>
    </div>`;
  }).join("") : '<p class="empty">该筛选条件下暂无内容，快来发布第一条吧！</p>';
}
function likePost(id) { const ps = getPosts(); const p = ps.find((x) => x.id === id); if (p) { p.likes++; store("posts2", ps); renderPosts(); } }
function reportPost(id) { toast("🚩 已收到举报，管理员将在 24 小时内人工审核处理（演示提示）"); }
function submitSwap() {
  const name = $("swap-name").value.trim(), idol = $("swap-idol").value.trim(), want = $("swap-want").value.trim(), place = $("swap-place").value.trim();
  if (!name || !idol || !want || !place) return toast("请完整填写物料名称、偶像、互换需求和地点～");
  const rev = reviewContent(name + idol + want + place);
  if (!rev.ok) return toast("🚫 智能审核未通过：" + rev.reason + "。请修改后重试。");
  const file = $("swap-img") && $("swap-img").files[0];
  readImg(file, (imgData) => {
    const swaps = getSwaps();
    swaps.unshift({ id: Date.now(), name, type: $("swap-type").value, idol, show: $("swap-show").value, count: Math.max(1, +$("swap-count").value || 1), want, place, img: imgData || "", status: "求换", time: new Date().toISOString().slice(0, 10) });
    try { store("swaps2", swaps); } catch (e) { swaps[0].img = ""; store("swaps2", swaps); toast("图片过大未能保存，卡片已按无图发布"); }
    ["swap-name", "swap-idol", "swap-want", "swap-place"].forEach((i) => $(i).value = "");
    if ($("swap-img")) $("swap-img").value = "";
    renderSwaps();
    toast("✅ 已通过 AI 智能审核，互换卡片发布成功！仅线下当面互换，禁止金钱交易");
  });
}
function renderSwaps() {
  const fi = $("swap-filter-idol").value.trim().toLowerCase(), ft = $("swap-filter-type").value, fs = $("swap-filter-status").value;
  const swaps = getSwaps().filter((s) => (!fi || s.idol.toLowerCase().includes(fi)) && (!ft || s.type === ft) && (!fs || s.status === fs));
  $("swap-list").innerHTML = swaps.length ? swaps.map((s) => {
    const sh = showById(s.show);
    return `
    <div class="swap-card">
      <div class="swap-head">
        <span class="swap-name">${esc(s.name)}</span>
        <span class="tag ${s.status === "求换" ? "status-want" : "status-done"}">${s.status}</span>
      </div>
      ${s.img ? `<img class="swap-img" src="${s.img}" alt="物料图片" onclick="viewSwapImg(${s.id})">` : ""}
      <div class="swap-info">
        <span class="tag tag-pink">${esc(s.type)}</span><span class="tag tag-purple">${esc(s.idol)}</span> 数量 ×${s.count}<br>
        🎯 想换：${esc(s.want)}<br>
        📍 地点/时间：${esc(s.place)} ${sh ? "（" + sh.city + "场）" : ""}<br>
        🕐 发布于 ${esc(s.time)}
      </div>
      <div class="post-foot">
        ${s.status === "求换" ? `<button onclick="contactSwap()">✉️ 站内信联系</button><button onclick="markSwapped(${s.id})">✅ 标记已换</button>` : ""}
        <button onclick="reportPost(${s.id})">🚩 举报</button>
      </div>
    </div>`;
  }).join("") : '<p class="empty">暂无匹配的互换卡片</p>';
}
function viewSwapImg(id) {
  const s = getSwaps().find((x) => x.id === id);
  if (!s || !s.img) return;
  openGenModal(`<h3 style="margin-bottom:10px">🖼️ ${esc(s.name)}</h3><img src="${s.img}" style="max-width:100%;border-radius:12px;display:block;margin:0 auto">`, `<button class="btn btn-primary" onclick="closeGenModal()">关闭</button>`);
}
function contactSwap() { toast("✉️ 站内信功能正式版开放（不公开双方任何联系方式，保护隐私）"); }

/* ================================================================
   模块：各板块底部「讨论区」（点赞/点踩/回复/置顶 + 智能审核）
================================================================ */
const DISCUSS_MODS = ["ticket", "trip", "budget", "culture", "tools"];
const DISCUSS_LABEL = { ticket: "🎫 抢票提醒", trip: "🗺️ 观演出行", budget: "💰 花销·台账", culture: "✈️ 跨国追星", tools: "🎪 现场工具箱" };
const DISCUSS_SEED = {
  ticket: [{ id: 1, text: "欢迎来到「抢票提醒」讨论区～开票经验、候场技巧、避雷提醒都可以在这里聊（文明发言，禁黄牛/代抢/私下金钱交易）。", by: "STARGO小助手", time: "欢迎帖", likes: 0, dislikes: 0, pinned: true, replies: [] }],
  trip: [{ id: 1, text: "欢迎来到「观演出行」讨论区～行程规划、交通住宿、散场路线，欢迎分享你的经验！", by: "STARGO小助手", time: "欢迎帖", likes: 0, dislikes: 0, pinned: true, replies: [] }],
  budget: [{ id: 1, text: "欢迎来到「花销·台账」讨论区～拼房拼车、预算红线、回血记录，理性消费一起聊。", by: "STARGO小助手", time: "欢迎帖", likes: 0, dislikes: 0, pinned: true, replies: [] }],
  culture: [{ id: 1, text: "欢迎来到「跨国追星」讨论区～签证、交通卡、应援礼仪、当地攻略，欢迎补充！", by: "STARGO小助手", time: "欢迎帖", likes: 0, dislikes: 0, pinned: true, replies: [] }],
  tools: [{ id: 1, text: "欢迎来到「现场工具箱」讨论区～应援棒、分贝、歌单、歌词，现场好物一起安利。", by: "STARGO小助手", time: "欢迎帖", likes: 0, dislikes: 0, pinned: true, replies: [] }],
};
function getDiscuss(mod) { const def = (DISCUSS_SEED[mod] || []).map((p) => ({ ...p })); return load("discuss_" + mod, def); }
function saveDiscuss(mod, arr) { store("discuss_" + mod, arr); }
function nowStr() { return new Date().toLocaleString("zh-CN", { hour12: false }).slice(0, 16); }
function discussSectionHTML(mod) {
  return `<section class="discuss" id="discuss-${mod}">
    <div class="discuss-head"><h3>💬 ${DISCUSS_LABEL[mod]} · 讨论区</h3>
      <p class="mini-tip">自由讨论 · 支持点赞 / 点踩 / 回复 / 置顶 · 内容经智能审核（拦截违禁词与私下金钱交易）</p></div>
    <div class="discuss-compose">
      <textarea id="ds-input-${mod}" class="ds-input" placeholder="说点什么吧～ 文明发言，禁止黄牛 / 代抢 / 私下金钱交易" rows="3"></textarea>
      <div class="ds-compose-foot"><span class="mini-tip" id="ds-hint-${mod}"></span>
        <button class="btn btn-primary btn-sm" onclick="submitDiscuss('${mod}')">发布</button></div>
    </div>
    <div class="ds-list" id="ds-list-${mod}"></div>
  </section>`;
}
function initDiscussAreas() {
  DISCUSS_MODS.forEach((mod) => {
    const tab = $("tab-" + mod);
    if (tab) tab.insertAdjacentHTML("beforeend", discussSectionHTML(mod));
    renderDiscuss(mod);
  });
}
function dsCardHTML(mod, p) {
  const replies = (p.replies && p.replies.length) ? p.replies.map((r) => `
    <div class="ds-reply">
      <div class="ds-card-head"><span class="ds-author">↳ 👤 ${esc(r.by)}</span><span class="ds-time">${esc(r.time)}</span></div>
      <div class="ds-text">${esc(r.text)}</div>
      <div class="ds-actions">
        <button class="ds-btn" onclick="voteDiscuss('${mod}',${p.id},'like',${r.id})">👍 ${r.likes || 0}</button>
        <button class="ds-btn" onclick="voteDiscuss('${mod}',${p.id},'dislike',${r.id})">👎 ${r.dislikes || 0}</button>
      </div>
    </div>`).join("") : "";
  const owner = currentUser() && p.by === currentUser().login;
  return `<div class="ds-card ${p.pinned ? "pinned" : ""}">
    <div class="ds-card-head">
      <span class="ds-author">👤 ${esc(p.by)}</span>
      <span class="ds-time">${esc(p.time)}</span>
      ${p.pinned ? '<span class="ds-pin">📌 置顶</span>' : ""}
    </div>
    <div class="ds-text">${esc(p.text)}</div>
    <div class="ds-actions">
      <button class="ds-btn" onclick="voteDiscuss('${mod}',${p.id},'like')">👍 ${p.likes || 0}</button>
      <button class="ds-btn" onclick="voteDiscuss('${mod}',${p.id},'dislike')">👎 ${p.dislikes || 0}</button>
      <button class="ds-btn" onclick="toggleReplyBox('${mod}',${p.id})">💬 回复</button>
      <button class="ds-btn" onclick="pinDiscuss('${mod}',${p.id})">${p.pinned ? "取消置顶" : "📌 置顶"}</button>
      ${owner ? `<button class="ds-btn ds-del" onclick="delDiscuss('${mod}',${p.id})">🗑 删除</button>` : ""}
    </div>
    <div class="ds-reply-box" id="reply-${mod}-${p.id}" style="display:none">
      <textarea id="reply-in-${mod}-${p.id}" class="ds-input" rows="2" placeholder="回复 @${esc(p.by)}…"></textarea>
      <button class="btn btn-sm btn-primary" onclick="submitReply('${mod}',${p.id})">发送回复</button>
    </div>
    ${replies ? `<div class="ds-replies">${replies}</div>` : ""}
  </div>`;
}
function renderDiscuss(mod) {
  const box = $("ds-list-" + mod);
  if (!box) return;
  const arr = getDiscuss(mod);
  const sorted = [...arr].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.id - a.id);
  box.innerHTML = sorted.length ? sorted.map((p) => dsCardHTML(mod, p)).join("") : '<p class="empty">还没有人发言，来抢沙发吧～</p>';
}
function submitDiscuss(mod) {
  const u = currentUser();
  if (!u) { openAuth("login"); return toast("🔒 请先登录后再发言"); }
  const ta = $("ds-input-" + mod);
  const text = ta.value.trim();
  if (!text) return toast("说点什么再发布吧～");
  const rev = reviewContent(text);
  if (!rev.ok) return toast("🚫 智能审核未通过：" + rev.reason);
  const arr = getDiscuss(mod);
  arr.unshift({ id: Date.now(), text, by: u.login, time: nowStr(), likes: 0, dislikes: 0, pinned: false, replies: [] });
  saveDiscuss(mod, arr); ta.value = ""; renderDiscuss(mod);
  toast("✅ 发布成功，感谢分享！");
}
function voteDiscuss(mod, id, kind, replyId) {
  if (!currentUser()) { openAuth("login"); return toast("🔒 请先登录后操作"); }
  const arr = getDiscuss(mod);
  const p = arr.find((x) => x.id === id); if (!p) return;
  if (replyId) {
    const r = (p.replies || []).find((x) => x.id === replyId); if (!r) return;
    if (kind === "like") r.likes = (r.likes || 0) + 1; else r.dislikes = (r.dislikes || 0) + 1;
  } else {
    if (kind === "like") p.likes = (p.likes || 0) + 1; else p.dislikes = (p.dislikes || 0) + 1;
  }
  saveDiscuss(mod, arr); renderDiscuss(mod);
}
function toggleReplyBox(mod, id) {
  const el = $("reply-" + mod + "-" + id);
  if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}
function submitReply(mod, id) {
  const u = currentUser();
  if (!u) { openAuth("login"); return toast("🔒 请先登录后回复"); }
  const ta = $("reply-in-" + mod + "-" + id); if (!ta) return;
  const text = ta.value.trim();
  if (!text) return toast("回复内容不能为空");
  const rev = reviewContent(text);
  if (!rev.ok) return toast("🚫 智能审核未通过：" + rev.reason);
  const arr = getDiscuss(mod);
  const p = arr.find((x) => x.id === id); if (!p) return;
  p.replies = p.replies || [];
  p.replies.push({ id: Date.now(), text, by: u.login, time: nowStr(), likes: 0, dislikes: 0 });
  saveDiscuss(mod, arr); renderDiscuss(mod);
  toast("✅ 回复成功");
}
function pinDiscuss(mod, id) {
  if (!currentUser()) { openAuth("login"); return toast("🔒 请先登录后操作"); }
  const arr = getDiscuss(mod);
  const p = arr.find((x) => x.id === id); if (!p) return;
  p.pinned = !p.pinned; saveDiscuss(mod, arr); renderDiscuss(mod);
  toast(p.pinned ? "📌 已置顶" : "已取消置顶");
}
function delDiscuss(mod, id) {
  const u = currentUser(); if (!u) { openAuth("login"); return; }
  const arr = getDiscuss(mod);
  const p = arr.find((x) => x.id === id);
  if (!p || p.by !== u.login) return toast("只能删除自己发布的发言哦");
  if (!confirm("确定删除这条发言？")) return;
  saveDiscuss(mod, arr.filter((x) => x.id !== id)); renderDiscuss(mod);
  toast("已删除");
}
function markSwapped(id) { const ss = getSwaps(); const s = ss.find((x) => x.id === id); if (s) { s.status = "已换"; store("swaps2", ss); renderSwaps(); toast("🎉 已标记为「已换」！"); } }

/* ================================================================
   v3.0 新增：官方购票平台 / 官方出行网站 / 可编辑补充 / 打赏反馈设置
================================================================ */

/* --- 场馆官网链接（避免逐个改 VENUES） --- */
const VENUE_SITE = {
  "亚洲国际博览馆（AsiaWorld-Expo）": "https://www.asiaworld-expo.com.hk/",
  "澳门银河综艺馆（Galaxy Arena）": "https://www.galaxyentertainment.com/",
  "澳门威尼斯人综艺馆（Venetian Cotai Arena）": "https://www.venetianmacao.com/",
  "澳门新濠影汇综艺馆（Studio City Event Center）": "https://www.studiocity-macao.com/",
  "首尔 KSPO DOME（奥林匹克体操竞技场）": "https://www.kspodome.com/",
  "新加坡室内体育馆（Singapore Indoor Stadium）": "https://www.singaporeindoorstadium.com.sg/",
  "东京巨蛋（Tokyo Dome）": "https://www.tokyo-dome.co.jp/",
  "曼谷 IMPACT Arena": "https://www.impact.co.th/",
};

/* --- 官方购票平台直达 --- */
const PLATFORMS = [
  { n:"韩国 Interpark / NOL", u:"https://world.nol.com/" },
  { n:"韩国 YES24", u:"https://ticket.yes24.com/" },
  { n:"韩国 Ticketlink", u:"https://www.ticketlink.co.kr/" },
  { n:"大麦（大陆）", u:"https://www.damai.cn/" },
  { n:"猫眼（大陆）", u:"https://www.maoyan.com/" },
  { n:"金光票务（澳门）", u:"https://www.cotaiticket.com/" },
  { n:"澳门售票网", u:"https://www.macauticket.com/" },
  { n:"城市售票网（香港）", u:"https://www.urbtix.hk/" },
  { n:"新加坡 Ticketmaster", u:"https://www.ticketmaster.sg/" },
  { n:"新加坡 SISTIC", u:"https://www.sistic.com.sg/" },
  { n:"日本 e+ (イープラス)", u:"https://eplus.jp/" },
  { n:"日本 Lawson 票", u:"https://l-tike.com/" },
  { n:"日本 PIA", u:"https://w.pia.jp/" },
  { n:"泰国 Thai Ticket Major", u:"https://www.thaiticketmajor.com/" },
];
const PLATFORM_MAP = {
  "NOL(Interpark)": "https://world.nol.com/", "YES24": "https://ticket.yes24.com/", "Ticketlink": "https://www.ticketlink.co.kr/",
  "大麦": "https://www.damai.cn/", "猫眼": "https://www.maoyan.com/", "金光票务": "https://www.cotaiticket.com/",
  "Ticketmaster": "https://www.ticketmaster.com/", "SISTIC": "https://www.sistic.com.sg/", "e+": "https://eplus.jp/",
  "Thai Ticket Major": "https://www.thaiticketmajor.com/", "官方渠道": "" };
function renderPlatforms() {
  $("platform-list").innerHTML = PLATFORMS.map((p) => `
    <a class="plat-card" href="${p.u}" target="_blank" rel="noopener">
      <span class="plat-icon">🎟️</span><span>${esc(p.n)}</span><span class="plat-go">前往 →</span>
    </a>`).join("");
}

/* --- 官方出行/旅游局网站（非商业、官方权威） --- */
const TRAVEL_SITES = [
  { n:"韩国旅游发展局", u:"https://chinese.visitkorea.or.kr/" },
  { n:"日本国家旅游局 JNTO", u:"https://www.jnto.go.jp/" },
  { n:"泰国国家旅游局", u:"https://www.tourismthailand.org/" },
  { n:"新加坡旅游局", u:"https://www.visitsingapore.com/" },
  { n:"香港旅游发展局", u:"https://www.discoverhongkong.com/" },
  { n:"澳门旅游局", u:"https://www.macaotourism.gov.mo/" },
];
function renderTravelSites() {
  $("travel-sites").innerHTML = TRAVEL_SITES.map((t) => `
    <a class="plat-card" href="${t.u}" target="_blank" rel="noopener">
      <span class="plat-icon">🧭</span><span>${esc(t.n)}</span><span class="plat-go">官网 →</span>
    </a>`).join("");
}

/* --- 违禁品速查：新增场馆官网 --- */
const BAN_SITE = {
  "东京·东京巨蛋": "https://www.tokyo-dome.co.jp/",
  "新加坡·室内体育馆": "https://www.singaporeindoorstadium.com.sg/",
  "首尔·KSPO DOME": "https://www.kspodome.com/",
  "曼谷·IMPACT Arena": "https://www.impact.co.th/",
};

/* --- 用户可编辑补充（跨国追星各子模块） --- */
function loadNote(k) { return load("note_" + k, ""); }
function saveNote(k, v) { store("note_" + k, v); }
function initNotes() {
  document.querySelectorAll("[data-note]").forEach((el) => {
    const k = el.dataset.note;
    el.value = loadNote(k);
    const tag = document.getElementById("note-saved-" + k);
    el.addEventListener("input", () => { saveNote(k, el.value); if (tag) tag.textContent = "已自动保存 ✅"; });
  });
}

/* --- 通用弹窗（打赏/反馈/设置共用） --- */
function openGenModal(bodyHtml, footHtml) {
  $("gen-body").innerHTML = bodyHtml;
  $("gen-foot").innerHTML = footHtml || "";
  $("gen-modal").classList.add("show");
}
function closeGenModal() { $("gen-modal").classList.remove("show"); }

/* --- 网页设置（创作者配置，仅存本机；各用户互不干扰） --- */
function getConfig() {
  const def = { title: "STARGO 线下追星一站式小助手", creatorEmail: "", feedbackEndpoint: "", payQr: "" };
  return Object.assign(def, load("siteconfig", {}));
}
function saveConfig() {
  const c = getConfig();
  c.title = $("cfg-title").value.trim() || "STARGO 线下追星一站式小助手";
  c.creatorEmail = $("cfg-email").value.trim();
  c.feedbackEndpoint = $("cfg-endpoint").value.trim();
  c.payQr = $("cfg-payqr").value.trim();
  store("siteconfig", c);
  document.title = c.title;
  toast("✅ 网页设置已保存到本机");
  closeGenModal();
}
function openSettings() {
  const c = getConfig();
  openGenModal(`
    <h3 style="margin-bottom:10px">⚙️ 网页设置</h3>
    <p class="mini-tip" style="margin-bottom:12px">这些设置仅保存在你自己的浏览器里，不会上传、也不会影响其他访客（各用户互不干扰）。用于配置打赏收款码与反馈接收方式。</p>
    <div class="form-grid">
      <label>网页标题</label>
      <input type="text" id="cfg-title" value="${esc(c.title)}">
      <label>反馈接收邮箱（用户留言一键发到你邮箱）</label>
      <input type="text" id="cfg-email" placeholder="如 creator@example.com" value="${esc(c.creatorEmail)}">
      <label>反馈提交端点（可选，填 Formspree 等链接则一键直发；留空则用邮件客户端）</label>
      <input type="text" id="cfg-endpoint" placeholder="https://formspree.io/f/xxxx" value="${esc(c.feedbackEndpoint)}">
      <label>现金打赏收款码图片链接（微信/支付宝收款码图床直链）</label>
      <input type="text" id="cfg-payqr" placeholder="https://.../收款码.png" value="${esc(c.payQr)}">
    </div>
  `, `<button class="btn btn-ghost" onclick="closeGenModal()">取消</button><button class="btn btn-primary" onclick="saveConfig()">保存设置</button>`);
}

/* --- 打赏创作者（鲜花/点赞/现金） --- */
function getRewards() { return load("rewards", { flower: 0, like: 0 }); }
function sendFlower() { const r = getRewards(); r.flower++; store("rewards", r); openReward(); toast("🌸 谢谢你的鲜花！"); }
function sendLike() { const r = getRewards(); r.like++; store("rewards", r); openReward(); toast("👍 谢谢你的点赞！"); }
function openReward() {
  const c = getConfig(), r = getRewards();
  const payHtml = c.payQr
    ? `<p class="mini-tip">微信/支付宝扫码打赏：</p><img src="${esc(c.payQr)}" style="max-width:200px;display:block;margin:8px auto;border-radius:12px" onerror="this.replaceWith(Object.assign(document.createElement('p'),{textContent:'收款码无法加载，请检查链接',className:'mini-tip'}))">`
    : `<p class="mini-tip">创作者尚未配置收款码。可在「网页设置」中填入微信/支付宝收款码图片链接。</p>`;
  openGenModal(`
    <h3 style="margin-bottom:8px">💝 打赏网页创作者</h3>
    <p class="mini-tip" style="margin-bottom:12px">这个工具完全免费、为爱发电。有能力可以现金打赏，没有也没关系，送朵鲜花或点个赞就是最大的支持 💜</p>
    <div style="display:flex;gap:18px;justify-content:center;margin:10px 0 6px">
      <div style="text-align:center"><div style="font-size:30px">🌸</div><b>${r.flower}</b><br><span class="mini-tip">鲜花</span></div>
      <div style="text-align:center"><div style="font-size:30px">👍</div><b>${r.like}</b><br><span class="mini-tip">点赞</span></div>
    </div>
    ${payHtml}
    <p class="mini-tip" style="margin-top:10px">注：鲜花/点赞计数保存在你本机浏览器，用于记录你的心意；创作者如需全局统计可后续接入后端。</p>
  `, `<button class="btn btn-ghost" onclick="sendFlower()">🌸 送鲜花</button><button class="btn btn-ghost" onclick="sendLike()">👍 点赞</button><button class="btn btn-primary" onclick="closeGenModal()">关闭</button>`);
}

/* --- 用户反馈（一键发到创作者邮箱，无需用户注册邮箱） --- */
function openFeedback() {
  openGenModal(`
    <h3 style="margin-bottom:8px">💬 留言反馈</h3>
    <p class="mini-tip" style="margin-bottom:12px">写下你的建议或问题，点击发送即可一键送达创作者邮箱（你无需自己登录邮箱）。</p>
    <div class="form-grid">
      <label>你的称呼（选填）</label>
      <input type="text" id="fb-name" placeholder="如 小星" maxlength="20">
      <label>留言内容</label>
      <textarea id="fb-text" rows="5" maxlength="800" placeholder="想说点什么～"></textarea>
    </div>
  `, `<button class="btn btn-ghost" onclick="closeGenModal()">取消</button><button class="btn btn-primary" onclick="submitFeedback()">📨 一键发送</button>`);
}
async function submitFeedback() {
  const text = $("fb-text").value.trim();
  if (!text) return toast("请先写点内容～");
  const c = getConfig();
  const name = $("fb-name").value.trim() || "热心用户";
  const body = `来自 STARGO 网页的用户反馈\n称呼：${name}\n时间：${new Date().toLocaleString("zh-CN")}\n\n${text}`;
  if (c.feedbackEndpoint) {
    try {
      await fetch(c.feedbackEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name, message: text }) });
      toast("✅ 已通过接口发送到创作者邮箱！");
    } catch (e) { toast("接口发送失败，已为你打开邮件客户端"); window.location.href = `mailto:${c.creatorEmail || ""}?subject=${encodeURIComponent("STARGO 网页反馈")}&body=${encodeURIComponent(body)}`; }
  } else if (c.creatorEmail) {
    window.location.href = `mailto:${c.creatorEmail}?subject=${encodeURIComponent("STARGO 网页反馈")}&body=${encodeURIComponent(body)}`;
    toast("📨 已为你打开邮件客户端，点击发送即可");
  } else {
    toast("创作者尚未配置反馈邮箱，你可以先复制内容：" + text.slice(0, 30) + "…");
  }
  closeGenModal();
}

/* --- 图片读取（物料互换上传，压缩后存本机） --- */
function readImg(file, cb) {
  if (!file) return cb(null);
  const fr = new FileReader();
  fr.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 700, scale = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      try { cb(cv.toDataURL("image/jpeg", 0.72)); } catch (e) { cb(null); }
    };
    img.onerror = () => cb(null);
    img.src = fr.result;
  };
  fr.onerror = () => cb(null);
  fr.readAsDataURL(file);
}

/* ================================================================
   v3.1 新增：账号系统 / 访客计数 / 实用资讯站 / AI 智能总结
================================================================ */

/* --- 账号系统（本地存储，演示用；正式版应接入后端加密） --- */
function getAccounts() { return load("accounts", []); }
function currentUser() { return load("session", null); }
function updateAuthUI() {
  const u = currentUser();
  const area = $("auth-area");
  if (!area) return;
  if (u) {
    area.innerHTML = `<span class="user-greet">👤 ${esc(u.login)}</span><button class="nav-btn nav-mini" onclick="doLogout()">退出</button>`;
  } else {
    area.innerHTML = `<button class="nav-btn nav-mini" onclick="openAuth('login')">👤 登录/注册</button>`;
  }
  renderVisitor();
}
let _authCode = "";
function openAuth(mode) {
  const isReg = mode === "register";
  openGenModal(`
    <h3 style="margin-bottom:8px">${isReg ? "📝 注册账号" : "👤 登录"}</h3>
    <p class="mini-tip" style="margin-bottom:12px">${isReg ? "注册后即可解锁全部功能（抢票/出行/台账/备忘录等编辑保存）。账号仅保存在你本机浏览器（演示）。" : "登录后即可编辑并保存你的追星数据。"}</p>
    <div class="form-grid">
      <label>手机号 / 邮箱</label>
      <input type="text" id="au-login" placeholder="如 138xxxx 或 you@example.com" maxlength="60">
      ${isReg ? `<label>密码（6 位以上）</label><input type="password" id="au-pass" placeholder="设置密码" maxlength="40">
      <label>验证码</label>
      <div style="display:flex;gap:8px">
        <input type="text" id="au-code" placeholder="点击发送验证码" maxlength="6" style="flex:1">
        <button class="btn btn-sm btn-ghost" type="button" onclick="sendCode()">📨 发送验证码</button>
      </div>
      <p class="mini-tip" id="au-codehint">演示环境无短信/邮件通道，点击发送后会在此显示验证码。</p>` : `<label>密码</label><input type="password" id="au-pass" placeholder="输入密码" maxlength="40">`}
    </div>
    <p class="mini-tip" id="au-msg" style="margin-top:8px"></p>
  `, `<button class="btn btn-ghost" onclick="closeGenModal()">取消</button>${isReg ? `<button class="btn btn-primary" onclick="doRegister()">注册并登录</button>` : `<button class="btn btn-primary" onclick="doLogin()">登录</button>`}<button class="btn btn-sm btn-ghost" onclick="openAuth('${isReg ? "login" : "register"}')">${isReg ? "已有账号？去登录" : "没有账号？去注册"}</button>`);
}
function sendCode() {
  const login = $("au-login") && $("au-login").value.trim();
  if (!login) return toast("请先填写手机号 / 邮箱");
  _authCode = String(Math.floor(100000 + Math.random() * 900000));
  $("au-codehint").innerHTML = `（演示）验证码已发送：<b style="color:var(--pink);font-size:15px;letter-spacing:2px">${_authCode}</b> · 请输入后完成注册`;
  toast("验证码已生成（演示）");
}
function validLogin(s) { return /^1\d{10}$/.test(s) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }
function doRegister() {
  const login = ($("au-login").value || "").trim();
  const pass = $("au-pass").value || "";
  const code = ($("au-code").value || "").trim();
  if (!validLogin(login)) return $("au-msg").textContent = "❌ 请输入有效的手机号或邮箱";
  if (pass.length < 6) return $("au-msg").textContent = "❌ 密码至少 6 位";
  if (!_authCode || code !== _authCode) return $("au-msg").textContent = "❌ 验证码不正确（点击发送后查看演示验证码）";
  const accs = getAccounts();
  if (accs.find((a) => a.login === login)) return $("au-msg").textContent = "❌ 该账号已注册，请直接登录";
  accs.push({ login, pass: btoa(unescape(encodeURIComponent(pass))) });
  store("accounts", accs);
  store("session", { login });
  bumpAccountCount();
  updateAuthUI();
  closeGenModal();
  toast("🎉 注册成功，已登录！现在可以畅享全部功能");
}
function doLogin() {
  const login = ($("au-login").value || "").trim();
  const pass = $("au-pass").value || "";
  const a = getAccounts().find((x) => x.login === login);
  if (!a) return $("au-msg").textContent = "❌ 账号不存在，请先注册";
  if (a.pass !== btoa(unescape(encodeURIComponent(pass)))) return $("au-msg").textContent = "❌ 密码错误";
  store("session", { login });
  updateAuthUI();
  closeGenModal();
  toast("👋 欢迎回来，" + login);
}
function doLogout() {
  store("session", null);
  updateAuthUI();
  switchTab("home");
  toast("已退出登录（仍可浏览首页）");
}

/* --- 首页访客计数（未登录=访问/设备数；登录=注册账号数） --- */
async function renderVisitor() {
  const el = $("visitor-counter"), sub = $("visitor-sub");
  if (!el) return;
  try {
    if (currentUser()) {
      const r = await fetch("https://api.countapi.xyz/get/stargo-fan-app/accounts");
      const n = (r.ok ? (await r.json()).value : 0) || 0;
      if (!n) { el.textContent = "你是注册用户之一 💜"; sub.textContent = "注册用户数暂未统计（或计数服务受限）"; return; }
      el.textContent = "你是第 " + n + " 位注册用户 💜";
      sub.textContent = "已登录：" + currentUser().login + " · 注册用户越多，追星社群越热闹";
    } else {
      const r = await fetch("https://api.countapi.xyz/hit/stargo-fan-app/visits");
      const n = (r.ok ? (await r.json()).value : 0) || 0;
      el.textContent = "你是本网页第 " + n + " 位访客 🎉";
      sub.textContent = "注册账号后这里会显示注册用户数 · 登录可解锁全部功能";
    }
  } catch (e) {
    el.textContent = currentUser() ? "你是注册用户之一 💜" : "你是本网页的宝藏访客 🎉";
    sub.textContent = "（离线模式：计数服务暂不可用）";
  }
}
async function bumpAccountCount() {
  try { await fetch("https://api.countapi.xyz/hit/stargo-fan-app/accounts"); } catch (e) {}
}

/* --- 实用资讯站 --- */
const SITES = [
  { n:"小红书", d:"演唱会攻略 / 应援穿搭 / 场馆实拍", u:"https://www.xiaohongshu.com/search_result?keyword=", q:"演唱会攻略" },
  { n:"哔哩哔哩 B站", d:"应援教学 / 爱豆混剪 / 直播回放", u:"https://search.bilibili.com/all?keyword=", q:"演唱会应援" },
  { n:"微博", d:"官方动态 / 超话社区 / 实时热搜", u:"https://s.weibo.com/weibo?q=", q:"演唱会" },
  { n:"抖音", d:"现场直拍 / 粉丝二创 / 购票提醒", u:"https://www.douyin.com/search/", q:"演唱会" },
  { n:"百度贴吧", d:"老牌粉丝论坛 / 资源汇总", u:"https://tieba.baidu.com/f?kw=", q:"吧" },
  { n:"豆瓣", d:"评分 / 小组讨论 / 巡演讨论", u:"https://www.douban.com/search?q=", q:"演唱会" },
  { n:"Weverse", d:"官方粉丝社区 / 周边商城（HYBE 等）", u:"https://weverse.io/", q:"" },
  { n:"YouTube", d:"官方 MV / 直播 / 打歌舞台", u:"https://www.youtube.com/results?search_query=", q:"official" },
  { n:"Spotify", d:"音源 / playlist", u:"https://open.spotify.com/search/", q:"" },
  { n:"官咖 / 官网", d:"经纪公司官方公告（最权威）", u:"https://www.google.com/search?q=", q:"official fanclub" },
];
function initDiscover() { renderSites(); }
function renderSites() {
  $("site-list").innerHTML = SITES.map((s, i) => `
    <div class="plat-card site-card">
      <span class="plat-icon">🔗</span>
      <div class="site-mid">
        <div class="site-name">${esc(s.n)}</div>
        <div class="site-desc">${esc(s.d)}</div>
      </div>
      <a class="plat-go" href="${s.u + encodeURIComponent(s.q || s.n)}" target="_blank" rel="noopener">搜索 →</a>
      <button class="site-add" onclick="addSiteToMemo(${i})">＋备忘录</button>
    </div>`).join("");
}
function addSiteToMemo(i) {
  if (!currentUser()) { openAuth("login"); return toast("🔒 请先登录，登录后可把渠道加入备忘录"); }
  const s = SITES[i];
  const url = s.u + encodeURIComponent(s.q || s.n);
  memoBlocks.push({ type:"text", text:`🔎 ${s.n}：${s.d} —— ${url}` });
  saveMemo(); renderMemo();
  toast("✅ 已加入备忘录，去「备忘录」查看整理");
}

/* --- AI 智能总结 --- */
let _lastSummary = "";
function aiSummarize() {
  const u = currentUser();
  const rs = load("reminders", []);
  const ledger = getLedger();
  const tripRedline = load("redline", "");
  const memo = load("memo", MEMO_DEFAULT);
  const swaps = getSwaps();
  const posts = getPosts();
  const redline = +load("lgbudget", 0) || 0;
  const now = new Date();
  const ym = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  const monthRows = ledger.filter((r) => (r.date || "").slice(0, 7) === ym);
  const net = monthRows.reduce((s, r) => s + (r.cat.includes("卖出") ? -r.amt : r.amt), 0);
  const html = [], plain = [];
  html.push("🤖 <b>STARGO 智能总结</b>（基于你本机数据生成）");
  plain.push("🤖 STARGO 智能总结（" + new Date().toLocaleString("zh-CN") + "）");
  html.push("👤 " + (u ? "已登录：" + esc(u.login) : "当前为游客模式（数据以本机默认/已存为准）"));
  plain.push("账号：" + (u ? u.login : "游客"));
  html.push("🔔 <b>我的提醒</b>：" + (rs.length ? `已设置 ${rs.length} 个演出/开票提醒（最近：${esc((rs[0].title || rs[0].artist || ""))}）` : "暂无，建议去抢票提醒中心设置开售提醒"));
  plain.push("提醒：" + (rs.length ? `${rs.length} 个（最近 ${rs[0].title || rs[0].artist || ""}）` : "暂无"));
  html.push("🧳 <b>行程预算红线</b>：" + (tripRedline ? `已设置 ¥${esc(tripRedline)}（出发前先算总账更划算）` : "尚未设置，建议用「花销计算器」先算一笔"));
  plain.push("行程预算红线：" + (tripRedline ? `¥${tripRedline}` : "未设置"));
  html.push("📒 <b>收纳台账</b>：本月（" + ym + "）净支出约 <b>¥" + net.toLocaleString() + "</b>" + (redline ? (net > redline ? "，⚠️ 已超月度红线 ¥" + redline + "，注意理性消费" : "，未超红线 ¥" + redline) : "（未设月度红线）"));
  plain.push("本月台账净支出：¥" + net.toLocaleString() + (redline ? (net > redline ? `（已超红线 ¥${redline}）` : `（红线 ¥${redline}）`) : ""));
  html.push("📝 <b>备忘录</b>：共 " + memo.length + " 个内容块");
  plain.push("备忘录：" + memo.length + " 个内容块");
  html.push("🔄 <b>物料互换</b>：" + swaps.length + " 张互换卡片（" + swaps.filter((s) => s.status === "求换").length + " 张求换中）");
  plain.push("物料互换：" + swaps.length + " 张");
  html.push("💬 <b>社区动态</b>：" + posts.length + " 条信息流");
  plain.push("社区信息流：" + posts.length + " 条");
  const tips = [];
  if (!rs.length) tips.push("设置开售提醒，避免错过抢票");
  if (redline && net > redline) tips.push("本月已超红线，建议暂停非必要下单");
  if (!budget) tips.push("出发前用「花销计算器」先算总账，拼房拼车更划算");
  if (swaps.length === 0) tips.push("有闲置物料可在互助社区发起互换，回点血");
  html.push("💡 <b>智能建议</b>：" + (tips.length ? tips.join("；") : "保持得不错，继续理智追星 💜"));
  plain.push("建议：" + (tips.length ? tips.join("；") : "保持得不错，继续理智追星"));
  _lastSummary = plain.join("\n");
  openGenModal(html.map((l) => `<p style="margin:6px 0;font-size:14px">${l}</p>`).join(""), `<button class="btn btn-ghost" onclick="addSummaryToMemo()">📝 存入备忘录</button><button class="btn btn-primary" onclick="closeGenModal()">关闭</button>`);
}
function addSummaryToMemo() {
  memoBlocks.push({ type:"h2", text:"🤖 STARGO 智能总结（" + new Date().toLocaleString("zh-CN") + "）" }, { type:"text", text:_lastSummary });
  saveMemo(); renderMemo();
  closeGenModal();
  toast("✅ 已存入备忘录");
}

/* ---------------- 启动 ---------------- */
/* ================================================================
   模块8：穿搭妆容指南
================================================================ */
const STYLE_DESTS = [
  { id:"kr", name:"🇰🇷 韩国·首尔", kw:"韩国 首尔 追星 穿搭 妆容" },
  { id:"jp", name:"🇯🇵 日本·东京", kw:"日本 东京 演唱会 穿搭" },
  { id:"th", name:"🇹🇭 泰国·曼谷", kw:"泰国 曼谷 追星 穿搭" },
  { id:"hk", name:"🇨🇳 中国香港", kw:"香港 演唱会 穿搭 妆容" },
  { id:"mo", name:"🇨🇳 中国澳门", kw:"澳门 演唱会 穿搭" },
];
const STYLE_GUIDE = {
  kr: {
    beginner:"黑色/白色基础款 + 应援色小物（发圈、手机壳、手幅）最稳妥；首尔 11–3 月室内外温差大，叠穿一件轻羽绒或厚外套，场馆内可脱。舒适平底鞋优先，散场要走很远。",
    mid:"用应援色做主色呼应（如杏色针织+米白裤），叠穿出层次感；室内场馆空调冷，备一条应援色围巾两用。鞋子选厚底小白鞋，站 3 小时不累。",
    pro:"追星博主同款「同色系 monochrome + 一个亮点」；带轻便应援发箍/徽章，进场前拍照出片；备透明防雨罩（首尔常突降雨雪），包里塞暖宝宝。",
    indoor:"室内场馆（KSPO DOME / 高尺天空 dome 等）空调偏冷，长袖打底 + 可脱外套；地面平整，可穿稍带跟的鞋；避免大面积亮片（反光影响他人拍照）。",
    outdoor:"露天 / 户外音乐节：一定看天气！雨季备防水鞋 + 透明雨衣（多数场馆禁撑伞）；夏日防晒帽 + 冰袖，冬日暖宝宝贴腰背。",
    makeup:"韩系水光肌：妆前保湿 + 定妆喷雾三明治（喷-粉-喷）；眼线用胶笔更抗汗；唇釉叠透明唇蜜；散粉重点压 T 区与眼下，随身带吸油纸。",
    palette:"拍照配色：杏色 / 奶油白（韩团应援色友好）+ 一件应援色单品点睛；避免全身荧光，夜场灯光下显黑。",
  },
  jp: {
    beginner:"东京四季分明，春秋薄外套、夏透气、冬保暖内衣 + 大衣。基础黑白灰 + 应援色小物。巨蛋室内冷气强，随身薄外套最实用。",
    mid:"日系 layered（衬衫 + 针织背心）显层次，应援色丝巾点睛；舒适乐福鞋 / 小白鞋，站坐兼顾。",
    pro:"原宿风混搭，应援色发饰 + 透明伞（东京多雨）随时备用；提前查场馆 Dress Code，部分会场禁特定色。",
    indoor:"巨蛋 / 体育馆空调冷，长袖 + 可脱外套；地板硬，带软垫鞋垫更舒服。",
    outdoor:"夏日花火 / 户外音乐节重点防晒补水；冬日防寒防风，手套 + 暖贴安排上。",
    makeup:"日系清透裸妆：持久底妆 + 自然眉粉，唇膏选应援色系更出片；定妆喷雾锁妆。",
    palette:"莫兰迪色 + 一抹应援色点缀，低饱和耐看又上镜。",
  },
  th: {
    beginner:"曼谷常年炎热（30+℃），透气速干面料优先；应援色 T 恤 + 短裤/裙 + 运动鞋；室内商场冷气极冷，备薄外套。",
    mid:"泰式亮色混搭，应援色罩衫出片；防泼水拖鞋 / 凉鞋；便携小风扇 + 降温喷雾随身。",
    pro:"演唱会穿搭亮片 + 应援色，夜场超上镜；备一次性雨衣（雨季突雨）；轻量化背包减负。",
    indoor:"室内场馆冷气强，薄外套必备；地面偶有湿滑，平底优先。",
    outdoor:"户外音乐节防晒 + 补水 + 帽子，雷阵雨备雨衣；选快干材质。",
    makeup:"热带抗汗妆：防水睫毛膏 + 定妆喷雾，哑光底妆控油，唇釉选防水款。",
    palette:"高饱和应援色 + 白色，夜场灯光下更显白出片。",
  },
  hk: {
    beginner:"香港潮湿，夏闷热冬湿冷（10–15℃ 体感更冷）；基础层 + 应援色外套；舒适走路鞋（香港步走得多）。",
    mid:"港风 layered，应援色围巾 / 冷帽点缀；亚博 / 红馆室内冷气足，外套常备。",
    pro:"港风复古混搭，应援色配饰点睛；备折叠伞（突然雨）；轻装少带，进场顺畅。",
    indoor:"室内场馆冷气强，外套必备；通道多，舒适鞋优先。",
    outdoor:"户外留意湿度，防滑鞋；夏日备小风扇。",
    makeup:"港风红唇 + 持久底妆，防水睫毛 + 定妆喷雾，夜场更出片。",
    palette:"红 / 黑经典港风 + 应援色点睛，复古又高级。",
  },
  mo: {
    beginner:"澳门室内场馆 / 度假村强冷气，夏外热内冷；基础 + 应援色外套；舒适鞋（度假村大，走路多）。",
    mid:"度假风 layered，应援色丝巾 / 帽点缀；轻装出行更轻松。",
    pro:"华丽感点缀 + 应援色，夜场出片；轻装少带，过安检快。",
    indoor:"度假村冷气极强，外套必备；地面光滑，平底优先。",
    outdoor:"户外留意防晒与补水；选轻便透气。",
    makeup:"持久底妆 + 防水，定妆喷雾锁妆，夜场灯光下更亮眼。",
    palette:"金 / 香槟 + 应援色，度假奢华感拉满。",
  },
};
let curStyleDest = "kr";
function platSearchLinks(kw) {
  const links = [
    { n:"小红书", icon:"🔍", url:"https://www.xiaohongshu.com/search_result?keyword=" + encodeURIComponent(kw) },
    { n:"B站", icon:"📺", url:"https://search.bilibili.com/all?keyword=" + encodeURIComponent(kw) },
    { n:"抖音", icon:"🎬", url:"https://www.douyin.com/search/" + encodeURIComponent(kw) },
  ];
  return links.map((l) => `<a class="bili-card" href="${l.url}" target="_blank" rel="noopener"><span class="bili-icon">${l.icon}</span><span>在${l.n}搜「${esc(kw)}」</span><span class="bili-go">→</span></a>`).join("");
}
function initStyle() {
  $("style-tabs").innerHTML = STYLE_DESTS.map((d, i) => `<button class="dest-tab ${i === 0 ? "active" : ""}" data-dest="${d.id}" onclick="renderStyle('${d.id}')">${d.name}</button>`).join("");
  renderStyle(STYLE_DESTS[0].id);
}
function renderStyle(id) {
  curStyleDest = id;
  document.querySelectorAll("#style-tabs .dest-tab").forEach((b) => b.classList.toggle("active", b.dataset.dest === id));
  const g = STYLE_GUIDE[id], d = STYLE_DESTS.find((x) => x.id === id);
  $("style-detail").innerHTML = `
  <section class="panel">
    <h3>🎯 分阶段攻略（${esc(d.name)}）</h3>
    <div class="style-stages">
      <div class="style-stage"><div class="stage-tag s1">小白</div><div class="stage-body">${esc(g.beginner)}</div></div>
      <div class="style-stage"><div class="stage-tag s2">进阶</div><div class="stage-body">${esc(g.mid)}</div></div>
      <div class="style-stage"><div class="stage-tag s3">高手</div><div class="stage-body">${esc(g.pro)}</div></div>
    </div>
  </section>
  <section class="panel">
    <h3>👗 按场景推荐穿搭</h3>
    <p class="panel-sub">结合城市天气与场馆室内外，给出更实用的穿搭建议</p>
    <div class="phrase-langs" id="style-venue"></div>
    <div id="style-outfit" class="style-outfit"></div>
  </section>
  <section class="panel">
    <h3>💄 妆容 & 配色</h3>
    <p class="mb-line"><b>🛡️ 防脱妆技巧：</b>${esc(g.makeup)}</p>
    <p class="mb-line"><b>📸 拍照配色：</b>${esc(g.palette)}</p>
  </section>
  <section class="panel">
    <h3>📺 ${esc(d.name)} 高质量视频 / 帖子推荐</h3>
    <p class="panel-sub">点击下方直达各平台搜索，按「最多赞 / 最新」筛选高质量穿搭妆容内容</p>
    <div class="bili-grid" id="style-links"></div>
  </section>`;
  const vels = [["indoor", "🏟️ 场馆室内"], ["outdoor", "🌤️ 场馆室外 / 露天"]];
  $("style-venue").innerHTML = vels.map((v, i) => `<button class="time-chip ${i === 0 ? "active" : ""}" data-v="${v[0]}" onclick="setStyleVenue('${v[0]}',this)">${v[1]}</button>`).join("");
  $("style-outfit").textContent = g.indoor;
  $("style-links").innerHTML = platSearchLinks(d.kw);
}
function setStyleVenue(v, btn) {
  document.querySelectorAll("#style-venue .time-chip").forEach((b) => b.classList.toggle("active", b === btn));
  $("style-outfit").textContent = STYLE_GUIDE[curStyleDest][v];
}

initTicket();
initTrip();
initBudget();
initLedger();
initCulture();
initTools();
initLyrics();
initMemo();
initCommunity();
initDiscover();
initStyle();
initDiscussAreas();
if ("speechSynthesis" in window) speechSynthesis.getVoices();
const _cfg = getConfig();
if (_cfg.title) document.title = _cfg.title;
renderPlatforms();
renderTravelSites();
initNotes();
updateAuthUI();
