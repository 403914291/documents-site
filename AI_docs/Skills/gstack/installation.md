# gstack Windows 安装指南

> 针对 Windows 用户的详细安装步骤

---

## 📋 前置要求

| 工具 | 版本 | 用途 |
|------|------|------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | 最新版 | AI 代理运行环境 |
| [Git](https://git-scm.com/) | 最新版 | 克隆 gstack 仓库 |
| [Bun](https://bun.sh/) | v1.0+ | JavaScript 运行时（必需） |
| [Node.js](https://nodejs.org/) | v18+ | Windows 上 Playwright 需要 |

---

## 🔧 安装步骤

### 步骤 1：安装 Bun

Bun 是 gstack 的必需依赖。

**方法 A：使用 PowerShell 一键安装**

```powershell
powershell -c "iwr https://bun.sh/install.ps1 -useb | iex"
```

**方法 B：手动下载**

1. 访问 https://bun.sh/install
2. 下载 Windows 安装包
3. 运行安装程序

**验证安装：**

```powershell
bun --version
# 应该输出版本号，如：1.3.11
```

---

### 步骤 2：克隆 gstack 仓库

```powershell
git clone https://github.com/garrytan/gstack.git $env:USERPROFILE\.claude\skills\gstack
```

---

### 步骤 3：编译 browse 二进制

```powershell
cd $env:USERPROFILE\.claude\skills\gstack
bun install
bun run build
```

**预计时间：** 2-5 分钟（首次安装需要下载依赖）

**成功标志：** 生成 `browse/dist/browse.exe`

---

### 步骤 4：安装 Playwright Chromium

```powershell
bunx playwright install chromium
```

**预计时间：** 5-10 分钟（下载 Chromium 浏览器）

**注意：** Windows 上 Playwright 使用 Node.js 而不是 Bun 来启动 Chromium（这是 Bun 的已知问题）。

---

### 步骤 5：创建技能符号链接

⚠️ **需要管理员权限**

Windows 创建符号链接需要管理员权限。有两种方法：

**方法 A：使用管理员 PowerShell（推荐）**

1. 右键 PowerShell → 以管理员身份运行
2. 执行以下命令：

```powershell
$gstack = "$env:USERPROFILE\.claude\skills\gstack"
$skills = "$env:USERPROFILE\.claude\skills"

Get-ChildItem $gstack -Directory | Where-Object {
    Test-Path "$($_.FullName)\SKILL.md"
} | ForEach-Object {
    New-Item -ItemType SymbolicLink -Path "$skills\$($_.Name)" -Target $_.FullName -Force
    Write-Host "Linked: $($_.Name)"
}
```

**方法 B：复制而非链接（无需管理员）**

如果无法获取管理员权限，可以直接复制：

```powershell
$gstack = "$env:USERPROFILE\.claude\skills\gstack"
$skills = "$env:USERPROFILE\.claude\skills"

Get-ChildItem $gstack -Directory | Where-Object {
    Test-Path "$($_.FullName)\SKILL.md"
} | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination "$skills\$($_.Name)" -Recurse -Force
    Write-Host "Copied: $($_.Name)"
}
```

---

### 步骤 6：配置 CLAUDE.md

在你的项目根目录创建或编辑 `CLAUDE.md`，添加：

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

## ✅ 验证安装

在 Claude Code 中运行：

```
/office-hours
```

如果看到 gstack 的响应，说明安装成功！

---

## ❌ 故障排除

### 问题 1：技能没有显示

**解决：**
```powershell
cd $env:USERPROFILE\.claude\skills\gstack
bun install
bun run build
```

### 问题 2：`/browse` 失败

**解决：**
```powershell
cd $env:USERPROFILE\.claude\skills\gstack
bun install --frozen-lockfile
bun run build
bunx playwright install chromium
```

### 问题 3：提示找不到 bun

**解决：** 重启终端或添加 bun 到 PATH：
```powershell
$env:Path = "$env:USERPROFILE\.bun\bin;$env:Path"
```

### 问题 4：符号链接创建失败

**解决：** 使用方法 B（复制而非链接），或获取管理员权限。

---

## 🔄 更新 gstack

```powershell
cd $env:USERPROFILE\.claude\skills\gstack
git pull
bun install
bun run build
bunx playwright install chromium
```

或者在 Claude Code 中运行：
```
/gstack-upgrade
```

---

## 📞 需要帮助？

如果遇到问题，联系小蛋蛋获取支持。

---

_最后更新：2026-03-24_
