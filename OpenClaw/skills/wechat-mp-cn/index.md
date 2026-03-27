---
layout: doc
---

# 微信公众号发布技能 (wechat-mp-cn)

> Python 版本微信公众号自动发布技能 - 每日 AI 新闻定时发布

---

## 📱 技能概述

**技能名称：** `wechat-mp-cn`

**功能：** 微信公众号自动发布 - 文章监控、阅读量追踪、舆情分析

**版本：** 1.0.0

---

## 🚀 安装方法

### 使用 ClawHub CLI 安装

```bash
# 安装技能
clawhub install wechat-mp-cn
```

### 本地安装

```bash
# 克隆技能仓库
git clone https://github.com/403914291/documents-site.git
cd documents-site/skills/wechat-mp-cn
```

---

## ⚙️ 配置说明

### 微信公众号认证

微信公众号 API 需要认证，需要以下信息：

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `AppID` | 公众号 AppID | `wxebff9eadface1489` |
| `AppSecret` | 公众号密钥 | `44c10204ceb1bfb3f7ac096754976454` |

### Token 获取

**Token 获取接口：**
```
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
```

**PowerShell 获取命令：**
```powershell
$AppID = "wxebff9eadface1489"
$AppSecret = "44c10204ceb1bfb3f7ac096754976454"
$TokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$AppID&secret=$AppSecret"
$TokenResult = Invoke-RestMethod -Uri $TokenUrl -Method Get
$Token = $TokenResult.access_token
```

**有效期：** 7200 秒（2 小时）

---

## 📝 发布流程

### 方案 A：半自动发布（推荐）⭐

1. 小蛋蛋每天早上 6 点收集 15 条 AI 新闻
2. 整理成完整文章格式，保存到 `memory/wechat-mp-draft-YYYY-MM-DD.md`
3. 老李登录公众号后台，复制粘贴创建草稿
4. 手动设置封面图并发布

**优点：** 稳定可靠，不依赖 API
**缺点：** 需要老李花 2 分钟手动操作

### 方案 B：全自动发布

需要解决以下问题：
1. 获取有效的永久素材 media_id（需要有效的 JPEG/PNG 图片）
2. 公众号需要有草稿箱 API 权限
3. 服务器需要能生成/下载图片文件

---

## 📋 文章格式规范

### 标题格式
```
【AI 日报】YYYY 年 M 月 D 日 - AI 行业热点新闻
```

**示例：** `【AI 日报】2026 年 3 月 27 日 - AI 行业热点新闻`

### 内容结构
```markdown
# 📰 AI 新闻早报 | YYYY-MM-DD

## 📰 今日摘要
整体摘要（200-300 字）

## 🔥 头条新闻
1. 【分类】新闻标题
   新闻详细内容（100-150 字）

2. 【分类】新闻标题
   新闻详细内容（100-150 字）

## 📌 重要更新
3-10. 【分类】新闻标题
   新闻内容（80-120 字）

## 📝 简短摘要
11-15. 【分类】新闻标题
   简讯（50-80 字）

*来源：TechCrunch AI, MIT Technology Review, The Verge*
```

### 字数要求
| 部分 | 字数要求 |
|------|----------|
| 整篇文档 | ≤1500 字 |
| 今日摘要 | 200-300 字 |
| 头条新闻 | 100-150 字/条 |
| 重要更新 | 80-120 字/条 |
| 简短摘要 | 50-80 字/条 |

---

## 🔧 API 接口说明

### ✅ 已验证可用的方法

1. **获取永久素材列表** (`/cgi-bin/material/batchget_material`)
   - 可获取公众号已有的永久图片素材
   - 返回 media_id 可用于创建草稿

2. **草稿箱创建** (`/cgi-bin/draft/add`)
   - 需要有效的永久素材 media_id 作为封面图

### ❌ 已验证不可用的方法

1. **临时素材 upload API** (`/cgi-bin/media/upload`)
   - 返回的 media_id 不能用于创建草稿

2. **永久素材 add_material API** (`/cgi-bin/material/add_material`)
   - 不支持 GIF 格式
   - 服务器无法生成/下载有效的 JPEG/PNG 图片

3. **add_news API** (`/cgi-bin/material/add_news`)
   - 已废弃

---

## 📊 使用场景

### 1. 每日 AI 新闻发布

- 每天早上 6 点定时发布
- 收集 15 条 AI 行业新闻
- 自动整理成文章格式

### 2. 竞品监控

- 追踪竞品公众号发布
- 分析内容策略
- 学习爆款文章

### 3. 舆情监控

- 品牌关键词监控
- 行业热点追踪
- 危机预警

---

## ⚠️ 注意事项

1. **API 限制**: 微信公众号 API 需要认证
2. **频率控制**: 避免请求过于频繁被封禁
3. **数据合规**: 仅用于个人研究，不要用于商业用途
4. **封面图**: 必须使用永久素材的 media_id

---

## 🔗 相关资源

- [微信开放平台](https://open.weixin.qq.com/)
- [微信公众号 API 文档](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)
- [Wechatpy - Python SDK](https://github.com/wechatpy/wechatpy)
- [ClawHub 技能市场](https://clawhub.com)

---

*最后更新：2026-03-27*
