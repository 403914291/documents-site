# gstack

> "我大概从去年 12 月到现在都没怎么敲过代码了，这是一个巨大的变化。" — [Andrej Karpathy](https://fortune.com/2026/03/21/andrej-karpathy-openai-cofounder-ai-agents-coding-state-of-psychosis-openclaw/), No Priors 播客，2026 年 3 月

当我听到 Karpathy 这么说时，我想知道他是如何做到的。一个人如何能像一个二十人团队那样交付？Peter Steinberger 构建了 [OpenClaw](https://github.com/openclaw/openclaw) — GitHub 上 247K stars — 基本上是一个人用 AI 代理完成的。革命已经到来。一个拥有正确工具的独立构建者可以比传统团队移动得更快。

我是 [Garry Tan](https://x.com/garrytan)，[Y Combinator](https://www.ycombinator.com/) 的总裁兼 CEO。我与数千家初创公司合作过 — Coinbase、Instacart、Rippling — 当它们还只是一两个人在车库里的时候。在 YC 之前，我是 Palantir 最早的工程师/产品经理/设计师之一，共同创立了 Posterous（出售给 Twitter），并构建了 Bookface（YC 的内部社交网络）。

**gstack 就是我的答案。** 我构建产品已经二十年了，而现在我交付的代码比以往任何时候都多。在过去的 60 天里：**600,000+ 行生产代码**（35% 是测试），**每天 10,000-20,000 行**，兼职完成，同时全职运营 YC。这是我最近 3 个项目的 `/retro`：**一周内添加了 140,751 行代码，362 次提交，净增约 115k 行代码**。

**2026 年 — 1,237 次贡献并持续增长：**

![2026 年 GitHub 贡献 — 1,237 次贡献，1-3 月大幅加速](docs/images/github-2026.png)

**2013 年 — 我在 YC 构建 Bookface 时（772 次贡献）：**

![2013 年 GitHub 贡献 — 在 YC 构建 Bookface 时的 772 次贡献](docs/images/github-2013.png)

同一个人。不同的时代。区别在于工具。

**gstack 就是我的工作方式。** 它将 Claude Code 变成一个虚拟工程团队 — 一个重新思考产品的 CEO，一个锁定架构的工程经理，一个发现 AI 垃圾的设计师，一个发现生产 bug 的审查者，一个打开真实浏览器的 QA 负责人，一个运行 OWASP + STRIDE 审计的安全官，以及一个发布 PR 的发布工程师。二十个专家八个强大工具，全部是斜杠命令，全部是 Markdown，全部免费，MIT 许可证。

这是我的开源软件工厂。我每天都在使用它。我分享它是因为这些工具应该对每个人都可用。

Fork 它。改进它。让它成为你的。如果你想抨击免费的开源软件 — 欢迎你，但我宁愿你先试试。

**适用人群：**
- **创始人和 CEO** — 尤其是那些仍然想要交付的技术型创始人
- **首次使用 Claude Code 的用户** — 结构化的角色而不是空白提示
- **技术负责人和高级工程师** — 每个 PR 上严格的审查、QA 和发布自动化

## 快速开始

1. 安装 gstack（30 秒 — 见下文）
2. 运行 `/office-hours` — 描述你正在构建什么
3. 对任何功能想法运行 `/plan-ceo-review`
4. 对任何有更改的分支运行 `/review`
5. 对你的 staging URL 运行 `/qa`
6. 停在那里。你会知道这是否适合你。

## 安装 — 30 秒

**要求：** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Bun](https://bun.sh/) v1.0+, [Node.js](https://nodejs.org/) (仅 Windows)

### 步骤 1：在你的机器上安装

打开 Claude Code 并粘贴这个。Claude 会完成剩下的工作。

> 安装 gstack：运行 **`git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`** 然后在 CLAUDE.md 中添加一个"gstack"部分，说明对所有网页浏览使用 gstack 中的 /browse 技能，永远不要使用 mcp__claude-in-chrome__* 工具，并列出可用技能：/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade。然后询问用户是否也想将 gstack 添加到当前项目以便团队成员也能使用。

### 步骤 2：添加到你的仓库以便团队成员也能使用（可选）

> 将 gstack 添加到此项目：运行 **`cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup`** 然后在项目的 CLAUDE.md 中添加一个"gstack"部分，说明对所有网页浏览使用 gstack 中的 /browse 技能，永远不要使用 mcp__claude-in-chrome__* 工具，列出可用技能：/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade，并告诉 Claude 如果 gstack 技能不工作，运行 `cd .claude/skills/gstack && ./setup` 来构建二进制文件并注册技能。

真实文件会被提交到你的仓库（不是子模块），所以 `git clone` 可以直接工作。所有内容都生活在 `.claude/` 内部。没有任何东西会触碰你的 PATH 或在后台运行。

### Codex、Gemini CLI 或 Cursor

gstack 适用于任何支持 [SKILL.md 标准](https://github.com/anthropics/claude-code) 的代理。技能生活在 `.agents/skills/` 中并自动发现。

安装到一个仓库：

```bash
git clone https://github.com/garrytan/gstack.git .agents/skills/gstack
cd .agents/skills/gstack && ./setup --host codex
```

当 setup 从 `.agents/skills/gstack` 运行时，它会在同一仓库中相邻位置安装生成的 Codex 技能，而不会写入 `~/.codex/skills`。

为你的用户账户安装一次：

```bash
git clone https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host codex
```

`setup --host codex` 在 `~/.codex/skills/gstack` 创建运行时根目录，并在顶层链接生成的 Codex 技能。这避免了来自源仓库检出的重复技能发现。

或者让 setup 自动检测你安装了哪些代理：

```bash
git clone https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host auto
```

对于 Codex 兼容的主机，setup 现在支持来自 `.agents/skills/gstack` 的仓库本地安装和来自 `~/.codex/skills/gstack` 的用户全局安装。所有 28 个技能在所有支持的代理上都能工作。基于钩子的安全技能（careful, freeze, guard）在非 Claude 主机上使用内联安全建议散文。

## 看看它是如何工作的

```
你：    我想为我的日历构建一个每日简报应用。
你：    /office-hours
Claude: [询问痛点 — 具体例子，不是假设]

你：    多个 Google 日历，事件信息过时，位置错误。
        准备工作花很长时间而且结果不够好...

Claude: 我要对你的框架提出质疑。你说"每日简报
        应用"。但你实际描述的是一个个人首席
        官 AI。
        [提取你未意识到的 5 个能力]
        [质疑 4 个前提 — 你同意、不同意或调整]
        [生成 3 个带有工作量估算的实现方法]
        建议：明天交付最窄的楔形，从真实使用中学习。
        完整愿景是一个 3 个月的项目 — 从真正有效的
        每日简报开始。
        [编写设计文档 → 自动馈送到下游技能]

你：    /plan-ceo-review
        [阅读设计文档，质疑范围，运行 10 节审查]

你：    /plan-eng-review
        [数据流、状态机、错误路径的 ASCII 图]
        [测试矩阵、故障模式、安全问题]

你：    批准计划。退出计划模式。
        [在 11 个文件中编写 2,400 行代码。约 8 分钟。]

你：    /review
        [自动修复] 2 个问题。[询问] 竞态条件 → 你批准修复。

你：    /qa https://staging.myapp.com
        [打开真实浏览器，点击流程，发现并修复 bug]

你：    /ship
        测试：42 → 51 (+9 个新测试)。PR: github.com/you/app/pull/42
```

你说"每日简报应用"。代理说"你正在构建一个首席官 AI" — 因为它倾听你的痛苦，而不是你的功能请求。八个命令，端到端。这不是副驾驶。这是一个团队。

## 冲刺流程

gstack 是一个流程，不是工具的集合。技能按照冲刺运行的顺序运行：

**思考 → 计划 → 构建 → 审查 → 测试 → 交付 → 反思**

每个技能都馈送到下一个。`/office-hours` 编写的设计文档被 `/plan-ceo-review` 阅读。`/plan-eng-review` 编写的测试计划被 `/qa` 接收。`/review` 捕获的 bug 被 `/ship` 验证已修复。没有任何东西会从裂缝中掉落，因为每个步骤都知道之前发生了什么。

| 技能 | 你的专家 | 他们做什么 |
|------|---------|-----------|
| `/office-hours` | **YC Office Hours** | 从这里开始。六个强制性问题在写代码之前重新框架你的产品。对你的框架提出质疑，挑战前提，生成实现替代方案。设计文档馈送到每个下游技能。 |
| `/plan-ceo-review` | **CEO / 创始人** | 重新思考问题。找到请求中隐藏的 10 星级产品。四种模式：扩展、选择性扩展、保持范围、缩减。 |
| `/plan-eng-review` | **工程经理** | 锁定架构、数据流、图表、边缘情况和测试。将隐藏的假设暴露出来。 |
| `/plan-design-review` | **高级设计师** | 对每个设计维度评分 0-10，解释 10 分是什么样的，然后编辑计划以达到目标。AI 垃圾检测。交互式 — 每个设计选择一个 AskUserQuestion。 |
| `/design-consultation` | **设计合作伙伴** | 从头开始构建完整的设计系统。研究景观，提出创意风险，生成真实的产品模型。 |
| `/review` | **高级工程师** | 发现那些通过 CI 但在生产中爆炸的 bug。自动修复明显的问题。标记完整性差距。 |
| `/investigate` | **调试器** | 系统性根本原因调试。铁律：没有调查就没有修复。追踪数据流，测试假设，3 次失败修复后停止。 |
| `/design-review` | **会编码的设计师** | 与 /plan-design-review 相同的审计，然后修复发现的问题。原子提交，前后截图。 |
| `/qa` | **QA 负责人** | 测试你的应用，发现 bug，用原子提交修复它们，重新验证。为每个修复自动生成回归测试。 |
| `/qa-only` | **QA 报告员** | 与 /qa 相同的方法但只报告。纯 bug 报告没有代码更改。 |
| `/cso` | **首席安全官** | OWASP Top 10 + STRIDE 威胁模型。零噪音：17 个误报排除，8/10+ 置信度门，独立发现验证。每个发现包括具体的利用场景。 |
| `/ship` | **发布工程师** | 同步 main，运行测试，审计覆盖率，推送，打开 PR。如果你没有测试框架则引导测试框架。 |
| `/land-and-deploy` | **发布工程师** | 合并 PR，等待 CI 和部署，验证生产健康。一个命令从"已批准"到"生产中验证"。 |
| `/canary` | **SRE** | 部署后监控循环。监视控制台错误、性能回归和页面故障。 |
| `/benchmark` | **性能工程师** | 基线页面加载时间、核心 Web 指标和资源大小。在每个 PR 上比较前后。 |
| `/document-release` | **技术作家** | 更新所有项目文档以匹配你刚刚交付的内容。自动捕获过时的 README。 |
| `/retro` | **工程经理** | 团队感知每周回顾。每人细分，交付条纹，测试健康趋势，增长机会。`/retro global` 跨所有项目和 AI 工具（Claude Code、Codex、Gemini）运行。 |
| `/browse` | **QA 工程师** | 真实 Chromium 浏览器，真实点击，真实截图。每个命令约 100ms。 |
| `/setup-browser-cookies` | **会话管理器** | 从你的真实浏览器（Chrome、Arc、Brave、Edge）导入 cookie 到无头会话。测试认证页面。 |
| `/autoplan` | **审查管道** | 一个命令，完全审查的计划。自动运行 CEO → 设计 → 工程审查，带有编码决策原则。仅表面品味决策供你批准。 |

### 强大工具

| 技能 | 它做什么 |
|------|---------|
| `/codex` | **第二意见** — 来自 OpenAI Codex CLI 的独立代码审查。三种模式：审查（通过/失败门）、对抗性挑战和开放咨询。当 `/review` 和 `/codex` 都运行时进行跨模型分析。 |
| `/careful` | **安全护栏** — 在破坏性命令前警告（rm -rf、DROP TABLE、force-push）。说"be careful"激活。可以覆盖任何警告。 |
| `/freeze` | **编辑锁定** — 将文件编辑限制在一个目录。防止调试时意外更改范围外的内容。 |
| `/guard` | **完全安全** — `/careful` + `/freeze` 在一个命令中。生产工作的最大安全性。 |
| `/unfreeze` | **解锁** — 移除 `/freeze` 边界。 |
| `/setup-deploy` | **部署配置器** — `/land-and-deploy` 的一次性设置。检测你的平台、生产 URL 和部署命令。 |
| `/gstack-upgrade` | **自我更新器** — 升级 gstack 到最新版本。检测全局或供应商安装，同步两者，显示变化内容。 |

**[每个技能的深入探讨示例和理念 →](docs/skills.md)**

## 并行冲刺

gstack 在一个冲刺时工作良好。在十个同时运行时变得有趣。

[Conductor](https://conductor.build) 并行运行多个 Claude Code 会话 — 每个都在自己隔离的工作空间中。一个会话在 `/office-hours`，另一个在 `/review`，第三个在实现功能，第四个在运行 `/qa`。全部同时进行。冲刺结构是并行工作的原因 — 没有流程，十个代理是十个混乱源。有了流程，每个代理确切知道做什么以及何时停止。

---

免费，MIT 许可证，开源。没有高级层，没有等待名单。

我开源了我构建软件的方式。你可以 fork 它并让它成为你的。

> **我们在招聘。** 想要每天交付 10K+ 行代码并帮助强化 gstack？
> 来 YC 工作 — [ycombinator.com/software](https://ycombinator.com/software)
> 极具竞争力的薪资和股权。旧金山，Dogpatch 区。

## 文档

| 文档 | 涵盖内容 |
|------|---------|
| [技能深入探讨](docs/skills.md) | 每个技能的理念、示例和工作流程（包括 Greptile 集成） |
| [构建者理念](ETHOS.md) | 构建者理念：Boil the Lake、构建前搜索、三层知识 |
| [架构](ARCHITECTURE.md) | 设计决策和系统内部 |
| [浏览器参考](BROWSER.md) | `/browse` 的完整命令参考 |
| [贡献](CONTRIBUTING.md) | 开发设置、测试、贡献者模式和开发模式 |
| [变更日志](CHANGELOG.md) | 每个版本的新内容 |

## 隐私和遥测

gstack 包括**选择加入**的使用遥测以帮助改进项目。确切发生的事情如下：

- **默认关闭。** 除非你明确说是，否则不会发送任何内容到任何地方。
- **首次运行时，** gstack 询问你是否想分享匿名使用数据。你可以说不。
- **发送的内容（如果你选择加入）：** 技能名称、持续时间、成功/失败、gstack 版本、操作系统。仅此而已。
- **永远不会发送的内容：** 代码、文件路径、仓库名称、分支名称、提示或任何用户生成的内容。
- **随时更改：** `gstack-config set telemetry off` 立即禁用所有内容。

数据存储在 [Supabase](https://supabase.com)（开源 Firebase 替代方案）。模式在 [`supabase/migrations/001_telemetry.sql`](supabase/migrations/001_telemetry.sql) — 你可以确切验证收集了什么。仓库中的 Supabase 可发布密钥是公钥（类似于 Firebase API 密钥）— 行级安全策略将其限制为仅插入访问。

**本地分析始终可用。** 运行 `gstack-analytics` 从本地 JSONL 文件查看你的个人使用仪表板 — 不需要远程数据。

## 故障排除

**技能没有显示？** `cd ~/.claude/skills/gstack && ./setup`

**`/browse` 失败？** `cd ~/.claude/skills/gstack && bun install && bun run build`

**过时的安装？** 运行 `/gstack-upgrade` — 或在 `~/.gstack/config.yaml` 中设置 `auto_upgrade: true`

**Codex 说"由于无效的 SKILL.md 跳过加载技能"？** 你的 Codex 技能描述过时了。修复：`cd ~/.codex/skills/gstack && git pull && ./setup --host codex` — 或者对于仓库本地安装：`cd "$(readlink -f .agents/skills/gstack)" && git pull && ./setup --host codex`

**Windows 用户：** gstack 通过 Git Bash 或 WSL 在 Windows 11 上工作。除了 Bun 之外还需要 Node.js — Bun 在 Windows 上有一个已知的 Playwright 管道传输 bug ([bun#4253](https://github.com/oven-sh/bun/issues/4253))。浏览服务器自动回退到 Node.js。确保 `bun` 和 `node` 都在你的 PATH 上。

**Claude 说它看不到技能？** 确保项目的 `CLAUDE.md` 有一个 gstack 部分。添加这个：

```
## gstack
对所有网页浏览使用 gstack 中的 /browse。永远不要使用 mcp__claude-in-chrome__* 工具。
可用技能：/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse,
/qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro,
/investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard,
/unfreeze, /gstack-upgrade.
```

## 许可证

MIT。永远免费。去构建一些东西。
