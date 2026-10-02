/* ============================================================
 * FiguRise - 多语言引擎 (i18n)
 * 语种：zh / en / es / pt / ar / vi / th / id（阿拉伯语自动 RTL）
 * 回退链：当前语种 → en → zh → 键名，保证任何页面永不出空白
 * 用法：
 *   HTML: <span data-i18n="nav.home"></span>
 *         <p data-i18n-html="hero.title"></p>
 *         <input data-i18n-ph="c.phName">
 *   JS:   I18N.t("nav.home")   /   I18N.setLang("en")
 * ============================================================ */
window.I18N = (function () {
  "use strict";

  var RTL_LANGS = { ar: true };

  /* 页面 meta（title / description） */
  var META = {
    home: {
      zh: ["FiguRise 手办外贸官网 | 景品/可动/盲盒/雕像 OEM ODM 工厂", "中国手办玩具出海工厂，面向东南亚、中东、拉美市场的一站式 OEM/ODM 供应商，提供景品手办、可动手办、盲盒、雕像等全品类定制生产。"],
      en: ["FiguRise Anime Figure Export Factory | Prize, Articulated, Blind Box, Statue OEM/ODM", "China-based anime figure export factory. One-stop OEM/ODM supplier for prize figures, articulated figures, blind boxes and statues, serving Southeast Asia, Middle East and Latin America."]
    },
    products: {
      zh: ["产品中心 | FiguRise 手办工厂", "浏览 FiguRise 全品类手办产品：景品手办、可动手办、盲盒、Q版黏土人、收藏雕像、迷你扭蛋。支持 OEM/ODM 定制与批量采购。"],
      en: ["Product Catalog | FiguRise Figure Factory", "Browse FiguRise full catalog: prize figures, articulated figures, blind boxes, chibi figures, collector statues and mini capsules. OEM/ODM customization and bulk sourcing available."]
    },
    about: {
      zh: ["关于我们 | FiguRise 手办工厂实力", "12 年手办制造经验，汕头/东莞双基地，ISO9001/BSCI/CE/EN71 认证，从原型到量产的完整供应链能力。"],
      en: ["About Us | FiguRise Factory Strength", "12+ years of figure manufacturing. Twin bases in Shantou & Dongguan, ISO9001/BSCI/CE/EN71 certified, full supply chain from sculpting to mass production."]
    },
    insights: {
      zh: ["市场洞察 | FiguRise 全球手办市场报告", "东南亚、中东、拉美手办市场趋势、选品建议、本地化策略与供应链预判，帮助买家更精准、更稳健地走向全球。"],
      en: ["Market Insights | FiguRise Global Figure Market Reports", "Southeast Asia, Middle East and Latin America figure market trends, product selection tips, localization strategy and supply chain forecasts for smarter global sourcing."]
    },
    contact: {
      zh: ["联系我们 | FiguRise 询盘报价", "向 FiguRise 发送询盘：获取产品报价、样品、MOQ 与交期。销售经理 12 小时内回复（GMT+8）。"],
      en: ["Contact Us | Get a Quote from FiguRise", "Send an inquiry to FiguRise: get product quotes, samples, MOQ and lead times. Sales manager replies within 12 hours (GMT+8)."]
    }
  };

  /* ---------------- 中文词库（主词库） ---------------- */
  var dict = {
    zh: {
      /* 顶部导航 */
      "nav.home": "首页",
      "nav.products": "产品中心",
      "nav.about": "关于我们",
      "nav.insights": "市场洞察",
      "nav.contact": "联系我们",
      "nav.quote": "获取报价",
      "topbar.hint": "中国手办出海工厂 · 服务全球采购商",

      /* Hero */
      "hero.badge": "中国制造 · 全球交付",
      "hero.title": "全球市场的高端<em>手办</em>制造伙伴",
      "hero.sub": "从原型雕刻、开模注塑到认证量产与全球物流，一站式 OEM/ODM 出海工厂。景品、可动、盲盒、雕像全品类覆盖，已服务 40+ 国家采购商与批发商。",
      "hero.cta1": "浏览产品目录",
      "hero.cta2": "立即获取报价",
      "hero.scroll": "向下滚动",
      "hero.statYears": "年制造经验",
      "hero.statPartners": "全球合作客户",
      "hero.statCapacity": "年产能（件）",
      "hero.statOnTime": "准时交付率",

      /* 跑马灯 */
      "marquee.label": "已交付市场",

      /* 核心优势 */
      "sec.strengths": "核心优势",
      "sec.strengthsSub": "为什么全球采购商选择 FiguRise",
      "s1.t": "OEM / ODM 全能制造",
      "s1.d": "支持 IP 授权代工与原创设计开发，从 2D 原画、3D 建模、原型雕刻到量产全程可控。",
      "s2.t": "国际认证体系",
      "s2.d": "ISO9001、BSCI、CE、EN71、ASTM F963 全认证，满足欧美、中东、东南亚准入要求。",
      "s3.t": "7-15 天快速打样",
      "s3.d": "资深原型师团队 + 3D 打印快速验证，样品可反复修改直至确认，降低沟通成本。",
      "s4.t": "全链路供应链",
      "s4.d": "模具、注塑、喷油、移印、UV 印刷、包装自有产线，单项目跨环节无缝衔接。",
      "s5.t": "全球物流方案",
      "s5.d": "海运拼箱/整柜、空运、海外仓与集运专线，按目的地优化运费与时效。",
      "s6.t": "专属顾问式服务",
      "s6.d": "一对一销售经理 + 区域团队，12 小时响应，样品、验货、售后全程陪同。",

      /* 产品中心 */
      "sec.products": "产品中心",
      "sec.productsSub": "六大品类 · 支持 OEM/ODM 定制与批量采购",
      "products.viewAll": "查看全部产品",
      "products.more": "了解更多",
      "c1.n": "景品手办",
      "c1.d": "高性价比走量款，电商与展会通吃",
      "c2.n": "可动手办",
      "c2.d": "18+ 关节，把玩与收藏并重",
      "c3.n": "盲盒系列",
      "c3.d": "隐藏款玩法，社交电商爆款",
      "c4.n": "Q版黏土人",
      "c4.d": "可爱路线，礼赠场景首选",
      "c5.n": "收藏雕像",
      "c5.d": "树脂精工，高客单收藏市场",
      "c6.n": "迷你扭蛋",
      "c6.d": "低价引流，多渠道铺货",

      /* 全球市场 */
      "sec.regions": "全球市场",
      "sec.regionsSub": "深耕三大重点客群市场，本地化团队贴身服务",
      "r1.name": "东南亚",
      "r1.desc": "盲盒与 Q 版需求爆发，社交电商驱动年轻客群。",
      "r2.name": "中东",
      "r2.desc": "高客单收藏需求，礼品经济与展会文化兴起。",
      "r3.name": "拉美",
      "r3.desc": "电商渗透率快速提升，本土 IP 与动漫文化升温。",
      "r.tag": "市场特征",
      "r.hot": "热门品类",
      "r.advice": "采购建议",

      /* 合作流程 */
      "sec.process": "合作流程",
      "sec.processSub": "五步开启合作，全程透明可控",
      "proc1.t": "询盘沟通",
      "proc1.d": "提交需求或选品，销售经理 12 小时内响应并给出方案。",
      "proc2.t": "样品确认",
      "proc2.d": "7-15 天打样，多轮修改直至满意，样品费可返还。",
      "proc3.t": "订单生产",
      "proc3.d": "签订合同后 30-45 天量产，生产进度周报同步。",
      "proc4.t": "质量检验",
      "proc4.d": "全检 + 第三方抽检双保险，出货前提供验货报告。",
      "proc5.t": "全球出货",
      "proc5.d": "海运/空运/海外仓，提供全套清关单据与物流跟踪。",

      /* 工厂实力 */
      "sec.factory": "工厂实力",
      "sec.factorySub": "数字化工厂 · 年产能 200 万件 · 全检出货",
      "f1.t": "精密注塑车间",
      "f1.d": "32 台注塑机，吨位 60-500T，公差 ±0.05mm。",
      "f2.t": "无尘喷油/移印",
      "f2.d": "恒温喷油线 + 全自动移印/丝印，色差严格管控。",
      "f3.t": "3D 打印快速原型",
      "f3.d": "SLA/DLP 打印验证，原型迭代周期缩短 60%。",
      "f4.t": "手工精修车间",
      "f4.d": "资深手涂师团队，细节点缀与旧化效果定制。",
      "f5.t": "包装与组装",
      "f5.d": "彩盒、吸塑、展示盒一体化包装设计与生产。",
      "f6.t": "品控实验室",
      "f6.d": "跌落、拉力、重金属、邻苯检测，出货全检。",

      /* 客户之声 */
      "sec.testi": "客户之声",
      "sec.testiSub": "来自三大市场的采购商评价",
      "t1.q": "FiguRise 的样品速度让我们在越南盲盒旺季抢到了先机，出货质量一直很稳定。",
      "t1.n": "Nguyen Van Minh",
      "t1.r": "越南 · 电商批发商",
      "t2.q": "他们在沙特市场给了很专业的本地化建议，包装和认证都帮我们搞定，省了很多事。",
      "t2.n": "Ahmed Al-Rashid",
      "t2.r": "沙特 · 连锁零售采购",
      "t3.q": "从询盘到首柜出货不到 60 天，拉美清关资料也准备得很齐全。",
      "t3.n": "Carlos Mendes",
      "t3.r": "巴西 · 进口批发商",

      /* CTA */
      "cta.title": "准备好让国货手办走向世界了吗？",
      "cta.sub": "发送询盘，获取免费选品建议、报价与样品方案，销售经理 12 小时内回复。",
      "cta.btn1": "发送询盘",
      "cta.btn2": "咨询 AI 智脑",

      /* 页脚 */
      "footer.aboutText": "潮界工坊（FiguRise）专注动漫手办与潮流玩具制造 12 年，以「从原型到量产」的一站式能力，帮助全球采购商更低成本、更稳健地进入手办市场。",
      "footer.linksTitle": "快速链接",
      "footer.catsTitle": "产品分类",
      "footer.contactTitle": "联系我们",
      "footer.regionsTitle": "服务区域",
      "footer.rights": "保留所有权利。",
      "footer.privacy": "隐私政策",
      "footer.terms": "服务条款",

      /* 产品页 */
      "p.title": "产品中心",
      "p.sub": "全品类手办 · 支持 OEM/ODM 定制与批量采购，价格以询盘为准",
      "p.all": "全部分类",
      "p.search": "搜索产品（名称 / 关键词）…",
      "p.moq": "MOQ",
      "p.lead": "交期",
      "p.scale": "比例/尺寸",
      "p.inquire": "立即询盘",
      "p.detail": "查看详情",
      "p.close": "关闭",
      "p.features": "产品卖点",
      "p.why": "为什么选 FiguRise",
      "p.empty": "未找到匹配产品，换个关键词试试，或直接询盘告诉我们你的需求。",
      "p.priceHint": "价格以询盘为准（含定制、数量折扣）",
      "p.qty": "预计采购数量",
      "p.oem": "支持 OEM/ODM 定制",

      /* 关于页 */
      "a.title": "关于我们",
      "a.sub": "从汕头玩具产业带走向全球的 12 年手办制造商",
      "a.storyTitle": "我们的故事",
      "a.storyP1": "2014 年，我们在中国玩具之都汕头创立了潮界工坊。创业之初只有 8 个人的原型师工作室，如今已发展为拥有汕头、东莞双生产基地、超 300 名员工、年产能 200 万件的全链条手办工厂。",
      "a.storyP2": "我们始终坚持「从原型到量产」的一站式服务理念：IP 授权合规、原创设计开发、模具制造、注塑生产、喷油移印、包装物流全部内部可控，让客户只需面对一个窗口。",
      "a.storyP3": "今天，FiguRise 的产品已进入东南亚、中东、拉美、欧洲等 40 多个国家，服务电商卖家、批发商、连锁零售与展会采购商。我们相信，好的手办不只是玩具，更是文化与生意。",
      "a.missionTitle": "我们的使命",
      "a.mission": "帮助更多国货手办品牌更精准、更稳健地走向全球 —— 用中国供应链的效率，匹配全球市场的审美与合规要求。",
      "a.baseTitle": "生产基地",
      "a.facTitle": "核心生产设施",
      "a.facSub": "覆盖手办制造全工序的自有产能",
      "a.qcTitle": "质量体系",
      "a.qcSub": "四重质检关卡，确保每一柜货零缺陷出厂",
      "q1.t": "来料检验 IQC",
      "q1.d": "原材料、油漆、包装进厂 100% 抽检。",
      "q2.t": "制程检验 IPQC",
      "q2.d": "注塑、喷油、组装各工序巡检记录。",
      "q3.t": "成品检验 FQC",
      "q3.d": "外观、功能、装配 100% 全检。",
      "q4.t": "出货检验 OQC",
      "q4.d": "第三方抽检 + 全套检测报告随货。",
      "a.timelineTitle": "发展历程",
      "tl1.y": "2014",
      "tl1.t": "汕头创立，8 人原型师工作室起步",
      "tl2.y": "2017",
      "tl2.t": "建成注塑+喷油全产线，通过 ISO9001",
      "tl3.y": "2020",
      "tl3.t": "东莞基地投产，年产能突破 100 万件",
      "tl4.y": "2023",
      "tl4.t": "上线外贸智脑系统，AI 赋能选品与投放",
      "tl5.y": "2026",
      "tl5.t": "服务 40+ 国家，年产能达 200 万件",
      "a.certTitle": "认证资质",
      "a.teamTitle": "服务团队",
      "a.teamSub": "懂产品、懂市场、懂语言，一个窗口对接全球",
      "tms1.n": "王敏",
      "tms1.r": "东南亚销售经理",
      "tms2.n": "阿里 · 拉希德",
      "tms2.r": "中东销售经理",
      "tms3.n": "卢卡斯 · 门德斯",
      "tms3.r": "拉美销售经理",
      "tms4.n": "张晨",
      "tms4.r": "项目工程师",

      /* 洞察页 */
      "i.title": "市场洞察",
      "i.sub": "东南亚、中东、拉美手办市场趋势与采购指南，由 FiguRise 外贸智脑持续更新",
      "i.region": "市场",
      "i.updated": "更新于",
      "i.readMore": "展开全文",
      "i.points": "核心要点",
      "i.download": "下载完整报告",
      "i.note": "以上内容基于公开数据与一线采购经验整理，供选品参考；具体以实时市场与当地法规为准。",

      /* 联系页 */
      "c.title": "联系我们",
      "c.sub": "发送询盘或直接联系销售团队，12 小时内回复（GMT+8）",
      "c.formTitle": "发送询盘",
      "c.infoTitle": "直接联系",
      "c.whyTitle": "为什么选择我们",
      "c.name": "姓名 *",
      "c.company": "公司名称",
      "c.email": "邮箱 *",
      "c.whatsapp": "WhatsApp / 电话",
      "c.country": "所在国家/地区",
      "c.category": "感兴趣品类",
      "c.qty": "预计采购数量",
      "c.msg": "需求描述（款式、IP、规格、目标市场…）",
      "c.phName": "你的姓名",
      "c.phCompany": "公司名称（选填）",
      "c.phEmail": "name@company.com",
      "c.phWhat": "+86 138 0000 0000",
      "c.phCountry": "例如：越南 / 沙特 / 墨西哥",
      "c.phQty": "例如：首批 3000 件",
      "c.phMsg": "请描述你的产品需求…",
      "c.submit": "提交询盘",
      "c.successTitle": "询盘已提交！",
      "c.successText": "感谢你的询盘！销售经理将在 12 小时内（GMT+8）通过邮箱或 WhatsApp 与你联系。如需加急，可直接添加微信/WhatsApp。",
      "c.sendAnother": "再发一条询盘",
      "c.errName": "请填写姓名",
      "c.errEmail": "请填写有效邮箱",
      "c.errMsg": "请简单描述需求",
      "c.regionsTitle": "区域销售经理",
      "c.officeLabel": "负责市场",
      "c.hours": "工作时间：周一至周六 9:00-18:00（GMT+8）",
      "c.why1": "12 年制造经验，双基地全产线",
      "c.why2": "样品 7-15 天，量产 30-45 天",
      "c.why3": "全认证 + 全检出货 + 全套清关文件",
      "c.why4": "区域团队：东南亚 / 中东 / 拉美 / 欧洲",
      "c.why5": "AI 智脑免费提供选品与投放建议",

      /* 智脑 */
      "bot.title": "FiguBot 外贸智脑",
      "bot.status": "在线 · 智能应答",
      "bot.greeting": "你好！我是 FiguBot，你的手办出海智能顾问。我可以帮你：<b>① 选品洞察</b> ② 本地化内容 ③ 智能投放 ④ 供应链预判。<br>点击下方功能卡片，或直接输入你的问题。",
      "bot.placeholder": "输入你的问题…",
      "bot.quick1": "选品洞察",
      "bot.quick2": "本地化内容",
      "bot.quick3": "智能投放",
      "bot.quick4": "供应链预判",
      "bot.moduleTitle": "选择功能模块",
      "bot.regionQ": "选择目标市场：",
      "bot.categoryQ": "选择品类：",
      "bot.budgetQ": "选择月投放预算：",
      "bot.destQ": "选择目的地国家/地区：",
      "bot.back": "返回",
      "bot.restart": "重新开始",
      "bot.typing": "正在思考…",
      "bot.default": "我是外贸智脑，可以为你提供：选品洞察、本地化内容、智能投放、供应链预判四类服务。点击下方功能卡片开始，或直接提问（如：MOQ 是多少？）。",
      "bot.apiError": "远程模型连接失败，已切换到内置知识引擎。",
      "bot.copied": "已复制到剪贴板",
      "bot.langs": "支持中 / 英双语回答，其他语种请直接输入英文。",
      "bot.gear": "设置",
      "bot.cfgTitle": "接入远程大模型",
      "bot.cfgUrl": "API 接口地址（OpenAI 兼容）",
      "bot.cfgKey": "API Key",
      "bot.cfgModel": "模型名称",
      "bot.cfgMode": "引擎模式",
      "bot.cfgRemote": "远程大模型",
      "bot.cfgLocal": "内置知识引擎",
      "bot.cfgSave": "保存并启用",
      "bot.cfgTest": "测试连接",
      "bot.cfgReset": "恢复默认",
      "bot.cfgBack": "返回对话",
      "bot.cfgSaved": "配置已保存！",
      "bot.cfgSavedTip": "已启用远程模型：自由提问将优先调用大模型；四大功能卡片仍使用内置知识库（无需联网、秒回）。",
      "bot.cfgEmpty": "已恢复内置知识引擎，所有提问由本地知识库回答。",
      "bot.cfgOk": "连接成功，延迟 {ms} ms",
      "bot.cfgFail": "连接失败：{msg}",
      "bot.cfgNeed": "请先填写 API 接口地址与 API Key，或切换到内置引擎。",
      "bot.cfgHint": "API Key 仅保存在本浏览器 localStorage，不会上传到任何服务器。正式上线建议在服务端托管代理（隐藏 Key）。",
      "bot.engineLocal": "内置引擎",
      "bot.engineRemote": "远程模型",

      /* 通用 */
      "common.close": "关闭",
      "common.cancel": "取消",
      "common.next": "下一步",
      "common.submit": "提交",
      "common.copy": "复制",
      "common.days": "天"
    }
  };

  /* 各语种词库由 lang-en.js / lang-other.js 合并进来 */
  window.__I18N_MERGE__ = function (code, data) { dict[code] = data; };

  /* ---------------- 引擎 ---------------- */
  var current = (function () {
    try { var saved = localStorage.getItem("figurise-lang"); return saved && dict[saved] ? saved : "zh"; }
    catch (e) { return "zh"; }
  })();

  var changeHandlers = [];

  function t(key) {
    var v;
    if (dict[current]) v = dict[current][key];
    if (v === undefined && dict.en) v = dict.en[key];
    if (v === undefined && dict.zh) v = dict.zh[key];
    if (v === undefined) v = key;
    return v;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    root.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    root.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });
  }

  function applyMeta(page) {
    var m = META[page];
    if (!m) return;
    var zh = m.zh, en = m.en;
    var pick = function (pair) { return current === "zh" ? pair[0] : pair[1]; };
    document.title = pick([zh[0], en[0]]);
    var tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", pick([zh[1], en[1]]));
  }

  function setLang(code) {
    if (!dict[code]) code = "zh";
    current = code;
    try { localStorage.setItem("figurise-lang", code); } catch (e) {}
    var html = document.documentElement;
    html.setAttribute("lang", code === "zh" ? "zh-CN" : code);
    html.setAttribute("dir", RTL_LANGS[code] ? "rtl" : "ltr");
    apply(document);
    changeHandlers.forEach(function (fn) { try { fn(code); } catch (e) {} });
    var page = document.body.getAttribute("data-page");
    if (page) applyMeta(page);
  }

  function onChange(fn) { changeHandlers.push(fn); }

  return {
    t: t,
    apply: apply,
    applyMeta: applyMeta,
    setLang: setLang,
    onChange: onChange,
    get lang() { return current; },
    get rtl() { return !!RTL_LANGS[current]; }
  };
})();

/* 初始化：应用默认语言 */
document.addEventListener("DOMContentLoaded", function () {
  var saved = (function () { try { return localStorage.getItem("figurise-lang"); } catch (e) { return null; } })();
  I18N.setLang(saved || "zh");
});
