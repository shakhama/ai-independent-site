# FiguRise 手办外贸独立站 · 使用与配置指南

一套面向**手办/潮流玩具出口**的 B2B 外贸独立站源码：8 语种切换（含阿拉伯语 RTL）、产品中心、工厂实力、市场洞察、询盘系统，并内置 **FiguBot 外贸智脑**（选品洞察 / 本地化内容 / 智能投放 / 供应链预判四大 AI 模块）。

> 行业、目标国家、品牌、联系方式、语种、AI 接入等全部可改，无需动结构代码。

---

## 一、文件结构

```
AI独立站/
├── index.html          首页（Hero / 核心优势 / 产品 / 全球市场 / 流程 / 工厂 / 客户评价 / CTA）
├── products.html       产品中心（分类筛选 + 搜索 + 详情弹窗 + 一键询盘）
├── about.html          关于我们（故事 / 基地 / 设施 / 质检 / 历程 / 团队）
├── insights.html       市场洞察（东南亚 / 中东 / 拉美 / 全球采购指南）
├── contact.html        联系询盘（表单校验 + 本地留存 + 区域经理）
├── css/
│   ├── style.css       设计系统（深色墨水底 + 朱红/琥珀点缀）
│   └── rtl.css         阿拉伯语 RTL 适配
├── js/
│   ├── config.js       ★ 站点配置中心（品牌/行业/国家/语种/联系方式/AI 接入）
│   ├── i18n.js         多语言引擎 + 中文词库（回退链：当前语言→en→zh）
│   ├── lang-en.js      英文词库
│   ├── lang-other.js   西/葡/阿/越/泰/印尼 词库
│   ├── bot-kb.js       ★ 智脑知识库（市场情报 / 供应链参数 / FAQ，可编辑）
│   ├── bot.js          FiguBot 机器人逻辑
│   ├── main.js         导航 / 语言切换 / 动画 / 表单 / 区域面板
│   ├── products.js     ★ 产品数据（12 款示例，可增删改）
│   └── insights.js     ★ 市场洞察文章数据
└── README.md           本文件
```

---

## 二、快速上手（改 3 个文件就能上线）

### 1. 换品牌与联系方式 → `js/config.js`
```js
brand: { name: "FiguRise", nameZh: "潮界工坊", slogan: "...", logoMark: "<svg>...</svg>" }
contact: { email: "sales@figurise.com", whatsapp: "+86 138 0000 0000", ... }
```

### 2. 换行业 / 目标国家 → `js/config.js`
```js
industry: { name: "动漫手办 / 潮流玩具", ... }        // 换成你的行业
regions: [ { id:"sea", name:"东南亚", countries:[...] }, ... ]  // 目标国家随意增删
categories: [ { id:"prize", en:"...", zh:"...", sym:"fig-prize" }, ... ]
```

### 3. 换产品 → `js/products.js`
复制 `PRODUCTS` 数组里任意一条，改 `name/desc/features`（中英双语）即可；`scale/moq/lead` 为规格展示。首页自动取前 3 款，产品页展示全部。

### 4. 修改市场情报 / FAQ → `js/bot-kb.js`
智脑回答全部来自此文件（`regions` 市场情报、`dest` 供应链参数、`faq` 问答），都是 `{ zh, en }` 双语结构，直接改内容即可。

### 5. 语言设置
- 默认中文，可访问首页右上角切换；也可在 `config.js` 的 `languages` 中增删语种。
- 新增语种：在 `js/lang-other.js` 里加一个 `window.__I18N_MERGE__("xx", {...})` 即可，缺失词条自动回退英文。

---

## 三、询盘怎么收到？

**默认行为**：表单提交后数据保存在浏览器 `localStorage`（`figurise-leads` 键，最多 200 条），并弹出成功提示——纯前端演示，无需服务器。

**接真实邮箱**：在 `config.js` 的 `contact.formEndpoint` 填一个表单服务地址（如 Formspree / 企业微信自建应用 / 腾讯云函数），提交时会自动 POST JSON 过去：
```js
formEndpoint: "https://formspree.io/f/xxxxxx",
```

---

## 四、让 FiguBot 接入真实大模型（可选）

默认使用**内置离线知识引擎**（免费、无需联网、秒回）。有**两种**接入方式，任选其一：

### 方式一：网页面板直接配置（无需改代码）⭐ 推荐

1. 打开网站，点击右下角 **FiguBot** 悬浮按钮；
2. 在聊天窗口右上角点击**齿轮图标（设置）**；
3. 切换「引擎模式 → 远程大模型」，填写 **API 接口地址**（OpenAI 兼容）、**API Key**、**模型名称**（带常用模型下拉建议）；
4. 点击「**测试连接**」验证，再点「**保存并启用**」。

配置仅保存在**当前浏览器的 localStorage**（不会上传到任何服务器），下次打开自动生效；右上角状态灯会显示当前引擎（内置 / 远程模型）。

### 方式二：代码级全局配置（面向所有访客）

在 `config.js` 中填写，所有访客无需设置即可使用远程模型：

```js
aiBot: {
  apiUrl: "https://api.openai.com/v1/chat/completions",  // OpenAI 兼容接口
  apiKey: "sk-xxxx",
  model: "gpt-4o-mini",
  systemPrompt: "..."   // 可自定义智脑人设
}
```

> 说明：面板配置优先级高于代码配置（面板保存后会覆盖）；自由文本提问优先走远程大模型，命中了知识库的问题仍由内置引擎秒回；连接失败自动回退内置引擎，不会白屏。

---

## 五、本地预览 / 部署

**本地预览**（任选其一）：
```bash
# Python
python -m http.server 8080
# Node
npx serve .
```
然后浏览器打开 `http://localhost:8080`。

**部署到服务器**：把整个文件夹上传到任意静态托管（Nginx / 腾讯云 COS / EdgeOne Pages / Vercel / Netlify），无需任何后端。

---

## 六、设计说明

- **配色**：深色墨水底 `#0e0f14` + 朱红 `#ff6b3d` + 琥珀 `#ffc24b`，浅色区为暖纸色 `#faf7f1`。改色在 `css/style.css` 顶部 `:root` 变量。
- **字体**：Outfit（拉丁）+ Noto Sans SC（中文），阿拉伯语自动切换 Noto Kufi Arabic（`rtl.css`）。
- **响应式**：手机/平板/桌面自适应；弹窗、导航、跑马灯、Tab 均已适配。
- **无障碍**：支持 `prefers-reduced-motion`，键盘可达，`aria` 标注齐全。
- **SEO**：每个页面有 meta title/description，随语言切换自动更新。

## 七、注意事项

- 产品图目前为**矢量插画占位**，替换方式：`products.js` 中 `cardHTML` 的 `<use href="#fig-xxx">` 改为 `<img src="你的产品图">` 即可（也可直接改 `assets` 目录）。
- 公司信息、数据指标（`stats`）、认证（`certifications`）均为示例，上线前请替换为真实资料。
- 询盘数据在 `localStorage`，清空浏览器缓存会丢失；接 `formEndpoint` 后可持久化。
