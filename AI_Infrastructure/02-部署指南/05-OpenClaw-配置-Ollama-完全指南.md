# OpenClaw 配置 Ollama 完全指南

**整理时间**: 2026/4/6  
**适用版本**: OpenClaw 2026.1+ / Ollama 0.11+

---

## 目录

- [快速开始](#快速开始)
- [基础配置](#基础配置)
- [模型管理](#模型管理)
- [高级配置](#高级配置)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

---

## 快速开始

### 1. 确认 Ollama 已安装

```bash
# 检查 Ollama 版本
ollama --version

# 检查已安装模型
ollama list

# 启动 Ollama 服务
ollama serve
```

**预期输出：**
```
ollama version 0.11.12
```

### 2. 测试 Ollama API

```bash
# 查看可用模型
curl http://localhost:11434/api/tags

# 测试模型响应
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:latest",
  "prompt": "你好",
  "stream": false
}'
```

### 3. 配置 OpenClaw

编辑 OpenClaw 配置文件：

**配置文件位置：** `~/.openclaw/openclaw.json`

- **Windows:** `C:\Users\<你的用户名>\.openclaw\openclaw.json`
- **macOS/Linux:** `~/.openclaw/openclaw.json`

```json
{
  "llm": {
    "provider": "ollama",
    "defaultModel": "qwen2.5:latest",
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "timeout": 30000,
      "retry": 3
    }
  }
}
```

### 4. 验证连接

```bash
# 重启 OpenClaw
openclaw gateway restart

# 检查状态
openclaw ollama status
```

---

## 基础配置

### 配置文件位置

| 系统 | 路径 |
|------|------|
| Windows | `C:\Users\<你的用户名>\.openclaw\openclaw.json` |
| macOS | `~/.openclaw/openclaw.json` |
| Linux | `~/.openclaw/openclaw.json` |

> **注意：** 配置文件统一位于 `~/.openclaw/openclaw.json`，不是 `config.json`！

### 完整配置示例

```json
{
  "llm": {
    "provider": "ollama",
    "defaultModel": "qwen2.5:latest",
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "timeout": 30000,
      "retry": 3,
      "autoRefresh": true,
      "refreshInterval": 300000,
      "models": {
        "autoDiscover": true
      }
    }
  },
  "features": {
    "autoModelSwitch": true,
    "modelFallback": true
  }
}
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `provider` | string | - | LLM 提供商，填 `ollama` |
| `defaultModel` | string | - | 默认使用的模型 |
| `ollama.baseUrl` | string | `http://localhost:11434` | Ollama API 地址 |
| `ollama.timeout` | number | `30000` | 请求超时时间（毫秒） |
| `ollama.retry` | number | `3` | 失败重试次数 |
| `ollama.autoRefresh` | boolean | `false` | 是否自动刷新模型列表 |
| `ollama.refreshInterval` | number | `300000` | 刷新间隔（毫秒） |
| `ollama.models.autoDiscover` | boolean | `false` | 是否自动发现新模型 |
| `features.autoModelSwitch` | boolean | `false` | 是否允许自动切换模型 |
| `features.modelFallback` | boolean | `false` | 是否启用模型降级备用 |

---

## 模型管理

### 查看可用模型

**方法 1：Ollama 命令**
```bash
ollama list
```

**方法 2：API 调用**
```bash
curl http://localhost:11434/api/tags
```

**方法 3：OpenClaw 命令**
```bash
openclaw ollama models
```

### 下载新模型

```bash
# 下载模型
ollama pull qwen2.5:latest

# 下载指定版本
ollama pull llama2:7b

# 查看下载进度
ollama list
```

**常用模型推荐：**

| 模型 | 大小 | 用途 | 命令 |
|------|------|------|------|
| Qwen2.5 | 7B | 通用对话、代码 | `ollama pull qwen2.5:latest` |
| Llama2 | 7B | 通用对话 | `ollama pull llama2:latest` |
| CodeLlama | 7B | 代码生成 | `ollama pull codellama:latest` |
| Mistral | 7B | 高性能对话 | `ollama pull mistral:latest` |
| Phi3 | 3.8B | 轻量级 | `ollama pull phi3:latest` |

### 删除模型

```bash
# 删除指定模型
ollama rm 模型名

# 示例
ollama rm llama2:7b
```

### 模型自动发现

**启用自动发现后**，Ollama 安装新模型后 OpenClaw 会自动识别，无需重启。

**配置方法：**

```json
{
  "llm": {
    "ollama": {
      "autoRefresh": true,
      "refreshInterval": 300000,
      "models": {
        "autoDiscover": true
      }
    }
  }
}
```

**验证自动发现：**

```bash
# 1. 下载新模型
ollama pull mistral:latest

# 2. 等待 5 分钟（或手动刷新）
openclaw ollama refresh

# 3. 查看模型列表
openclaw ollama models
```

---

## 高级配置

### 远程 Ollama 服务器

如果 Ollama 部署在远程服务器：

```json
{
  "llm": {
    "ollama": {
      "baseUrl": "http://192.168.1.100:11434",
      "timeout": 60000,
      "retry": 5,
      "headers": {
        "Authorization": "Bearer your-token-here"
      }
    }
  }
}
```

**防火墙配置：**

```bash
# Windows 防火墙
netsh advfirewall firewall add rule name="Ollama" dir=in action=allow protocol=TCP localport=11434

# Linux iptables
iptables -A INPUT -p tcp --dport 11434 -j ACCEPT

# Linux ufw
ufw allow 11434/tcp
```

### 多模型配置

配置多个模型，支持自动降级：

```json
{
  "llm": {
    "provider": "ollama",
    "defaultModel": "qwen2.5:latest",
    "modelPriority": [
      "qwen2.5:latest",
      "llama2:latest",
      "mistral:latest",
      "phi3:latest"
    ],
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "modelFallback": true
    }
  }
}
```

**降级逻辑：**
1. 优先使用 `defaultModel`
2. 如果默认模型不可用，按 `modelPriority` 顺序尝试
3. 启用 `modelFallback` 后自动降级

### 性能优化

**大模型配置：**

```json
{
  "llm": {
    "ollama": {
      "timeout": 120000,
      "maxTokens": 4096,
      "contextLength": 8192,
      "numPredict": 2048
    }
  }
}
```

**轻量级配置：**

```json
{
  "llm": {
    "ollama": {
      "timeout": 15000,
      "maxTokens": 1024,
      "contextLength": 2048,
      "numPredict": 512
    }
  }
}
```

### 日志配置

**启用详细日志：**

```json
{
  "logging": {
    "level": "debug",
    "ollama": true,
    "file": "%APPDATA%\\openclaw\\logs\\ollama.log"
  }
}
```

**查看日志：**

```bash
# Windows
Get-Content "$env:APPDATA\openclaw\logs\ollama.log" -Tail 50 -Wait

# macOS/Linux
tail -f ~/.local/share/openclaw/logs/ollama.log
```

---

## 常见问题

### Q1: OpenClaw 无法连接 Ollama

**症状：**
```
Error: Failed to connect to Ollama at http://localhost:11434
```

**解决：**

1. 检查 Ollama 是否运行
```bash
ollama list
```

2. 检查端口是否监听
```bash
netstat -ano | findstr "11434"
```

3. 重启 Ollama 服务
```bash
# Windows
ollama serve

# macOS/Linux
sudo systemctl restart ollama
```

4. 检查防火墙
```bash
# Windows
netsh advfirewall firewall show rule name="Ollama"

# Linux
ufw status | grep 11434
```

### Q2: 模型列表不更新

**症状：**
下载新模型后 OpenClaw 仍然显示旧列表

**解决：**

1. 手动刷新
```bash
openclaw ollama refresh
```

2. 清除缓存
```bash
# Windows
Remove-Item "$env:APPDATA\openclaw\cache\*" -Recurse -Force

# macOS/Linux
rm -rf ~/.local/share/openclaw/cache/*
```

3. 重启 OpenClaw
```bash
openclaw gateway restart
```

### Q3: 模型响应超时

**症状：**
```
Error: Request timeout after 30000ms
```

**解决：**

1. 增加超时时间
```json
{
  "llm": {
    "ollama": {
      "timeout": 120000
    }
  }
}
```

2. 使用更小的模型
```bash
ollama pull phi3:latest
```

3. 减少上下文长度
```json
{
  "llm": {
    "ollama": {
      "contextLength": 2048
    }
  }
}
```

### Q4: 显存不足

**症状：**
```
Error: CUDA out of memory
```

**解决：**

1. 使用量化模型
```bash
ollama pull qwen2.5:7b-q4_K_M
```

2. 限制 GPU 使用
```bash
# 设置 Ollama 使用 CPU
export OLLAMA_NUM_GPU=0
ollama serve
```

3. 关闭其他 GPU 应用
```bash
# Windows 任务管理器
# 结束占用显存的进程
```

### Q5: 中文乱码

**症状：**
返回内容包含乱码字符

**解决：**

1. 检查配置文件编码
```bash
# 确保 openclaw.json 是 UTF-8 编码
```

2. 使用支持中文的模型
```bash
ollama pull qwen2.5:latest
```

3. 设置正确的字符集
```json
{
  "llm": {
    "ollama": {
      "encoding": "utf-8"
    }
  }
}
```

---

## 最佳实践

### 1. 配置文件管理

**推荐目录结构：**
```
~/.openclaw/
├── openclaw.json         # 主配置
├── openclaw.local.json   # 本地覆盖配置（不提交 git）
├── skills/               # 技能目录
├── scripts/              # 自定义脚本
└── logs/                 # 日志目录
```

**使用本地覆盖配置：**
```json
// openclaw.local.json
{
  "llm": {
    "ollama": {
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

### 2. 模型选择策略

**日常开发：**
- 推荐：Qwen2.5 7B
- 优点：中文支持好，代码能力强
- 配置：`defaultModel: "qwen2.5:latest"`

**代码生成：**
- 推荐：CodeLlama 7B
- 优点：代码生成准确
- 配置：`defaultModel: "codellama:latest"`

**轻量级场景：**
- 推荐：Phi3 3.8B
- 优点：速度快，显存占用小
- 配置：`defaultModel: "phi3:latest"`

### 3. 性能调优

**显存优化：**
```bash
# 使用量化模型
ollama pull qwen2.5:7b-q4_K_M

# 限制上下文长度
{
  "contextLength": 4096
}
```

**速度优化：**
```bash
# 使用小模型
ollama pull phi3:latest

# 减少预测 token 数
{
  "numPredict": 512
}
```

**质量优化：**
```bash
# 使用大模型
ollama pull qwen2.5:14b

# 增加上下文长度
{
  "contextLength": 8192
}
```

### 4. 监控与告警

**创建监控脚本** `scripts/monitor-ollama.ps1`：

```powershell
# 监控 Ollama 服务状态
$OLLAMA_URL = "http://localhost:11434/api/tags"

try {
    $response = Invoke-RestMethod -Uri $OLLAMA_URL -TimeoutSec 10
    $modelCount = $response.models.Count
    
    Write-Host "[$(Get-Date)] Ollama 正常 - 模型数：$modelCount" -ForegroundColor Green
    
    # 记录到日志
    Add-Content -Path "$env:APPDATA\openclaw\logs\ollama-monitor.log" -Value "[$(Get-Date)] OK - $modelCount models"
}
catch {
    Write-Host "[$(Get-Date)] Ollama 异常 - $($_.Exception.Message)" -ForegroundColor Red
    
    # 记录错误日志
    Add-Content -Path "$env:APPDATA\openclaw\logs\ollama-monitor.log" -Value "[$(Get-Date)] ERROR - $($_.Exception.Message)"
    
    # 发送告警（可配置邮件/钉钉/企业微信）
    # Send-Alert -Message "Ollama 服务异常"
}
```

**设置定时任务：**
```powershell
# 每 5 分钟检查一次
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Users\LIYONG\.openclaw\scripts\monitor-ollama.ps1"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5)
Register-ScheduledTask -TaskName "Ollama-Monitor" -Action $action -Trigger $trigger
```

### 5. 备份与恢复

**备份配置：**
```bash
# Windows
Copy-Item "$env:APPDATA\openclaw\config.json" "D:\Backup\openclaw-config-$(Get-Date -Format 'yyyyMMdd').json"

# macOS/Linux
cp ~/.openclaw/config.json ~/backup/openclaw-config-$(date +%Y%m%d).json
```

**恢复配置：**
```bash
# Windows
Copy-Item "D:\Backup\openclaw-config-20260406.json" "$env:APPDATA\openclaw\config.json"

# macOS/Linux
cp ~/backup/openclaw-config-20260406.json ~/.openclaw/config.json
```

---

## 快速参考

### 常用命令

| 命令 | 说明 |
|------|------|
| `ollama list` | 查看已安装模型 |
| `ollama pull <model>` | 下载新模型 |
| `ollama rm <model>` | 删除模型 |
| `ollama serve` | 启动 Ollama 服务 |
| `openclaw ollama status` | 检查连接状态 |
| `openclaw ollama models` | 查看可用模型 |
| `openclaw ollama refresh` | 刷新模型列表 |
| `openclaw config show` | 查看配置 |
| `openclaw gateway restart` | 重启服务 |

### 配置文件模板

```json
{
  "llm": {
    "provider": "ollama",
    "defaultModel": "qwen2.5:latest",
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "timeout": 30000,
      "retry": 3,
      "autoRefresh": true,
      "refreshInterval": 300000,
      "models": {
        "autoDiscover": true
      }
    }
  },
  "features": {
    "autoModelSwitch": true,
    "modelFallback": true
  },
  "logging": {
    "level": "info",
    "ollama": true
  }
}
```

### 故障排查流程

```
1. 检查 Ollama 服务 → ollama list
2. 检查 API 连接 → curl http://localhost:11434/api/tags
3. 检查 OpenClaw 配置 → openclaw config show
4. 查看日志 → openclaw logs --follow
5. 清除缓存 → 删除 cache/ 目录
6. 重启服务 → openclaw gateway restart
```

---

## 附录

### A. Ollama 模型推荐

| 用途 | 模型 | 大小 | 显存需求 |
|------|------|------|---------|
| 通用对话 | Qwen2.5 | 7B | 8GB |
| 代码生成 | CodeLlama | 7B | 8GB |
| 轻量级 | Phi3 | 3.8B | 4GB |
| 高性能 | Llama2 | 13B | 16GB |
| 中文优化 | Qwen2.5 | 14B | 16GB |

### B. 相关资源

- **OpenClaw 官方文档**: https://docs.openclaw.ai
- **Ollama 官方文档**: https://ollama.ai/docs
- **模型库**: https://ollama.ai/library
- **社区资源**: https://github.com/openclaw/openclaw

### C. 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|---------|
| 2026/4/6 | v1.0 | 初始版本 |

---

_本文档由 OpenClaw 社区维护_  
_最后更新：2026/4/6_
