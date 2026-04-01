# 任务：修复网站首页链接 404 问题

## 🐛 问题描述

网站首页以下模块的链接访问返回 404：
1. **Ollama** - 链接指向 `/AI_Infrastructure/02-部署指南/01-Ollama 完全指南`
2. **VLM 视觉语言模型** (LMDeploy) - 链接指向 `/AI_Infrastructure/02-部署指南/04-LMDeploy 完全指南`
3. **LlamaIndex** - 链接指向 `/AI_Infrastructure/02-部署指南/03-LlamaIndex 完全指南`

## 📋 检查清单

### 1. 检查 index.md 中的链接配置
- [ ] 检查首页 features 区域的 link 配置
- [ ] 确认链接路径格式是否正确

### 2. 检查实际文件结构
- [ ] 确认 `AI_Infrastructure/02-部署指南/` 目录是否存在
- [ ] 确认目标 markdown 文件是否存在
- [ ] 确认文件名是否与链接匹配

### 3. 检查构建输出
- [ ] 检查 `.vitepress/dist/` 中是否生成了对应的 HTML 文件
- [ ] 检查生成的 HTML 文件路径是否正确

### 4. 分析 404 原因
- [ ] 路径不匹配？
- [ ] 文件名包含特殊字符？
- [ ] cleanUrls 配置影响？
- [ ] 目录层级问题？

## 🔄 执行流程

1. **检查分析** - 逐项检查上述清单
2. **提出方案** - 为每个问题提供解决方案
3. **自我验证** - 问："此方案是不是最佳的？"
4. **确认最佳** - 如果"是"则执行，"否"则继续优化
5. **执行修复** - 修改 index.md 或相关文件
6. **重新构建** - `npm run docs:build`
7. **验证修复** - 检查生成的 HTML
8. **提交 git** - commit 并 push

## 📝 当前配置

**index.md 中的链接：**
```markdown
- VLM 视觉语言模型 → /AI_Infrastructure/02-部署指南/04-LMDeploy 完全指南
- LlamaIndex → /AI_Infrastructure/02-部署指南/03-LlamaIndex 完全指南
- Ollama → /AI_Infrastructure/02-部署指南/01-Ollama 完全指南
```

**实际文件路径：**
```
AI_Infrastructure/02-部署指南/01-Ollama 完全指南.md
AI_Infrastructure/02-部署指南/03-LlamaIndex 完全指南.md
AI_Infrastructure/02-部署指南/04-LMDeploy 完全指南.md
```

## 📦 输出格式

```markdown
## 🔍 问题分析
[详细说明问题原因]

## 💡 解决方案
[具体修复步骤]

## 🤔 自我验证
问：此方案是不是最佳的？
答：是/否 + 理由

## ✅ 执行结果
[修复后的验证结果]

## 📦 Git 提交
[commit 信息]
```

---

**开始时间：** 2026-04-01 12:20
**执行人：** CC (Claude Code)
