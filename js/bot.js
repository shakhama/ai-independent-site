/* ============================================================
 * FiguRise - FiguBot 外贸智脑 (bot.js)
 * 四大智能模块：
 *   ① 选品洞察   ② 本地化内容   ③ 智能投放   ④ 供应链预判
 * 工作方式：
 *   - 默认：内置离线知识引擎（免费、无需联网、即时响应）
 *   - 可选：在 config.js 的 aiBot 中填写 apiUrl/apiKey 后，
 *     自由文本提问将调用远程大模型（OpenAI Chat Completions 兼容）
 * 语言：站点语言为中文时用中文回答，其余语种用英文回答
 * ============================================================ */
(function () {
  "use strict";
  var CFG = window.SITE_CONFIG || {};
  var KB = window.__BOT_KB__;

  /* 双语取值：zh 站点用中文，其余用英文 */
  function P(obj) { return obj ? (I18N.lang === "zh" ? obj.zh : obj.en) : ""; }

  /* 品类信息 */
  function cats() { return CFG.categories || []; }
  function catById(id) { var l = cats(); for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i]; return l[0]; }
  function catName(id) { var c = catById(id); return I18N.lang === "zh" ? c.zh : c.en; }

  /* 区域信息 */
  function regions() { return CFG.regions || []; }
  function regionById(id) { var l = regions(); for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i]; return l[0]; }
  function regionName(id) { return I18N.lang === "zh" ? regionById(id).name : regionById(id).nameEn; }

  /* ---------- DOM ---------- */
  var fab, panel, chat, input, sendBtn;
  var gear, enginePill, cfgEl;
  var cfgUrl, cfgKey, cfgModel, cfgStatusEl, modeBtns;

  function $ (s) { return document.querySelector(s); }

  function scrollChat() { if (chat) chat.scrollTop = chat.scrollHeight; }

  /* ---------- 消息渲染 ---------- */
  function addMsg(html, who) {
    if (!chat) return;
    var div = document.createElement("div");
    div.className = "bot-msg " + who;
    div.innerHTML = html;
    chat.appendChild(div);
    scrollChat();
    return div;
  }

  function typing() {
    var div = document.createElement("div");
    div.className = "bot-msg bot bot-typing";
    div.innerHTML = "<i></i><i></i><i></i>";
    chat.appendChild(div);
    scrollChat();
    return div;
  }
  function removeTyping(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function addChips(buttons) {
    if (!chat) return;
    var wrap = document.createElement("div");
    wrap.className = "bot-chips";
    buttons.forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bot-chip" + (b.back ? " back" : "");
      if (b.icon) btn.innerHTML = b.icon + "<span>" + b.label + "</span>";
      else btn.textContent = b.label;
      btn.addEventListener("click", function () { b.onClick(); });
      wrap.appendChild(btn);
    });
    chat.appendChild(wrap);
    scrollChat();
  }

  var ICON = {
    insights: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>',
    local: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.6-9.3-9A5.7 5.7 0 0 1 12 5.7 5.7 5.7 0 0 1 21.3 12C19 16.4 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2"/></svg>',
    ads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.4"/></svg>',
    supply: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17h20"/><path d="M4 17V8h6l2 3h8v6"/><circle cx="7" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6Z"/></svg>'
  };

  /* ---------- 话术工具 ---------- */
  function joinList(arr) { return arr.map(function (x) { return "· " + x; }).join("<br>"); }
  function copyBtn(copyText, label) {
    return '<button type="button" class="bot-copy" data-copy="' + encodeURIComponent(copyText) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
      (label || "Copy") + '</button>';
  }

  function contactChips(extra) {
    var chips = [];
    if (extra) chips.push(extra);
    chips.push({
      label: I18N.lang === "zh" ? "联系销售 / 获取报价" : "Contact Sales / Get a Quote",
      onClick: function () { location.href = "contact.html"; }
    });
    chips.push({ label: I18N.t("bot.restart"), back: true, onClick: start });
    return chips;
  }

  /* ---------- 模块 ① 选品洞察 ---------- */
  function moduleInsights() {
    addMsg(P(KB.m.insightsIntro), "bot");
    addChips(regions().map(function (r) {
      return { label: regionName(r.id), onClick: function () { insightsRegion(r.id); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: start }]));
  }
  function insightsRegion(rid) {
    var rd = KB.regions[rid];
    var out = "<b>" + P(KB.m.insights) + " · " + regionName(rid) + "</b><br><br>";
    out += "<span class='hl'>" + P(KB.m.profile) + "</span><br>" + P(rd.profile) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.hotCats) + "</span><br>";
    out += rd.hot.map(function (cid, i) {
      var c = KB.categories[cid];
      return (i + 1) + ". <b>" + catName(cid) + "</b> — " + P(rd.catNote[cid] || c.why) + "；" + P(c.band);
    }).join("<br>") + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.channels) + "</span><br>" + P(rd.channels) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.advice) + "</span><br>" + P(rd.advice);
    var m = addMsg(out + "<br><br>" + copyBtn(out.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), I18N.t("common.copy")), "bot");
    addChips(contactChips({
      label: I18N.lang === "zh" ? "深入某个品类" : "Dig into a category",
      onClick: function () { insightsCategory(rid); }
    }));
  }
  function insightsCategory(rid) {
    addMsg(P(KB.m.pickCat), "bot");
    addChips(cats().map(function (c) {
      return { label: I18N.lang === "zh" ? c.zh : c.en, onClick: function () { insightsDetail(rid, c.id); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: function () { moduleInsights(); } }]));
  }
  function insightsDetail(rid, cid) {
    var rd = KB.regions[rid], c = KB.categories[cid];
    var out = "<b>" + catName(cid) + " · " + regionName(rid) + "</b><br><br>";
    out += P(c.why) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.priceBand) + "</span> " + P(c.band) + "<br>";
    out += "<span class='hl'>" + P(KB.m.play) + "</span> " + P(c.play) + "<br>";
    out += "<span class='hl'>" + P(KB.m.moq) + "</span> " + P(c.moq) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.regionalNote) + "</span> " + P(rd.catNote[cid] || rd.advice);
    var m = addMsg(out + "<br><br>" + copyBtn(out.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), I18N.t("common.copy")), "bot");
    addChips(contactChips());
  }

  /* ---------- 模块 ② 本地化内容 ---------- */
  function moduleLocal() {
    addMsg(P(KB.m.localIntro), "bot");
    addChips(regions().map(function (r) {
      return { label: regionName(r.id), onClick: function () { localRegion(r.id); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: start }]));
  }
  function localRegion(rid) {
    var rd = KB.regions[rid];
    var out = "<b>" + P(KB.m.local) + " · " + regionName(rid) + "</b><br><br>";
    out += "<span class='hl'>" + P(KB.m.localTitle) + "</span><br>" + P(rd.lTitle) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.localPoints) + "</span><br>" + joinList(P(rd.lPoints)) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.localKeywords) + "</span><br>" + rd.lKeywords.join(" / ") + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.localPlatform) + "</span><br>" + P(rd.lPlatform) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.localDont) + "</span><br>" + joinList(P(rd.lDont));
    var m = addMsg(out + "<br><br>" + copyBtn(out.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), I18N.t("common.copy")), "bot");
    addChips(contactChips());
  }

  /* ---------- 模块 ③ 智能投放 ---------- */
  function moduleAds() {
    addMsg(P(KB.m.adsIntro), "bot");
    addChips(regions().map(function (r) {
      return { label: regionName(r.id), onClick: function () { adsRegion(r.id); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: start }]));
  }
  function adsRegion(rid) {
    addMsg(P(KB.m.adsBudget), "bot");
    addChips(["small", "mid", "large"].map(function (b) {
      var lb = KB.budgets[b];
      return { label: lb.label[I18N.lang === "zh" ? "zh" : "en"], onClick: function () { adsPlan(rid, b); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: moduleAds }]));
  }
  function adsPlan(rid, bid) {
    var rd = KB.regions[rid], b = KB.budgets[bid];
    var out = "<b>" + P(KB.m.ads) + " · " + regionName(rid) + " · " + b.label[I18N.lang === "zh" ? "zh" : "en"] + "</b><br><br>";
    out += "<span class='hl'>" + P(KB.m.adsSplit) + "</span><br>" + b.split[I18N.lang === "zh" ? "zh" : "en"] + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.adsChannels) + "</span><br>" + joinList(rd.adsChannels[I18N.lang === "zh" ? "zh" : "en"]) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.adsTarget) + "</span><br>" + P(rd.adsTarget) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.adsCreative) + "</span><br>" + joinList(P(rd.adsCreative)) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.adsKpi) + "</span> " + P(b.kpi);
    var m = addMsg(out + "<br><br>" + copyBtn(out.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), I18N.t("common.copy")), "bot");
    addChips(contactChips());
  }

  /* ---------- 模块 ④ 供应链预判 ---------- */
  function moduleSupply() {
    addMsg(P(KB.m.supplyIntro), "bot");
    addChips(regions().map(function (r) {
      return { label: regionName(r.id), onClick: function () { supplyRegion(r.id); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: start }]));
  }
  function supplyRegion(rid) {
    addMsg(P(KB.m.supplyDest), "bot");
    var r = regionById(rid);
    addChips((r.countries || []).map(function (c) {
      return { label: c, onClick: function () { supplyDest(rid, c); } };
    }).concat([{ label: I18N.t("bot.back"), back: true, onClick: moduleSupply }]));
  }
  function supplyDest(rid, country) {
    var d = KB.dest[country] || KB.dest.default;
    var out = "<b>" + P(KB.m.supply) + " · " + country + "</b><br><br>";
    out += "<span class='hl'>" + P(KB.m.sLead) + "</span> " + P(d.lead) + "<br>";
    out += "<span class='hl'>" + P(KB.m.sSea) + "</span> " + P(d.sea) + "<br>";
    out += "<span class='hl'>" + P(KB.m.sAir) + "</span> " + P(d.air) + "<br>";
    out += "<span class='hl'>" + P(KB.m.sCost) + "</span> " + P(d.cost) + "<br>";
    out += "<span class='hl'>" + P(KB.m.sCert) + "</span> " + P(d.cert) + "<br>";
    out += "<span class='hl'>" + P(KB.m.sDuty) + "</span> " + P(d.duty) + "<br><br>";
    out += "<span class='hl'>" + P(KB.m.sPeak) + "</span> " + P(d.peak) + "<br>";
    out += "<span class='hl'>" + P(KB.m.sPay) + "</span> " + P(d.pay);
    var m = addMsg(out + "<br><br>" + copyBtn(out.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), I18N.t("common.copy")), "bot");
    addChips(contactChips());
  }

  /* ---------- 自由问答（知识库匹配） ---------- */
  function answerFree(text) {
    var lower = text.toLowerCase();
    var best = null, bestScore = 0;
    (KB.faq || []).forEach(function (f) {
      var score = 0;
      (f.k || []).forEach(function (kw) {
        if (lower.indexOf(kw.toLowerCase()) > -1) score += kw.length;
      });
      if (score > bestScore) { bestScore = score; best = f; }
    });
    if (best && bestScore >= 3) {
      var a = P(best.a);
      var m = addMsg(a + "<br><br>" + copyBtn(a.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), I18N.t("common.copy")), "bot");
      addChips(contactChips());
      return true;
    }
    return false;
  }

  /* ---------- 远程大模型（可选，支持面板配置） ---------- */
  function askRemote(text, fallback) {
    var cfg = botConfig();
    if (!cfg.useRemote || !cfg.apiUrl || !cfg.apiKey) { fallback(); return; }
    var t = typing();
    try {
      fetch(cfg.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + cfg.apiKey },
        body: JSON.stringify({
          model: cfg.model || "gpt-4o-mini",
          temperature: cfg.temperature || 0.7,
          messages: [
            { role: "system", content: cfg.systemPrompt || "" },
            { role: "user", content: text }
          ]
        })
      }).then(function (r) { return r.json(); }).then(function (data) {
        removeTyping(t);
        var content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        if (!content) { fallbackLocal(text); return; }
        var m = addMsg(content.replace(/\n/g, "<br>") + "<br><br>" + copyBtn(content, I18N.t("common.copy")), "bot");
        addChips(contactChips());
      }).catch(function () {
        removeTyping(t);
        addMsg(I18N.t("bot.apiError"), "bot");
        fallbackLocal(text);
      });
    } catch (e) {
      removeTyping(t);
      addMsg(I18N.t("bot.apiError"), "bot");
      fallbackLocal(text);
    }
  }
  function fallbackLocal(text) {
    if (!answerFree(text)) {
      addMsg(P(KB.m.fallback), "bot");
      addChips([{ icon: ICON.insights, label: I18N.t("bot.quick1"), onClick: moduleInsights },
                { icon: ICON.local, label: I18N.t("bot.quick2"), onClick: moduleLocal },
                { icon: ICON.ads, label: I18N.t("bot.quick3"), onClick: moduleAds },
                { icon: ICON.supply, label: I18N.t("bot.quick4"), onClick: moduleSupply }]);
    }
  }

  /* ============================================================
   * 智脑设置面板：可视化接入远程大模型（API URL / Key / 模型）
   * 优先级：面板保存的 localStorage 配置 > config.js 的 aiBot
   * ============================================================ */
  var STORE_KEY = "figurise-bot-config";

  function botConfig() {
    var base = CFG.aiBot || {};
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) {}
    var cfg = Object.assign({}, base, saved || {});
    cfg.useRemote = !!(cfg.useRemote && cfg.apiUrl && cfg.apiKey);
    return cfg;
  }

  function saveBotConfig(data) {
    var payload = {
      apiUrl: (data.apiUrl || "").trim(),
      apiKey: (data.apiKey || "").trim(),
      model: (data.model || "").trim() || "gpt-4o-mini",
      temperature: data.temperature || 0.7,
      useRemote: !!data.useRemote
    };
    try { localStorage.setItem(STORE_KEY, JSON.stringify(payload)); } catch (e) {}
    updateEnginePill();
  }

  function resetBotConfig() {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    updateEnginePill();
  }

  function updateEnginePill() {
    if (!enginePill) return;
    var cfg = botConfig();
    enginePill.classList.toggle("remote", cfg.useRemote);
    var em = enginePill.querySelector("em");
    em.textContent = cfg.useRemote
      ? I18N.t("bot.engineRemote") + " · " + cfg.model
      : I18N.t("bot.engineLocal");
  }

  function cfgShowStatus(cls, html) {
    if (!cfgStatusEl) return;
    cfgStatusEl.className = "cfg-status " + cls;
    cfgStatusEl.innerHTML = html;
  }

  var GEAR_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>';
  var BACK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';

  function cfgSetMode(mode) {
    (modeBtns || []).forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-mode") === mode); });
    var remote = mode === "remote";
    [cfgUrl, cfgKey, cfgModel].forEach(function (el) { if (el) el.disabled = !remote; });
    if (cfgUrl) cfgUrl.style.opacity = remote ? "1" : ".45";
    if (cfgKey) cfgKey.style.opacity = remote ? "1" : ".45";
    if (cfgModel) cfgModel.style.opacity = remote ? "1" : ".45";
  }

  function cfgOpen() {
    if (!cfgEl) return;
    // 回填当前有效配置
    var cfg = botConfig();
    if (cfgUrl) cfgUrl.value = cfg.apiUrl || "";
    if (cfgKey) cfgKey.value = cfg.apiKey || "";
    if (cfgModel) cfgModel.value = cfg.model || "";
    cfgSetMode(cfg.useRemote ? "remote" : "local");
    cfgShowStatus("", "");
    cfgEl.classList.add("open");
    gear.setAttribute("aria-expanded", "true");
  }
  function cfgClose() {
    if (!cfgEl) return;
    cfgEl.classList.remove("open");
    if (gear) gear.setAttribute("aria-expanded", "false");
  }

  function buildConfigPanel() {
    if (!panel) return;
    // 仅构建一次 DOM
    if (!cfgEl) {
      cfgEl = document.createElement("div");
      cfgEl.className = "bot-config";
      cfgEl.innerHTML =
        '<div class="cfg-head">' +
          '<button type="button" class="cfg-back">' + BACK_ICON + '<span></span></button>' +
          '<h4>' + GEAR_ICON + '<span></span></h4>' +
        '</div>' +
        '<div class="cfg-mode">' +
          '<button type="button" data-mode="local"></button>' +
          '<button type="button" data-mode="remote"></button>' +
        '</div>' +
        '<div class="cfg-field"><label></label><input type="text" id="bcfg-url" placeholder="https://api.openai.com/v1/chat/completions" autocomplete="off"></div>' +
        '<div class="cfg-field"><label></label><input type="password" id="bcfg-key" placeholder="sk-..." autocomplete="off"></div>' +
        '<div class="cfg-field"><label></label>' +
          '<input type="text" id="bcfg-model" list="bcfg-models" autocomplete="off">' +
          '<datalist id="bcfg-models">' +
            "<option value='gpt-4o-mini'><option value='gpt-4o'><option value='gpt-4.1-mini'>" +
            "<option value='claude-3-5-sonnet'><option value='deepseek-chat'><option value='qwen-plus'>" +
            "<option value='glm-4'><option value='gemini-2.0-flash'><option value='kimi-latest'>" +
          '</datalist>' +
          '<span class="hint"></span>' +
        '</div>' +
        '<div class="cfg-actions">' +
          '<button type="button" class="btn btn-ghost btn-sm" id="bcfg-test"></button>' +
          '<button type="button" class="btn btn-primary btn-sm" id="bcfg-save"></button>' +
        '</div>' +
        '<button type="button" class="btn btn-ghost btn-sm" id="bcfg-reset"></button>' +
        '<div class="cfg-status" id="bcfg-status"></div>';
      panel.appendChild(cfgEl);

      cfgUrl = $("#bcfg-url");
      cfgKey = $("#bcfg-key");
      cfgModel = $("#bcfg-model");
      cfgStatusEl = $("#bcfg-status");
      modeBtns = Array.prototype.slice.call(cfgEl.querySelectorAll(".cfg-mode button"));

      // 模式切换
      modeBtns.forEach(function (b) {
        b.addEventListener("click", function () { cfgSetMode(b.getAttribute("data-mode")); });
      });
      // 返回对话
      cfgEl.querySelector(".cfg-back").addEventListener("click", cfgClose);
      // 测试连接
      $("#bcfg-test").addEventListener("click", cfgTest);
      // 保存
      $("#bcfg-save").addEventListener("click", cfgSave);
      // 恢复默认
      $("#bcfg-reset").addEventListener("click", cfgReset);
    }
    refreshCfgLabels();
  }

  function refreshCfgLabels() {
    if (!cfgEl) return;
    cfgEl.querySelector(".cfg-back span").textContent = I18N.t("bot.cfgBack");
    cfgEl.querySelector(".cfg-head h4 span").textContent = I18N.t("bot.cfgTitle");
    var labels = cfgEl.querySelectorAll(".cfg-field label");
    labels[0].textContent = I18N.t("bot.cfgUrl");
    labels[1].textContent = I18N.t("bot.cfgKey");
    labels[2].textContent = I18N.t("bot.cfgModel");
    cfgEl.querySelector(".cfg-field .hint").textContent = I18N.t("bot.cfgHint");
    var modeLbls = cfgEl.querySelectorAll(".cfg-mode button");
    modeLbls[0].textContent = I18N.t("bot.cfgLocal");
    modeLbls[1].textContent = I18N.t("bot.cfgRemote");
    $("#bcfg-test").textContent = I18N.t("bot.cfgTest");
    $("#bcfg-save").textContent = I18N.t("bot.cfgSave");
    $("#bcfg-reset").textContent = I18N.t("bot.cfgReset");
    $("#bcfg-model").setAttribute("placeholder", I18N.t("bot.cfgModel"));
  }

  function cfgCollect() {
    var remote = false;
    modeBtns.forEach(function (b) { if (b.classList.contains("on") && b.getAttribute("data-mode") === "remote") remote = true; });
    return { apiUrl: cfgUrl.value, apiKey: cfgKey.value, model: cfgModel.value, useRemote: remote };
  }

  function cfgSave() {
    var data = cfgCollect();
    if (data.useRemote && (!data.apiUrl.trim() || !data.apiKey.trim())) {
      cfgShowStatus("err", I18N.t("bot.cfgNeed"));
      return;
    }
    saveBotConfig(data);
    cfgClose();
    addMsg("<b>" + I18N.t("bot.cfgSaved") + "</b><br>" + I18N.t("bot.cfgSavedTip"), "bot");
    addChips(contactChips());
    scrollChat();
  }

  function cfgReset() {
    resetBotConfig();
    var cfg = botConfig();
    cfgUrl.value = cfg.apiUrl || "";
    cfgKey.value = cfg.apiKey || "";
    cfgModel.value = cfg.model || "";
    cfgSetMode(cfg.useRemote ? "remote" : "local");
    cfgShowStatus("info", I18N.t("bot.cfgEmpty"));
  }

  function cfgTest() {
    var data = cfgCollect();
    if (!data.apiUrl.trim() || !data.apiKey.trim()) {
      cfgShowStatus("err", I18N.t("bot.cfgNeed"));
      return;
    }
    var t0 = Date.now();
    cfgShowStatus("info", I18N.t("bot.typing"));
    function done() {
      var ms = Date.now() - t0;
      cfgShowStatus("ok", I18N.t("bot.cfgOk").replace("{ms}", ms));
    }
    function fail(msg) {
      cfgShowStatus("err", I18N.t("bot.cfgFail").replace("{msg}", msg || ""));
    }
    try {
      fetch(data.apiUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + data.apiKey.trim() },
        body: JSON.stringify({
          model: data.model.trim() || "gpt-4o-mini",
          max_tokens: 8,
          messages: [{ role: "user", content: "ping" }]
        })
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res && res.choices && res.choices[0]) done();
        else fail((res && res.error && (res.error.message || res.error.code)) || "HTTP error");
      }).catch(function (e) { fail(String(e && e.message || e)); });
    } catch (e) { fail(String(e && e.message || e)); }
  }

  /* ---------- 启动流程 ---------- */
  function start() {
    var t = typing();
    setTimeout(function () {
      removeTyping(t);
      addMsg(I18N.t("bot.greeting"), "bot");
      // 功能卡片
      var wrap = document.createElement("div");
      wrap.className = "bot-chips bot-modules";
      var mods = [
        { icon: ICON.insights, t: I18N.t("bot.quick1"), d: P(KB.m.dInsights), fn: moduleInsights },
        { icon: ICON.local, t: I18N.t("bot.quick2"), d: P(KB.m.dLocal), fn: moduleLocal },
        { icon: ICON.ads, t: I18N.t("bot.quick3"), d: P(KB.m.dAds), fn: moduleAds },
        { icon: ICON.supply, t: I18N.t("bot.quick4"), d: P(KB.m.dSupply), fn: moduleSupply }
      ];
      mods.forEach(function (m) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "bot-module-card";
        b.innerHTML = m.icon + "<b>" + m.t + "</b><span>" + m.d + "</span>";
        b.addEventListener("click", m.fn);
        wrap.appendChild(b);
      });
      chat.appendChild(wrap);
      scrollChat();
    }, 500);
  }

  /* ---------- 事件绑定 ---------- */
  function send(text) {
    text = (text || "").trim();
    if (!text) return;
    addMsg(escapeHtml(text), "user");
    input.value = "";
    // 先试本地知识库命中；未命中且启用了远程模型才走 API
    var cfg = botConfig();
    if (!answerFree(text)) {
      if (cfg.useRemote && cfg.apiUrl && cfg.apiKey) askRemote(text, function () { fallbackLocal(text); });
      else fallbackLocal(text);
    }
  }
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function init() {
    fab = $(".bot-fab");
    panel = $(".bot-panel");
    chat = $(".bot-chat");
    input = $(".bot-input input");
    sendBtn = $(".bot-send");
    if (!fab || !panel) return;

    fab.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && !chat.children.length) start();
      setTimeout(scrollChat, 60);
    });
    $(".bot-close").addEventListener("click", function () { panel.classList.remove("open"); });

    // 头部：引擎状态 + 设置入口
    var headTitle = panel.querySelector(".bot-header > div");
    if (headTitle) {
      enginePill = document.createElement("span");
      enginePill.className = "bot-engine";
      enginePill.innerHTML = '<span class="dot"></span><em></em>';
      headTitle.appendChild(enginePill);
    }
    gear = document.createElement("button");
    gear.type = "button";
    gear.className = "bot-gear";
    gear.setAttribute("aria-label", I18N.t("bot.gear"));
    gear.setAttribute("aria-expanded", "false");
    gear.innerHTML = GEAR_ICON;
    var closeBtn = $(".bot-close");
    if (closeBtn && closeBtn.parentNode) closeBtn.parentNode.insertBefore(gear, closeBtn);
    gear.addEventListener("click", function () {
      if (cfgEl && cfgEl.classList.contains("open")) cfgClose();
      else cfgOpen();
    });

    buildConfigPanel();
    updateEnginePill();

    sendBtn.addEventListener("click", function () { send(input.value); });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(input.value); });

    // 复制按钮（事件委托）
    chat.addEventListener("click", function (e) {
      var c = e.target.closest("[data-copy]");
      if (c) {
        var txt = decodeURIComponent(c.getAttribute("data-copy"));
        window.App.copyText(txt, c);
      }
    });

    // 语言切换后，若聊天为空则重置引导；并刷新设置面板与引擎指示文案
    I18N.onChange(function () {
      if (gear) gear.setAttribute("aria-label", I18N.t("bot.gear"));
      refreshCfgLabels();
      updateEnginePill();
      chat.innerHTML = "";
      if (panel.classList.contains("open")) start();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
