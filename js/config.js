/* ============================================================
 * FiguRise 手办外贸独立站 - 站点全局配置
 * ============================================================
 * 本文件是整站的"控制中心"：品牌、行业、目标国家、产品分类、
 * 联系方式、AI 智脑接入等均可在此修改，无需改动其他代码。
 *
 * 快速上手（3 步）：
 *  1. 修改 brand（品牌名/公司名/口号）
 *  2. 修改 industry 与 regions（你的行业 / 目标国家）
 *  3. 修改 contact 中的邮箱、WhatsApp、地址
 *
 * 想接入真实大模型给 AI 智脑？在 aiBot 中填写 apiUrl / apiKey 即可，
 * 留空则使用内置离线知识引擎（免费、无需联网）。
 * ============================================================ */
window.SITE_CONFIG = {

  /* ---------- 品牌与公司 ---------- */
  brand: {
    name: "FiguRise",                      // 品牌名（Logo 文字）
    nameZh: "潮界工坊",                     // 中文品牌名
    slogan: "Sculpted for the World",      // 品牌口号
    company: "FiguRise Toy Industry Co., Ltd.",
    companyZh: "潮界工坊玩具有限公司",
    founded: "2014",
    bases: ["汕头基地", "东莞基地", "义乌分销仓"],  // 生产基地
    // Logo 小图标（SVG 内联，可自行替换）
    logoMark: `<svg viewBox="0 0 40 40" width="34" height="34" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="12" fill="var(--accent)" opacity=".14"/>
      <path d="M20 8c4.4 0 8 3.4 8 7.6 0 1.6-.5 3-1.3 4.2 2 .7 3.4 2.6 3.4 4.9 0 2.9-2.4 5.2-5.4 5.2H15.3c-3 0-5.4-2.3-5.4-5.2 0-2.3 1.4-4.2 3.4-4.9A7.5 7.5 0 0 1 12 15.6C12 11.4 15.6 8 20 8Z" fill="var(--accent)"/>
      <circle cx="20" cy="16.5" r="2.6" fill="#fff" opacity=".9"/>
      <path d="M14 29c1-1.6 3.2-1.6 4.2 0M19.5 30c1-1.6 3.2-1.6 4.2 0" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
    </svg>`
  },

  /* ---------- 行业与定位（可替换成你的行业） ---------- */
  industry: {
    name: "动漫手办 / 潮流玩具",
    nameEn: "Anime Figures & Collectibles",
    // 一句话定位，展示在首页 Hero
    positioning: "从原型雕刻到认证量产的一站式 OEM/ODM 出海工厂",
    positioningEn: "One-stop OEM/ODM factory: from prototype sculpting to certified mass production"
  },

  /* ---------- 产品分类（首页品类卡 / 产品页筛选） ---------- */
  categories: [
    { id: "prize",    en: "Prize Figures",      zh: "景品手办",    sym: "fig-prize" },
    { id: "articulated", en: "Articulated Figures", zh: "可动手办", sym: "fig-articulated" },
    { id: "blindbox", en: "Blind Boxes",        zh: "盲盒系列",    sym: "fig-blindbox" },
    { id: "chibi",    en: "Chibi / Q-version",  zh: "Q版黏土人",   sym: "fig-chibi" },
    { id: "statue",   en: "Collector Statues",  zh: "收藏雕像",    sym: "fig-statue" },
    { id: "mini",     en: "Mini & Capsule",     zh: "迷你扭蛋",    sym: "fig-mini" }
  ],

  /* ---------- 目标市场（重点客群，可增删改） ---------- */
  regions: [
    { id: "sea", name: "东南亚", nameEn: "Southeast Asia",
      countries: ["Vietnam", "Thailand", "Indonesia", "Philippines", "Malaysia", "Singapore"] },
    { id: "me",  name: "中东",  nameEn: "Middle East",
      countries: ["Saudi Arabia", "UAE", "Egypt", "Turkey", "Kuwait", "Qatar"] },
    { id: "latam", name: "拉美", nameEn: "Latin America",
      countries: ["Mexico", "Brazil", "Chile", "Peru", "Colombia", "Argentina"] }
  ],

  /* ---------- 多语言（默认 zh；按需增删，文案在 js/i18n.js 与 lang-*.js） ---------- */
  languages: [
    { code: "zh", label: "简体中文" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" },
    { code: "ar", label: "العربية" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "th", label: "ไทย" },
    { code: "id", label: "Bahasa Indonesia" }
  ],

  /* ---------- 联系方式 ---------- */
  contact: {
    email: "sales@figurise.com",           // 询盘收件邮箱
    whatsapp: "+86 138 0000 0000",
    phone: "+86 754 8888 0000",
    wechat: "FiguRise-Sales",
    address: "No.88 Jinhuan Rd, Chenghai District, Shantou, Guangdong, China",
    addressZh: "中国广东省汕头市澄海区金环路 88 号",
    workHours: "Mon–Sat 9:00–18:00 (GMT+8)",
    // 询盘表单真实投递：留空则本地保存 + 弹窗提示；可填 Formspree / 企业邮箱 API 等表单服务地址
    formEndpoint: "",
    // 在线聊天下单后的自动回复（支持 {name} 占位）
    autoReply: "Thanks {name}! Your inquiry has been received. Our sales manager will reply within 12 hours (GMT+8)."
  },

  /* ---------- 数据指标（首页数据条 / 关于页） ---------- */
  stats: [
    { value: 12, suffix: "+", key: "statYears" },    // 年制造经验
    { value: 300, suffix: "+", key: "statPartners" },// 全球合作客户
    { value: 2, suffix: "M+", key: "statCapacity" }, // 年产能(件)
    { value: 98, suffix: "%", key: "statOnTime" }    // 准时交付率
  ],

  /* ---------- 认证 ---------- */
  certifications: [
    { code: "ISO 9001", name: "质量管理体系", nameEn: "Quality Management" },
    { code: "BSCI", name: "社会责任审核", nameEn: "Social Compliance" },
    { code: "CE", name: "欧盟安全认证", nameEn: "EU Safety" },
    { code: "EN71", name: "欧盟玩具安全", nameEn: "EU Toy Safety" },
    { code: "ASTM F963", name: "美国玩具安全", nameEn: "US Toy Safety" },
    { code: "SGS / 3C", name: "第三方检测", nameEn: "Third-party Testing" }
  ],

  /* ---------- AI 外贸智脑 ----------
   * 留空 apiUrl → 使用内置离线知识引擎（选品洞察/本地化内容/智能投放/供应链预判 四大模块）。
   * 填写 apiUrl / apiKey → 优先调用远程大模型，格式需兼容 OpenAI Chat Completions。
   */
  aiBot: {
    apiUrl: "",            // 例如 "https://api.openai.com/v1/chat/completions"
    apiKey: "",            // 例如 "sk-xxxx"
    model: "gpt-4o-mini",
    temperature: 0.7,
    // 智脑系统提示词（接入远程模型时生效）
    systemPrompt: "You are FiguBot, an expert cross-border e-commerce AI assistant for a Chinese figure/toy export factory. Help buyers with product selection insights, localized content, advertising strategy and supply chain estimates for Southeast Asia, Middle East and Latin America markets. Be concise, structured and practical."
  },

  /* ---------- 合作流程 ---------- */
  processKeys: ["proc1", "proc2", "proc3", "proc4", "proc5"]
};
