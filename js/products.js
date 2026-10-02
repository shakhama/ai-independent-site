/* ============================================================
 * FiguRise - 产品中心 (products.js)
 * 产品数据（中/英双语，其余语种回退英文）+ 渲染 + 筛选 + 详情弹窗
 * 想增删产品：直接编辑 PRODUCTS 数组即可
 * ============================================================ */
(function () {
  "use strict";
  var CFG = window.SITE_CONFIG || {};
  function $ (sel) { return document.querySelector(sel); }

  var PRODUCTS = [
    {
      id: "p1", cat: "prize", scale: "1/7", moq: "1000 pcs", lead: "35-45 ",
      name: { zh: "经典景品手办", en: "Classic Prize Figure" },
      desc: { zh: "PVC 景品级手办，造型还原度高，支持任意动漫/IP 授权原型，适合电商与展会渠道走量。",
              en: "PVC prize-grade figure with high sculpt fidelity. Supports licensed anime/IP prototypes — ideal for e-commerce and convention volume." },
      features: {
        zh: ["PVC/ABS 材质，全手工喷油上色", "配标准底座与吸塑包装", "支持 1/7、1/8 及定制比例"],
        en: ["PVC/ABS material with hand spray painting", "Standard base and blister packaging", "1/7, 1/8 or custom scales"]
      }
    },
    {
      id: "p2", cat: "articulated", scale: "15-18cm", moq: "500 pcs", lead: "30-40 ",
      name: { zh: "可动手办（多关节）", en: "Articulated Action Figure" },
      desc: { zh: "全身 18+ 可动关节，替换手型与配件丰富，面向玩家与收藏客群，中东高客单市场热门。",
              en: "18+ articulated joints, rich swap hands and accessories. A hot category for player & collector buyers, strong in high-ticket Middle East markets." },
      features: {
        zh: ["18+ 可动关节，动作自由度极高", "附 3 组替换手型与 1 件配件", "关节耐疲劳测试 10 万次"],
        en: ["18+ articulation for high poseability", "3 sets of swap hands + 1 accessory", "Joint fatigue tested to 100K cycles"]
      }
    },
    {
      id: "p3", cat: "blindbox", scale: "7-10cm", moq: "2000 pcs", lead: "35-45 ",
      name: { zh: "盲盒系列（12 款一套）", en: "Blind Box Series (12 per set)" },
      desc: { zh: "隐藏款+普通款配置，东南亚 TikTok/Shopee 爆款形态，可做全渠道铺货与直播开箱。",
              en: "Hidden + regular lineup. Best-selling format on SEA TikTok/Shopee — perfect for full-channel distribution and live unboxing." },
      features: {
        zh: ["12 普通款 + 1 隐藏款（概率可调）", "隐藏款概率玩法，复购率高", "支持 IP 定制与品牌包装"],
        en: ["12 regular + 1 hidden (rate adjustable)", "High repurchase via hidden-chase mechanic", "IP customization & branded packaging"]
      }
    },
    {
      id: "p4", cat: "chibi", scale: "8-12cm", moq: "1000 pcs", lead: "30-40 ",
      name: { zh: "Q 版黏土人手办", en: "Chibi Nendoroid-style Figure" },
      desc: { zh: "大头 Q 版造型，可爱路线，年轻女性客群与礼赠场景首选，东南亚与拉美增长最快。",
              en: "Big-head chibi cuteness. First choice for young female buyers and gift occasions — the fastest-growing segment in SEA & LatAm." },
      features: {
        zh: ["Q 版 2.5-3 头身比例", "磁吸替换表情与手型", "礼盒装可选，节日爆款"],
        en: ["2.5-3 head-body chibi ratio", "Magnetic swap faces & hands", "Gift-box option, festive bestseller"]
      }
    },
    {
      id: "p5", cat: "statue", scale: "1/7-1/4", moq: "300 pcs", lead: "45-60 ",
      name: { zh: "收藏级雕像", en: "Collector-grade Statue" },
      desc: { zh: "树脂+PU 收藏雕像，细节与涂装极致，中东与欧美收藏家市场高利润单品。",
              en: "Resin/PU collector statue with exceptional detailing and paintwork. High-margin line for Middle East & Western collectors." },
      features: {
        zh: ["树脂/PU 材质，手涂精修", "限量编号证书，溢价空间大", "带防摔运输加固包装"],
        en: ["Resin/PU with hand-refined painting", "Numbered limited edition with cert", "Reinforced anti-drop shipping packaging"]
      }
    },
    {
      id: "p6", cat: "mini", scale: "3-5cm", moq: "3000 pcs", lead: "30-40 ",
      name: { zh: "迷你扭蛋系列", en: "Mini Capsule Series" },
      desc: { zh: "低成本引流款，扭蛋/散装出口，适合便利店、自动贩卖与集市渠道。",
              en: "Low-cost traffic driver. Capsule/bulk export for convenience stores, vending machines and street fairs." },
      features: {
        zh: ["低价引流，利润率高", "支持散装/扭蛋壳装", "多 IP 混装灵活配比"],
        en: ["Low price, high margin, traffic-driving", "Bulk or capsule options", "Flexible multi-IP mixing ratios"]
      }
    },
    {
      id: "p7", cat: "statue", scale: "1/6 bust", moq: "300 pcs", lead: "45-60 ",
      name: { zh: "树脂胸像", en: "Resin Bust" },
      desc: { zh: "头雕级胸像，主打精细面部与服装纹理，适合高端收藏与展会限定。",
              en: "Portrait-grade bust focused on facial precision and fabric texture — premium collectibles and convention exclusives." },
      features: {
        zh: ["高精度头雕，肤质喷涂", "1/6 比例，含展示底座", "支持展会限定与联名开发"],
        en: ["High-precision sculpt with skin-texture painting", "1/6 scale with display base", "Convention-exclusive & collab development"]
      }
    },
    {
      id: "p8", cat: "articulated", scale: "18-20cm", moq: "800 pcs", lead: "40-50 ",
      name: { zh: "机甲可动拼装", en: "Mecha Model Kit" },
      desc: { zh: "机甲主题可动拼装，拼装体验与把玩性并重，拉美男性客群接受度高。",
              en: "Mecha-themed buildable kit balancing assembly experience and playability. Well received by LatAm male demographics." },
      features: {
        zh: ["免胶拼装，板件数 15-25", "骨架可动 + 外甲细节", "说明书多语言可选"],
        en: ["Snap-fit, 15-25 runners", "Articulated frame + armor detail", "Multi-language instruction manual"]
      }
    },
    {
      id: "p9", cat: "blindbox", scale: "8-10cm", moq: "2000 pcs", lead: "35-45 ",
      name: { zh: "毛绒盲盒", en: "Plush Blind Box" },
      desc: { zh: "软萌毛绒+盲盒玩法，东南亚与中东礼赠场景热销，触感差异化强。",
              en: "Soft plush meets blind-box play — hot for gifting in SEA & Middle East, strong tactile differentiation." },
      features: {
        zh: ["超柔短毛绒面料", "内置骨架可摆造型", "节日主题款可定制"],
        en: ["Ultra-soft short plush fabric", "Internal armature for posing", "Festive themed customization"]
      }
    },
    {
      id: "p10", cat: "chibi", scale: "12-15cm", moq: "1000 pcs", lead: "30-40 ",
      name: { zh: "Q 版座姿摆件", en: "Chibi Seated Figure" },
      desc: { zh: "座姿大头摆件，桌面场景适配，办公与卧室陈列场景，客单价适中。",
              en: "Seated big-head desktop figure — fits office & bedroom display, mid price point." },
      features: {
        zh: ["座姿重心稳，耐陈列", "可定制表情与场景配件", "彩盒/透明盒双包装"],
        en: ["Stable seated center of gravity", "Custom faces & scene accessories", "Gift box or window box options"]
      }
    },
    {
      id: "p11", cat: "prize", scale: "1/8-1/6", moq: "500 pcs", lead: "40-50 ",
      name: { zh: "战斗姿态景品", en: "Action-pose Prize Figure" },
      desc: { zh: "高动态战斗姿态景品，特效件丰富，年轻客群与直播渠道引流利器。",
              en: "High-dynamic action-pose prize figure with rich effect parts — a traffic magnet for young buyers and live-stream channels." },
      features: {
        zh: ["动态造型 + 透明特效件", "可替换武器配件", "大货色差分档可选"],
        en: ["Dynamic pose with clear effect parts", "Swappable weapon accessories", "Multiple paint-grade options"]
      }
    },
    {
      id: "p12", cat: "mini", scale: "6-8cm", moq: "1500 pcs", lead: "30-40 ",
      name: { zh: "桌面迷你场景", en: "Mini Desktop Diorama" },
      desc: { zh: "微缩场景摆件，主题覆盖美食/城市/自然，东南亚兴趣电商热门内容款。",
              en: "Miniature diorama themes covering food, city & nature — trending content on SEA interest-based commerce." },
      features: {
        zh: ["微缩细节丰富，出片率高", "多主题系列化开发", "支持场景定制与品牌联名"],
        en: ["Rich miniature detail, camera-friendly", "Serialized theme development", "Custom scenes & brand collabs"]
      }
    }
  ];

  /* 双语取文本 */
  function L(obj) { return (obj[I18N.lang] || obj.en || obj.zh || ""); }

  /* 品类信息 */
  function catInfo(id) {
    var list = CFG.categories || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  /* 渲染卡片 */
  function cardHTML(p, idx) {
    var c = catInfo(p.cat);
    var catName = I18N.lang === "zh" ? c.zh : c.en;
    return '<article class="product-card reveal" style="--d:' + (idx % 3) * 90 + 'ms" data-id="' + p.id + '">' +
      '<div class="product-thumb"><svg viewBox="0 0 96 96" aria-hidden="true"><use href="#' + c.sym + '"></use></svg>' +
      '<span class="product-cat">' + catName + '</span></div>' +
      '<div class="product-body">' +
        '<h3>' + L(p.name) + '</h3>' +
        '<div class="product-spec"><span>' + I18N.t("p.scale") + ': ' + p.scale + '</span><span>' + I18N.t("p.moq") + ': ' + p.moq + '</span><span>' + I18N.t("p.lead") + ': ' + p.lead + I18N.t("common.days") + '</span></div>' +
        '<div class="product-actions">' +
          '<button class="btn btn-primary btn-sm" data-open="' + p.id + '">' + I18N.t("p.detail") + '</button>' +
          '<button class="btn btn-ghost btn-sm" data-quote="' + p.id + '">' + I18N.t("p.inquire") + '</button>' +
        '</div>' +
      '</div></article>';
  }

  function renderGrid(list, mount) {
    mount.innerHTML = list.map(function (p, i) { return cardHTML(p, i); }).join("");
    initRevealCards(mount);
  }

  function initRevealCards(mount) {
    var els = mount.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* 筛选 */
  function applyFilter() {
    var mount = $("#product-mount");
    if (!mount) return;
    var cat = window.__cat || "all";
    var q = (window.__q || "").toLowerCase();
    var list = PRODUCTS.filter(function (p) {
      var okCat = cat === "all" || p.cat === cat;
      var text = (L(p.name) + " " + L(p.desc) + " " + p.cat).toLowerCase();
      var okQ = !q || text.indexOf(q) > -1 || p.name.zh.indexOf(q) > -1;
      return okCat && okQ;
    });
    if (!list.length) {
      mount.innerHTML = '<div class="empty-state"><p>' + I18N.t("p.empty") + '</p></div>';
      return;
    }
    renderGrid(list, mount);
  }

  /* 详情弹窗 */
  function openModal(id) {
    var p = null;
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) { p = PRODUCTS[i]; break; }
    if (!p) return;
    var c = catInfo(p.cat);
    var catName = I18N.lang === "zh" ? c.zh : c.en;
    var feats = L(p.features);
    if (typeof feats === "string") feats = feats.split("\n");
    var featHtml = feats.map(function (f) { return "<li>" + f + "</li>"; }).join("");
    var qty = I18N.t("p.qty");
    var modal = $("#product-modal");
    var body = $("#modal-body");
    body.innerHTML =
      '<div class="modal-thumb"><svg viewBox="0 0 96 96" aria-hidden="true"><use href="#' + c.sym + '"></use></svg></div>' +
      '<div class="modal-info">' +
        '<span class="cat">' + catName + '</span>' +
        '<h3>' + L(p.name) + '</h3>' +
        '<p style="color:var(--mut);font-size:14.5px;margin-top:8px">' + L(p.desc) + '</p>' +
        '<div class="modal-specs">' +
          '<div><b>' + p.scale + '</b><span>' + I18N.t("p.scale") + '</span></div>' +
          '<div><b>' + p.moq + '</b><span>' + I18N.t("p.moq") + '</span></div>' +
          '<div><b>' + p.lead + I18N.t("common.days") + '</b><span>' + I18N.t("p.lead") + '</span></div>' +
        '</div>' +
        '<h4>' + I18N.t("p.features") + '</h4><ul>' + featHtml + '</ul>' +
        '<div class="modal-actions">' +
          '<button class="btn btn-primary" data-quote="' + p.id + '">' + I18N.t("p.inquire") + '</button>' +
          '<button class="btn btn-ghost" data-close-modal>' + I18N.t("common.close") + '</button>' +
        '</div>' +
        '<p style="font-size:12.5px;color:var(--mut);margin-top:18px">' + I18N.t("p.priceHint") + '</p>' +
      '</div>';
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    var modal = $("#product-modal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* 询盘跳转（带产品上下文） */
  function goQuote(productId) {
    var p = null;
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === productId) { p = PRODUCTS[i]; break; }
    var name = p ? L(p.name) : "";
    try { sessionStorage.setItem("figurise-quote", name); } catch (e) {}
    closeModal();
    location.href = "contact.html";
  }

  /* ---------- 产品页初始化 ---------- */
  function initProductsPage() {
    var mount = $("#product-mount");
    if (!mount) return;
    // 筛选 chips
    var chipWrap = $("#filter-chips");
    if (chipWrap) {
      var cats = [{ id: "all", zh: I18N.t("p.all"), en: I18N.t("p.all") }].concat(CFG.categories || []);
      cats.forEach(function (c, i) {
        var b = document.createElement("button");
        b.className = "chip" + (i === 0 ? " on" : "");
        b.type = "button";
        b.setAttribute("data-cat", c.id);
        b.textContent = I18N.lang === "zh" ? (c.zh || c.en) : (c.en || c.zh);
        b.addEventListener("click", function () {
          chipWrap.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          window.__cat = c.id;
          applyFilter();
        });
        chipWrap.appendChild(b);
      });
    }
    // 搜索
    var search = $("#product-search");
    if (search) search.addEventListener("input", function () {
      window.__q = search.value;
      applyFilter();
    });
    window.__cat = "all"; window.__q = "";
    // 支持 URL 直达：products.html?cat=blindbox&q=xxx
    try {
      var params = new URLSearchParams(location.search);
      if (params.get("cat")) window.__cat = params.get("cat");
      if (params.get("q")) { window.__q = params.get("q"); if (search) search.value = window.__q; }
      if (params.get("cat") && chipWrap) {
        var match = chipWrap.querySelector('.chip[data-cat="' + params.get("cat") + '"]');
        if (match) { chipWrap.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("on"); }); match.classList.add("on"); }
      }
    } catch (e) {}
    applyFilter();

    // 事件委托：详情 / 询盘 / 关闭
    document.addEventListener("click", function (e) {
      var openBtn = e.target.closest("[data-open]");
      if (openBtn) { e.preventDefault(); openModal(openBtn.getAttribute("data-open")); return; }
      var quoteBtn = e.target.closest("[data-quote]");
      if (quoteBtn) { e.preventDefault(); goQuote(quoteBtn.getAttribute("data-quote")); return; }
      if (e.target.closest("[data-close-modal]")) { closeModal(); return; }
    });
    var backdrop = $("#product-modal");
    if (backdrop) backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  /* 首页精选产品（前 3 款） */
  function initHomeProducts() {
    var mount = $("#home-product-mount");
    if (!mount) return;
    renderGrid(PRODUCTS.slice(0, 3), mount);
    document.addEventListener("click", function (e) {
      var openBtn = e.target.closest("[data-open]");
      if (openBtn && !document.getElementById("product-modal")) return;
      if (openBtn) { e.preventDefault(); openModal(openBtn.getAttribute("data-open")); return; }
      var quoteBtn = e.target.closest("[data-quote]");
      if (quoteBtn) { e.preventDefault(); goQuote(quoteBtn.getAttribute("data-quote")); }
    });
    // 首页也需要 modal 容器 —— 由 HTML 提供
  }

  /* 注册页面初始化（main.js 调用） */
  window.PageInit = window.PageInit || {};
  window.PageInit.products = initProductsPage;
  window.PageInit.home = initHomeProducts;

  /* 语言切换时重渲染 */
  I18N.onChange(function () { applyFilter(); });
  I18N.onChange(function () {
    var mount = $("#home-product-mount");
    if (mount) renderGrid(PRODUCTS.slice(0, 3), mount);
  });
})();
