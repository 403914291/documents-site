# gstack 使用手册

> 快速上手 gstack，将 Claude Code 变成你的虚拟工程团队

---

## 🚀 快速开始

### 1. 安装 gstack

```bash
# 克隆 gstack 仓库
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack

# 进入目录并运行 setup
cd ~/.claude/skills/gstack && ./setup
```

### 2. Windows 用户特别注意

Windows 没有 `setup` 脚本，需要手动完成：

```powershell
# 1. 确保安装 bun（包管理器）
# 访问 https://bun.sh/install 下载安装

# 2. 编译 browse 二进制
cd ~/.claude/skills/gstack
bun install
bun run build

# 3. 安装 Playwright Chromium
bunx playwright install chromium
```

### 3. 配置 CLAUDE.md

在你的项目 `CLAUDE.md` 中添加：

```markdown
## gstack
对所有网页浏览使用 gstack 中的 /browse。永远不要使用 mcp__claude-in-chrome__* 工具。
可用技能：/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse,
/qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro,
/investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard,
/unfreeze, /gstack-upgrade.
```

---

## 📋 核心工作流

gstack 按照**冲刺流程**组织技能：

```
思考 → 计划 → 构建 → 审查 → 测试 → 交付 → 反思
```

### 阶段 1：思考

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/office-hours` | YC 办公时间 — 重新框架你的产品 | 有新想法时，写代码之前 |
| `/plan-ceo-review` | CEO 视角 — 找到隐藏的 10 星级产品 | 质疑范围，寻找更大机会 |
| `/plan-eng-review` | 工程经理 — 锁定架构和测试计划 | 计划批准后，编码之前 |
| `/plan-design-review` | 高级设计师 — 设计维度评分 | 需要设计指导时 |

### 阶段 2：构建

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/design-consultation` | 设计合作伙伴 — 构建完整设计系统 | 需要从头设计时 |

### 阶段 3：审查

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/review` | 高级工程师 — 发现生产 bug | 编码完成后，提交 PR 前 |
| `/codex` | 第二意见 — OpenAI Codex 的独立审查 | 需要跨模型分析时 |
| `/investigate` | 调试器 — 系统性根本原因调试 | 遇到 bug 时 |

### 阶段 4：测试

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/qa` | QA 负责人 — 真实浏览器测试 | 有 staging URL 时 |
| `/qa-only` | QA 报告员 — 只报告 bug | 只需要测试报告时 |
| `/cso` | 首席安全官 — OWASP + STRIDE 审计 | 发布前安全检查 |

### 阶段 5：交付

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/ship` | 发布工程师 — 同步 main、跑测试、推 PR | 准备提交 PR 时 |
| `/land-and-deploy` | 合并 PR、等 CI、验证生产健康 | PR 批准后 |
| `/canary` | SRE — 部署后监控 | 部署到生产后 |
| `/benchmark` | 性能工程师 — 基线页面加载时间 | 关心性能时 |

### 阶段 6：反思

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/retro` | 团队感知每周回顾 | 每周回顾时 |
| `/document-release` | 技术作家 — 自动更新过时文档 | 交付新功能后 |

---

## 🛡️ 强大工具

| 命令 | 作用 | 何时使用 |
|------|------|---------|
| `/browse` | 真实 Chromium 浏览器，真实点击 | 需要测试网页时 |
| `/setup-browser-cookies` | 从 Chrome/Arc/Brave/Edge 导入 cookie | 需要登录测试时 |
| `/careful` | 安全护栏 — 破坏性命令前警告 | 执行危险操作前 |
| `/freeze` | 编辑锁定 — 限制文件编辑到一个目录 | 调试时防止改错地方 |
| `/guard` | 完全安全 — `/careful` + `/freeze` | 生产工作的最大安全性 |
| `/unfreeze` | 解锁 — 移除 `/freeze` 边界 | 完成调试后 |
| `/setup-deploy` | 部署配置器 — 检测平台和部署命令 | 首次部署配置 |
| `/gstack-upgrade` | 自我更新器 — 升级到最新版本 | 检查更新时 |

---

## 💡 典型使用场景

### 场景 1：从零开始构建新功能

```
1. /office-hours — 描述你的想法，让代理质疑和重新框架
2. /plan-ceo-review — 从 CEO 视角审视范围
3. /plan-eng-review — 锁定技术细节和测试计划
4. 开始编码
5. /review — 代码审查
6. /qa https://staging.yourapp.com — 测试
7. /ship — 提交 PR
```

### 场景 2：修复生产 bug

```
1. /investigate — 系统性调试，找到根本原因
2. 修复 bug
3. /review — 确保修复正确
4. /ship — 提交修复
```

### 场景 3：发布前安全检查

```
1. /cso — OWASP + STRIDE 安全审计
2. 修复发现的安全问题
3. /review — 验证修复
4. /land-and-deploy — 部署到生产
5. /canary — 监控生产健康
```

---

## ⚠️ 常见问题

### Q: 技能没有显示？
**A:** 运行 `cd ~/.claude/skills/gstack && ./setup`

### Q: `/browse` 失败？
**A:** 运行 `cd ~/.claude/skills/gstack && bun install && bun run build`

### Q: Windows 用户无法运行 setup？
**A:** 参考上方的 Windows 安装步骤，或联系小蛋蛋获取帮助

### Q: Claude 说看不到技能？
**A:** 确保项目的 `CLAUDE.md` 有 gstack 部分（见上方配置）

---

## 📚 相关文档

- [README](./README.md) — gstack 完整介绍
- [官方 GitHub](https://github.com/garrytan/gstack)
- [技能深入探讨](https://github.com/garrytan/gstack/blob/main/docs/skills.md)

---

_最后更新：2026-03-24_
