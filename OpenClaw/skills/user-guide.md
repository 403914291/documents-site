# OpenClaw 多智能体团队配置手册

**版本：** 1.0
**最后更新：** 2026-03-19
**适用平台：** Windows / macOS / Linux

---

## 📋 概述

本手册指导你完成 OpenClaw 多智能体团队的完整配置，包括：
- OpenClaw 安装与初始化
- 飞书应用创建与权限配置
- 设备配对与渠道绑定
- 多智能体协作配置

---

## 🚀 第一步：安装 OpenClaw

### 1.1 系统要求

- Node.js v20+ (推荐 v24+)
- npm v10+
- 稳定的网络连接

### 1.2 安装命令

```bash
# 全局安装 OpenClaw
npm install -g openclaw

# 验证安装
openclaw --version
```

### 1.3 初始化工作区

```bash
# OpenClaw 会自动创建默认工作区
# Windows: C:\Users\<用户名>\.openclaw\workspace
# macOS/Linux: ~/.openclaw/workspace
```

---

## 📱 第二步：创建飞书应用

### 2.1 登录飞书开放平台

访问：https://open.feishu.cn/

使用你的飞书账号登录（需要是企业管理员或有应用创建权限）

### 2.2 创建企业自建应用

1. 点击 **「创建应用」**
2. 选择 **「企业自建应用」**
3. 填写应用信息：
   - **应用名称：** OpenClaw 助手（或你喜欢的名字）
   - **应用图标：** 可上传自定义图标
4. 点击 **「创建」**

### 2.3 配置应用权限

在应用管理后台，进入 **「权限管理」** 标签页，添加以下权限：

#### 必选权限（消息与聊天）

| 权限名称 | 权限标识 | 说明 |
|---------|---------|------|
| 发送消息 | `im:message` | 基础消息发送 |
| 读取消息 | `im:message:readonly` | 读取收到的消息 |
| 发送多用户消息 | `im:message:send_multi_users` | 向多个用户发送 |
| 机器人消息 | `im:message:send_as_bot` | 以机器人身份发送 |
| 群组消息 | `im:message:group_msg` | 发送群组消息 |
| 群内@消息 | `im:message:group_at_msg:readonly` | 读取群内@消息 |
| 单聊消息 | `im:message:p2p_msg:readonly` | 读取单聊消息 |
| 创建群聊 | `im:chat:create` | 创建新群聊 |
| 读取群聊 | `im:chat:read` | 读取群聊信息 |
| 更新群聊 | `im:chat:update` | 更新群聊设置 |
| 删除群聊 | `im:chat:delete` | 删除群聊 |
| 读取群成员 | `im:chat.members:read` | 读取群成员列表 |
| 机器人访问群成员 | `im:chat.members:bot_access` | 机器人访问权限 |

#### 可选权限（高级功能）

| 权限名称 | 权限标识 | 说明 |
|---------|---------|------|
| 读取用户信息 | `contact:user.base:readonly` | 获取用户基本信息 |
| 消息回复 | `im:message:update` | 更新/编辑消息 |
| 消息撤回 | `im:message:recall` | 撤回已发送消息 |
| 消息反应 | `im:message.reactions:write_only` | 添加表情反应 |
| 群公告 | `im:chat.announcement:write_only` | 发布群公告 |
| 群置顶 | `im:chat.chat_pins:write_only` | 置顶消息 |

### 2.4 发布应用

1. 进入 **「版本管理与发布」** 标签页
2. 点击 **「创建版本」**
3. 填写版本号（如 1.0.0）和更新说明
4. 点击 **「提交审核」**（如需）或直接 **「发布」**

### 2.5 启用应用

1. 进入 **「应用管理」** 标签页
2. 点击 **「启用」** 按钮
3. 选择应用可见范围（建议先选自己测试）

### 2.6 记录关键信息

保存以下信息（后续配置需要）：

- **App ID**（应用 ID）
- **App Secret**（应用密钥）
- **Verification Token**（验证令牌，如有）

---

## 🔗 第三步：配置飞书渠道

### 3.1 在 OpenClaw 中配置飞书

在工作区创建或编辑配置文件：

```bash
# 编辑飞书渠道配置
# 位置：~/.openclaw/config.json 或工作区下的 feishu 配置
```

配置内容示例：

```json
{
  "channels": {
    "feishu": {
      "appId": "cli_xxxxxxxxxxxxx",
      "appSecret": "xxxxxxxxxxxxxxxxxxxxx",
      "verificationToken": "xxxxxxxxxxxxx"
    }
  }
}
```

### 3.2 启动 Gateway

```bash
# 启动 OpenClaw Gateway 服务
openclaw gateway start

# 检查状态
openclaw gateway status
```

### 3.3 配置飞书应用回调（如需要）

如果需要使用回调功能：

1. 在飞书应用后台进入 **「事件订阅」**
2. 配置回调 URL：`https://<你的公网地址>/feishu/callback`
3. 使用 Verification Token 验证

---

## 🔐 第四步：设备配对

### 4.1 获取配对码

在需要连接的设备（如手机 App、其他电脑）上：

1. 打开 OpenClaw 客户端
2. 选择 **「添加设备」** 或 **「配对」**
3. 记录显示的配对码（如 `5ZYVST79`）

### 4.2 在主设备上批准配对

