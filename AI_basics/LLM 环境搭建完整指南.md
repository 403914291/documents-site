# LLM 环境搭建完整指南

> 📚 本指南详细介绍学习和开发大语言模型（LLM）所需的环境配置，从零基础到完整开发环境，帮助你快速搭建并验证 LLM 学习环境。

**适用人群：**
- 🎯 想要学习大语言模型的开发者
- 🎯 需要搭建 LLM 实验环境的研究人员
- 🎯 想要本地运行大模型的爱好者

**预计时间：** 30-60 分钟

---

## 📋 目录

1. [快速开始（推荐路线）](#1-快速开始推荐路线)
2. [Python 环境配置](#2-python-环境配置)
3. [深度学习框架安装](#3-深度学习框架安装)
4. [LLM 核心库安装](#4-llm-核心库安装)
5. [Jupyter 从安装到使用](#5-jupyter-从安装到使用)
6. [GPU 环境配置（可选）](#6-gpu-环境配置可选)
7. [环境验证](#7-环境验证)
8. [常见问题排查](#8-常见问题排查)

---

## 1. 快速开始（推荐路线）

### 🚀 方案选择

**根据你的需求选择适合的方案：**

| 方案 | 适用场景 | 难度 | 时间 |
|------|----------|------|------|
| **方案 A：Conda 一键安装** | 新手推荐，最省心 | ⭐ | 15 分钟 |
| **方案 B：venv 轻量安装** | 有 Python 基础 | ⭐⭐ | 10 分钟 |
| **方案 C：GPU 完整安装** | 有 NVIDIA 显卡，需要训练 | ⭐⭐⭐ | 30 分钟 |

---

### 方案 A：Conda 一键安装（⭐ 新手推荐）

```powershell
# 1. 下载并安装 Miniconda
# Windows: https://docs.conda.io/en/latest/miniconda.html
# 安装时勾选"Add to PATH"

# 2. 创建 LLM 专用环境
conda create -n llm python=3.10 -y

# 3. 激活环境
conda activate llm

# 4. 一键安装所有依赖
conda install -y pytorch torchvision torchaudio -c pytorch
pip install transformers datasets accelerate peft huggingface_hub langchain jupyterlab

# 5. 验证安装
python -c "import torch; print('PyTorch:', torch.__version__)"
```

✅ **完成！** 继续到 [环境验证](#7-环境验证) 章节

---

### 方案 B：venv 轻量安装

```powershell
# 1. 确保已安装 Python 3.10 或 3.11
python --version

# 2. 创建虚拟环境
python -m venv llm_env

# 3. 激活环境
# Windows
llm_env\Scripts\activate
# Linux/Mac
source llm_env/bin/activate

# 4. 升级 pip
python -m pip install --upgrade pip

# 5. 安装核心依赖
pip install torch torchvision torchaudio
pip install transformers datasets accelerate peft huggingface_hub

# 6. 验证安装
python -c "import torch; print('PyTorch:', torch.__version__)"
```

✅ **完成！** 继续到 [环境验证](#7-环境验证) 章节

---

### 方案 C：GPU 完整安装（需要 NVIDIA 显卡）

```powershell
# 1. 检查 GPU 驱动
nvidia-smi
# 确认 CUDA Version >= 11.8

# 2. 创建 Conda 环境
conda create -n llm-gpu python=3.10 -y
conda activate llm-gpu

# 3. 安装 CUDA 版本 PyTorch
# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# 或 CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 4. 安装 LLM 专用库
pip install transformers datasets accelerate peft bitsandbytes huggingface_hub
pip install langchain langchain-community llama-index

# 5. 验证 GPU
python -c "import torch; print('CUDA 可用:', torch.cuda.is_available())"
```

✅ **完成！** 继续到 [环境验证](#7-环境验证) 章节

---

## 2. Python 环境配置

### 2.1 Python 版本选择

**✅ 推荐版本：Python 3.10 或 3.11**

```bash
# 检查 Python 版本
python --version
```

> ⚠️ **重要提示：**
> - ❌ 避免使用 Python 3.12+（部分库尚未完全兼容）
> - ❌ 避免使用 Python 3.9 及以下（已停止支持）

### 2.2 为什么需要虚拟环境？

虚拟环境可以：
- 🔒 **隔离依赖**：不同项目使用不同版本的库
- 🧹 **保持清洁**：不污染系统 Python
- 📦 **方便导出**：轻松分享环境配置

### 2.3 Conda vs venv 对比

| 特性 | Conda | venv |
|------|-------|------|
| 适用场景 | 数据科学、深度学习 | 一般 Python 项目 |
| 包管理 | conda + pip | 仅 pip |
| 跨平台 | ✅ 优秀 | ✅ 良好 |
| 磁盘占用 | 较大（~2GB） | 较小（~500MB） |
| 推荐度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 3. 深度学习框架安装

### 3.1 PyTorch 安装（必装）

**CPU 版本（学习/测试）：**

```bash
pip install torch torchvision torchaudio
```

**GPU 版本（训练/推理）：**

```bash
# 先检查 CUDA 版本
nvidia-smi

# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

**验证安装：**

```python
import torch

print(f"PyTorch 版本：{torch.__version__}")
print(f"CUDA 可用：{torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"GPU 数量：{torch.cuda.device_count()}")
    print(f"当前 GPU: {torch.cuda.get_device_name(0)}")
```

### 3.2 TensorFlow 安装（可选）

```bash
# 基础安装
pip install tensorflow

# GPU 支持
pip install tensorflow[and-cuda]
```

---

## 4. LLM 核心库安装

### 4.1 核心依赖清单

| 库名 | 用途 | 必装 |
|------|------|------|
| `transformers` | Hugging Face 模型库 | ✅ |
| `datasets` | 数据集加载 | ✅ |
| `accelerate` | 加速训练 | ✅ |
| `peft` | 参数高效微调 | ✅ |
| `huggingface_hub` | 模型下载 | ✅ |
| `langchain` | 应用开发框架 | ⭐推荐 |
| `bitsandbytes` | 8bit 量化 | ⭐推荐 |

### 4.2 一键安装命令

```bash
# 基础包（必装）
pip install transformers datasets accelerate peft huggingface_hub

# 进阶包（推荐）
pip install langchain langchain-community bitsandbytes sentencepiece

# 开发工具（可选）
pip install jupyterlab ipykernel black flake8
```

### 4.3 快速测试

```python
# 测试 Transformers
from transformers import pipeline

# 文本生成
generator = pipeline("text-generation", model="gpt2")
result = generator("Hello, I'm a language model", max_length=30)
print(result[0]['generated_text'])

# 测试成功！
print("✅ Transformers 工作正常！")
```

---

## 5. Jupyter 从安装到使用

> 💡 **Jupyter Notebook** 是数据科学和机器学习最常用的交互式开发环境，支持代码、公式、图表和文字的混合编写。

### 5.1 Jupyter 安装

**方法一：pip 安装（推荐）**

```bash
# 激活你的虚拟环境后
conda activate llm  # 或 source llm_env/bin/activate

# 安装 JupyterLab（新一代界面）
pip install jupyterlab

# 安装 Jupyter Notebook（经典界面）
pip install notebook

# 安装 IPython 内核
pip install ipykernel
```

**方法二：Conda 安装**

```bash
conda install -c conda-forge jupyterlab notebook
```

**验证安装：**

```bash
jupyter --version
jupyter lab --version
```

### 5.2 启动 Jupyter

**启动 JupyterLab（推荐）：**

```bash
# 在项目目录下启动
cd your-project-folder
jupyter lab
```

**启动 Jupyter Notebook：**

```bash
jupyter notebook
```

启动后会自动打开浏览器，访问 `http://localhost:8888`

### 5.3 配置 Jupyter 支持中文显示

创建配置文件避免中文乱码：

```bash
# 生成配置文件
jupyter notebook --generate-config

# 或使用 Python 命令
python -c "from jupyter_core.paths import jupyter_config_dir; print(jupyter_config_dir())"
```

编辑配置文件 `jupyter_notebook_config.py`，添加：

```python
# 设置默认编码
c.NotebookApp.default_encoding = 'utf-8'

# 允许远程访问（可选）
c.NotebookApp.ip = '0.0.0.0'
c.NotebookApp.port = 8888
c.NotebookApp.open_browser = False
```

### 5.4 为 LLM 环境添加专用内核

```bash
# 激活你的 LLM 环境
conda activate llm

# 添加为 Jupyter 内核
python -m ipykernel install --user --name=llm --display-name "Python (LLM)"

# 验证内核
jupyter kernelspec list
```

现在在 Jupyter 中选择 **Kernel → Change Kernel → Python (LLM)** 即可使用 LLM 环境。

### 5.5 Jupyter 常用快捷键

| 快捷键 | 功能 | 模式 |
|--------|------|------|
| `Shift+Enter` | 运行当前单元格 | 命令/编辑 |
| `Ctrl+Enter` | 运行当前单元格（不跳转） | 命令/编辑 |
| `Alt+Enter` | 运行并在下方插入新单元格 | 命令/编辑 |
| `A` | 在上方插入单元格 | 命令 |
| `B` | 在下方插入单元格 | 命令 |
| `D,D` | 删除单元格（按两次 D） | 命令 |
| `M` | 转为 Markdown 单元格 | 命令 |
| `Y` | 转为代码单元格 | 命令 |
| `Z` | 撤销删除 | 命令 |
| `Ctrl+S` | 保存 | 命令/编辑 |

### 5.6 Jupyter 实用技巧

**1. 使用 Magic 命令**

```python
# 查看代码执行时间
%timeit sum(range(1000))

# 显示 matplotlib 图表
%matplotlib inline

# 运行外部 Python 文件
%run script.py

# 查看变量信息
whos

# 清除所有变量
%reset -f
```

**2. 在 Notebook 中运行 Shell 命令**

```python
# Windows
!dir
!pip list

# Linux/Mac
!ls -la
!pip freeze > requirements.txt
```

**3. 使用 Markdown 写文档**

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

- 列表项 1
- 列表项 2

[链接文本](https://example.com)

![图片描述](image.png)

```python
# 代码块
print("Hello World")
```

$$
E = mc^2
$$
```

**4. 显示进度条**

```python
from tqdm.notebook import tqdm
import time

for i in tqdm(range(100), desc="处理中"):
    time.sleep(0.01)
```

### 5.7 在 Jupyter 中加载和测试 LLM

```python
# 1. 导入必要的库
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# 2. 检查 GPU
print(f"CUDA 可用：{torch.cuda.is_available()}")
device = "cuda" if torch.cuda.is_available() else "cpu"

# 3. 加载模型和分词器
model_name = "gpt2"
print(f"正在加载 {model_name}...")

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name).to(device)

print("✅ 模型加载完成！")

# 4. 文本生成函数
def generate_text(prompt, max_length=100):
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    outputs = model.generate(**inputs, max_length=max_length)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# 5. 测试生成
result = generate_text("今天天气不错，")
print(result)
```

### 5.8 Jupyter 扩展推荐

**安装扩展管理器：**

```bash
pip install jupyterlab-lsp jupyterlab-git
```

**推荐扩展：**

| 扩展名 | 功能 |
|--------|------|
| `jupyterlab-lsp` | 代码自动补全 |
| `jupyterlab-git` | Git 版本控制 |
| `jupyterlab-toc` | 目录导航 |
| `jupyterlab-drawio` | 流程图绘制 |
| `jupyterlab-templates` | 代码模板 |

### 5.9 Jupyter 常见问题

**问题 1：无法打开浏览器**

```bash
# 手动复制启动时显示的 URL
# 通常是 http://localhost:8888/?token=xxx
```

**问题 2：端口被占用**

```bash
# 使用其他端口
jupyter lab --port=8889
```

**问题 3：内核找不到**

```bash
# 重新安装内核
python -m ipykernel install --user --name=llm --display-name "Python (LLM)"
```

**问题 4：内存不足**

```python
# 在单元格中清理变量
%reset -f
import gc
gc.collect()
```

---

## 6. GPU 环境配置（可选）

### 6.1 检查 GPU 状态

```bash
# Windows/Mac/Linux
nvidia-smi
```

**输出示例：**
```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.104.05   Driver Version: 535.104.05   CUDA Version: 12.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce RTX 3090 | 00000000:01:00.0 Off |                  N/A |
+-------------------------------+----------------------+----------------------+
```

### 6.2 安装 NVIDIA 驱动

**Windows：**
1. 访问 [NVIDIA 驱动下载](https://www.nvidia.com/Download/index.aspx)
2. 选择显卡型号下载
3. 安装后重启

**Linux：**
```bash
sudo apt update
sudo apt install -y nvidia-driver-535
sudo reboot
```

### 6.3 显存优化技巧

如果遇到 `CUDA out of memory`：

```python
# 方法 1：使用 8bit 量化
from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    load_in_8bit=True,
    device_map="auto"
)

# 方法 2：减小 batch size
batch_size = 4  # 改为 2 或 1

# 方法 3：梯度累积
gradient_accumulation_steps = 4  # 等效增大 batch size

# 方法 4：清理缓存
import torch
import gc
torch.cuda.empty_cache()
gc.collect()
```

---

## 7. 环境验证

### 7.1 运行验证脚本

创建 `verify_env.py`：

```python
#!/usr/bin/env python3
"""LLM 环境验证脚本"""

def check_package(name):
    try:
        __import__(name)
        return "✅"
    except:
        return "❌"

print("=" * 50)
print("LLM 环境验证")
print("=" * 50)

packages = [
    "torch",
    "transformers",
    "datasets",
    "accelerate",
    "peft",
    "huggingface_hub",
]

print(f"\n{'包名':<20} {'状态':<10}")
print("-" * 30)

for pkg in packages:
    status = check_package(pkg)
    print(f"{pkg:<20} {status:<10}")

# GPU 检查
print("\n" + "=" * 50)
print("GPU 检查")
print("=" * 50)

try:
    import torch
    if torch.cuda.is_available():
        print(f"✅ CUDA 可用")
        print(f"   GPU: {torch.cuda.get_device_name(0)}")
        print(f"   显存：{torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")
    else:
        print("⚠️  CPU 模式（可以学习，训练较慢）")
except Exception as e:
    print(f"❌ {e}")

print("\n" + "=" * 50)
```

运行：
```bash
python verify_env.py
```

### 7.2 完整测试

```python
# 测试模型加载
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "gpt2"
print(f"正在加载 {model_name}...")

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

print("✅ 模型加载成功！")

# 测试生成
input_text = "今天天气不错，"
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(**inputs, max_length=50)
print(f"生成结果：{tokenizer.decode(outputs[0])}")
```

---

## 8. 常见问题排查

### 8.1 下载速度慢

**问题：** Hugging Face 模型下载太慢

**解决方案：**

```bash
# 使用镜像站
export HF_ENDPOINT=https://hf-mirror.com

# Windows PowerShell
$env:HF_ENDPOINT = "https://hf-mirror.com"

# 然后下载
huggingface-cli download meta-llama/Llama-2-7b-hf
```

### 8.2 权限问题

**问题：** `You are trying to access a gated repo`

**解决方案：**

```bash
# 1. 注册 Hugging Face 账号
# https://huggingface.co/join

# 2. 创建 Access Token
# Settings -> Access Tokens -> New Token

# 3. 登录
huggingface-cli login
# 粘贴你的 token

# 4. 接受模型协议
# 访问模型页面，点击"Agree and access"
```

### 8.3 依赖冲突

**问题：** `pip install` 报错依赖冲突

**解决方案：**

```bash
# 创建全新环境
conda create -n llm-clean python=3.10 -y
conda activate llm-clean

# 按顺序安装
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install transformers datasets accelerate
pip install peft bitsandbytes

# 检查冲突
pip check
```

### 8.4 导入错误

**问题：** `ImportError: DLL load failed`

**解决方案：**

```bash
# Windows：安装 Visual C++ 运行库
# https://aka.ms/vs/17/release/vc_redist.x64.exe

# 重新安装 PyTorch
pip uninstall torch torchvision torchaudio
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### 8.5 Jupyter 内核问题

**问题：** Jupyter 中找不到创建的环境

**解决方案：**

```bash
# 激活环境后安装内核
conda activate llm
python -m ipykernel install --user --name=llm --display-name "Python (LLM)"

# 重启 Jupyter
jupyter notebook
# 选择 Kernel -> Python (LLM)
```

---

## 📚 下一步学习

环境搭建完成后，建议继续学习：

1. **[Transformers 基础](./04-Transformers 基础.md)** - 加载和使用预训练模型
2. **[Prompt Engineering](./05-提示词工程.md)** - 提示词技巧
3. **[模型微调](./06-模型微调.md)** - Fine-tuning 实践
4. **[RAG 应用](./07-RAG 检索增强.md)** - 检索增强生成

---

## 🔗 参考资源

- [PyTorch 官方文档](https://pytorch.org/docs/)
- [Hugging Face 课程](https://huggingface.co/learn)
- [LangChain 文档](https://python.langchain.com/docs/)
- [LLM University](https://github.com/rom1504/llm-university)

---

**最后更新：** 2026 年 3 月 30 日

**作者：** 小蛋蛋 🦞
