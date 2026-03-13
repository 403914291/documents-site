# LlamaIndex 完全指南：RAG 数据索引框架

> 让大模型理解你的私有数据

---

## 目录

1. [什么是 LlamaIndex？](#什么是-llamaindex)
2. [快速开始](#快速开始)
3. [核心概念](#核心概念)
4. [数据连接](#数据连接)
5. [索引构建](#索引构建)
6. [查询引擎](#查询引擎)
7. [高级用法](#高级用法)
8. [实际应用场景](#实际应用场景)
9. [性能优化](#性能优化)
10. [最佳实践](#最佳实践)

---

## 什么是 LlamaIndex？

### 简介

**LlamaIndex** 是一个数据框架，用于构建大语言模型（LLM）应用，特别适合处理私有数据。它提供了数据连接、索引、查询的完整解决方案，是 RAG（检索增强生成）领域最流行的框架之一。

### 核心功能

| 功能 | 说明 | 应用场景 |
|------|------|---------|
| 📚 **数据连接** | 连接 100+ 数据源 | API、数据库、PDF、Notion 等 |
| 🔍 **智能索引** | 多种索引策略 | 向量索引、树索引、关键词索引 |
| 💬 **查询引擎** | 灵活的查询接口 | 问答、摘要、结构化查询 |
| 🤖 **Agent 支持** | 构建智能代理 | 自主决策、工具调用 |
| 📊 **评估框架** | 应用性能评估 | 准确率、召回率测试 |

### 适用场景

- **企业知识库**：构建内部文档问答系统
- **智能客服**：基于产品文档的自动回复
- **研究助手**：论文、报告的智能检索
- **数据分析**：结合私有数据的洞察分析

---

## 快速开始

### 安装

```bash
# 基础安装
pip install llama-index

# 完整安装（包含所有集成）
pip install llama-index-all

# 按需安装
pip install llama-index-llms-openai
pip install llama-index-embeddings-huggingface
pip install llama-index-vector-stores-chroma
```

### 5 分钟快速示例

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 1. 加载文档
documents = SimpleDirectoryReader("./data").load_data()

# 2. 构建索引
index = VectorStoreIndex.from_documents(documents)

# 3. 创建查询引擎
query_engine = index.as_query_engine()

# 4. 开始查询
response = query_engine.query("公司的年假政策是什么？")
print(response)
```

### 流式输出

```python
from llama_index.core import Settings

# 启用流式
Settings.callback_manager.on_event_end = lambda event: print(event.payload, end="")

query_engine = index.as_query_engine(streaming=True)
response = query_engine.query("介绍一下公司产品")
response.print_response_stream()
```

---

## 核心概念

### 架构概览

```
┌─────────────────────────────────────────────────┐
│                   应用层                         │
│            (Chat Engine / Query Engine)          │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│                   索引层                         │
│      (Vector Index / Tree Index / Keyword)      │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│                   数据层                         │
│    (Documents / Nodes / Embeddings / Vector)    │
└─────────────────────────────────────────────────┘
```

### 核心组件

#### Document（文档）

```python
from llama_index.core import Document

# 创建文档
doc = Document(
    text="这是文档内容...",
    metadata={"source": "manual.pdf", "page": 1},
    id_="doc_001"
)

# 从文件加载
from llama_index.core import SimpleDirectoryReader
documents = SimpleDirectoryReader("./data").load_data()
```

#### Node（节点）

```python
from llama_index.core.node_parser import SentenceSplitter

# 文档切分
parser = SentenceSplitter(
    chunk_size=512,      # 每块 token 数
    chunk_overlap=50     # 重叠 token 数
)

nodes = parser.get_nodes_from_documents(documents)
```

#### Embedding（嵌入）

```python
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# 配置嵌入模型
embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-small-zh-v1.5",
    device="cuda"
)

# 设置全局嵌入模型
from llama_index.core import Settings
Settings.embed_model = embed_model
```

---

## 数据连接

### 支持的数据源

| 类型 | 数据源 | 安装 |
|------|--------|------|
| **文件** | PDF、Word、Markdown | `llama-index-readers-file` |
| **数据库** | PostgreSQL、MySQL、MongoDB | `llama-index-readers-database` |
| **云存储** | Google Drive、OneDrive、S3 | `llama-index-readers-google` |
| **API** | Notion、Confluence、Jira | `llama-index-readers-notion` |
| **网页** | 网站爬取 | `llama-index-readers-web` |

### 文件读取

```python
from llama_index.core import SimpleDirectoryReader

# 读取所有文件
documents = SimpleDirectoryReader("./data").load_data()

# 读取特定文件
documents = SimpleDirectoryReader(
    input_files=["manual.pdf", "guide.docx"]
).load_data()

# 递归读取
documents = SimpleDirectoryReader(
    "./data",
    recursive=True,
    required_exts=[".pdf", ".md", ".txt"]
).load_data()

# 自定义文件元数据
def file_metadata(filename):
    return {"category": "technical", "year": "2024"}

documents = SimpleDirectoryReader(
    "./data",
    file_metadata=file_metadata
).load_data()
```

### 数据库读取

```python
from llama_index.readers.database import DatabaseReader

# 连接数据库
reader = DatabaseReader(
    scheme="postgresql",
    host="localhost",
    port=5432,
    user="postgres",
    password="password",
    dbname="mydb"
)

# 执行查询
documents = reader.load_data("SELECT * FROM articles WHERE status='published'")
```

### Notion 集成

```python
from llama_index.readers.notion import NotionPageReader

# 配置 Notion
reader = NotionPageReader(integration_token="your_notion_token")

# 读取页面
documents = reader.load_data(
    page_ids=["page_id_1", "page_id_2"]
)
```

### 网页爬取

```python
from llama_index.readers.web import SimpleWebPageReader

# 读取网页
reader = SimpleWebPageReader(html_to_text=True)
documents = reader.load_data(
    ["https://example.com/page1", "https://example.com/page2"]
)
```

---

## 索引构建

### 向量索引（Vector Index）

```python
from llama_index.core import VectorStoreIndex

# 从文档创建索引
index = VectorStoreIndex.from_documents(
    documents,
    show_progress=True
)

# 从节点创建索引
index = VectorStoreIndex(nodes)

# 保存索引
index.storage_context.persist("./storage")

# 加载索引
from llama_index.core import StorageContext, load_index_from_storage
storage_context = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(storage_context)
```

### 树索引（Tree Index）

```python
from llama_index.core import TreeIndex

# 构建树索引（适合摘要任务）
index = TreeIndex.from_documents(
    documents,
    max_depth=4,
    child_branch_factor=2
)

query_engine = index.as_query_engine(
    response_mode="tree_summarize"
)
```

### 关键词索引（Keyword Index）

```python
from llama_index.core import KeywordTableIndex

# 构建关键词索引
index = KeywordTableIndex.from_documents(documents)

# 查询
query_engine = index.as_query_engine(
    similarity_top_k=5
)
```

### 混合索引（Hybrid Index）

```python
from llama_index.core import VectorStoreIndex, KeywordTableIndex
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import RecursiveRetriever

# 创建多个检索器
vector_retriever = VectorStoreIndex(nodes).as_retriever(similarity_top_k=3)
keyword_retriever = KeywordTableIndex(nodes).as_retriever(similarity_top_k=3)

# 混合检索
query_engine = RetrieverQueryEngine.from_args(
    retriever=RecursiveRetriever(
        root_id="root",
        retriever_dict={
            "vector": vector_retriever,
            "keyword": keyword_retriever
        }
    )
)
```

### 向量存储集成

```python
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext, VectorStoreIndex
import chromadb

# 创建 Chroma 向量存储
chroma_client = chromadb.PersistentClient(path="./chroma_db")
chroma_collection = chroma_client.get_or_create_collection("my_collection")
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

# 创建存储上下文
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# 构建索引
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context
)
```

---

## 查询引擎

### 基础查询

```python
# 创建查询引擎
query_engine = index.as_query_engine(
    similarity_top_k=5,        # 返回最相关的 5 个节点
    response_mode="default",   # 响应模式
    streaming=False            # 是否流式输出
)

# 查询
response = query_engine.query("公司的报销流程是什么？")
print(str(response))

# 获取引用节点
for node in response.source_nodes:
    print(f"来源：{node.metadata['source']}")
    print(f"内容：{node.text[:200]}...")
```

### 响应模式

```python
# default - 默认模式
query_engine = index.as_query_engine(response_mode="default")

# compact - 紧凑模式（适合长回答）
query_engine = index.as_query_engine(response_mode="compact")

# refine - 精炼模式（多次迭代优化）
query_engine = index.as_query_engine(response_mode="refine")

# tree_summarize - 树形摘要（适合树索引）
query_engine = index.as_query_engine(response_mode="tree_summarize")

# simple_summarize - 简单摘要
query_engine = index.as_query_engine(response_mode="simple_summarize")
```

### 过滤查询

```python
from llama_index.core.vector_stores import FilterCondition, MetadataFilter

# 创建过滤器
filters = MetadataFilter.from_dicts(
    [
        {"key": "category", "value": "technical"},
        {"key": "year", "value": "2024", "operator": "=="},
    ],
    condition=FilterCondition.AND
)

# 应用过滤器
query_engine = index.as_query_engine(filters=filters)
response = query_engine.query("2024 年的技术文档")
```

### 多步查询

```python
from llama_index.core.query_engine import MultiStepQueryEngine

# 创建多步查询引擎
query_engine = MultiStepQueryEngine(
    query_engine=index.as_query_engine(),
    max_steps=3
)

response = query_engine.query(
    "比较公司 2023 年和 2024 年的技术栈变化"
)
```

---

## 高级用法

### RAG 优化技巧

```python
from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# 配置 LLM
Settings.llm = OpenAI(model="gpt-4", temperature=0.1)

# 配置嵌入模型
Settings.embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-large-zh-v1.5"
)

# 配置分块大小
Settings.chunk_size = 512
Settings.chunk_overlap = 50

# 配置相似度阈值
Settings.similarity_top_k = 5
Settings.similarity_cutoff = 0.7
```

### 查询重写

```python
from llama_index.core.query_transform import StepDecomposeQueryTransform

# 查询重写（将复杂问题分解为简单问题）
query_transform = StepDecomposeQueryTransform(
    llm=Settings.llm,
    verbose=True
)

query_engine = index.as_query_engine()
response = query_engine.query(
    "公司的技术栈是什么？主要使用哪些编程语言？"
)
```

### 路由查询

```python
from llama_index.core.query_engine import RouterQueryEngine
from llama_index.core.selectors import LLMSingleSelector

# 创建多个查询引擎
vector_engine = vector_index.as_query_engine()
keyword_engine = keyword_index.as_query_engine()
summary_engine = summary_index.as_query_engine()

# 创建路由查询引擎
query_engine = RouterQueryEngine(
    selector=LLMSingleSelector.from_defaults(),
    query_engine_tools=[
        QueryEngineTool(
            query_engine=vector_engine,
            metadata=QueryEngineMetadata(
                name="vector_search",
                description="使用向量搜索查找相关内容"
            )
        ),
        QueryEngineTool(
            query_engine=keyword_engine,
            metadata=QueryEngineMetadata(
                name="keyword_search",
                description="使用关键词搜索查找精确匹配"
            )
        )
    ]
)
```

### 对话引擎

```python
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.chat_engine import CondenseQuestionChatEngine

# 创建对话引擎
chat_engine = CondenseQuestionChatEngine.from_defaults(
    index.as_retriever(similarity_top_k=3),
    memory=ChatMemoryBuffer.from_defaults(token_limit=3500),
    llm=Settings.llm,
    verbose=True
)

# 多轮对话
response1 = chat_engine.chat("什么是 RAG？")
print(response1)

response2 = chat_engine.chat("它有什么优势？")
print(response2)

response3 = chat_engine.chat("如何实现？")
print(response3)
```

---

## 实际应用场景

### 1. 企业知识库问答

```python
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    Settings
)
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.openai import OpenAI

# 配置
Settings.llm = OpenAI(model="gpt-4")
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-large-zh-v1.5")

# 加载企业文档
documents = SimpleDirectoryReader("./company_docs").load_data()

# 构建索引
index = VectorStoreIndex.from_documents(documents)

# 创建查询引擎
query_engine = index.as_query_engine(
    similarity_top_k=5,
    response_mode="refine"
)

# API 接口
from fastapi import FastAPI
app = FastAPI()

@app.post("/qa")
async def question_answer(question: str):
    response = query_engine.query(question)
    return {
        "answer": str(response),
        "sources": [
            {"file": node.metadata.get("file_name"), "text": node.text[:200]}
            for node in response.source_nodes
        ]
    }
```

### 2. 智能客服系统

```python
from llama_index.core.chat_engine import ContextChatEngine
from llama_index.core.memory import ChatMemoryBuffer

# 创建对话式客服
chat_engine = ContextChatEngine.from_defaults(
    index.as_retriever(similarity_top_k=3),
    memory=ChatMemoryBuffer.from_defaults(token_limit=4000),
    system_prompt="""你是一个专业的客服助手，基于以下上下文回答用户问题。
如果上下文中没有相关信息，请诚实地告诉用户你不知道。
回答要简洁、友好、专业。"""
)

# Web 界面集成
import gradio as gr

def chat(message, history):
    response = chat_engine.chat(message)
    return str(response)

gr.ChatInterface(chat).launch()
```

### 3. 论文检索助手

```python
from llama_index.readers.database import DatabaseReader
from llama_index.core import VectorStoreIndex

# 从数据库加载论文
reader = DatabaseReader(
    scheme="postgresql",
    host="localhost",
    user="postgres",
    password="pwd",
    dbname="papers"
)

documents = reader.load_data("""
    SELECT title, abstract, full_text 
    FROM papers 
    WHERE year >= 2020
""")

# 构建索引
index = VectorStoreIndex.from_documents(documents)

# 高级查询
query_engine = index.as_query_engine(
    similarity_top_k=10,
    response_mode="tree_summarize"
)

# 查询最新研究
response = query_engine.query(
    "总结 2024 年关于大语言模型推理优化的主要研究成果"
)
```

### 4. 代码文档助手

```python
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.core.node_parser import CodeSplitter

# 读取代码文件
documents = SimpleDirectoryReader(
    "./src",
    required_exts=[".py", ".js", ".ts"]
).load_data()

# 使用代码专用分块器
parser = CodeSplitter(
    language="python",
    chunk_lines=40,
    chunk_lines_overlap=15
)

nodes = parser.get_nodes_from_documents(documents)
index = VectorStoreIndex(nodes)

# 创建查询引擎
query_engine = index.as_query_engine(
    similarity_top_k=3,
    response_mode="compact"
)

# 查询代码用法
response = query_engine.query(
    "如何使用 authenticate 函数？请提供示例代码"
)
```

### 5. 多模态 RAG 系统

```python
from llama_index.core import MultiModalVectorStoreIndex
from llama_index.readers.file import ImageReader

# 加载图文档
image_docs = ImageReader().load_data("./images")
text_docs = SimpleDirectoryReader("./docs").load_data()

# 构建多模态索引
index = MultiModalVectorStoreIndex.from_documents(
    image_docs + text_docs
)

# 查询
query_engine = index.as_query_engine()
response = query_engine.query(
    "找出所有包含架构图的文档"
)
```

---

## 性能优化

### 索引优化

```python
# 并行构建索引
index = VectorStoreIndex.from_documents(
    documents,
    show_progress=True,
    num_workers=4  # 使用 4 个 worker 并行处理
)

# 增量更新
from llama_index.core import VectorStoreIndex

# 新文档
new_docs = SimpleDirectoryReader("./new_docs").load_data()

# 增量插入
for doc in new_docs:
    index.insert(doc)
```

### 查询优化

```python
# 启用结果缓存
from llama_index.core.query_engine import CachingQueryEngine

query_engine = CachingQueryEngine(
    index.as_query_engine(),
    cache_size=100
)

# 预取相关节点
from llama_index.core.postprocessor import SimilarityPostprocessor

query_engine = index.as_query_engine(
    node_postprocessors=[
        SimilarityPostprocessor(similarity_cutoff=0.7)
    ]
)
```

### 嵌入优化

```python
# 批量嵌入
from llama_index.core import Settings

Settings.embed_model.batch_size = 64  # 批量处理 64 个文本

# 使用更快的嵌入模型
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-small-zh-v1.5",  # 小模型，速度快
    device="cuda",
    cache_folder="./embedding_cache"
)
```

---

## 最佳实践

### 1. 数据准备建议

- 清理无关内容（页眉、页脚、广告）
- 添加有意义的元数据（来源、日期、类别）
- 合理设置分块大小（512-1024 tokens）
- 保持 10-15% 的重叠率

### 2. 模型选择建议

| 场景 | 嵌入模型 | LLM |
|------|---------|-----|
| 中文应用 | BGE-Large-Zh | Qwen2.5 |
| 英文应用 | text-embedding-3-large | GPT-4 |
| 多语言 | multilingual-e5-large | Claude |
| 本地部署 | m3e-base | Llama 3 |

### 3. 评估指标

```python
from llama_index.core.evaluation import FaithfulnessEvaluator

# 评估回答的忠实度
evaluator = FaithfulnessEvaluator(llm=Settings.llm)

# 批量评估
from llama_index.core.evaluation import DatasetGenerator

generator = DatasetGenerator.from_documents(documents)
eval_questions = generator.generate_questions_from_nodes(num_questions=50)

results = []
for question in eval_questions:
    response = query_engine.query(question)
    eval_result = evaluator.evaluate_response(response=response)
    results.append(eval_result.passing)

print(f"平均忠实度：{sum(results)/len(results)*100:.1f}%")
```

### 4. 监控告警

```python
# 记录查询日志
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("llama_index")

# 监控响应时间
import time

start = time.time()
response = query_engine.query(question)
elapsed = time.time() - start

if elapsed > 5:
    logger.warning(f"查询耗时过长：{elapsed:.2f}s")
```

---

## 总结

LlamaIndex 是构建 RAG 应用的首选框架。通过本指南，你应该已经掌握了：

- ✅ 核心概念和架构
- ✅ 数据连接和索引构建
- ✅ 查询引擎配置
- ✅ 高级用法和优化技巧
- ✅ 实际应用场景

现在，开始构建你的智能数据应用吧！🚀

---

**参考资源：**

- 官网：https://www.llamaindex.ai
- 文档：https://docs.llamaindex.ai
- GitHub: https://github.com/run-llama/llama_index
- LlamaHub: https://llamahub.ai

---

*最后更新：2026-03-13*
