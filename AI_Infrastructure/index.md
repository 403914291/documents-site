---
layout: doc
---

# AI 基础设施技术栈

> 大模型部署与应用开发的核心工具链

---

## 📚 技术文档

以下是 AI 基础设施领域的核心技术文档，涵盖从模型部署到应用开发的完整工具链：

### 🔹 Ollama - 本地模型运行

- **简介**：本地运行大模型的最佳选择，开箱即用
- **适用场景**：个人学习、离线环境、快速原型
- **难度**：⭐ 入门级

📖 [Ollama 完全指南](/AI_Infrastructure/01-Ollama 完全指南)

---

### 🔹 vLLM - 高性能推理引擎

- **简介**：UC Berkeley 出品，PagedAttention 技术，吞吐量提升 24 倍
- **适用场景**：高并发服务、生产环境部署
- **难度**：⭐⭐⭐ 进阶级

📖 [vLLM 完全指南](/AI_Infrastructure/02-vLLM 完全指南)

---

### 🔹 LlamaIndex - RAG 数据索引框架

- **简介**：领先的 RAG 框架，连接私有数据与大模型
- **适用场景**：企业知识库、智能客服、文档问答
- **难度**：⭐⭐ 中级

📖 [LlamaIndex 完全指南](/AI_Infrastructure/03-LlamaIndex 完全指南)

---

### 🔹 LMDeploy - 高效模型部署

- **简介**：商汤科技出品，推理速度超越 vLLM 1.8 倍
- **适用场景**：高性能推理、资源受限环境、国产化部署
- **难度**：⭐⭐⭐ 进阶级

📖 [LMDeploy 完全指南](/AI_Infrastructure/04-LMDeploy 完全指南)

---

### 🔹 LLaMA Factory - 一站式微调框架

- **简介**：支持 100+ 模型的高效微调工具
- **适用场景**：模型定制、领域适配、指令微调
- **难度**：⭐⭐⭐ 进阶级

📖 [LLaMA Factory 完全指南](/AI_Infrastructure/05-LLaMA-Factory 完全指南)（编写中）

---

## 🗺️ 学习路线

```
入门 → Ollama (本地体验)
  ↓
中级 → LlamaIndex (RAG 应用)
  ↓
高级 → vLLM / LMDeploy (高性能部署)
  ↓
专家 → LLaMA Factory (模型微调)
```

---

## 📊 技术对比

| 技术 | 主要用途 | 难度 | 性能 | 适用场景 |
|------|---------|------|------|---------|
| **Ollama** | 本地运行 | ⭐ | 中等 | 个人学习、原型开发 |
| **vLLM** | 推理服务 | ⭐⭐⭐ | 极高 | 高并发生产环境 |
| **LlamaIndex** | RAG 框架 | ⭐⭐ | 中等 | 知识库问答 |
| **LMDeploy** | 推理部署 | ⭐⭐⭐ | 极高 | 高性能/国产化 |
| **LLaMA Factory** | 模型微调 | ⭐⭐⭐ | N/A | 模型定制 |

---

## 🚀 快速开始

### 选择你的起点

**我是新手，想体验大模型：**
→ 从 [Ollama](/AI_Infrastructure/01-Ollama 完全指南) 开始

**我要构建知识库问答：**
→ 学习 [LlamaIndex](/AI_Infrastructure/03-LlamaIndex 完全指南)

**我需要部署生产服务：**
→ 选择 [vLLM](/AI_Infrastructure/02-vLLM 完全指南) 或 [LMDeploy](/AI_Infrastructure/04-LMDeploy 完全指南)

**我想微调自己的模型：**
→ 使用 [LLaMA Factory](/AI_Infrastructure/05-LLaMA-Factory 完全指南)

---

## 📖 相关资源

- [AI 基础概念](/AI_basics/) - 大模型基础知识
- [Claude Code](/AI_docs/Claude-Code) - AI 编程助手
- [OpenClaw](/OpenClaw/) - AI 助手框架

---

*最后更新：2026-03-13*
