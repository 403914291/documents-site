---
layout: doc
---

# Transformer

> 现代大语言模型的"发动机"

---

## 4.1 Transformer 是什么？

**Transformer** 是所有现代语言模型（LLM）的基础架构。它的出现彻底改变了自然语言处理（NLP）领域。

Transformer 主要解决了两个核心问题：

1. **如何理解一段话中哪些信息最重要？**
2. **如何并行处理海量文本，不像循环神经网络（RNN）那样慢吞吞？**

答案就是：**自注意力机制（Self-Attention）** + **并行结构（Parallel Architecture）**

---

## 4.2 Transformer 为什么重要？

如果把语言模型看作一个"能够理解和生成文本的系统"，那么 Transformer 就是它的底层引擎。

Transformer 的架构让模型能够：

- ✅ 自动捕获长距离依赖关系
- ✅ 实现完全并行训练，极大提升效率
- ✅ 支持扩展到图像、语音等多模态任务

---

## 4.3 从工程师视角理解 Transformer

从工程师视角来看，Transformer 可以拆分为三大部分：

| 部分 | 功能 | 类比 |
|------|------|------|
| **Embedding（输入适配器）** | 将文本转为向量表示，加入位置信息 | API 请求转换器 |
| **Encoder / Decoder** | 两段式处理流水线，分别负责理解输入和生成输出 | 微服务处理链 |
| **Self-Attention（智能调度器）** | 动态决定每个 token 关注哪些信息 | Kubernetes Scheduler |

---

## 4.4 Transformer 的核心：它像一个"智能调度系统"

Transformer 的核心机制是**自注意力（Self-Attention）**，你可以把它类比为 Kubernetes 的 scheduler，只不过它调度的不是 Pod，而是"文本中的信息"。

### Self-Attention = 决定当前 token 该关注哪些历史 token

Attention 的工作流程可以总结为：

1. 匹配 Query 和 Key，计算相似度
2. 通过 Softmax 得到注意力权重
3. 用权重加权 Value，得到最终信息

这就像 Scheduler：
- 查看当前调度请求（Q）
- 查看所有 Node 信息（K）
- 计算得分（注意力权重）
- 选择最合适的 Node（V）

---

## 4.5 Self-Attention 内部到底发生了什么？

### Self-Attention 计算流程

```
Token Embedding
    ↓
线性变换生成 Q / K / V
    ↓
Query × Keyᵗ
    ↓
相似度计算 → Softmax
    ↓
变成注意力权重
    ↓
权重 × V
    ↓
加权求和 → 上下文向量
    ↓
送往下一层
```

### 关键理解

| 向量 | 含义 |
|------|------|
| **Q** | 决定"我想找什么" |
| **K** | 决定"我能提供什么" |
| **相似度** | 越高说明越相关 |
| **权重** | 越高代表越重要 |

**权重 × V 的结果就是模型真正关心的上下文。**

---

## 4.6 Multi-Head Attention：不是一个调度器，而是 N 个

**多头注意力（Multi-Head Attention）** 机制可以理解为多个调度器并行工作，每个 Head 关注不同的语义特征（如位置、语法、实体关系、长距离依赖等）。

### 多头注意力结构

```
输入
    ↓
┌─────────────────────────────────┐
│  Head 1  │  Head 2  │  Head 3  │  ...  │  Head N  │
└─────────────────────────────────┘
    ↓
拼接 + 线性变换
    ↓
输出上下文向量
```

### 工程师视角

- **多头 = 多视角**：每个头关注不同特征
- **拼接后合并 = 整体理解语义**

---

## 4.7 Feed Forward Network（FFN）：类似业务逻辑处理器

Self-Attention 负责捕获"关系"，而**前馈网络（Feed Forward Network, FFN）**则负责捕获"模式"。

### Service Mesh 类比

| Transformer 组件 | Service Mesh 类比 | 功能 |
|-----------------|------------------|------|
| Self-Attention | Envoy Sidecar | 负责路由和策略 |
| FFN | Workload | 决定业务逻辑（如转换、推断） |

### Transformer Block 结构

```
输入 → Attention → FFN → 输出
```

这种结构让模型既能理解上下文关系，又能执行语义级别的处理。

---

## 4.8 Residual + LayerNorm：像 Sidecar 的校验和稳定机制

没有残差连接（Residual），模型会：

- ❌ 无法训练深层结构
- ❌ 信息容易中断
- ❌ 梯度会爆炸或消失

### 你可以把它理解成

| 机制 | Kubernetes 类比 | 作用 |
|------|----------------|------|
| **残差连接** | 保留原始输入的旁路（类似 controller 的对照原状态） | 信息传递 |
| **LayerNorm** | 每层的健康检查与校验器 | 保持数值稳定 |

### Residual + LayerNorm 组合结构

```
输入特征
    ↓
Attention（捕获关系后输出）
    ↓
+ 残差连接（与原输入相加）
    ↓
LayerNorm（归一化）
    ↓
FFN（模式提取后输出）
    ↓
+ 残差连接
    ↓
LayerNorm
    ↓
输出特征
```

这种设计保证了模型的稳定性和可训练性。

---

## 4.9 Encoder vs Decoder：为什么 LLM 只用 Decoder？

早期 Transformer 架构包含 Encoder 和 Decoder 两部分：

| 组件 | 作用 | 应用场景 |
|------|------|----------|
| **Encoder** | 提取输入的语义表示 | 翻译、分类 |
| **Decoder** | 根据上下文逐字生成内容 | LLM、文本生成 |

**大语言模型（如 GPT 系列）只使用 Decoder 堆栈**，因为它：

- 逐字生成
- 需要掩码自注意力（防止"偷看"未来）
- 天然适合对话与生成式任务

### 一句话总结

> **LLM = 仅 Decoder 的 Transformer**

---

## 总结

Transformer 可以被看作：

1. **能自动确定"该关注什么信息"的智能调度系统**
2. **能并行处理所有输入的结构化计算图**
3. **由 Attention + FFN 组成的深度流水线处理架构**

### 它之所以能引领 AI 时代，原因在于

| 能力 | 说明 |
|------|------|
| 能理解长距离依赖 | 捕获跨词、跨句的语义关联 |
| 能完全并行训练 | 比 RNN 快 100 倍 |
| 能扩展到图像、语音、多模态 | 通用架构 |
| 能利用 KV Cache 实现高速推理 | 工程优化空间大 |
| 是所有现代语言模型（LLM）的底层架构 | 基础性地位 |

---

*最后更新：2026-03-23*
