# 微信公众号发布技能 - 用户使用手册

**版本：** V1.0  
**更新日期：** 2026-03-27  
**适用平台：** Windows / macOS / Linux

---

## 📖 目录

1. [快速开始](#1-快速开始)
2. [安装 OpenClaw](#2-安装-openclaw)
3. [安装发布技能](#3-安装发布技能)
4. [配置公众号信息](#4-配置公众号信息) ⭐
5. [设置发布时间](#5-设置发布时间)
6. [购买专业版](#6-购买专业版) ⭐
7. [运行发布](#7-运行发布)
8. [常见问题](#8-常见问题)

---

## 1. 快速开始

### 1.1 完整安装流程（5 分钟）

```bash
# 第 1 步：安装 OpenClaw
npm install -g openclaw

# 第 2 步：安装微信公众号发布技能
openclaw skill install wechat-publisher

# 第 3 步：配置公众号信息
openclaw skill config wechat-publisher

# 第 4 步：设置发布时间（可选）
openclaw schedule wechat-publisher 07:00

# 第 5 步：完成！
# 每天早上 7 点自动发布 15 条 AI 新闻到公众号草稿箱
```

### 1.2 系统要求

| 项目 | 要求 |
|------|------|
| **操作系统** | Windows 10+ / macOS 10.15+ / Linux |
| **Node.js** | 16.0+ |
| **Python** | 3.8+（技能自动安装） |
| **网络** | 可访问微信 API |
| **公众号** | 已认证的微信公众号 |

---

## 2. 安装 OpenClaw

### 2.1 Windows 系统

```bash
# 1. 以管理员身份打开 PowerShell
# 2. 安装 OpenClaw
npm install -g openclaw

# 3. 验证安装
openclaw --version

# 输出示例：
# OpenClaw 2026.3.8
```

### 2.2 macOS 系统

```bash
# 1. 打开终端
# 2. 安装 OpenClaw
npm install -g openclaw

# 3. 验证安装
openclaw --version
```

### 2.3 Linux 系统

```bash
# 1. 打开终端
# 2. 安装 Node.js（如未安装）
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 安装 OpenClaw
sudo npm install -g openclaw

# 4. 验证安装
openclaw --version
```

### 2.4 验证安装成功

```bash
# 查看 OpenClaw 状态
openclaw status

# 输出示例：
# ✅ OpenClaw 运行正常
# 版本：2026.3.8
# 工作目录：~/.openclaw/workspace
```

---

## 3. 安装发布技能

### 3.1 在线安装（推荐）

```bash
# 安装微信公众号发布技能
openclaw skill install wechat-publisher

# 输出示例：
# ✅ 技能安装成功
# 技能名称：wechat-publisher
# 版本：V1.0
# 位置：~/.agents/skills/wechat-publisher
```

### 3.2 离线安装

```bash
# 1. 下载技能包
# 从 https://clawhub.com 下载 wechat-publisher.zip

# 2. 解压到技能目录
unzip wechat-publisher.zip -d ~/.agents/skills/

# 3. 验证安装
openclaw skill list

# 输出应包含：wechat-publisher
```

### 3.3 查看已安装技能

```bash
# 列出所有技能
openclaw skill list

# 查看技能详情
openclaw skill info wechat-publisher

# 输出示例：
# 技能名称：wechat-publisher
# 版本：V1.0
# 状态：已安装
# 授权状态：试用版（剩余 2 次）
```

---

## 4. 配置公众号信息 ⭐

### 4.1 获取公众号配置信息

**步骤 1：登录微信公众号后台**
```
1. 访问 https://mp.weixin.qq.com
2. 扫码登录你的公众号
```

**步骤 2：找到 AppID**
```
1. 点击左侧菜单：开发 → 基本配置
2. 找到"公众号开发信息"
3. 复制 AppID（示例：wxebff9eadface1489）
```

**步骤 3：获取 AppSecret**
```
1. 在"基本配置"页面
2. 点击"生成"或"重置"AppSecret
3. 管理员扫码验证
4. 复制 AppSecret（示例：44c10204ceb1bfb3f7ac096754976454）
5. ⚠️ 重要：AppSecret 只显示一次，请妥善保存！
```

---

### 4.2 配置方式一：OpenClaw 对话配置（最简单）⭐

**通过对话直接配置，无需记忆命令：**

```
你：配置微信公众号

小蛋蛋：好的，我来帮你配置微信公众号发布技能。

请提供以下信息：
1. 公众号 AppID
2. 公众号 AppSecret（输入时会自动隐藏）

你可以直接发送给我，我会帮你保存。
```

**对话示例：**

```
你：AppID 是 wxebff9eadface1489

小蛋蛋：✅ AppID 已记录

接下来请提供 AppSecret（为安全起见，建议私聊发送）
```

```
你：AppSecret 是 44c10204ceb1bfb3f7ac096754976454

小蛋蛋：✅ 公众号信息已保存！

当前配置：
- 公众号 AppID: wxebff9e******1489
- 发布时间：06:00（每天早上 6 点）
- 发布模板：V5 简洁版
- 新闻条数：15 条

现在可以开始使用了！
运行命令：openclaw skill run wechat-publisher
```

**修改配置也可以通过对话：**

```
你：修改公众号 AppSecret

小蛋蛋：好的，请提供新的 AppSecret

你：新的 AppSecret 是 xxxxxxxxxxxxxx

小蛋蛋：✅ AppSecret 已更新！
```

---

### 4.3 配置方式二：交互式配置向导

```bash
# 运行配置命令
openclaw skill config wechat-publisher

# 进入交互式配置界面：
╔════════════════════════════════════════════════════╗
║       微信公众号发布技能 - 配置向导                 ║
╠════════════════════════════════════════════════════╣
║  请选择要配置的项目：                               ║
║                                                    ║
║  1. 公众号信息（AppID/AppSecret）                  ║
║  2. 发布时间                                       ║
║  3. 发布模板                                       ║
║  4. 新闻条数                                       ║
║  5. 完成配置                                       ║
║                                                    ║
╚════════════════════════════════════════════════════╝

请输入选项 (1-5): 1

╔════════════════════════════════════════════════════╗
║       配置公众号信息                               ║
╠════════════════════════════════════════════════════╣
║  请输入公众号 AppID: wxebff9eadface1489            ║
║  请输入公众号 AppSecret: ********                  ║
║                                                    ║
║  ✅ 公众号信息已保存                               ║
╚════════════════════════════════════════════════════╝
```

---

### 4.4 配置方式三：命令行配置

```bash
# 一条命令完成配置
openclaw skill config wechat-publisher \
  --app-id wxebff9eadface1489 \
  --app-secret 44c10204ceb1bfb3f7ac096754976454

# 输出：
# ✅ 公众号信息已保存
```

**设置其他参数：**

```bash
# 设置发布时间
openclaw skill config wechat-publisher --schedule "06:00"

# 设置发布模板
openclaw skill config wechat-publisher --template "v5-simple"

# 设置新闻条数
openclaw skill config wechat-publisher --news-count 15
```

---

### 4.5 配置方式四：手动编辑配置文件 ⭐

**配置文件位置：**

| 系统 | 路径 |
|------|------|
| **Windows** | `C:\Users\你的用户名\.agents\skills\wechat-publisher\config\config.json` |
| **macOS** | `~/.agents/skills/wechat-publisher/config/config.json` |
| **Linux** | `~/.agents/skills/wechat-publisher/config/config.json` |

**快速打开配置文件：**

```bash
# Windows PowerShell
notepad "$env:USERPROFILE\.agents\skills\wechat-publisher\config\config.json"

# macOS
nano ~/.agents/skills/wechat-publisher/config/config.json

# Linux
nano ~/.agents/skills/wechat-publisher/config/config.json
```

**配置文件内容：**

```json
{
  "app_id": "wxebff9eadface1489",
  "app_secret": "44c10204ceb1bfb3f7ac096754976454",
  "schedule": "06:00",
  "template": "v5-simple",
  "news_count": 15,
  "timezone": "Asia/Shanghai",
  "cover_media_id": "bEleejFU9wv67FJfDm4w_sMvySqwlvOnfetM_NzcuIcfkYc4hqJ_t3L5f8uFLeCP",
  "auto_publish": true
}
```

**配置项说明：**

| 配置项 | 说明 | 是否必填 | 示例 |
|--------|------|----------|------|
| `app_id` | 公众号 AppID | ✅ 是 | `wxebff9eadface1489` |
| `app_secret` | 公众号密钥 | ✅ 是 | `44c10204ceb1bfb3f7ac096754976454` |
| `schedule` | 发布时间（24 小时制） | ❌ 否 | `"06:00"` |
| `template` | 发布模板名称 | ❌ 否 | `"v5-simple"` |
| `news_count` | 新闻条数 | ❌ 否 | `15` |
| `timezone` | 时区 | ❌ 否 | `"Asia/Shanghai"` |
| `cover_media_id` | 封面图素材 ID | ❌ 否 | `bEleejFU...` |
| `auto_publish` | 是否自动发布 | ❌ 否 | `true` |

**保存后验证：**

```bash
# 查看配置是否生效
openclaw skill config wechat-publisher --show
```

---

### 4.6 配置方式五：环境变量配置 ⭐

**适合多环境部署或 CI/CD 场景：**

**Windows（PowerShell）：**

```powershell
# 设置环境变量（当前会话）
$env:WECHAT_PUBLISHER_APP_ID="wxebff9eadface1489"
$env:WECHAT_PUBLISHER_APP_SECRET="44c10204ceb1bfb3f7ac096754976454"
$env:WECHAT_PUBLISHER_SCHEDULE="06:00"

# 永久设置（用户级别）
[Environment]::SetEnvironmentVariable("WECHAT_PUBLISHER_APP_ID", "wxebff9eadface1489", "User")
[Environment]::SetEnvironmentVariable("WECHAT_PUBLISHER_APP_SECRET", "44c10204ceb1bfb3f7ac096754976454", "User")
```

**macOS / Linux（Bash）：**

```bash
# 设置环境变量（当前会话）
export WECHAT_PUBLISHER_APP_ID="wxebff9eadface1489"
export WECHAT_PUBLISHER_APP_SECRET="44c10204ceb1bfb3f7ac096754976454"
export WECHAT_PUBLISHER_SCHEDULE="06:00"

# 永久设置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export WECHAT_PUBLISHER_APP_ID="wxebff9eadface1489"' >> ~/.bashrc
echo 'export WECHAT_PUBLISHER_APP_SECRET="44c10204ceb1bfb3f7ac096754976454"' >> ~/.bashrc
source ~/.bashrc
```

**环境变量优先级：**

```
环境变量 > 配置文件 > 默认值
```

---

### 4.7 验证配置

```bash
# 查看当前配置
openclaw skill config wechat-publisher --show

# 输出示例：
╔════════════════════════════════════════════════════╗
║       微信公众号发布技能 - 当前配置                 ║
╠════════════════════════════════════════════════════╣
║  公众号 AppID: wxebff9e******1489                  ║
║  公众号 AppSecret: 44c102******6454                ║
║  发布时间：06:00（每天早上 6 点）                     ║
║  发布模板：V5 简洁版                                ║
║  新闻条数：15 条                                    ║
║  时区：Asia/Shanghai（东八区）                      ║
║  授权状态：试用版（剩余 2 次）                       ║
╚════════════════════════════════════════════════════╝
```

---

## 5. 设置发布时间

### 5.1 设置单次发布时间

```bash
# 设置每天早上 7 点发布
openclaw schedule wechat-publisher 07:00

# 输出：
# ✅ 发布时间已设置为：07:00（每天早上 7 点）
# 下次执行：2026-03-27 07:00:00
```

### 5.2 设置多次发布时间

```bash
# 设置每天发布两次（早 7 点 + 晚 6 点）
openclaw schedule wechat-publisher 07:00,18:00

# 输出：
# ✅ 发布时间已设置为：07:00, 18:00
# 下次执行：2026-03-27 07:00:00
```

### 5.3 查看当前定时设置

```bash
# 查看定时设置
openclaw schedule wechat-publisher --show

# 输出示例：
╔════════════════════════════════════════════════════╗
║       微信公众号发布技能 - 定时设置                 ║
╠════════════════════════════════════════════════════╣
║  当前定时：06:00（每天早上 6 点）                     ║
║  下次执行：2026-03-27 06:00:00                     ║
║  时区：Asia/Shanghai（东八区）                      ║
║  状态：已激活                                       ║
╚════════════════════════════════════════════════════╝
```

### 5.4 修改发布时间

```bash
# 方法 1：直接修改
openclaw schedule wechat-publisher 07:30

# 方法 2：通过配置向导
openclaw skill config wechat-publisher
# 选择"发布时间"选项
# 输入新时间：07:30
```

### 5.5 取消定时发布

```bash
# 取消定时发布
openclaw schedule wechat-publisher --disable

# 输出：
# ✅ 定时发布已取消
# 可以手动运行：openclaw skill run wechat-publisher
```

---

## 6. 购买专业版 ⭐

### 6.1 查看授权状态

```bash
# 查看当前授权状态
openclaw skill status wechat-publisher

# 输出示例：
╔════════════════════════════════════════════════════╗
║       微信公众号发布技能 - 授权状态                 ║
╠════════════════════════════════════════════════════╣
║  当前状态：试用版                                  ║
║  剩余试用次数：2 次                                 ║
║  已使用：0 次                                       ║
║                                                    ║
║  💎 专业版：8.8 元 永久买断                          ║
║     运行：openclaw skill buy wechat-publisher      ║
╚════════════════════════════════════════════════════╝
```

---

### 6.2 购买流程 ⭐

**步骤 1：运行购买命令**

```bash
# 运行购买命令
openclaw skill buy wechat-publisher
```

**步骤 1.5：联系管理员（如未自动激活）⭐**

如果支付后未自动收到激活码，请通过以下方式联系管理员：

### 📱 微信二维码（推荐）⭐

**直接扫码添加管理员微信：**

![微信二维码](./wechat-qr.png)

**微信号：** `lylovejava`  
**备注：** 技能购买  
**响应时间：** 工作日 9:00-18:00（1 小时内）

---

### 其他联系方式

| 联系方式 | 说明 | 响应时间 |
|----------|------|----------|
| **公众号** | 关注"小蛋蛋助手"，发送订单号 | 2 小时内 |
| **邮箱** | support@wechat-publisher.ai | 24 小时内 |
| **GitHub** | 提交 Issue | 24 小时内 |

**联系时提供：**
- 订单号
- 支付金额（8.8 元）
- 支付时间
- 支付方式（微信/支付宝）

**步骤 2：选择支付方式**

```
╔════════════════════════════════════════════════════╗
║       购买专业版                                    ║
╠════════════════════════════════════════════════════╣
║  价格：8.8 元（永久买断）                            ║
║                                                    ║
║  功能：                                            ║
║  ✅ 无限次使用                                     ║
║  ✅ 全部 5 套模板                                   ║
║  ✅ 自动更新支持                                   ║
║  ✅ 优先技术支持                                   ║
║                                                    ║
║  支付方式：                                        ║
║  1. 微信扫码支付                                   ║
║  2. 支付宝扫码支付                                 ║
║                                                    ║
║  请输入支付方式 (1-2): 1                           ║
╚════════════════════════════════════════════════════╝
```

**步骤 3：扫码支付**

```
[二维码图片显示]

订单号：WP202603270900001
金额：8.8 元
有效期：5 分钟

正在等待支付...
```

**步骤 4：支付成功**

```
╔════════════════════════════════════════════════════╗
║       ✅ 支付成功！                                 ║
╠════════════════════════════════════════════════════╣
║  订单号：WP202603270900001                         ║
║  金额：8.8 元                                       ║
║  支付时间：2026-03-27 09:00:00                     ║
║                                                    ║
║  激活码：WP26-W12-A3F8-B9D2                        ║
║                                                    ║
║  ⚠️ 请妥善保存激活码（建议截图保存）                ║
║  激活码已发送到你的邮箱                            ║
╚════════════════════════════════════════════════════╝
```

---

### 6.3 激活专业版

**方式一：自动激活（推荐）**

支付成功后，系统会自动激活，无需手动操作。

**方式二：手动激活**

```bash
# 如果获得激活码，运行：
openclaw skill activate wechat-publisher WP26-W12-A3F8-B9D2

# 输出示例：
# ✅ 激活成功！
# 授权状态：专业版（永久）
# 激活时间：2026-03-27 09:00:00
```

---

### 6.4 查看授权信息

```bash
# 查看授权详情
openclaw skill license wechat-publisher

# 输出示例：
╔════════════════════════════════════════════════════╗
║       微信公众号发布技能 - 授权信息                 ║
╠════════════════════════════════════════════════════╣
║  授权状态：✅ 专业版（永久）                        ║
║  激活时间：2026-03-27 09:00:00                     ║
║  激活码：WP26-W12-A3F8-B9D2                        ║
║                                                    ║
║  可用模板：                                        ║
║  ✅ v1-basic.html                                 ║
║  ✅ v2-premium.html                               ║
║  ✅ v3-mainstream.html                            ║
║  ✅ v4-modules.html                               ║
║  ✅ v5-simple.html                                ║
║                                                    ║
║  技术支持：优先响应（24 小时内）                     ║
║  自动更新：已启用                                   ║
╚════════════════════════════════════════════════════╝
```

---

### 6.5 退款政策

- **7 天无理由退款**：购买后 7 天内可申请退款
- **退款条件**：使用次数不超过 5 次
- **退款流程**：联系技术支持邮箱 support@wechat-publisher.ai

---

## 7. 运行发布

### 7.1 手动运行

```bash
# 立即执行一次发布
openclaw skill run wechat-publisher

# 输出示例：
# ✅ 正在收集 AI 新闻...
# ✅ 正在生成内容...
# ✅ 正在发布到公众号...
# ✅ 发布成功！DraftID: xxxxxxxxxxxxxx
# 📄 结果文件：~/.openclaw/workspace/memory/wechat-scheduled-20260327-090000.md
```

### 7.2 查看执行结果

```bash
# 查看最新的发布结果
cat ~/.openclaw/workspace/memory/wechat-scheduled-*.md | head -20

# 输出示例：
# ✅ 定时发布成功
# 执行时间：09:00:00
# DraftID: bEleejFU9wv67FJfDm4w_xxxxxx
# 标题：【AI 日报】2026 年 3 月 27 日 - AI 行业热点新闻
```

### 7.3 登录公众号后台预览

1. 访问 https://mp.weixin.qq.com
2. 扫码登录
3. 点击左侧菜单：内容与互动 → 草稿箱
4. 找到最新草稿，点击预览

---

## 8. 常见问题

### 8.1 安装问题

**Q1: npm 安装失败？**

```bash
# 解决方案 1：使用淘宝镜像
npm config set registry https://registry.npmmirror.com
npm install -g openclaw

# 解决方案 2：使用 sudo（macOS/Linux）
sudo npm install -g openclaw
```

**Q2: openclaw 命令找不到？**

```bash
# Windows：重启 PowerShell 或添加到 PATH
# macOS/Linux：添加 npm 全局路径到 PATH
export PATH=$PATH:$(npm config get prefix)/bin
```

---

### 8.2 配置问题

**Q3: AppSecret 配置后不生效？**

```bash
# 检查配置文件权限
# macOS/Linux:
chmod 600 ~/.agents/skills/wechat-publisher/config/config.json

# Windows: 以管理员身份运行配置命令
```

**Q4: 如何修改已配置的 AppSecret？**

```bash
# 重新运行配置命令
openclaw skill config wechat-publisher
# 选择"公众号信息"选项
# 重新输入 AppSecret
```

**Q5: 配置文件在哪里？**

```bash
# Windows
C:\Users\你的用户名\.agents\skills\wechat-publisher\config\config.json

# macOS/Linux
~/.agents/skills/wechat-publisher/config/config.json
```

---

### 8.3 发布问题

**Q6: 发布失败，提示 Token 无效？**

```bash
# Token 有效期为 2 小时，会自动刷新
# 如持续失败，检查：
# 1. AppID 是否正确
# 2. AppSecret 是否正确
# 3. 公众号是否已认证
```

**Q7: 封面图上传失败？**

```bash
# 检查图片要求：
# 1. 格式：JPG/PNG
# 2. 尺寸：建议 900x383px
# 3. 大小：< 2MB

# 或使用公众号已有素材：
openclaw skill config wechat-publisher
# 选择"封面图来源" → "使用公众号已有素材"
```

**Q8: 如何查看发布日志？**

```bash
# 查看最新的发布日志
Get-ChildItem ~/.openclaw/workspace/memory/wechat-scheduled-*.md | Sort-Object LastWriteTime -Descending | Select-Object -First 1 | Get-Content
```

---

### 8.4 授权问题

**Q9: 试用次数用完后如何继续使用？**

```bash
# 购买专业版
openclaw skill buy wechat-publisher

# 或联系技术支持获取帮助
```

**Q10: 激活码无效？**

```bash
# 检查激活码格式：
# 正确格式：WP26-W12-A3F8-B9D2（16 位，4 组）

# 如仍无效，联系技术支持
```

**Q11: 如何申请退款？**

发送邮件到 support@wechat-publisher.ai，包含：
- 订单号
- 激活码
- 退款原因

---

### 8.5 其他问题

**Q12: 如何更新技能？**

```bash
# 更新到最新版本
openclaw skill update wechat-publisher
```

**Q13: 如何卸载技能？**

```bash
# 卸载技能
openclaw skill uninstall wechat-publisher
```

**Q14: 如何备份配置？**

```bash
# 复制配置文件到安全位置
cp ~/.agents/skills/wechat-publisher/config/config.json ~/backup/wechat-publisher-config.json
```

---

## 📞 技术支持

| 渠道 | 联系方式 | 响应时间 |
|------|----------|----------|
| **文档** | https://docs.openclaw.ai | - |
| **社区** | https://discord.gg/clawd | 24 小时 |
| **邮箱** | support@wechat-publisher.ai | 24 小时（专业版优先） |
| **微信** | 关注公众号"小蛋蛋助手" | 工作日 9:00-18:00 |

---

## 📝 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| V1.0 | 2026-03-27 | 初始版本发布 |

---

_本手册最后更新：2026-03-27_  
_技能版本：V1.0_
