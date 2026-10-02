/* ============================================================
 * FiguRise - 市场洞察文章数据 (insights.js)
 * 双语（中/英），其余语种回退英文。可自由增删文章。
 * ============================================================ */
(function () {
  "use strict";

  var ARTICLES = [
    {
      id: "sea-2026",
      tag: "sea",
      title: {
        zh: "2026 东南亚手办市场：盲盒与 Q 版领跑，社交电商是主战场",
        en: "Southeast Asia 2026: Blind Boxes & Chibi Lead, Social Commerce Is the Battlefield"
      },
      summary: {
        zh: "东南亚正成为全球增长最快的手办消费市场之一，TikTok Shop 开箱文化把盲盒、Q 版手办推上销量榜。",
        en: "Southeast Asia is becoming one of the fastest-growing figure markets globally, with TikTok Shop unboxing culture driving blind boxes and chibi figures to the top of sales charts."
      },
      points: {
        zh: [
          "盲盒在越南、泰国、印尼销量同比增长超过 30%，隐藏款玩法是复购核心",
          "客单价 $8-15 的走量款最受欢迎，Q 版与迷你场景在年轻客群中增速最快",
          "建议首批 2000-3000 件小单测款 + 隐藏款引流，跑通后再放量",
          "印尼斋月、泰国泼水节前 2 个月是黄金备货期，需预留产能",
          "本地仓备货（越南/泰国/印尼）可显著提升履约评分与转化率"
        ],
        en: [
          "Blind box sales in Vietnam, Thailand & Indonesia are up 30%+ YoY; hidden-chase mechanics drive repurchase",
          "Volume lines at $8-15 retail are most popular; chibi & mini dioramas grow fastest with young buyers",
          "Test with a first order of 2,000-3,000 pcs plus hidden editions, then scale",
          "Stock up 2 months before Ramadan (ID) and Songkran (TH); book capacity early",
          "Local warehouse stocking in VN/TH/ID lifts fulfillment scores and conversion"
        ]
      }
    },
    {
      id: "me-2026",
      tag: "me",
      title: {
        zh: "中东收藏市场崛起：高客单雕像与礼盒装的机会窗口",
        en: "Middle East Collectibles Rise: The Window for High-Ticket Statues & Gift Sets"
      },
      summary: {
        zh: "沙特、阿联酋收藏客群快速扩容，动漫展一票难求；礼盒装与限量编号产品溢价明显。",
        en: "Collector audiences in Saudi Arabia and the UAE are expanding fast, with anime conventions selling out; gift-boxed and numbered limited editions command clear premiums."
      },
      points: {
        zh: [
          "沙特、阿联酋高客单收藏需求旺盛，雕像类目毛利率显著高于东南亚",
          "礼盒装 + 限量编号 + 收藏证书是中东市场的「三件套」",
          "沙特 SABER 认证为强制门槛，需在出货前完成 PC/SCOC 证书",
          "包装与赠品需规避宗教敏感元素，尊重本地文化规范",
          "迪拜适合做转口与仓储中转，覆盖海湾周边市场"
        ],
        en: [
          "High-ticket collectible demand in KSA & UAE is booming; statue margins far exceed SEA",
          "Gift box + numbered edition + certificate is the 'holy trinity' for this market",
          "SABER certification is mandatory in KSA — complete PC/SCOC before shipment",
          "Keep packaging and gifts free of religiously sensitive elements",
          "Dubai works well as a re-export and warehousing hub for the Gulf"
        ]
      }
    },
    {
      id: "latam-2026",
      tag: "latam",
      title: {
        zh: "拉美电商爆发：Mercado Libre 生态下的手办蓝海",
        en: "LatAm E-commerce Boom: The Figure Blue Ocean Inside Mercado Libre"
      },
      summary: {
        zh: "巴西、墨西哥占拉美手办消费六成以上，动漫文化升温叠加电商渗透率提升，蓝海窗口正在打开。",
        en: "Brazil and Mexico account for 60%+ of LatAm figure spending; rising anime culture plus e-commerce penetration is opening a blue-ocean window."
      },
      points: {
        zh: [
          "Mercado Libre 与亚马逊巴西站是两大主渠道，本地仓（FBA/ML Full）优先",
          "Q 版与可动手办在巴西、墨西哥接受度最高，礼盒装表现好",
          "清关与税负是核心成本：巴西 INMETRO 认证 + 综合税负高，建议本地清关代理",
          "整柜直发降低到岸成本，美元报价锁定汇率风险",
          "巴西 10 月儿童节、黑五、圣诞是三大销售高峰"
        ],
        en: [
          "Mercado Libre and Amazon BR are the two main channels; local fulfillment (FBA/ML Full) first",
          "Chibi and articulated figures resonate most in Brazil & Mexico; gift sets perform well",
          "Customs & taxes are the core cost: Brazil INMETRO + heavy combined burden — use a local broker",
          "FCL direct shipping cuts landed cost; quote in USD to hedge FX risk",
          "Three peaks in Brazil: Children's Day (Oct), Black Friday, Christmas"
        ]
      }
    },
    {
      id: "sourcing-guide",
      tag: "global",
      title: {
        zh: "全球采购指南：从询盘到出货，买家必读的 10 个要点",
        en: "Global Sourcing Guide: 10 Must-Knows from Inquiry to Shipment"
      },
      summary: {
        zh: "跨境采购手办的完整避坑清单，覆盖认证、样品、MOQ、质检、物流与合规。",
        en: "A complete checklist for cross-border figure sourcing — certification, sampling, MOQ, QC, logistics and compliance."
      },
      points: {
        zh: [
          "认准认证：CE/EN71/ASTM/ISO9001，目标市场另有 SABER、INMETRO、NOM 等要求",
          "样品先行：7-15 天打样并多轮确认，确认后再进入量产",
          "MOQ 与混装：多家多款混装可摊薄起订量，降低试错成本",
          "四重质检 + 第三方验货（SGS/BV），出货前索要验货报告",
          "付款：T/T 30% 定金 + 70% 出货前，大额可 L/C",
          "海运旺季（Q3）提前 2 个月下单锁定产能与舱位",
          "IP 合规：自有 IP 需授权书，规避侵权风险",
          "清关单据：发票、箱单、CO、检测报告一柜一整套",
          "售后条款：出厂质量问题 30 天内补发/换货，明确到文本",
          "善用 AI 智脑：用选品洞察、本地化内容、供应链预判做决策支撑"
        ],
        en: [
          "Check certification: CE/EN71/ASTM/ISO9001, plus market-specific SABER, INMETRO, NOM",
          "Samples first: 7-15 days, iterate until approved, then mass production",
          "MOQ & mixing: combine SKUs to lower minimums and cut trial costs",
          "Four-layer QC + third-party inspection (SGS/BV); request inspection reports before shipment",
          "Payment: T/T 30% deposit + 70% before shipment; L/C for large orders",
          "Book capacity and vessel space 2 months ahead of the Q3 peak",
          "IP compliance: authorization letter for licensed IP; avoid infringement risk",
          "Customs docs: invoice, packing list, CO, test reports — a full set per container",
          "After-sales terms: factory defects replaced within 30 days — get it in writing",
          "Leverage the AI Brain for product selection, localization and supply chain decisions"
        ]
      }
    }
  ];

  var THUMB_ICONS = {
    sea: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>',
    me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.6-9.3-9A5.7 5.7 0 0 1 12 5.7 5.7 5.7 0 0 1 21.3 12C19 16.4 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2"/></svg>',
    latam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    global: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 20 6v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>'
  };

  var TAG_LABEL = {
    sea: { zh: "东南亚 · 市场报告", en: "Southeast Asia · Market Report" },
    me: { zh: "中东 · 市场报告", en: "Middle East · Market Report" },
    latam: { zh: "拉美 · 市场报告", en: "Latin America · Market Report" },
    global: { zh: "全球 · 采购指南", en: "Global · Sourcing Guide" }
  };

  function L(obj) { return (obj[I18N.lang] || obj.en || obj.zh || ""); }
  function tagOf(t) { return I18N.lang === "zh" ? (TAG_LABEL[t] ? TAG_LABEL[t].zh : t) : (TAG_LABEL[t] ? TAG_LABEL[t].en : t); }
  function dateStr() { return I18N.lang === "zh" ? "2026-08" : "Aug 2026"; }

  function articleHTML(a, idx) {
    var points = L(a.points);
    if (typeof points === "string") points = points.split("\n");
    var list = points.map(function (p) { return "<li>" + p + "</li>"; }).join("");
    return '<article class="article-single reveal" style="--d:' + idx * 80 + 'ms">' +
      '<div class="thumb" style="color:var(--accent)">' + (THUMB_ICONS[a.tag] || THUMB_ICONS.global) + '</div>' +
      '<div class="body">' +
        '<div class="article-head"><span class="tagline">' + tagOf(a.tag) + '</span><span class="meta">' + I18N.t("i.updated") + ' ' + dateStr() + '</span></div>' +
        '<h2>' + L(a.title) + '</h2>' +
        '<p class="lead">' + L(a.summary) + '</p>' +
        '<h3>' + I18N.t("i.points") + '</h3><ul>' + list + '</ul>' +
        '<p class="note">' + I18N.t("i.note") + '</p>' +
      '</div></article>';
  }

  function render() {
    var mount = document.getElementById("insights-mount");
    if (!mount) return;
    mount.innerHTML = ARTICLES.map(articleHTML).join("");
    if (window.__initRevealCards) window.__initRevealCards(mount);
    else {
      var els = mount.querySelectorAll(".reveal");
      els.forEach(function (el) { el.classList.add("in"); });
    }
  }

  window.PageInit = window.PageInit || {};
  window.PageInit.insights = render;
  I18N.onChange(render);
})();
