/* ============================================================
 * FiguRise - FiguBot 知识库 (bot-kb.js)
 * 四大模块的离线情报数据 + FAQ。
 * 内容基于公开市场数据与一线出口采购经验整理，可自由编辑。
 * 所有内容字段均为 { zh, en } 双语对象（站点为中文时用中文回答）。
 * ============================================================ */
window.__BOT_KB__ = {

  /* 模块文案 */
  m: {
    dInsights: { zh: "分析目标市场热门品类与价格带", en: "Hot categories & price bands for your target market" },
    dLocal: { zh: "生成本地化标题、卖点与投放内容", en: "Localized titles, selling points & content" },
    dAds: { zh: "渠道组合、预算分配与投放策略", en: "Channel mix, budget split & ad strategy" },
    dSupply: { zh: "交期、物流、认证与关税预判", en: "Lead time, logistics, certification & duties" },

    insightsIntro: { zh: "好的，我来帮你做<b>选品洞察</b>。先选择你要分析的目标市场：", en: "Let's run <b>product selection insights</b>. First, pick your target market:" },
    localIntro: { zh: "好的，我来生成<b>本地化内容</b>方案。先选择目标市场：", en: "Let's generate <b>localized content</b>. First pick your target market:" },
    adsIntro: { zh: "好的，我来规划<b>智能投放</b>策略。先选择投放市场：", en: "Let's plan <b>smart advertising</b>. First pick your market:" },
    supplyIntro: { zh: "好的，我来做<b>供应链预判</b>。先选择目标区域：", en: "Let's forecast the <b>supply chain</b>. First pick the region:" },

    insights: { zh: "选品洞察", en: "Product Selection Insights" },
    local: { zh: "本地化内容", en: "Localized Content" },
    ads: { zh: "智能投放", en: "Smart Advertising" },
    supply: { zh: "供应链预判", en: "Supply Chain Forecast" },

    profile: { zh: "市场特征", en: "Market profile" },
    hotCats: { zh: "热门品类（按机会排序）", en: "Hot categories (by opportunity)" },
    channels: { zh: "建议渠道", en: "Recommended channels" },
    advice: { zh: "采购建议", en: "Sourcing advice" },
    pickCat: { zh: "想深入哪个品类的选品策略？", en: "Which category would you like to dig into?" },
    priceBand: { zh: "价格带：", en: "Price band:" },
    play: { zh: "玩法：", en: "Play mechanics:" },
    moq: { zh: "建议起订量：", en: "Suggested MOQ:" },
    regionalNote: { zh: "区域提示：", en: "Regional note:" },

    localTitle: { zh: "本地化标题模板", en: "Localized title template" },
    localPoints: { zh: "五条卖点", en: "Five selling points" },
    localKeywords: { zh: "建议关键词", en: "Suggested keywords" },
    localPlatform: { zh: "平台与内容建议", en: "Platform & content notes" },
    localDont: { zh: "本地化注意（避免踩坑）", en: "Localization cautions" },

    adsBudget: { zh: "选择你的月投放预算：", en: "Select your monthly ad budget:" },
    adsSplit: { zh: "预算分配建议", en: "Suggested budget split" },
    adsChannels: { zh: "渠道组合", en: "Channel mix" },
    adsTarget: { zh: "人群定向", en: "Audience targeting" },
    adsCreative: { zh: "创意方向", en: "Creative directions" },
    adsKpi: { zh: "目标 KPI：", en: "Target KPI:" },

    sLead: { zh: "生产交期：", en: "Production lead time:" },
    sSea: { zh: "海运时效：", en: "Sea freight time:" },
    sAir: { zh: "空运时效：", en: "Air freight time:" },
    sCost: { zh: "运费参考：", en: "Freight cost estimate:" },
    sCert: { zh: "认证要求：", en: "Certification:" },
    sDuty: { zh: "关税提示：", en: "Duties & taxes:" },
    sPeak: { zh: "产能/旺季预判：", en: "Capacity & peak season:" },
    sPay: { zh: "付款建议：", en: "Payment suggestion:" },
    supplyDest: { zh: "选择目的地国家/地区：", en: "Select destination country/region:" },

    fallback: {
      zh: "抱歉，这个问题暂时超出我的知识库范围。你可以点击下方功能卡片使用<b>选品洞察 / 本地化内容 / 智能投放 / 供应链预判</b>四大模块，或直接联系销售经理获取更专业的解答。",
      en: "Sorry, that question is beyond my knowledge base for now. Tap a module card below — <b>Product Selection / Localized Content / Smart Advertising / Supply Chain</b> — or contact our sales manager for a professional answer."
    }
  },

  /* 三大市场情报 */
  regions: {
    sea: {
      profile: {
        zh: "东南亚拥有 6.8 亿人口、极高的年轻化比例，社交电商（TikTok Shop、Shopee、Lazada）增长全球领先。手办消费以低价快消型为主，盲盒、Q 版、迷你场景最热；玩家社群活跃，开箱短视频是主要种草方式。",
        en: "Southeast Asia: 680M people, very young demographics, social commerce (TikTok Shop, Shopee, Lazada) growing faster than anywhere. Figure spending favors low-price fast-moving items — blind boxes, chibi and mini dioramas are hottest. Unboxing short videos are the main discovery channel."
      },
      hot: ["blindbox", "chibi", "mini"],
      catNote: {
        blindbox: { zh: "盲盒在越南、泰国、印尼表现最猛，TikTok 开箱驱动，隐藏款玩法复购率高", en: "Blind boxes crush it in Vietnam, Thailand & Indonesia, driven by TikTok unboxing; hidden-chase drives repurchase" },
        chibi: { zh: "Q 版在年轻女性与礼赠场景走量，菲律宾、马来西亚增长明显", en: "Chibi moves volume with young female & gifting buyers; strong growth in the Philippines & Malaysia" },
        mini: { zh: "迷你扭蛋/场景是低成本引流款，便利店与集市渠道需求稳定", en: "Mini capsules/dioramas are low-cost traffic drivers with steady convenience-store and street-fair demand" }
      },
      channels: {
        zh: "TikTok Shop + Shopee + Lazada 三平台联动；越南/泰国/印尼本地仓备货可提升履约评分与转化。",
        en: "TikTok Shop + Shopee + Lazada in combination; local warehouse stocking in VN/TH/ID boosts fulfillment scores and conversion."
      },
      advice: {
        zh: "建议「走量款 + 隐藏款」组合铺货，首批用 2000-3000 件小单测款；注意印尼斋月、泰国泼水节等节庆备货需提前 2 个月。",
        en: "Ship a 'volume + hidden edition' mix; test with a small first order of 2-3K pcs. Ramadan (ID) and Songkran (TH) require stocking 2 months ahead."
      },
      lTitle: { zh: "【爆款盲盒】限量隐藏款 · 潮玩手办全系列（现货/定制）", en: "Hot Blind Box · Hidden Edition · Trendy Figure Series (In Stock / Custom)" },
      lPoints: {
        zh: ["TikTok 爆款同款，隐藏款概率玩法", "现货充足，支持小批量测款", "礼盒装可选，节庆营销好素材", "支持本地仓备货，履约更快", "价格带低，复购率高"],
        en: ["Same hits as TikTok bestsellers, hidden-chase play", "Plenty of stock, low MOQ for testing", "Gift-box option, ready for festive campaigns", "Local warehouse stocking for faster fulfillment", "Low price band, high repurchase rate"]
      },
      lKeywords: ["盲盒 手办 潮玩", "blind box figure", "tượng nhựa anime", "ของเล่นสะสม", "action figure"],
      lPlatform: {
        zh: "TikTok Shop / Shopee / Lazada 详情页用本地语言；主图突出隐藏款与系列收集；短视频以开箱 + 表情反应为主。",
        en: "Local-language listings on TikTok Shop/Shopee/Lazada; main images highlight hidden editions & collection series; short videos focused on unboxing + reaction."
      },
      lDont: {
        zh: ["避免只配中文说明书，需提供本地语言", "避免与本地爆款 IP 近似造型（侵权风险）", "注意印尼斋月期间物流放缓"],
        en: ["Avoid Chinese-only manuals — provide local language", "Avoid lookalike designs of popular local IPs (IP risk)", "Mind slower logistics in Indonesia during Ramadan"]
      },
      adsChannels: {
        zh: ["TikTok Shop 直播 + 短视频（主力）", "Shopee / Lazada 站内购物广告", "Facebook / Instagram 信息流", "KOL 开箱种草"],
        en: ["TikTok Shop LIVE + short video (primary)", "Shopee/Lazada in-app shopping ads", "Facebook/Instagram feed ads", "KOL unboxing seeding"]
      },
      adsTarget: {
        zh: "18-34 岁年轻用户，动漫/潮玩兴趣标签；重点城市：雅加达、胡志明、曼谷、马尼拉。",
        en: "Ages 18-34 with anime/collectible interests; key cities: Jakarta, Ho Chi Minh, Bangkok, Manila."
      },
      adsCreative: {
        zh: ["开箱视频（隐藏款惊喜瞬间）", "系列收集进度条", "节庆主题礼盒（泼水节/斋月）"],
        en: ["Unboxing videos (hidden reveal moments)", "Collection progress content", "Festive gift sets (Songkran/Ramadan)"]
      }
    },

    me: {
      profile: {
        zh: "中东（沙特、阿联酋、埃及、土耳其等）客单价高、收藏文化快速兴起，动漫展（沙特动漫展、阿联酋展会）带动年轻客群；礼品经济强，斋月与开斋节是全年最重要的送礼节点。",
        en: "Middle East (Saudi, UAE, Egypt, Turkey...): high ticket sizes, fast-rising collectible culture; anime conventions (Saudi Anime Expo, UAE events) drive young buyers. Strong gifting economy — Ramadan & Eid are the biggest gifting moments of the year."
      },
      hot: ["statue", "articulated", "prize"],
      catNote: {
        statue: { zh: "高客单收藏雕像在沙特、阿联酋溢价能力强，限量编号款更受追捧", en: "High-ticket collector statues command strong premiums in KSA & UAE; numbered limited editions sell best" },
        articulated: { zh: "可动手办适合玩家客群，土耳其、埃及本地分销商需求稳定", en: "Articulated figures suit player audiences; steady distributor demand in Turkey & Egypt" },
        prize: { zh: "景品走量适合电商铺货，搭配礼盒装切入送礼场景", en: "Prize figures move volume on marketplaces; pair with gift-box sets for the gifting angle" }
      },
      channels: {
        zh: "独立站 + WhatsApp 私域 + 展会渠道为主；电商平台（Noon、亚马逊中东站）为辅；迪拜适合做转口与仓储中转。",
        en: "DTC site + WhatsApp private channels + conventions first; marketplaces (Noon, Amazon AE) second; Dubai works well as a re-export and warehousing hub."
      },
      advice: {
        zh: "优先做礼盒装与限定款；沙特需 SABER 认证；包装避免宗教敏感元素；斋月前 2 个月集中备货。",
        en: "Prioritize gift-box sets and limited editions; KSA requires SABER certification; keep packaging free of religiously sensitive elements; stock up 2 months before Ramadan."
      },
      lTitle: { zh: "收藏级手办 | 限量编号雕像 · 高端礼盒装（中东现货）", en: "Collector Figures | Limited Numbered Statues · Premium Gift Sets" },
      lPoints: {
        zh: ["限量编号，收藏价值高", "礼盒装高端质感，适合送礼", "符合当地文化习惯的安全包装", "SABER 等认证齐全，清关无忧", "支持展会与私域渠道供货"],
        en: ["Limited numbered editions with collectible value", "Premium gift-box finish for gifting", "Culturally appropriate safe packaging", "SABER and other certifications ready", "Supply for conventions and private channels"]
      },
      lKeywords: ["تماثيل انمي", "anime figures", "figür oyuncak", "collectible statue", "لعبة هدايا"],
      lPlatform: {
        zh: "独立站 + WhatsApp 私域为主；页面建议阿语/英语双语；突出限量编号与礼盒质感；斋月前后加大内容投放。",
        en: "DTC site + WhatsApp private channels; bilingual AR/EN pages; emphasize numbered limits and gift-box quality; boost content around Ramadan."
      },
      lDont: {
        zh: ["避免宗教敏感图案与符号", "包装与赠品避免酒类、猪肉等元素", "沙特注意女性角色形象的本地着装规范"],
        en: ["Avoid religiously sensitive imagery and symbols", "No alcohol or pork motifs on packaging or gifts", "In Saudi, respect local norms for female character attire"]
      },
      adsChannels: {
        zh: ["独立站 Google Ads（品牌词 + 品类词）", "WhatsApp 私域运营 + 定向投放", "Instagram 高客单人群投放", "展会与线下渠道配合"],
        en: ["DTC site Google Ads (brand + category)", "WhatsApp private channel + targeting", "Instagram ads for high-ticket audiences", "Convention & offline channel support"]
      },
      adsTarget: {
        zh: "20-40 岁高收入人群，收藏/游戏/动画兴趣；核心城市：利雅得、迪拜、开罗、伊斯坦布尔。",
        en: "Ages 20-40 high-income, collector/gaming/anime interests; core: Riyadh, Dubai, Cairo, Istanbul."
      },
      adsCreative: {
        zh: ["限量编号展示与稀缺感", "礼盒开箱 + 质感特写", "展会现场 / 到厂实拍"],
        en: ["Limited number reveals & scarcity", "Gift-box unboxing + texture close-ups", "Convention / factory visit content"]
      }
    },

    latam: {
      profile: {
        zh: "拉美电商渗透率快速提升（Mercado Libre、亚马逊巴西站），动漫与本土 IP 文化升温；巴西、墨西哥占区域 60% 以上消费；客单价中等、对价格敏感，但复购黏性高。",
        en: "Latin America: fast-rising e-commerce (Mercado Libre, Amazon BR), growing anime & local-IP culture. Brazil + Mexico = 60%+ of regional spend. Mid price points, price-sensitive, but sticky repurchase."
      },
      hot: ["chibi", "articulated", "blindbox"],
      catNote: {
        chibi: { zh: "Q 版在巴西、墨西哥年轻客群接受度最高，礼盒装表现好", en: "Chibi is best received by young buyers in Brazil & Mexico; gift-box sets perform well" },
        articulated: { zh: "可动/机甲在男性客群中受欢迎，墨西哥需求突出", en: "Articulated/mecha figures resonate with male buyers; strong demand in Mexico" },
        blindbox: { zh: "盲盒在哥伦比亚、秘鲁、智利增长快，适合平台铺货", en: "Blind boxes grow fastest in Colombia, Peru & Chile; ideal for marketplace distribution" }
      },
      channels: {
        zh: "Mercado Libre + 亚马逊 + 本土社交（WhatsApp、Instagram）组合；巴西站优先本地仓（FBA/ML Full）。",
        en: "Mercado Libre + Amazon + local social (WhatsApp, Instagram); in Brazil use local fulfillment (FBA / ML Full) first."
      },
      advice: {
        zh: "清关与税负是核心成本，建议整柜直发 + 本地清关代理；巴西注意 INMETRO 认证与高额进口税；用美元报价锁定汇率风险。",
        en: "Customs & taxes are the core cost — ship FCL with a local customs broker; Brazil needs INMETRO and has heavy import taxes; quote in USD to hedge FX risk."
      },
      lTitle: { zh: "动漫手办 | 盲盒与限量版 · 高性价比直供拉美", en: "Anime Figures | Blind Boxes & Limited Editions · Direct Supply to LatAm" },
      lPoints: {
        zh: ["价格透明，美元报价锁定汇率", "认证与清关资料齐全（INMETRO/NOM）", "支持 Mercado Libre 等平台直发", "整柜直发降低到岸成本", "售后补件快，合作省心"],
        en: ["Transparent USD pricing hedges FX risk", "Complete certification & customs docs (INMETRO/NOM)", "Supports direct shipping to marketplaces like Mercado Libre", "FCL direct shipping cuts landed cost", "Fast after-sales parts, hassle-free"]
      },
      lKeywords: ["figuras anime", "bonecos colecionáveis", "juguetes de anime", "figura de acción", "caja sorpresa"],
      lPlatform: {
        zh: "Mercado Libre / 亚马逊详情页用西语或葡语；突出价格与认证标识；WhatsApp / Instagram 社群运营为主。",
        en: "Mercado Libre/Amazon listings in Spanish or Portuguese; emphasize price and certification badges; run WhatsApp/Instagram communities."
      },
      lDont: {
        zh: ["避免只用美式英语描述定价，本地用西/葡语", "注意巴西各州 ICMS 税差异", "避免过度美式化包装（本地偏好鲜明配色）"],
        en: ["Avoid US-English pricing copy — use ES/PT", "Mind state-level ICMS tax differences in Brazil", "Avoid overly US-style packaging (locals love bold colors)"]
      },
      adsChannels: {
        zh: ["Mercado Libre 站内广告（主力）", "Facebook / Instagram 效果广告", "Google 搜索 + 购物广告", "WhatsApp 社群转化"],
        en: ["Mercado Libre in-app ads (primary)", "Facebook/Instagram performance ads", "Google Search + Shopping", "WhatsApp community conversion"]
      },
      adsTarget: {
        zh: "18-35 岁，动漫/游戏兴趣；核心城市：圣保罗、墨西哥城、波哥大、利马。",
        en: "Ages 18-35 with anime/gaming interests; core: São Paulo, Mexico City, Bogotá, Lima."
      },
      adsCreative: {
        zh: ["价格对比与性价比话术", "真人开箱测评", "表情包化二次创作（本地梗）"],
        en: ["Price-comparison value messaging", "Influencer unboxing reviews", "Meme-style UGC with local humor"]
      }
    }
  },

  /* 品类情报 */
  categories: {
    prize: {
      why: { zh: "景品走量、成本低，适合电商与展会渠道；造型还原度高、开发周期短。", en: "Prize figures move volume at low cost for e-commerce and conventions; high sculpt fidelity, short development cycle." },
      band: { zh: "FOB $2.5-6.5 / 件", en: "FOB $2.5-6.5 / pcs" },
      play: { zh: "隐藏款、特典配件玩法增加复购", en: "Hidden editions & bonus parts drive repurchase" },
      moq: { zh: "1000-3000 件起", en: "1,000-3,000 pcs" }
    },
    articulated: {
      why: { zh: "可玩性强、客群粘性高，中东与拉美市场热销。", en: "High playability and sticky audience; hot in Middle East & LatAm." },
      band: { zh: "FOB $4-10 / 件", en: "FOB $4-10 / pcs" },
      play: { zh: "替换手型、关节可动、联名 IP 溢价", en: "Swap hands, articulation, IP-collab premium" },
      moq: { zh: "500-1500 件起", en: "500-1,500 pcs" }
    },
    blindbox: {
      why: { zh: "社交电商最爆形态，隐藏款玩法驱动复购与分享。", en: "The hottest social-commerce format; hidden-chase mechanics drive repurchase and sharing." },
      band: { zh: "FOB $1.5-4 / 件", en: "FOB $1.5-4 / pcs" },
      play: { zh: "隐藏款概率、收集系列、直播开箱", en: "Hidden rates, collection series, live unboxing" },
      moq: { zh: "2000-5000 件起", en: "2,000-5,000 pcs" }
    },
    chibi: {
      why: { zh: "年轻女性客群、礼赠场景，东南亚与拉美增长最快。", en: "Young female buyers & gifting; fastest-growing in SEA & LatAm." },
      band: { zh: "FOB $2-5 / 件", en: "FOB $2-5 / pcs" },
      play: { zh: "磁吸换脸、节日礼盒、桌面陈列", en: "Magnetic faces, festive gift boxes, desk display" },
      moq: { zh: "1000-3000 件起", en: "1,000-3,000 pcs" }
    },
    statue: {
      why: { zh: "高客单高毛利，收藏客群溢价强，中东市场表现突出。", en: "High ticket & margin with collector premiums; outstanding in the Middle East." },
      band: { zh: "FOB $12-45 / 件", en: "FOB $12-45 / pcs" },
      play: { zh: "限量编号、展会限定、深度涂装", en: "Numbered limiteds, convention exclusives, deep painting" },
      moq: { zh: "300-800 件起", en: "300-800 pcs" }
    },
    mini: {
      why: { zh: "低价引流、渠道广、利润率高，适合多渠道铺货。", en: "Low-cost traffic driver, wide channels, high margin — great for multi-channel distribution." },
      band: { zh: "FOB $0.6-2 / 件", en: "FOB $0.6-2 / pcs" },
      play: { zh: "散装扭蛋、系列收集、集市热销", en: "Bulk capsules, collection series, street-fair sellers" },
      moq: { zh: "3000-10000 件起", en: "3,000-10,000 pcs" }
    }
  },

  /* 投放预算档位 */
  budgets: {
    small: {
      label: { zh: "小预算 · $500-1,500/月", en: "Small · $500-1.5K/mo" },
      split: { zh: "100% 用于测试期：70% 平台站内广告 + 30% 原生短视频素材测试", en: "100% test phase: 70% in-platform ads + 30% native short-video testing" },
      kpi: { zh: "CTR ≥ 2%，CPC 控制在合理区间，先跑出 1-2 个爆款素材再放量", en: "CTR ≥ 2%, reasonable CPC, find 1-2 winning creatives before scaling" }
    },
    mid: {
      label: { zh: "中等 · $1,500-5,000/月", en: "Mid · $1.5K-5K/mo" },
      split: { zh: "40% 站内搜索/购物广告 + 35% 社媒信息流 + 15% KOL 种草 + 10% 再营销", en: "40% search/shopping + 35% social feed + 15% KOL + 10% retargeting" },
      kpi: { zh: "目标 ROAS 2.5-4，加购率 ≥ 8%，月度复购 ≥ 15%", en: "Target ROAS 2.5-4, add-to-cart ≥ 8%, monthly repurchase ≥ 15%" }
    },
    large: {
      label: { zh: "大预算 · $5,000+/月", en: "Large · $5K+/mo" },
      split: { zh: "30% 平台广告 + 30% 内容与 KOL 矩阵 + 20% 直播电商 + 20% 品牌投放与再营销", en: "30% platform ads + 30% content/KOL matrix + 20% LIVE commerce + 20% brand & retargeting" },
      kpi: { zh: "目标 ROAS ≥ 4，月 GMV 环比增长 20%+，积累品牌词搜索量", en: "Target ROAS ≥ 4, 20%+ MoM GMV growth, build brand search volume" }
    }
  },

  /* 供应链预判（按目的地） */
  dest: {
    vietnam: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "广州/深圳 → 海防/胡志明，拼箱 8-12 天", en: "Guangzhou/Shenzhen → Hai Phong/HCMC, LCL 8-12 days" },
      air: { zh: "3-5 天", en: "3-5 days" },
      cost: { zh: "海运拼箱约 $8-12/CBM；空运约 $3.5-5.5/kg", en: "Sea LCL ~$8-12/CBM; air ~$3.5-5.5/kg" },
      cert: { zh: "玩具需越南 TCVN 测试；CE 报告可作参考", en: "Toys need VN TCVN testing; CE report helps" },
      duty: { zh: "玩具类关税约 20-25%，东盟自贸区可享原产地优惠", en: "Toy duties ~20-25%; ASEAN FTA origin benefits possible" },
      peak: { zh: "Tết 春节与开学季前 2 个月为备货高峰", en: "Tết and back-to-school peaks 2 months ahead" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    thailand: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "曼谷林查班，拼箱 8-12 天", en: "Laem Chabang, LCL 8-12 days" },
      air: { zh: "3-5 天", en: "3-5 days" },
      cost: { zh: "海运拼箱约 $9-13/CBM；空运约 $3.8-5.8/kg", en: "Sea LCL ~$9-13/CBM; air ~$3.8-5.8/kg" },
      cert: { zh: "玩具需泰国 TISI 认证（重点管控类目）", en: "Toys require TH TISI certification (controlled category)" },
      duty: { zh: "约 10-20% + VAT 7%", en: "~10-20% + VAT 7%" },
      peak: { zh: "泼水节与圣诞为高峰；10 月开学季也有需求", en: "Songkran & Christmas peaks; October back-to-school" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    indonesia: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "雅加达，拼箱 12-16 天", en: "Jakarta, LCL 12-16 days" },
      air: { zh: "4-6 天", en: "4-6 days" },
      cost: { zh: "海运拼箱约 $10-15/CBM；空运约 $4-6/kg", en: "Sea LCL ~$10-15/CBM; air ~$4-6/kg" },
      cert: { zh: "玩具类目 SNI 强制认证", en: "SNI mandatory certification for toys" },
      duty: { zh: "约 10-20% + 增值税；部分品类高关税", en: "~10-20% + VAT; some categories high duty" },
      peak: { zh: "斋月前 2 个月（Eid 送礼）为年度最大高峰", en: "2 months before Ramadan (Eid gifting) is the biggest peak" },
      pay: { zh: "大额建议 T/T 或 L/C", en: "Large orders: T/T or L/C advised" }
    },
    philippines: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "马尼拉，拼箱 10-14 天", en: "Manila, LCL 10-14 days" },
      air: { zh: "3-5 天", en: "3-5 days" },
      cost: { zh: "海运拼箱约 $9-13/CBM；空运约 $4-6/kg", en: "Sea LCL ~$9-13/CBM; air ~$4-6/kg" },
      cert: { zh: "儿童用品需 FDA 备案", en: "FDA registration for children's products" },
      duty: { zh: "约 10-15%", en: "~10-15%" },
      peak: { zh: "圣诞季备货提前 3 个月（9 月开始）", en: "Christmas stocking starts ~3 months early (Sep)" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    malaysia: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "巴生港，拼箱 8-12 天", en: "Port Klang, LCL 8-12 days" },
      air: { zh: "3-5 天", en: "3-5 days" },
      cost: { zh: "海运拼箱约 $8-12/CBM；空运约 $3.8-5.5/kg", en: "Sea LCL ~$8-12/CBM; air ~$3.8-5.5/kg" },
      cert: { zh: "玩具可参考 MS 标准（非强制但有助清关）", en: "MS standard optional but helps clearance" },
      duty: { zh: "约 5-10% + VAT", en: "~5-10% + VAT" },
      peak: { zh: "开斋节与圣诞为高峰", en: "Hari Raya & Christmas peaks" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    saudi: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "吉达/达曼，拼箱 18-22 天", en: "Jeddah/Dammam, LCL 18-22 days" },
      air: { zh: "5-7 天", en: "5-7 days" },
      cost: { zh: "海运拼箱约 $14-20/CBM；空运约 $4.5-6.5/kg", en: "Sea LCL ~$14-20/CBM; air ~$4.5-6.5/kg" },
      cert: { zh: "SABER 强制认证，出货前需完成 PC/SCOC", en: "SABER mandatory — PC/SCOC certificates before shipment" },
      duty: { zh: "约 5-12% + VAT 15%", en: "~5-12% + VAT 15%" },
      peak: { zh: "斋月/Eid 前 2 个月 + 沙特动漫展档期", en: "2 months before Ramadan/Eid + Saudi anime convention season" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    uae: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "杰贝阿里，拼箱 16-20 天", en: "Jebel Ali, LCL 16-20 days" },
      air: { zh: "5-7 天", en: "5-7 days" },
      cost: { zh: "海运拼箱约 $13-18/CBM；空运约 $4.5-6/kg", en: "Sea LCL ~$13-18/CBM; air ~$4.5-6/kg" },
      cert: { zh: "GCC 标识要求；迪拜转口政策灵活", en: "GCC marking; Dubai re-export rules are flexible" },
      duty: { zh: "5% 关税 + VAT 5%；转口可享免税政策", en: "5% duty + VAT 5%; re-exports enjoy exemptions" },
      peak: { zh: "Eid 与迪拜展会档期", en: "Eid and Dubai event seasons" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    egypt: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "亚历山大港，拼箱 22-28 天", en: "Alexandria, LCL 22-28 days" },
      air: { zh: "5-8 天", en: "5-8 days" },
      cost: { zh: "海运拼箱约 $16-22/CBM；空运约 $5-7/kg", en: "Sea LCL ~$16-22/CBM; air ~$5-7/kg" },
      cert: { zh: "埃及 GoEIC 认证", en: "Egypt GoEIC certification" },
      duty: { zh: "关税偏高，清关要求严格", en: "High duties and strict clearance" },
      peak: { zh: "斋月与开学季", en: "Ramadan & back-to-school" },
      pay: { zh: "建议 L/C 或高比例预付款", en: "L/C or high prepayment advised" }
    },
    turkey: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "伊斯坦布尔（伊兹米特），拼箱 20-26 天", en: "Istanbul (Izmit), LCL 20-26 days" },
      air: { zh: "5-7 天", en: "5-7 days" },
      cost: { zh: "海运拼箱约 $14-20/CBM；空运约 $4.5-6.5/kg", en: "Sea LCL ~$14-20/CBM; air ~$4.5-6.5/kg" },
      cert: { zh: "CE 接受度高，本地测试较严", en: "CE accepted; local testing strict" },
      duty: { zh: "玩具约 10-20%", en: "Toys ~10-20%" },
      peak: { zh: "斋月与开学季", en: "Ramadan & back-to-school" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    mexico: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "曼萨尼约，拼箱 24-30 天", en: "Manzanillo, LCL 24-30 days" },
      air: { zh: "6-9 天", en: "6-9 days" },
      cost: { zh: "海运拼箱约 $16-24/CBM；空运约 $5.5-7.5/kg", en: "Sea LCL ~$16-24/CBM; air ~$5.5-7.5/kg" },
      cert: { zh: "玩具需 NOM 认证", en: "NOM certification for toys" },
      duty: { zh: "约 15-25% + VAT 16%", en: "~15-25% + VAT 16%" },
      peak: { zh: "亡灵节、圣诞与返校季", en: "Día de Muertos, Christmas & back-to-school" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    brazil: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "桑托斯，拼箱 30-40 天", en: "Santos, LCL 30-40 days" },
      air: { zh: "7-10 天", en: "7-10 days" },
      cost: { zh: "海运拼箱约 $22-32/CBM；空运约 $6.5-9/kg", en: "Sea LCL ~$22-32/CBM; air ~$6.5-9/kg" },
      cert: { zh: "INMETRO 强制认证（玩具类目）", en: "INMETRO mandatory certification for toys" },
      duty: { zh: "进口综合税负高（约 60-100%），建议合理申报并咨询清关代理", en: "Combined import burden high (~60-100%); declare properly and use a broker" },
      peak: { zh: "10 月儿童节、圣诞、黑五", en: "Children's Day (Oct), Christmas, Black Friday" },
      pay: { zh: "大额建议 L/C 或高比例预付款", en: "Large orders: L/C or high prepayment" }
    },
    chile: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "瓦尔帕莱索，拼箱 28-34 天", en: "Valparaíso, LCL 28-34 days" },
      air: { zh: "7-10 天", en: "7-10 days" },
      cost: { zh: "海运拼箱约 $20-28/CBM；空运约 $6-8.5/kg", en: "Sea LCL ~$20-28/CBM; air ~$6-8.5/kg" },
      cert: { zh: "玩具按当地要求提供测试报告", en: "Test reports per local requirements" },
      duty: { zh: "约 6% + VAT 19%", en: "~6% + VAT 19%" },
      peak: { zh: "圣诞与返校季", en: "Christmas & back-to-school" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    peru: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "卡亚俄，拼箱 26-32 天", en: "Callao, LCL 26-32 days" },
      air: { zh: "6-9 天", en: "6-9 days" },
      cost: { zh: "海运拼箱约 $19-27/CBM；空运约 $5.8-8/kg", en: "Sea LCL ~$19-27/CBM; air ~$5.8-8/kg" },
      cert: { zh: "无强制玩具认证（按需提供报告）", en: "No mandatory toy cert (reports on request)" },
      duty: { zh: "约 4-11% + VAT 18%", en: "~4-11% + VAT 18%" },
      peak: { zh: "圣诞与返校季", en: "Christmas & back-to-school" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    colombia: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "布埃纳文图拉，拼箱 28-34 天", en: "Buenaventura, LCL 28-34 days" },
      air: { zh: "6-9 天", en: "6-9 days" },
      cost: { zh: "海运拼箱约 $19-27/CBM；空运约 $5.8-8/kg", en: "Sea LCL ~$19-27/CBM; air ~$5.8-8/kg" },
      cert: { zh: "玩具需卫生许可与符合性声明", en: "Sanitary permit & conformity declaration" },
      duty: { zh: "约 10-20% + VAT 19%", en: "~10-20% + VAT 19%" },
      peak: { zh: "圣诞与儿童节", en: "Christmas & Children's Day" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前", en: "T/T 30% deposit + 70% before shipment" }
    },
    argentina: {
      lead: { zh: "样品 7-15 天；量产 30-45 天", en: "Samples 7-15 days; production 30-45 days" },
      sea: { zh: "布宜诺斯艾利斯，拼箱 30-40 天", en: "Buenos Aires, LCL 30-40 days" },
      air: { zh: "7-10 天", en: "7-10 days" },
      cost: { zh: "海运拼箱约 $22-30/CBM；空运约 $6.5-9/kg", en: "Sea LCL ~$22-30/CBM; air ~$6.5-9/kg" },
      cert: { zh: "SEC 认证，进口限制较多", en: "SEC certification; import restrictions exist" },
      duty: { zh: "高关税 + 外汇管制，建议预付款并留足清关时间", en: "High duties + FX controls; prepay and allow clearance time" },
      peak: { zh: "儿童节（8 月）与圣诞", en: "Children's Day (Aug) & Christmas" },
      pay: { zh: "建议高比例预付款或 L/C", en: "High prepayment or L/C advised" }
    },
    "default": {
      lead: { zh: "样品 7-15 天；量产 30-45 天（视品类与订单量）", en: "Samples 7-15 days; production 30-45 days (by category & volume)" },
      sea: { zh: "视目的地：东南亚 8-16 天 / 中东 16-22 天 / 拉美 24-40 天", en: "By destination: SEA 8-16d / Middle East 16-22d / LatAm 24-40d" },
      air: { zh: "3-10 天", en: "3-10 days" },
      cost: { zh: "海运拼箱约 $8-30/CBM；空运约 $3.5-9/kg（视航线）", en: "Sea LCL ~$8-30/CBM; air ~$3.5-9/kg (by lane)" },
      cert: { zh: "以当地玩具安全法规为准；可提供 CE/EN71/ASTM 报告辅助清关", en: "Per local toy safety rules; CE/EN71/ASTM reports help clearance" },
      duty: { zh: "以目的国海关税则为准，我们可协助出口报关与单据准备", en: "Per destination customs tariff; we assist export docs" },
      peak: { zh: "Q3 为全球玩具出货旺季，建议提前 2 个月锁定产能", en: "Q3 is the global toy peak — lock capacity 2 months ahead" },
      pay: { zh: "T/T 30% 定金 + 70% 出货前，大额可 L/C", en: "T/T 30% deposit + 70% before shipment; L/C for large orders" }
    }
  },

  /* FAQ 知识库（关键词 + 中英答案） */
  faq: [
    {
      k: ["moq", "最小起订", "起订量", "minimum order"],
      a: {
        zh: "<b>MOQ</b><br>标准 MOQ：景品/盲盒 1000-3000 件，可动/雕像 300-800 件，迷你类 3000 件起。支持多款混装凑单；新品可协商小批量试产（部分品类 500 件起）。",
        en: "<b>MOQ</b><br>Standard MOQ: prize/blind box 1,000-3,000 pcs; articulated/statue 300-800 pcs; mini from 3,000 pcs. Mixed-SKU orders welcome; trial runs negotiable (from 500 pcs for some lines)."
      }
    },
    {
      k: ["sample", "打样", "样品", "样板"],
      a: {
        zh: "<b>打样</b><br>打样周期 7-15 天（3D 打印可更快），一般支持 2-3 轮修改。样品费按品类收取，订单确认后全额返还；也可先用 3D 数字模型确认再进入实物打样。",
        en: "<b>Sampling</b><br>7-15 days (faster with 3D printing), usually 2-3 rounds of revisions. Sample fee by category, fully refundable with order confirmation. 3D digital preview available before physical sampling."
      }
    },
    {
      k: ["cert", "认证", "证书", "ce", "en71", "astm", "iso", "bsci"],
      a: {
        zh: "<b>认证</b><br>常规提供：CE、EN71、ASTM F963、ISO9001；可加做：BSCI 验厂、SGS 第三方检测、沙特 SABER、巴西 INMETRO 等目标市场认证（费用按项目另计）。",
        en: "<b>Certification</b><br>Standard: CE, EN71, ASTM F963, ISO9001. Optional: BSCI audit, SGS third-party testing, KSA SABER, Brazil INMETRO and other market certifications (quoted per project)."
      }
    },
    {
      k: ["oem", "odm", "定制", "custom", "customize", "开模", "模具", "mold"],
      a: {
        zh: "<b>OEM/ODM 定制</b><br>支持来图/来样 OEM 与联合开发 ODM。自有 IP 需提供授权书；原创设计可全流程保密开发。开模周期约 25-45 天，模具费按复杂度评估，量大可分摊。",
        en: "<b>OEM/ODM</b><br>OEM from your art/samples or ODM co-development. Licensed IP requires authorization; original designs stay confidential. Mold-making 25-45 days, cost by complexity, amortizable on volume."
      }
    },
    {
      k: ["ship", "物流", "运输", "delivery", "shipping", "运费", "freight", "快递"],
      a: {
        zh: "<b>物流</b><br>海运拼箱/整柜、空运、快递与海外仓均可。拼箱到东南亚约 8-16 天、中东 16-22 天、拉美 24-40 天；量大推荐整柜，运费显著更低。",
        en: "<b>Shipping</b><br>Sea LCL/FCL, air, courier and overseas warehousing available. LCL transit: SEA 8-16 days, Middle East 16-22 days, LatAm 24-40 days. FCL recommended for volume — much lower freight."
      }
    },
    {
      k: ["pay", "支付", "付款", "tt", "lc", "deposit", "定金", "terms"],
      a: {
        zh: "<b>付款</b><br>标准：T/T 30% 定金 + 70% 出货前结清；大额订单可 L/C；新客户首单可协商 50/50。支持美元、人民币结算。",
        en: "<b>Payment</b><br>Standard: T/T 30% deposit + 70% before shipment; L/C for large orders; 50/50 negotiable for new buyers. USD or CNY settlement."
      }
    },
    {
      k: ["qc", "质量", "质检", "inspect", "检验", "全检", "验货"],
      a: {
        zh: "<b>质量</b><br>四重质检：IQC 来料、IPQC 制程、FQC 成品全检、OQC 出货抽检；出货前提供验货报告，可安排 SGS/BV 等第三方验货。",
        en: "<b>Quality</b><br>Four QC gates: IQC incoming, IPQC in-process, FQC 100% final inspection, OQC outgoing sampling. Inspection report before shipment; third-party (SGS/BV) inspection available."
      }
    },
    {
      k: ["售后", "aftersales", "aftersale", "warranty", "保修", "补件"],
      a: {
        zh: "<b>售后</b><br>出厂质量问题 30 天内可补发/换货；海运破损按保险条款理赔；提供长期配件供应与技术支持。",
        en: "<b>After-sales</b><br>Factory defects: replacement within 30 days; shipping damage covered under insurance terms; long-term spare parts & technical support."
      }
    },
    {
      k: ["lead", "交期", "货期", "多久", "how long", "周期"],
      a: {
        zh: "<b>交期</b><br>样品 7-15 天，量产 30-45 天（视品类与订单量），加急需协商。建议旺季提前 2 个月下单锁定产能。",
        en: "<b>Lead time</b><br>Samples 7-15 days, production 30-45 days (by category & volume); rush orders negotiable. Book capacity 2 months ahead in peak season."
      }
    },
    {
      k: ["旺季", "peak", "season", "节庆", "holiday"],
      a: {
        zh: "<b>旺季</b><br>全球玩具旺季集中在 Q3（开学 + 圣诞备货）；东南亚（泼水节、Tết、斋月）与拉美（黑五、圣诞）为区域高峰，建议提前 2-3 个月备货。",
        en: "<b>Peak season</b><br>Global toy peak is Q3 (back-to-school + Christmas). Regional peaks: SEA (Songkran, Tết, Ramadan) and LatAm (Black Friday, Christmas) — stock 2-3 months ahead."
      }
    },
    {
      k: ["展会", "fair", "expo", "canton", "广交会", "考察", "factory visit", "visit"],
      a: {
        zh: "<b>展会与考察</b><br>我们参加广交会与香港玩具展；欢迎到汕头/东莞工厂实地考察，可安排专车接送；也可先提供工厂实拍视频与样品寄送。",
        en: "<b>Fairs & visits</b><br>We exhibit at Canton Fair and Hong Kong Toys & Games Fair. Factory visits in Shantou/Dongguan welcome (pickup arranged); video tours and sample shipping available first."
      }
    },
    {
      k: ["关税", "duty", "tax", "import", "清关", "customs"],
      a: {
        zh: "<b>关税</b><br>玩具类目各国差异大：东南亚约 5-25%、中东 5-15% + VAT、拉美 10-30% + 高 VAT（巴西最重）。我们提供发票、箱单、CO、检测报告等全套清关单据。",
        en: "<b>Duties</b><br>Toy duties vary: SEA ~5-25%, Middle East ~5-15% + VAT, LatAm ~10-30% + high VAT (heaviest in Brazil). We supply complete docs: invoice, packing list, CO, test reports."
      }
    },
    {
      k: ["hi", "hello", "hey", "你好", "您好", "xin chào", "hola", "salam", "안녕"],
      a: {
        zh: "你好！我是 <b>FiguBot 外贸智脑</b>，可以为你提供：选品洞察、本地化内容、智能投放、供应链预判四类服务。也可以直接问我 MOQ、打样、认证、物流等问题。",
        en: "Hi! I'm <b>FiguBot, the AI Trade Brain</b>. I offer: Product Selection Insights, Localized Content, Smart Advertising and Supply Chain Forecast. Ask me about MOQ, sampling, certification, shipping and more."
      }
    },
    {
      k: ["contact", "联系", "email", "whatsapp", "微信", "wechat", "sales"],
      a: {
        zh: "<b>联系我们</b><br>Email: sales@figurise.com<br>WhatsApp: +86 138 0000 0000<br>工作时间：周一至周六 9:00-18:00（GMT+8）<br>点击下方按钮可直达询盘表单。",
        en: "<b>Contact us</b><br>Email: sales@figurise.com<br>WhatsApp: +86 138 0000 0000<br>Hours: Mon–Sat 9:00–18:00 (GMT+8)<br>Tap the button below to go straight to the inquiry form."
      }
    }
  ]
};
