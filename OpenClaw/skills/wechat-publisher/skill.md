# 微信公众号发布技能

**技能名称：** wechat-publisher  
**版本：** V1.0  
**描述：** 自动发布 AI 新闻到微信公众号草稿箱  
**作者：** 小蛋蛋  

---

## 📋 功能特性

- ✅ 自动收集 15 条 AI 新闻
- ✅ 自动生成 HTML 格式内容
- ✅ 自动发布到公众号草稿箱
- ✅ 支持 5 套专业模板
- ✅ 2 次试用 + 8.8 元永久买断
- ✅ 支持自定义发布时间

---

## 🔧 配置项

| 配置项 | 说明 | 默认值 | 是否必填 |
|--------|------|--------|----------|
| `app_id` | 公众号 AppID | - | ✅ 是 |
| `app_secret` | 公众号 AppSecret | - | ✅ 是 |
| `schedule` | 发布时间 | `06:00` | ❌ 否 |
| `template` | 发布模板 | `v5-simple` | ❌ 否 |
| `news_count` | 新闻条数 | `15` | ❌ 否 |
| `timezone` | 时区 | `Asia/Shanghai` | ❌ 否 |

---

## 📖 使用说明

### 安装技能
```bash
openclaw skill install wechat-publisher
```

### 配置技能
```bash
openclaw skill config wechat-publisher
```

### 设置发布时间
```bash
openclaw schedule wechat-publisher 07:00
```

### 查看状态
```bash
openclaw skill status wechat-publisher
```

---

## 💰 授权说明

- **试用版：** 2 次免费使用
- **专业版：** 8.8 元永久买断
- **购买命令：** `openclaw skill buy wechat-publisher`

---

## 📁 文件结构

```
wechat-publisher-skill/
├── SKILL.md              # 技能定义文件
├── publish.py            # 核心发布脚本
├── scripts/
│   ├── install.sh        # 安装脚本
│   └── activate.py       # 激活脚本
├── templates/
│   ├── v5-simple.html    # V5 简洁模板
│   └── ...               # 其他模板
├── config/
│   └── default.json      # 默认配置
└── docs/
    └── USER_GUIDE.md     # 用户手册
```

---

_创建日期：2026-03-26_  
_最后更新：2026-03-26_
