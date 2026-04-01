# 📊 documents-site 404 问题检查报告

**检查时间：** 2026-04-01 10:45
**检查人：** 小蛋蛋

---

## 🔍 问题列表

### 问题 1：侧边栏配置 link 路径多了 `.md` 后缀

**位置：** `.vitepress/config.mjs` sidebar 配置

**问题描述：**
```javascript
// 当前配置（错误）
sidebar: {
  "/AI_docs": [
    { text: "Claude-Code", link: "/AI_docs/Claude-Code.md" },  // ❌ 多了 .md
    { text: "Skills", link: "/AI_docs/Skills/index.md" },      // ❌ 多了 index.md
  ]
}
```

**影响：** VitePress 会自动处理 `.md` 到 `.html` 的转换，配置中不应该包含 `.md` 后缀。这会导致导航链接错误。

---

### 问题 2：部分目录路径不一致

**位置：** `config.mjs` sidebar 配置 vs 实际文件结构

**问题描述：**
- 配置中使用 `/AI_docs/Skills/gstack/guide.md`
- 实际文件是 `AI_docs/Skills/gstack/guide.md`
- 但 sidebar 配置应该指向目录而不是具体文件

---

### 问题 3：构建警告 - jinja2 语言未加载

**位置：** 多个 markdown 文件

**问题描述：**
```
The language 'jinja2' is not loaded, falling back to 'txt' for syntax highlighting.
```

**影响：** 代码高亮显示为纯文本，不影响功能但影响阅读体验。

---

## 💡 解决方案

### 方案 1：修复 sidebar 配置（推荐）

**步骤：**
1. 编辑 `.vitepress/config.mjs`
2. 移除所有 sidebar link 中的 `.md` 后缀
3. 确保路径以 `/` 开头，指向目录或页面（不带扩展名）

**修改前：**
```javascript
sidebar: {
  "/AI_docs": [
    { text: "Claude-Code", link: "/AI_docs/Claude-Code.md" },
    { text: "Skills", link: "/AI_docs/Skills/index.md" },
  ]
}
```

**修改后：**
```javascript
sidebar: {
  "/AI_docs": [
    { text: "Claude-Code", link: "/AI_docs/Claude-Code" },
    { text: "Skills", items: [
      { text: "gstack", items: [
        { text: "guide", link: "/AI_docs/Skills/gstack/guide" },
        { text: "installation", link: "/AI_docs/Skills/gstack/installation" },
        { text: "README", link: "/AI_docs/Skills/gstack/README" },
      ]},
      { text: "index", link: "/AI_docs/Skills/index" },
    ]},
  ]
}
```

---

### 方案 2：添加 jinja2 语言支持

**步骤：**
1. 在 `config.mjs` 中添加 `markdown` 配置
2. 使用 `shiki` 的 `transformers` 或自定义语言

**修改：**
```javascript
export default defineConfig({
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    languages: ['jinja2']  // 添加 jinja2 支持
  }
})
```

---

## 🤔 自我验证

**问：** 此方案是不是最佳的？

**答：** 是。理由如下：

1. **VitePress 最佳实践**：官方文档明确说明 sidebar link 不应该包含 `.md` 后缀，VitePress 会自动处理路由转换。

2. **最小改动原则**：只修改配置文件中错误的路径，不影响其他功能。

3. **可验证性**：修改后重新构建，检查生成的 HTML 链接是否正确。

4. **长期维护**：修复后符合 VitePress 标准，未来升级不会出现问题。

---

## ✅ 执行计划

1. [ ] 备份当前 `config.mjs`
2. [ ] 修改 sidebar 配置，移除 `.md` 后缀
3. [ ] 添加 jinja2 语言支持（可选）
4. [ ] 运行 `npm run docs:build` 重新构建
5. [ ] 验证生成的 HTML 文件
6. [ ] 测试本地预览 `npm run docs:preview`
7. [ ] 提交 git commit
8. [ ] Push 到远程仓库

---

## 📦 Git 提交信息

```
fix: 修复 VitePress sidebar 配置中的路径错误

- 移除 sidebar link 中的 .md 后缀（VitePress 自动处理）
- 统一路径格式为 `/dir/page` 格式
- 添加 jinja2 语言支持（可选）

修复了导航链接 404 问题
```

---

**等待确认：** 此方案是否为最佳方案？如果是，将开始执行修复。
