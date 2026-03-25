# gstack 使用与开发指导

> gstack 是一个强大的开发工作流工具，提供从需求分析到交付部署的全流程支持。本文档基于官方资料编写，帮助你快速掌握 gstack 的核心技能。

## 目录

- [gstack 简介](#gstack-简介)
- [安装指南](#安装指南)
- [配置说明](#配置说明)
- [核心工作流](#核心工作流)
- [技能速查表](#技能速查表)
- [实战案例：日历聚合应用](#实战案例日历聚合应用)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

---

## gstack 简介

### 什么是 gstack？

gstack 是一套专为 Claude Code 设计的技能系统，提供**20+ 个专业开发角色**，覆盖软件开发的完整生命周期。它通过结构化的工作流，帮助开发者：

- 🎯 **减少决策疲劳** - 每个阶段都有明确的操作指南
- 🚀 **提升交付速度** - 自动化的审查和测试流程
- 📋 **保证代码质量** - 多层审查机制和自动化测试
- 🔄 **持续改进** - 反思和回顾机制

### 核心设计理念

1. **角色分离** - 不同阶段由不同"专家角色"负责
2. **强制思考** - 每个阶段都有检查点和决策门
3. **自动化审查** - 代码审查、设计审查、CEO 视角审查
4. **证据驱动** - 基于截图、日志、测试结果的决策

---

## 安装指南

### Windows 安装步骤

#### 步骤 1：确认环境要求

```bash
# 检查 Node.js 版本（需要 v18+）
node --version

# 检查 npm
npm --version
```

#### 步骤 2：全局安装 gstack

```bash
npm install -g gstack
```

#### 步骤 3：验证安装

```bash
gstack --version
```

#### 步骤 4：在项目中初始化

```bash
# 进入项目目录
cd your-project

# 初始化 gstack 配置
gstack init
```

#### 步骤 5：配置浏览器（可选但推荐）

```bash
# 导入浏览器 Cookie 用于 QA 测试
gstack setup-browser-cookies
```

### 故障排除

| 问题 | 解决方案 |
|------|----------|
| `gstack: command not found` | 检查 npm global bin 路径是否在 PATH 中 |
| 权限错误 | 使用管理员权限运行终端 |
| 版本冲突 | `npm uninstall -g gstack && npm install -g gstack@latest` |

---

## 配置说明

### CLAUDE.md 配置

gstack 的配置主要存储在 `.claude/settings.json` 和项目的 `CLAUDE.md` 中。

#### 基础配置示例

```markdown
# gstack 配置

## 部署配置
- 平台：Vercel
- 生产 URL：https://your-app.vercel.app
- 健康检查：/health

## QA 测试配置
- 测试账户：test@example.com
- 测试环境：staging

## 代码审查配置
- 基础分支：main
- 审查模式：strict
```

### 使用 setup-deploy 配置部署

```bash
# 交互式配置部署
gstack setup-deploy
```

这会引导你配置：
- 部署平台（Vercel/Netlify/Fly.io/Render/Heroku）
- 生产环境 URL
- 健康检查端点
- 部署状态检查命令

### 配置浏览器 Cookie

```bash
# 导入 Cookie 用于认证测试
gstack setup-browser-cookies
```

支持的浏览器：
- Chrome
- Arc
- Brave
- Edge

---

## 核心工作流

gstack 定义了 7 个核心阶段，每个阶段都有对应的技能：

```
┌─────────────┐
│  思考阶段   │ → /office-hours（创意验证）
│  Think      │   /plan-ceo-review（战略审查）
└──────┬──────┘
       ↓
┌─────────────┐
│  计划阶段   │ → /autoplan（自动审查）
│  Plan       │   /plan-eng-review（工程审查）
│             │   /plan-design-review（设计审查）
└──────┬──────┘
       ↓
┌─────────────┐
│  构建阶段   │ → /freeze（限制编辑范围）
│  Build      │   /guard（完全安全模式）
└──────┬──────┘
       ↓
┌─────────────┐
│  审查阶段   │ → /review（代码审查）
│  Review     │   /code-review-skill（深度审查）
└──────┬──────┘
       ↓
┌─────────────┐
│  测试阶段   │ → /qa（测试并修复）
│  Test       │   /qa-only（仅测试报告）
│             │   /benchmark（性能测试）
└──────┬──────┘
       ↓
┌─────────────┐
│  交付阶段   │ → /ship（创建 PR）
│  Ship       │   /land-and-deploy（合并部署）
│             │   /canary（部署监控）
└──────┬──────┘
       ↓
┌─────────────┐
│  反思阶段   │ → /retro（周回顾）
│  Retro      │
└─────────────┘
```

### 各阶段详细说明

#### 1. 思考阶段（Think）

**目标**：验证需求，明确方向

```bash
# 创意 brainstorming
/office-hours

# 战略视角审查
/plan-ceo-review
```

**适用场景**：
- 有新功能想法
- 不确定是否值得做
- 需要验证市场需求

#### 2. 计划阶段（Plan）

**目标**：制定可执行的计划

```bash
# 自动审查所有维度
/autoplan

# 工程架构审查
/plan-eng-review

# 设计系统审查
/plan-design-review
```

**适用场景**：
- 计划已起草，需要审查
- 准备开始编码前
- 需要多方确认方案

#### 3. 构建阶段（Build）

**目标**：安全地实现功能

```bash
# 限制编辑范围
/freeze examples/

# 完全安全模式
/guard
```

**适用场景**：
- 防止误改无关代码
- 调试时隔离问题
- 生产环境操作

#### 4. 审查阶段（Review）

**目标**：确保代码质量

```bash
# 标准代码审查
/review

# 深度代码审查
/code-review-skill

# 第二意见（Codex）
/codex
```

**适用场景**：
- PR 创建前
- 合并到主分支前
- 需要外部意见

#### 5. 测试阶段（Test）

**目标**：发现并修复问题

```bash
# 完整测试并修复
/qa

# 仅生成测试报告
/qa-only

# 性能基准测试
/benchmark
```

**适用场景**：
- 功能开发完成后
- 上线前验证
- 性能回归检测

#### 6. 交付阶段（Ship）

**目标**：安全部署到生产

```bash
# 创建 PR
/ship

# 合并并部署
/land-and-deploy

# 部署后监控
/canary
```

**适用场景**：
- 准备发布功能
- 合并到主分支
- 监控生产健康度

#### 7. 反思阶段（Retro）

**目标**：持续改进

```bash
# 周回顾
/retro
```

**适用场景**：
- 周末回顾
- 项目结束后
- 团队复盘

---

## 技能速查表

### 需求与创意

| 技能 | 用途 | 命令 |
|------|------|------|
| Office Hours | 创意验证与 brainstorming | `/office-hours` |
| CEO Review | 战略视角审查 | `/plan-ceo-review` |

### 计划与审查

| 技能 | 用途 | 命令 |
|------|------|------|
| Autoplan | 自动审查所有维度 | `/autoplan` |
| 工程审查 | 架构与技术审查 | `/plan-eng-review` |
| 设计审查 | UI/UX 设计审查 | `/plan-design-review` |

### 构建与安全

| 技能 | 用途 | 命令 |
|------|------|------|
| Freeze | 限制编辑范围 | `/freeze <目录>` |
| Guard | 完全安全模式 | `/guard` |
| Careful | 小心模式（警告 destructive） | `/careful` |
| Unfreeze | 解除编辑限制 | `/unfreeze` |

### 代码审查

| 技能 | 用途 | 命令 |
|------|------|------|
| Review | 标准 PR 审查 | `/review` |
| Code Review | 深度代码审查 | `/code-review-skill` |
| Codex | Codex 第二意见 | `/codex` |

### 测试与 QA

| 技能 | 用途 | 命令 |
|------|------|------|
| QA | 测试并修复 | `/qa` |
| QA Only | 仅测试报告 | `/qa-only` |
| Benchmark | 性能基准测试 | `/benchmark` |
| GStack | 浏览器测试 | `/gstack` |

### 部署与交付

| 技能 | 用途 | 命令 |
|------|------|------|
| Ship | 创建 PR | `/ship` |
| Land & Deploy | 合并并部署 | `/land-and-deploy` |
| Canary | 部署后监控 | `/canary` |
| Setup Deploy | 配置部署 | `/setup-deploy` |

### 其他工具

| 技能 | 用途 | 命令 |
|------|------|------|
| Retro | 周回顾 | `/retro` |
| Document Release | 更新文档 | `/document-release` |
| Design Consultation | 设计系统咨询 | `/design-consultation` |
| Design Review | 设计审查 | `/design-review` |
| Browse | 浏览器操作 | `/browse` |
| Setup Browser | 导入浏览器 Cookie | `/setup-browser-cookies` |
| Investigate | 调试与根因分析 | `/investigate` |

---

## 实战案例：日历聚合应用

> 本案例演示如何使用 gstack 从零开始构建一个日历聚合应用。

### 项目背景

构建一个 Web 应用，聚合多个日历源（Google Calendar、Outlook、iCal），提供统一的日历视图。

### 第一阶段：创意验证

```bash
# 1. 使用 Office Hours 验证需求
/office-hours
```

**输出示例**：
```
📋 需求验证结果：

✅ 问题明确：用户需要在多个日历间切换，体验差
✅ 现有方案：Fantastical、Notion Calendar（付费或功能复杂）
✅ 目标用户：自由职业者、远程工作者
✅ MVP 定义：仅支持 Google + Outlook，基础周视图
✅ 成功指标：日活用户 > 100，留存率 > 40%
```

### 第二阶段：计划制定

```bash
# 2. 自动审查计划
/autoplan
```

**计划输出**：
```
📐 架构决策：

技术栈：
- Frontend: React 19 + Vite + TypeScript
- Backend: Rust (Actix-web)
- 数据库：SQLite（本地优先）
- 认证：OAuth 2.0

目录结构：
calendar-aggregator/
├── src/
│   ├── components/     # React 组件
│   ├── hooks/          # 自定义 hooks
│   ├── services/       # API 服务
│   └── stores/         # 状态管理
├── backend/
│   ├── src/
│   │   ├── handlers/   # HTTP handlers
│   │   ├── models/     # 数据模型
│   │   └── calendar/   # 日历集成
│   └── Cargo.toml
└── package.json
```

### 第三阶段：工程设计审查

```bash
# 3. 工程架构审查
/plan-eng-review
```

**审查反馈**：
```
✅ 架构清晰，前后端分离合理
⚠️ 注意：OAuth token 存储需要加密
⚠️ 建议：添加 rate limiting 防止 API 限流
✅ 数据流：OAuth → Token Store → Calendar API → Normalized Events
```

### 第四阶段：设计审查

```bash
# 4. 设计系统审查
/plan-design-review
```

**设计反馈**：
```
🎨 设计系统建议：

颜色方案：
- Primary: #3B82F6 (蓝色)
- Background: #F8FAFC
- Surface: #FFFFFF
- Text: #1E293B

组件库：shadcn/ui
字体：Inter + JetBrains Mono
```

### 第五阶段：构建实现

```bash
# 5. 限制编辑范围，防止误改
/freeze src/

# 开始编码（Claude 自动实现）
# ... 实现代码 ...

# 完成后解除限制
/unfreeze
```

**核心代码示例**：

```typescript
// src/services/calendar.ts
import { google } from 'googleapis';
import { MicrosoftGraph } from '@microsoft/microsoft-graph-types';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  source: 'google' | 'outlook' | 'ical';
  description?: string;
  location?: string;
}

export class CalendarService {
  private googleClient: google.calendar_v3.Calendar;

  async fetchGoogleEvents(accessToken: string): Promise<CalendarEvent[]> {
    // 实现 Google Calendar API 调用
  }

  async fetchOutlookEvents(accessToken: string): Promise<CalendarEvent[]> {
    // 实现 Outlook API 调用
  }

  normalizeEvents(events: any[], source: string): CalendarEvent[] {
    // 统一事件格式
  }
}
```

### 第六阶段：代码审查

```bash
# 6. 创建 PR 前审查
/review

# 深度审查
/code-review-skill
```

**审查结果**：
```
✅ 代码质量：A
⚠️ 发现 2 个问题：
  1. src/services/calendar.ts:45 - 缺少错误处理
  2. src/components/Calendar.tsx:112 - 可能的内存泄漏（未清理订阅）

建议修复后合并。
```

### 第七阶段：测试验证

```bash
# 7. QA 测试
/qa

# 性能测试
/benchmark
```

**测试结果**：
```
📊 QA 健康分数：92/100

✅ Critical: 0
✅ High: 0
⚠️ Medium: 2 (已自动修复)
✅ Low: 3 ( cosmetic)

性能指标：
- FCP: 1.2s ✅
- LCP: 2.1s ✅
- CLS: 0.05 ✅
```

### 第八阶段：交付部署

```bash
# 8. 创建 PR
/ship

# 合并并部署
/land-and-deploy

# 部署后监控
/canary
```

**部署结果**：
```
✅ PR 创建：https://github.com/you/calendar-aggregator/pull/1
✅ CI 通过
✅ 部署到 production: https://calendar-aggregator.vercel.app
✅ 健康检查通过
```

### 第九阶段：周回顾

```bash
# 9. 周末回顾
/retro
```

**回顾结果**：
```
📈 本周总结：

完成：
✅ 日历聚合 MVP
✅ Google + Outlook 集成
✅ 基础 UI 组件

下周计划：
- 添加 iCal 支持
- 实现事件拖拽
- 添加通知功能

改进点：
- 更早进行性能测试
- 增加单元测试覆盖率
```

---

## 常见问题

### Q1: gstack 和普通 CLI 工具有什么区别？

**A**: gstack 不只是一个 CLI，它是一套**角色系统**。每个技能都代表一个专业角色（CEO、工程师、设计师、QA 等），提供不同视角的建议。

### Q2: 如何跳过某些审查步骤？

**A**: 可以使用 `--skip` 参数，但不推荐：

```bash
/autoplan --skip design
```

### Q3: QA 测试失败怎么办？

**A**: gstack 会尝试自动修复。如果无法自动修复，会生成详细报告：

```bash
# 查看详细报告
/qa-only --report
```

### Q4: 如何自定义审查标准？

**A**: 在 `CLAUDE.md` 中添加自定义规则：

```markdown
# 代码审查规则
- 必须包含单元测试
- 禁止 console.log
- 组件必须有 PropTypes/TypeScript 类型
```

### Q5: gstack 支持哪些部署平台？

**A**: 支持主流平台：
- Vercel ✅
- Netlify ✅
- Fly.io ✅
- Render ✅
- Heroku ✅
- GitHub Actions ✅
- 自定义部署 ✅

---

## 最佳实践

### 1. 始终从 Office Hours 开始

任何新功能想法，先用 `/office-hours` 验证：

```bash
/office-hours
```

### 2. 计划阶段不要跳过审查

```bash
# 好：完整审查
/autoplan

# 不好：跳过审查直接编码
# ❌ 直接开始写代码
```

### 3. 使用 Freeze 限制编辑范围

```bash
# 只允许修改 src/components 目录
/freeze src/components/
```

### 4. 审查要使用多个技能

```bash
# 标准审查 + 深度审查 + Codex 意见
/review
/code-review-skill
/codex review
```

### 5. 测试要包含性能基准

```bash
# 功能测试 + 性能测试
/qa
/benchmark
```

### 6. 部署后持续监控

```bash
# 部署后监控 24 小时
/canary --duration 24h
```

### 7. 每周进行回顾

```bash
# 每周五进行回顾
/retro
```

### 8. 保持配置更新

```bash
# 定期更新 gstack
gstack-upgrade

# 同步部署配置
/setup-deploy
```

---

## 附录

### 完整命令速查

```bash
# 创意与战略
/office-hours          # 创意验证
/plan-ceo-review       # 战略审查

# 计划与审查
/autoplan              # 自动审查
/plan-eng-review       # 工程审查
/plan-design-review    # 设计审查

# 构建
/freeze <dir>          # 限制编辑
/unfreeze              # 解除限制
/guard                 # 完全安全模式

# 审查
/review                # PR 审查
/code-review-skill     # 深度审查
/codex                 # Codex 意见

# 测试
/qa                    # 测试并修复
/qa-only               # 仅测试报告
/benchmark             # 性能测试
/gstack                # 浏览器测试

# 交付
/ship                  # 创建 PR
/land-and-deploy       # 合并部署
/canary                # 部署监控

# 其他
/retro                 # 周回顾
/document-release      # 更新文档
/setup-deploy          # 配置部署
/setup-browser-cookies # 导入 Cookie
```

### 参考链接

- [gstack 官方文档](https://github.com/gstack)
- [Claude Code 文档](https://claude.ai/code)
- [技能列表](https://gstack.dev/skills)

---

*本文档最后更新：2026-03-25*
