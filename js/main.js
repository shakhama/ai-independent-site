/* ============================================================
 * FiguRise - 主交互脚本 (main.js)
 * 导航 / 语言切换 / 滚动揭示 / 数字动画 / Tab / 表单 / 通用工具
 * ============================================================ */
(function () {
  "use strict";
  var CFG = window.SITE_CONFIG || {};

  /* ---------- 通用工具 ---------- */
  function $ (sel, root) { return (root || document).querySelector(sel); }
  function $$ (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- 语言切换 ---------- */
  function initLang() {
    var switchEl = $(".lang-switch");
    if (!switchEl) return;
    var menu = $(".lang-menu", switchEl);
    var btn = $(".lang-btn", switchEl);
    var label = $(".lang-label", btn);

    function renderLabel() {
      var cur = I18N.lang;
      var all = CFG.languages || [];
      var found = null;
      for (var i = 0; i < all.length; i++) if (all[i].code === cur) found = all[i];
      if (found) label.textContent = found.label;
    }

    // 构建菜单项
    (CFG.languages || []).forEach(function (lang) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = lang.label;
      b.addEventListener("click", function () {
        I18N.setLang(lang.code);
        switchEl.classList.remove("open");
        renderLabel();
      });
      menu.appendChild(b);
    });

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      switchEl.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!switchEl.contains(e.target)) switchEl.classList.remove("open");
    });

    I18N.onChange(function () {
      $$(".lang-menu button", switchEl).forEach(function (b) {
        b.classList.toggle("on", b.textContent === (I18N.t("nav.home") ? null : null));
      });
      // 用 code 匹配更可靠：重新标记
      var all = CFG.languages || [];
      $$(".lang-menu button", switchEl).forEach(function (b, i) {
        var code = all[i] ? all[i].code : "";
        b.classList.toggle("on", code === I18N.lang);
        b.setAttribute("data-code", code);
      });
      renderLabel();
    });
    renderLabel();
  }

  /* ---------- 移动端导航 ---------- */
  function initNav() {
    var toggle = $(".nav-toggle");
    var links = $(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击链接后收起
    $$("a", links).forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
    window.addEventListener("scroll", function () {
      $(".site-nav").classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- 滚动揭示 ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 数字动画 ---------- */
  function animateNum(el, value, suffix) {
    if (!("IntersectionObserver" in window)) { el.textContent = value + suffix; return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        obs.unobserve(en.target);
        var dur = 1400, start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(value * eased).toLocaleString("en-US") + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    io.observe(el);
  }
  function initStats() {
    $$("[data-count]").forEach(function (el) {
      animateNum(el, parseFloat(el.getAttribute("data-count")) || 0, el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Tab 切换 ---------- */
  function initTabs() {
    $$("[data-tabs]").forEach(function (wrap) {
      var btns = $$(".tab-btn", wrap);
      var panels = $$(".tab-panel", wrap);
      btns.forEach(function (b) {
        b.addEventListener("click", function () {
          btns.forEach(function (x) { x.classList.remove("on"); });
          panels.forEach(function (p) { p.classList.remove("on"); });
          b.classList.add("on");
          var target = b.getAttribute("data-tab");
          var panel = $('[data-panel="' + target + '"]', wrap);
          if (panel) panel.classList.add("on");
        });
      });
    });
  }

  /* ---------- 跑马灯内容（按配置渲染国家/市场） ---------- */
  function initMarquee() {
    var track = $(".marquee-track");
    if (!track) return;
    var items = [];
    (CFG.regions || []).forEach(function (r) {
      (r.countries || []).forEach(function (c) { items.push(c); });
    });
    // 双份实现无缝滚动
    function half() {
      var span = document.createElement("span");
      span.textContent = items.join("   ·   ");
      return span;
    }
    track.appendChild(half());
    track.appendChild(half());
  }

  /* ---------- 页脚动态年份 ---------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- 页面数据（按 body[data-page] 初始化） ---------- */
  function initPage() {
    var page = document.body.getAttribute("data-page") || "home";
    // 各页面自注册的初始化
    if (window.PageInit && typeof window.PageInit[page] === "function") {
      try { window.PageInit[page](); } catch (e) { console.warn("PageInit error:", e); }
    }
  }

  /* ---------- 询盘表单（contact.html） ---------- */
  function initContactForm() {
    var form = $("#inquiry-form");
    if (!form) return;
    var success = $("#form-success");

    // 品类下拉（跟随配置与语言）
    var catSel = $("#f-category");
    function fillCats() {
      if (!catSel) return;
      var cur = catSel.value;
      catSel.innerHTML = "";
      var empty = document.createElement("option");
      empty.value = "";
      empty.textContent = I18N.lang === "zh" ? "选择品类（选填）" : "Select category (optional)";
      catSel.appendChild(empty);
      (CFG.categories || []).forEach(function (c) {
        var o = document.createElement("option");
        o.value = c.id;
        o.textContent = I18N.lang === "zh" ? c.zh : c.en;
        catSel.appendChild(o);
      });
      if (cur) catSel.value = cur;
    }
    fillCats();
    I18N.onChange(fillCats);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var name = $("#f-name"), email = $("#f-email"), msg = $("#f-msg");
      function mark(input, cond) {
        var f = input.closest(".field");
        f.classList.toggle("invalid", !cond);
        if (!cond) ok = false;
      }
      mark(name, name.value.trim().length > 0);
      mark(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      mark(msg, msg.value.trim().length > 5);
      if (!ok) return;

      // 组装询盘数据（本地保存，可接 formEndpoint 投递）
      var data = {
        name: name.value.trim(), company: $("#f-company").value.trim(),
        email: email.value.trim(), whatsapp: $("#f-whatsapp").value.trim(),
        country: $("#f-country").value.trim(), category: $("#f-category").value,
        qty: $("#f-qty").value.trim(), message: msg.value.trim(),
        time: new Date().toISOString()
      };
      try {
        var arr = JSON.parse(localStorage.getItem("figurise-leads") || "[]");
        arr.unshift(data);
        localStorage.setItem("figurise-leads", JSON.stringify(arr.slice(0, 200)));
      } catch (err) {}

      if (CFG.contact && CFG.contact.formEndpoint) {
        fetch(CFG.contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        }).catch(function () { /* 网络失败不阻断本地流程 */ });
      }

      form.style.display = "none";
      success.style.display = "block";
      if (window.SCROLL_TO && $("#form-anchor")) {
        $("#form-anchor").scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
    var again = $("#send-another");
    if (again) again.addEventListener("click", function () {
      form.reset();
      form.style.display = "";
      success.style.display = "none";
    });
  }

  /* ---------- 复制工具 ---------- */
  function copyText(text, btnEl, hintKey) {
    var done = function () {
      if (!btnEl) return;
      var old = btnEl.textContent;
      btnEl.textContent = I18N.t(hintKey || "bot.copied");
      setTimeout(function () { btnEl.textContent = old; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  }

  /* ---------- 品牌 Logo ---------- */
  function initBrand() {
    var mark = CFG.brand && CFG.brand.logoMark;
    if (!mark) return;
    var a = $("#logo-mark"), b = $("#logo-mark-2");
    if (a) a.innerHTML = mark;
    if (b) b.innerHTML = mark;
  }

  /* ---------- 认证条 ---------- */
  function initCertStrip() {
    var strip = $("#cert-strip");
    if (!strip) return;
    var certs = CFG.certifications || [];
    var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 20 6v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>';
    certs.forEach(function (c) {
      var span = document.createElement("span");
      span.className = "cert-badge reveal";
      span.innerHTML = icon + "<span>" + c.code + " · " + (I18N.lang === "zh" ? c.name : c.nameEn) + "</span>";
      strip.appendChild(span);
    });
    // 语言切换时刷新名称
    I18N.onChange(function () {
      Array.prototype.slice.call(strip.children).forEach(function (el, i) {
        var c = certs[i]; if (!c) return;
        el.lastChild.textContent = c.code + " · " + (I18N.lang === "zh" ? c.name : c.nameEn);
      });
    });
  }

  /* ---------- 全球市场面板（数据来自 FiguBot 知识库 + 配置） ---------- */
  function initRegions() {
    var kb = window.__BOT_KB__;
    var defs = { sea: "r1", me: "r2", latam: "r3" };
    if (!kb || !$("#panel-sea")) return;

    function globeSVG() {
      var dots = "";
      var clusters = [
        // [cx, cy, r, color, opacity]
        [258, 208, 3, "#ff6b3d", 0.9], [268, 216, 2.6, "#ff6b3d", 0.8], [280, 206, 3, "#ff6b3d", 0.85], [272, 226, 2.6, "#ff6b3d", 0.7], [288, 218, 2.4, "#ff6b3d", 0.7],
        [250, 122, 3, "#ffc24b", 0.9], [262, 130, 2.8, "#ffc24b", 0.8], [274, 122, 3, "#ffc24b", 0.85], [266, 140, 2.6, "#ffc24b", 0.7], [282, 134, 2.4, "#ffc24b", 0.7],
        [132, 226, 3, "#ff6b3d", 0.9], [144, 236, 2.8, "#ff6b3d", 0.8], [156, 228, 3, "#ff6b3d", 0.85], [148, 246, 2.6, "#ff6b3d", 0.75], [166, 242, 2.4, "#ff6b3d", 0.7],
        [250, 84, 2.6, "#fff", 0.5], [300, 176, 2.4, "#fff", 0.4], [120, 130, 2.4, "#fff", 0.4], [176, 90, 2.4, "#fff", 0.4], [310, 250, 2.4, "#fff", 0.4]
      ];
      clusters.forEach(function (c) {
        dots += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + c[3] + '" opacity="' + c[4] + '"/>';
      });
      function pin(x, y, color) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
          '<path d="M0 0 C -7 -11 -11 -15 -11 -20 a 11 11 0 1 1 22 0 C 11 -15 7 -11 0 0 Z" fill="' + color + '" opacity="0.92"/>' +
          '<circle cx="0" cy="-20" r="4.4" fill="#fff" opacity="0.9"/></g>';
      }
      return '<svg viewBox="0 0 420 300" aria-hidden="true">' +
        '<circle cx="210" cy="152" r="118" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" stroke-width="1.4"/>' +
        '<ellipse cx="210" cy="152" rx="118" ry="38" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.2"/>' +
        '<ellipse cx="210" cy="152" rx="118" ry="72" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
        '<ellipse cx="210" cy="152" rx="40" ry="118" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.2"/>' +
        '<ellipse cx="210" cy="152" rx="76" ry="118" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
        '<path d="M92 152 H328 M210 34 V270" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
        dots +
        '<path d="M140 232 Q 205 196 268 216" stroke="rgba(255,107,61,0.4)" stroke-width="1.4" fill="none" stroke-dasharray="4 6"/>' +
        '<path d="M268 216 Q 290 170 258 128" stroke="rgba(255,194,75,0.4)" stroke-width="1.4" fill="none" stroke-dasharray="4 6"/>' +
        pin(262, 128, "#ffc24b") + pin(272, 214, "#ff6b3d") + pin(146, 240, "#ff6b3d") +
        '</svg>';
    }

    (CFG.regions || []).forEach(function (r) {
      var panel = $("#panel-" + r.id);
      if (!panel) return;
      var rk = defs[r.id], kd = kb.regions[r.id];
      var hotHtml = (kd.hot || []).map(function (cid) {
        var c = CFG.categories.filter(function (x) { return x.id === cid; })[0];
        return "<li>" + (I18N.lang === "zh" ? c.zh : c.en) + "</li>";
      }).join("");
      panel.innerHTML =
        '<div class="region-layout">' +
          '<div class="region-main">' +
            '<div class="region-intro"><h3>' + I18N.t(rk + ".name") + '</h3><p>' + I18N.t(rk + ".desc") + '</p></div>' +
            '<div class="region-tags">' + r.countries.map(function (c) { return "<span>" + c + "</span>"; }).join("") + '</div>' +
            '<div class="region-cols">' +
              '<div class="region-col"><h4>' + I18N.t("r.hot") + '</h4><ul>' + hotHtml + '</ul></div>' +
              '<div class="region-col"><h4>' + P(kb.m.channels) + '</h4><ul><li>' + P(kd.channels) + '</li></ul></div>' +
              '<div class="region-col"><h4>' + P(kb.m.advice) + '</h4><ul><li>' + P(kd.advice) + '</li></ul></div>' +
            '</div>' +
          '</div>' +
          '<div class="region-globe">' + globeSVG() + '</div>' +
        '</div>';
    });

    // 语言切换时重建
    I18N.onChange(function () { initRegions(); });
  }
  function P(obj) { return obj ? (I18N.lang === "zh" ? obj.zh : obj.en) : ""; }

  /* ---------- 页脚动态内容 ---------- */
  function initFooter() {
    var cats = CFG.categories || [];
    var catList = $("#footer-cats");
    if (catList) {
      cats.forEach(function (c) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "products.html?cat=" + c.id;
        a.textContent = I18N.lang === "zh" ? c.zh : c.en;
        li.appendChild(a);
        catList.appendChild(li);
      });
      I18N.onChange(function () {
        Array.prototype.slice.call(catList.children).forEach(function (li, i) {
          var c = cats[i]; if (!c) return;
          li.firstChild.textContent = I18N.lang === "zh" ? c.zh : c.en;
        });
      });
    }
    var addr = $("#footer-addr");
    if (addr && CFG.contact) {
      var setAddr = function () {
        addr.textContent = I18N.lang === "zh" ? (CFG.contact.addressZh || CFG.contact.address) : CFG.contact.address;
      };
      setAddr();
      I18N.onChange(setAddr);
    }
    var emailEl = $("#footer-email"), waEl = $("#footer-wa");
    if (emailEl && CFG.contact) emailEl.textContent = CFG.contact.email;
    if (waEl && CFG.contact) waEl.textContent = CFG.contact.whatsapp;
  }

  /* ---------- 智脑快捷入口 ---------- */
  function bindOpenBot() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-bot]")) {
        var fab = $(".bot-fab");
        if (fab) fab.click();
      }
    });
  }

  /* ---------- 生产基地（关于页） ---------- */
  function initBases() {
    var mount = $("#base-grid");
    if (!mount) return;
    var bases = CFG.brand && CFG.brand.bases;
    if (!bases || !bases.length) return;
    var map = {
      "汕头基地": "Shantou Base · Headquarters",
      "东莞基地": "Dongguan Base · High-volume",
      "义乌分销仓": "Yiwu Distribution Hub"
    };
    function render() {
      mount.innerHTML = bases.map(function (b) {
        var label = I18N.lang === "zh" ? b : (map[b] || b);
        return '<div class="base-card reveal"><b>' + label + '</b><span>' + (I18N.lang === "zh" ? "全工序自有产能" : "Full in-house production capacity") + '</span></div>';
      }).join("");
      initReveal();
    }
    render();
    I18N.onChange(render);
  }

  /* ---------- 联系页附加内容 ---------- */
  function initContactPage() {
    var addr = $("#contact-addr");
    if (addr && CFG.contact) {
      var set = function () { addr.textContent = I18N.lang === "zh" ? (CFG.contact.addressZh || CFG.contact.address) : CFG.contact.address; };
      set();
      I18N.onChange(set);
    }
    var wrap = $("#region-managers");
    if (wrap) {
      function render() {
        wrap.innerHTML = (CFG.regions || []).map(function (r) {
          var name = I18N.lang === "zh" ? r.name : r.nameEn;
          return '<div style="padding:12px 0;border-bottom:1px solid rgba(23,21,15,0.08);display:flex;flex-direction:column;gap:6px">' +
            '<b style="font-size:14.5px">' + name + '</b>' +
            '<span style="font-size:12.5px;color:var(--ink-soft)">' + I18N.t("c.officeLabel") + ': ' + r.countries.join(" / ") + '</span>' +
            '</div>';
        }).join("");
      }
      render();
      I18N.onChange(render);
    }
  }

  /* ---------- 启动 ---------- */
  function boot() {
    initLang();
    initNav();
    initReveal();
    initStats();
    initTabs();
    initMarquee();
    initYear();
    initContactForm();
    initBrand();
    initCertStrip();
    initRegions();
    initFooter();
    bindOpenBot();
    initPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* 暴露给其他模块 */
  window.App = {
    $: $, $$: $$, copyText: copyText,
    t: function (k) { return I18N.t(k); }
  };

  /* 页面初始化注册 */
  window.PageInit = window.PageInit || {};
  window.PageInit.about = initBases;
  window.PageInit.contact = initContactPage;
})();