在运行 Gateway 的主设备上执行：

```bash
# 查看待批准的配对请求
openclaw pairing status

# 批准配对（替换为你的配对码）
openclaw pairing approve feishu 5ZYVST79

# 查看所有已配对设备
openclaw pairing list
```

### 4.3 验证配对

配对成功后：

1. 客户端设备会显示「已连接」
2. 可以在主设备看到已配对的设备列表
3. 尝试发送测试消息确认连接正常

---

## 🤖 第五步：配置多智能体

### 5.1 创建智能体配置文件

在工作区创建智能体配置：

```bash
# 工作区目录：~/.openclaw/workspace/
```

创建 `AGENTS.md` 或智能体配置文件：

```markdown
# 智能体团队配置

## 主智能体
- 名称：雪球
- 角色：主助手
- 模型：qwen3.5-plus
- 职责：日常对话、任务协调

## 子智能体（按需创建）
- 名称：Coder
- 角色：编程助手
- 模型：claude-sonnet
- 职责：代码编写、审查

- 名称：Researcher
- 角色：研究助手
- 模型：gpt-4
- 职责：信息检索、分析
```

### 5.2 配置子智能体调用

在任务中需要调用子智能体时：

```bash
# 使用 sessions_spawn 创建子智能体会话
# 在代码或配置中定义
```

示例配置（在技能或脚本中）：

```json
{
  "runtime": "subagent",
  "agentId": "coder-agent",
  "mode": "run",
  "task": "审查这段代码..."
}
```

### 5.3 设置智能体权限

确保各智能体有适当的权限：

- **主智能体：** 完整权限
- **子智能体：** 按需分配（代码、搜索、文件等）

---

## ✅ 第六步：测试验证

### 6.1 基础功能测试

```bash
# 1. 检查 OpenClaw 状态
openclaw status

# 2. 检查飞书权限
# 在飞书应用中查看已授予的权限

# 3. 发送测试消息
# 在飞书中向机器人发送消息，确认能收到回复
```

### 6.2 多智能体测试

1. 在飞书中发送一个需要编程帮助的问题
2. 观察主智能体是否正确调用子智能体
3. 确认回复内容符合预期

### 6.3 配对设备测试

1. 在配对设备上发送消息
2. 确认主设备能收到并处理
3. 确认回复能正确返回到配对设备

---

## 🔧 常见问题排查

### 问题 1：飞书消息无法发送/接收

**可能原因：**
- 权限未正确配置
- 应用未启用
- 回调 URL 配置错误

**解决方案：**
```bash
# 检查飞书权限
# 在开放平台重新检查权限配置

# 重启 Gateway
openclaw gateway restart

# 查看日志
openclaw gateway logs
```

### 问题 2：配对失败

**可能原因：**
- 配对码过期
- 网络问题
- Gateway 未运行

**解决方案：**
```bash
# 1. 确认 Gateway 正在运行
openclaw gateway status

# 2. 重新生成配对码（在客户端设备）

# 3. 重新批准配对
openclaw pairing approve feishu <新配对码>

# 4. 检查防火墙/网络设置
```

### 问题 3：子智能体无法调用

**可能原因：**
- agentId 配置错误
- 权限不足
- 模型不可用

**解决方案：**
```bash
# 1. 检查可用的 agentId
# 查看 agents_list 或配置文档

# 2. 确认模型配置正确

# 3. 检查子智能体权限配置
```

### 问题 4：命令执行超时/失败

**可能原因：**
- Gateway 负载过高
- 网络延迟
- 资源不足

**解决方案：**
```bash
# 1. 增加超时时间
# 在命令中添加 --timeout 参数

# 2. 使用 PTY 模式
openclaw <command> --pty

# 3. 重启 Gateway
openclaw gateway restart
```

---

## 📚 附录

### A. 常用命令速查

```bash
# Gateway 管理
openclaw gateway start
openclaw gateway stop
openclaw gateway restart
openclaw gateway status

# 配对管理
openclaw pairing status
openclaw pairing approve feishu <code>
openclaw pairing list
openclaw pairing deny <code>

# 状态检查
openclaw status
openclaw --version

# 帮助
openclaw help
openclaw <command> --help
```

### B. 配置文件位置

| 文件 | 位置 | 说明 |
|-----|------|------|
| 主配置 | `~/.openclaw/config.json` | 全局配置 |
| 工作区 | `~/.openclaw/workspace/` | 工作区文件 |
| 日志 | `~/.openclaw/logs/` | 日志文件 |
| 技能 | `~/.openclaw/skills/` | 自定义技能 |

### C. 飞书开放平台链接

- 开放平台首页：https://open.feishu.cn/
- 应用管理：https://open.feishu.cn/app
- 权限文档：https://open.feishu.cn/document/
- API 文档：https://open.feishu.cn/document/

### D. OpenClaw 资源

- 官方文档：https://docs.openclaw.ai
- GitHub: https://github.com/openclaw/openclaw
- 社区：https://discord.com/invite/clawd
- 技能市场：https://clawhub.com

---

## 📝 更新日志

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| 1.0 | 2026-03-19 | 初始版本，完整配置流程 |

---

**提示：** 本手册会根据 OpenClaw 版本更新而更新，请定期查看最新版本。

**反馈：** 如遇到问题或有改进建议，欢迎在社区反馈。
