# Skills 文档中心

> 收集各种 AI 代理（Agent）技能的说明文档，帮助你更好地使用这些工具提升开发效率

---

## 📚 可用 Skills

### 🏗️ gstack

**作者：** Garry Tan（Y Combinator CEO）  
**适用：** Claude Code  
**GitHub：** [garrytan/gstack](https://github.com/garrytan/gstack)

> "我大概从去年 12 月到现在都没怎么敲过代码了，这是一个巨大的变化。" — Andrej Karpathy

gstack 将 Claude Code 变成一个虚拟工程团队，提供 28 个斜杠命令，涵盖从产品规划到部署的全流程。

**核心能力：**
- 📋 **规划** — `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`
- 🔍 **审查** — `/review`, `/codex`, `/cso`
- ✅ **测试** — `/qa`, `/benchmark`
- 🚀 **交付** — `/ship`, `/land-and-deploy`, `/canary`
- 🛠️ **工具** — `/browse`, `/careful`, `/freeze`, `/guard`

**文档：**
- [README](./gstack/README.md) — gstack 完整介绍
- [使用手册](./gstack/guide.md) — 快速上手指南
- [安装指南](./gstack/installation.md) — Windows 安装步骤

**安装命令：**
```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

---

## 📥 添加新 Skill

如果你想添加新的 Skill 文档，请遵循以下结构：

1. 在 `AI_docs/Skills/` 目录下创建 `<skill-name>/` 目录
2. 在该目录下添加文档（README.md、guide.md 等）
3. 在此页面添加条目

### 文档模板

参考格式：

- 标题：`# <Skill 名称>`
- 作者信息、适用平台、GitHub 链接
- 简介、安装步骤、核心功能、使用场景、相关链接

---

## 📋 Skill 目录结构规范

每个 Skill 应遵循以下目录结构：

```
AI_docs/Skills/
├── index.md              # 总索引页（本页面）
└── <skill-name>/         # Skill 专属目录
    ├── README.md         # 官方文档翻译/介绍
    ├── guide.md          # 使用手册
    ├── installation.md   # 安装指南
    └── faq.md            # 常见问题（可选）
```

---

_最后更新：2026-03-24_
