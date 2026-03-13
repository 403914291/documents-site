# Ollama 完全指南：从入门到精通

> 本地运行大模型的最佳选择，让 AI 触手可及

---

## 目录

1. [什么是 Ollama？](#什么是-ollama)
2. [快速开始](#快速开始)
3. [核心概念](#核心概念)
4. [模型管理](#模型管理)
5. [API 使用](#api-使用)
6. [高级配置](#高级配置)
7. [性能优化](#性能优化)
8. [实际应用场景](#实际应用场景)
9. [故障排除](#故障排除)
10. [最佳实践](#最佳实践)

---

## 什么是 Ollama？

### 简介

**Ollama** 是一个开源的本地大模型运行框架，让你能够在自己的电脑上轻松运行各种开源大语言模型（LLM）。它由 MIT 团队开发，旨在降低大模型的使用门槛。

### 核心特点

| 特点 | 说明 |
|------|------|
| 🚀 **开箱即用** | 一行命令即可运行模型 |
| 💻 **本地运行** | 数据完全本地，隐私安全 |
| 📦 **模型丰富** | 支持 Llama、Qwen、Gemma 等主流模型 |
| 🔧 **易于集成** | 提供 REST API，方便应用集成 |
| ⚡ **性能优化** | 自动量化，降低资源消耗 |

### 适用场景

- **个人学习**：在本地实验大模型，无需云端 API
- **企业开发**：构建私有化 AI 应用，数据不出内网
- **离线环境**：无网络环境下依然可用
- **成本敏感**：避免 API 调用费用

---

## 快速开始

### 系统要求

| 系统 | 最低配置 | 推荐配置 |
|------|---------|---------|
| **macOS** | M1/M2/M3, 8GB 内存 | M2 Pro, 16GB+ 内存 |
| **Windows** | Windows 10, NVIDIA GPU 4GB | Windows 11, RTX 3060+, 16GB 内存 |
| **Linux** | Ubuntu 20.04, 8GB 内存 | Ubuntu 22.04, RTX 显卡，32GB 内存 |

### 安装步骤

#### macOS

```bash
# 方法 1：官网下载
# 访问 https://ollama.com 下载安装包

# 方法 2：Homebrew 安装
brew install ollama
```

#### Windows

```powershell
# 访问 https://ollama.com/download 下载安装包
# 或使用 winget
winget install Ollama.Ollama
```

#### Linux

```bash
# 一键安装脚本
curl -fsSL https://ollama.com/install.sh | sh

# 验证安装
ollama --version
```

### 运行第一个模型

```bash
# 下载并运行 Llama 3.2 模型
ollama run llama3.2

# 开始对话
>>> 你好，请介绍一下你自己
>>> 帮我写一个 Python 函数，计算斐波那契数列
```

### 常用命令速查

```bash
# 查看已下载的模型
ollama list

# 下载模型（不运行）
ollama pull llama3.2

# 删除模型
ollama rm llama3.2

# 复制模型
ollama cp llama3.2 my-llama

# 查看模型信息
ollama show llama3.2

# 停止运行
ollama stop llama3.2
```

---

## 核心概念

### 模型（Model）

Ollama 中的模型是经过量化优化的大语言模型，支持多种尺寸和类型：

```bash
# 按尺寸选择
ollama run llama3.2:1b      # 1B 参数，超轻量
ollama run llama3.2:3b      # 3B 参数，轻量
ollama run llama3.2:8b      # 8B 参数，平衡
ollama run llama3.2:70b     # 70B 参数，高性能

# 按用途选择
ollama run llama3.2         # 通用对话
ollama run codellama        # 代码生成
ollama run mistral          # 文本生成
ollama run qwen2.5          # 中文优化
```

### Modelfile

Modelfile 是 Ollama 的模型配置文件，类似 Dockerfile：

```dockerfile
# 基础模型
FROM llama3.2

# 设置参数
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER num_ctx 4096

# 系统提示词
SYSTEM """
你是一个专业的 Python 开发工程师，擅长代码编写、代码审查和技术问题解答。
请用简洁、清晰的方式回答问题，并提供可运行的代码示例。
"""
```

创建自定义模型：

```bash
# 创建 Modelfile
ollama create my-coder -f ./Modelfile

# 运行自定义模型
ollama run my-coder
```

### 上下文窗口（Context Window）

上下文窗口决定了模型能"记住"多少对话历史：

```bash
# 设置上下文长度（默认 2048）
ollama run llama3.2 --num_ctx 8192

# 在 API 中设置
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "你好",
  "options": {
    "num_ctx": 8192
  }
}'
```

---

## 模型管理

### 热门模型推荐

| 模型 | 参数 | 用途 | 推荐场景 |
|------|------|------|---------|
| **Llama 3.2** | 1B/3B/8B | 通用对话 | 日常使用、学习 |
| **Qwen2.5** | 7B/14B/32B | 中文优化 | 中文应用、写作 |
| **CodeLlama** | 7B/13B/34B | 代码生成 | 编程辅助 |
| **Mistral** | 7B | 文本生成 | 内容创作 |
| **Gemma2** | 2B/9B/27B | 轻量高效 | 资源受限环境 |
| **DeepSeek-V2** | 16B/236B | 高性能 | 复杂任务 |

### 模型下载管理

```bash
# 批量下载模型
ollama pull llama3.2
ollama pull qwen2.5:7b
ollama pull codellama:13b

# 查看磁盘占用
ollama list --format json | jq '.[] | {name: .name, size: .size}'

# 清理未使用的模型
ollama rm $(ollama list | grep '^llama' | awk '{print $1}')
```

### 创建自定义模型

```bash
# 1. 创建 Modelfile
cat > Modelfile << EOF
FROM llama3.2:8b

# 设置温度参数
PARAMETER temperature 0.6
PARAMETER top_p 0.9

# 设置系统角色
SYSTEM """
你是一个专业的技术文档撰写助手。
你的任务是帮助用户编写清晰、准确的技术文档。
请使用 Markdown 格式，包含必要的代码示例和图表说明。
"""
EOF

# 2. 创建模型
ollama create tech-writer -f Modelfile

# 3. 测试模型
ollama run tech-writer "帮我写一个 API 设计文档大纲"
```

---

## API 使用

### REST API 基础

Ollama 提供 OpenAI 兼容的 REST API：

```bash
# 聊天接口
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    { "role": "user", "content": "你好！" }
  ],
  "stream": false
}'

# 生成接口
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "写一首关于春天的诗",
  "stream": false
}'
```

### Python 客户端

```python
import requests

# 简单对话
response = requests.post('http://localhost:11434/api/chat', json={
    'model': 'llama3.2',
    'messages': [{'role': 'user', 'content': '你好'}],
    'stream': False
})

print(response.json()['message']['content'])

# 流式输出
response = requests.post('http://localhost:11434/api/chat', json={
    'model': 'llama3.2',
    'messages': [{'role': 'user', 'content': '讲个故事'}],
    'stream': True
}, stream=True)

for line in response.iter_lines():
    if line:
        chunk = json.loads(line)
        print(chunk.get('message', {}).get('content', ''), end='')
```

### Node.js 客户端

```javascript
const axios = require('axios');

// 简单对话
async function chat(message) {
  const response = await axios.post('http://localhost:11434/api/chat', {
    model: 'llama3.2',
    messages: [{ role: 'user', content: message }],
    stream: false
  });
  return response.data.message.content;
}

// 使用示例
chat('你好').then(console.log);
```

### OpenAI 兼容模式

Ollama 可以模拟 OpenAI API，方便迁移现有应用：

```python
from openai import OpenAI

# 配置 Ollama 作为后端
client = OpenAI(
    base_url='http://localhost:11434/v1',
    api_key='ollama'  # 任意值
)

# 使用方式与 OpenAI 完全相同
response = client.chat.completions.create(
    model='llama3.2',
    messages=[
        {'role': 'user', 'content': '你好'}
    ]
)

print(response.choices[0].message.content)
```

---

## 高级配置

### 环境变量配置

```bash
# 修改监听地址（默认 127.0.0.1:11434）
export OLLAMA_HOST="0.0.0.0:11434"

# 修改模型存储路径
export OLLAMA_MODELS="/path/to/models"

# 设置 GPU 层数（NVIDIA）
export OLLAMA_NUM_GPU=99

# 设置并发请求数
export OLLAMA_MAX_QUEUE=512

# 启动服务
ollama serve
```

### GPU 加速配置

#### NVIDIA GPU

```bash
# 查看 GPU 状态
nvidia-smi

# Ollama 会自动检测并使用 GPU
# 如需手动配置：
export OLLAMA_NUM_GPU=99  # 使用所有 GPU 层
ollama serve
```

#### AMD GPU

```bash
# 需要安装 ROCm
# 设置可见 GPU
export HSA_OVERRIDE_GFX_VERSION=11.0.0
export OLLAMA_NUM_GPU=99
```

#### Apple Silicon

```bash
# macOS 自动使用 Metal 加速
# 调整 GPU 内存分配
export OLLAMA_MAX_VRAM=8GB
```

### 多模型并发

```bash
# 配置并发请求
export OLLAMA_MAX_QUEUE=100

# 配置模型加载策略
export OLLAMA_KEEP_ALIVE=5m  # 模型保持加载时间

# 启动服务
ollama serve
```

---

## 性能优化

### 量化设置

```bash
# 使用 4-bit 量化模型（更小更快）
ollama run llama3.2:q4_0

# 使用 8-bit 量化模型（平衡）
ollama run llama3.2:q8_0

# 使用 FP16 模型（精度最高）
ollama run llama3.2:f16
```

### 推理参数调优

```bash
# 优化响应速度
ollama run llama3.2 \
  --temperature 0.3 \
  --top_p 0.8 \
  --num_predict 512

# 优化创造性
ollama run llama3.2 \
  --temperature 0.9 \
  --top_p 0.95 \
  --num_predict 1024
```

### 内存优化

```bash
# 限制上下文长度
export OLLAMA_CONTEXT_LENGTH=2048

# 限制批处理大小
export OLLAMA_NUM_BATCH=4

# 限制 GPU 层数
export OLLAMA_NUM_GPU=50
```

### 性能基准测试

```bash
# 使用 ollama-bench 测试
ollama run llama3.2 "请快速回答：1+1=?"

# 测量首 token 延迟
time curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "你好",
  "stream": false
}'
```

---

## 实际应用场景

### 1. 本地 AI 助手

```bash
# 创建个人助手模型
cat > assistant.Modelfile << EOF
FROM llama3.2:8b

SYSTEM """
你是一个全能的个人 AI 助手，帮助用户处理日常任务：
- 回答问题
- 编写代码
- 撰写文档
- 分析问题
- 提供建议

请用友好、专业的语气交流。
"""
EOF

ollama create assistant -f assistant.Modelfile
ollama run assistant
```

### 2. 代码生成器

```bash
# 创建代码专家模型
cat > coder.Modelfile << EOF
FROM codellama:13b

PARAMETER temperature 0.2
PARAMETER num_ctx 4096

SYSTEM """
你是资深软件工程师，擅长：
- 编写高质量代码
- 代码审查和优化
- 架构设计
- 调试问题

请提供完整、可运行的代码，并附带必要的注释。
"""
EOF

ollama create coder -f coder.Modelfile
```

### 3. 文档生成器

```python
import requests

def generate_docs(code, language="python"):
    """自动生成代码文档"""
    response = requests.post('http://localhost:11434/api/generate', json={
        'model': 'llama3.2',
        'prompt': f'''请为以下{language}代码生成文档：

```{language}
{code}
```

请包含：
1. 功能说明
2. 参数说明
3. 返回值说明
4. 使用示例
''',
        'stream': False
    })
    return response.json()['response']
```

### 4. 数据分析助手

```python
def analyze_data(df_description):
    """分析数据并提供洞察"""
    prompt = f'''
我有一份数据集，结构如下：
{df_description}

请帮我：
1. 分析数据特点
2. 指出潜在问题
3. 建议分析方法
4. 推荐可视化方案
'''
    
    response = requests.post('http://localhost:11434/api/chat', json={
        'model': 'llama3.2',
        'messages': [{'role': 'user', 'content': prompt}],
        'stream': False
    })
    return response.json()['message']['content']
```

### 5. 本地 RAG 系统

```python
from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma

# 初始化
llm = Ollama(model="llama3.2")
embeddings = OllamaEmbeddings(model="llama3.2")

# 文档处理
documents = ["文档 1 内容", "文档 2 内容", ...]
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# 向量存储
vectorstore = Chroma.from_documents(chunks, embeddings)

# 检索问答
def rag_query(question):
    docs = vectorstore.similarity_search(question, k=3)
    context = "\n\n".join([d.page_content for d in docs])
    
    prompt = f"""基于以下信息回答问题：
{context}

问题：{question}
回答："""
    
    return llm.invoke(prompt)
```

---

## 故障排除

### 常见问题

#### 1. 模型下载慢

```bash
# 使用镜像源
export OLLAMA_DOWNLOAD_HOST=https://ollama.fly.dev

# 断点续传
ollama pull llama3.2
```

#### 2. GPU 未被使用

```bash
# 检查 GPU 驱动
nvidia-smi  # NVIDIA
rocm-smi    # AMD

# 检查 Ollama 配置
ollama ps

# 重启服务
ollama serve
```

#### 3. 内存不足

```bash
# 使用更小的模型
ollama run llama3.2:1b

# 减少上下文
export OLLAMA_CONTEXT_LENGTH=1024

# 关闭其他应用
```

#### 4. API 连接失败

```bash
# 检查服务状态
curl http://localhost:11434/api/tags

# 重启服务
ollama serve

# 检查防火墙
# Windows: 允许 11434 端口
# Linux: sudo ufw allow 11434
```

### 日志调试

```bash
# 查看详细日志
export OLLAMA_DEBUG=1
ollama serve

# 查看系统日志
# macOS: log show --predicate 'process == "ollama"' --last 1h
# Linux: journalctl -u ollama
# Windows: 事件查看器
```

---

## 最佳实践

### 1. 模型选择建议

| 需求 | 推荐模型 | 显存需求 |
|------|---------|---------|
| 日常对话 | Llama 3.2 3B | 4GB |
| 代码生成 | CodeLlama 13B | 12GB |
| 中文应用 | Qwen2.5 7B | 8GB |
| 复杂推理 | Llama 3.2 70B | 48GB+ |

### 2. 安全建议

```bash
# 不要暴露到公网
# 默认只监听 localhost

# 如需局域网访问，添加认证
export OLLAMA_HOST="0.0.0.0:11434"
# 配合反向代理（Nginx）添加认证
```

### 3. 性能建议

- 使用量化模型节省显存
- 根据任务调整 temperature 参数
- 合理设置上下文长度
- 定期清理不用的模型

### 4. 开发建议

```bash
# 使用 Modelfile 固化配置
# 版本控制 Modelfile
# 为不同场景创建专用模型
# 使用 API 而非 CLI 集成
```

---

## 总结

Ollama 让本地运行大模型变得前所未有的简单。通过本指南，你应该已经掌握了：

- ✅ 安装和配置 Ollama
- ✅ 模型管理和自定义
- ✅ API 集成方法
- ✅ 性能优化技巧
- ✅ 实际应用场景

现在，开始构建你的本地 AI 应用吧！🚀

---

**参考资源：**

- 官网：https://ollama.com
- 文档：https://docs.ollama.com
- GitHub: https://github.com/ollama/ollama
- 模型库：https://ollama.com/library

---

*最后更新：2026-03-13*
