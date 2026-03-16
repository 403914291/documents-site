# AI 应用开发环境准备

> 本指南帮助你从零开始搭建 AI 应用开发环境，涵盖 Conda 环境管理、Jupyter Lab 和 PyCharm 配置。

## 📋 目录

1. [Conda 基本介绍](#1-conda-基本介绍)
2. [Conda 安装](#2-conda-安装)
3. [Conda 常用命令](#3-conda-常用命令)
4. [Jupyter Lab 使用](#4-jupyter-lab-使用)
   - [代码补全与提示](#45-jupyterlab-高级配置)
   - [主题与外观](#452-主题与外观配置)
   - [快捷键配置](#453-常用快捷键配置)
5. [PyCharm 中使用 Conda 环境](#5-pycharm-中使用-conda-环境)
6. [常见问题解答](#6-常见问题解答)

---

## 1. Conda 基本介绍

### 1.1 什么是 Conda、MiniConda、Anaconda

| 名称 | 说明 | 大小 | 适用场景 |
|------|------|------|----------|
| **Conda** | 包和环境管理工具 | - | 核心工具 |
| **Anaconda** | Python 科学计算发行版 | ~3GB | 初学者、需要完整套件 |
| **Miniconda** | Anaconda 轻量版 | ~50MB | 推荐！节省空间、灵活定制 |

**Conda 的核心功能：**
- 📦 **包管理**：快速安装、运行和更新包及其依赖
- 🌐 **跨平台**：支持 Windows、macOS 和 Linux
- 🔄 **环境管理**：轻松创建、保存、加载和切换不同的 Python 环境

### 1.2 Anaconda 和 Miniconda 区别

```
Anaconda = Miniconda + 1500+ 预装科学计算包
```

| 对比项 | Anaconda | Miniconda |
|--------|----------|-----------|
| 安装包大小 | ~3GB | ~50MB |
| 预装包数量 | 1500+ | 仅基础包 |
| 磁盘占用 | 大 | 小 |
| 灵活性 | 较低 | 高 |
| 推荐度 | ⭐⭐ | ⭐⭐⭐⭐⭐ |

**建议**：选择 **Miniconda**，按需安装包，避免臃肿。

### 1.3 为什么要使用 Conda？

**问题场景**：
- 项目 A 需要 NumPy 1.2
- 项目 B 需要 NumPy 1.3
- 同一环境中无法共存两个版本 → **依赖冲突**

**解决方案**：使用虚拟环境隔离

```
项目 A → 环境 env_a → NumPy 1.2
项目 B → 环境 env_b → NumPy 1.3
```

**常用 Python 虚拟环境工具对比**：

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| **Conda** | 跨语言、二进制包管理 | 数据科学、AI 开发 |
| **venv** | Python 内置、轻量 | 纯 Python 项目 |
| **pipenv** | Pip + Virtualenv 结合 | Web 开发 |
| **Virtualenv** | 老牌工具 | 遗留项目 |

---

## 2. Conda 安装

### 2.1 Miniconda 下载安装

**下载地址**：
- 官网：https://www.anaconda.com/download
- 清华镜像：https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/

**安装步骤**：

1. 下载对应系统的安装包（Windows 选 `.exe`）
2. 双击运行，点击 "Next"
3. 同意许可协议
4. 选择安装路径（建议：`C:\ProgramData\Miniconda3`）
5. ⚠️ **不勾选** "Add Miniconda3 to PATH"（避免冲突）
6. 点击 "Install" 完成安装

**验证安装**：
打开 "Anaconda Powershell Prompt"，看到 `(base)` 前缀表示成功：

```powershell
(base) PS C:\Users\YourName> python --version
Python 3.11.x
(base) PS C:\Users\YourName> conda --version
conda 24.x.x
```

### 2.2 配置 Conda 镜像源（国内用户必备）

使用清华镜像源加速下载：

```powershell
# 添加清华源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/

# 设置显示源地址
conda config --set show_channel_urls yes

# 查看配置
conda config --show
```

### 2.3 使用 Anaconda Powershell Prompt

**为什么不用 CMD 或普通 PowerShell？**

Conda 环境激活需要特定的 shell 初始化，Anaconda Powershell Prompt 已预配置好。

**常用操作**：

```powershell
# 查看 Python 版本
python --version

# 查看 Conda 版本
conda --version

# 查看 Conda 信息
conda info
```

---

## 3. Conda 常用命令

### 3.1 基本命令速查表

| 命令 | 说明 | 示例 |
|------|------|------|
| `conda --version` | 查看版本 | `conda --version` |
| `conda info` | 查看 Conda 信息 | `conda info` |
| `conda list` | 列出已安装包 | `conda list` |
| `conda update conda` | 更新 Conda | `conda update conda` |
| `conda clean --all` | 清理缓存 | `conda clean --all` |
| `conda config --show` | 查看配置 | `conda config --show` |

### 3.2 环境管理

#### 3.2.1 创建 Conda 环境

```powershell
# 基础语法
conda create --name <环境名> python=<版本号> [包名...]

# 创建 Python 3.10 环境
conda create --name ai-dev python=3.10

# 创建时直接安装常用包
conda create --name ai-dev python=3.10 numpy pandas jupyter

# 指定环境路径（高级）
conda config --add envs_dirs D:\conda-envs\
```

**⚠️ 注意事项**：
- 环境名不要用中文
- Python 版本推荐 3.9-3.11（兼容性最好）
- 首次创建需要下载包，耐心等待

#### 3.2.2 切换 Conda 环境

```powershell
# 激活环境
conda activate ai-dev

# 退出环境，返回 base
conda deactivate

# 直接切换到另一个环境
conda activate another-env
```

**提示**：激活后命令行前缀会变化：
```
(base) → (ai-dev)
```

#### 3.2.3 查看 Conda 环境

```powershell
# 列出所有环境（* 表示当前激活的环境）
conda env list

# 或
conda info --envs
```

**输出示例**：
```
# conda environments:
#
base                  *  C:\ProgramData\Miniconda3
ai-dev                   C:\ProgramData\Miniconda3\envs\ai-dev
ml-project               C:\ProgramData\Miniconda3\envs\ml-project
```

#### 3.2.4 删除 Conda 环境

```powershell
# 删除指定环境
conda remove --name ai-dev --all

# 或
conda env remove --name ai-dev
```

**⚠️ 警告**：删除后无法恢复，请确认！

#### 3.2.5 克隆环境

```powershell
# 克隆现有环境
conda create --name ai-dev-backup --clone ai-dev
```

**使用场景**：
- 环境备份
- 基于现有环境创建变体

### 3.3 包管理

#### 3.3.1 安装包

```powershell
# 使用 conda 安装（优先）
conda install numpy

# 使用 pip 安装（conda 没有的包）
pip install some-package

# 安装指定版本
conda install numpy=1.24.0
pip install numpy==1.24.0

# 从 requirements.txt 批量安装
pip install -r requirements.txt
```

**Conda vs Pip 选择原则**：
1. 优先使用 `conda install`（二进制包，编译好）
2. Conda 没有的包再用 `pip install`
3. 不要混用（可能导致依赖冲突）

#### 3.3.2 更新包

```powershell
# 更新单个包
conda update numpy
pip install --upgrade numpy

# 更新环境中所有包
conda update --all
```

**⚠️ 注意**：`conda update --all` 可能破坏环境，谨慎使用！

#### 3.3.3 卸载包

```powershell
# 使用 conda 卸载
conda remove numpy

# 使用 pip 卸载
pip uninstall numpy

# 批量卸载（从 requirements.txt）
pip uninstall -r requirements.txt -y
```

#### 3.3.4 查看已安装包

```powershell
# 列出所有包
conda list
pip list

# 查看特定包信息
conda show numpy
pip show numpy

# 搜索包
conda search numpy
pip search numpy  # 已废弃，用 pip index versions numpy
```

#### 3.3.5 导出环境配置

```powershell
# 导出为 YAML（推荐，包含完整环境信息）
conda env export > environment.yml

# 导出为 requirements.txt（仅包列表）
pip freeze > requirements.txt
```

**environment.yml 示例**：
```yaml
name: ai-dev
channels:
  - defaults
  - conda-forge
dependencies:
  - python=3.10
  - numpy=1.24.0
  - pandas=2.0.0
  - pip
  - pip:
    - some-pip-package
```

#### 3.3.6 从配置文件创建环境

```powershell
# 从 YAML 创建
conda env create -f environment.yml

# 从 requirements.txt 创建（需先创建环境）
conda create --name myenv python=3.10
conda activate myenv
pip install -r requirements.txt
```

---

## 4. Jupyter Lab 使用

### 4.1 Jupyter 介绍

**Jupyter 家族**：
- **Jupyter Notebook**：经典的 Web 笔记本
- **JupyterLab**：新一代 IDE，支持多标签、终端、文件管理器
- **JupyterHub**：多用户服务

**JupyterLab 优势**：
- 📝 交互式代码执行
- 📊 数据可视化
- 📄 Markdown 文档
- 🔌 丰富的插件生态

### 4.2 Jupyter Lab 安装与启动

```powershell
# 激活目标环境
conda activate ai-dev

# 安装 JupyterLab
pip install jupyterlab

# 启动
jupyter lab
```

**启动后**：
- 自动打开浏览器（或手动访问 http://localhost:8888）
- 点击 "New" → "Python 3" 创建笔记本

**常用快捷键**：
| 快捷键 | 功能 |
|--------|------|
| `Shift + Enter` | 运行当前单元格 |
| `A` | 上方插入单元格 |
| `B` | 下方插入单元格 |
| `M` | 转为 Markdown |
| `Y` | 转为代码 |
| `D,D` | 删除单元格 |

### 4.3 Jupyter 添加 Conda 环境

**问题**：Jupyter 默认只显示 base 环境的 kernel

**解决方案**：

```powershell
# 1. 激活目标环境
conda activate ai-dev

# 2. 安装 ipykernel
conda install ipykernel
# 或
pip install ipykernel

# 3. 注册 kernel
python -m ipykernel install --user --name ai-dev --display-name "Python (ai-dev)"

# 4. 验证
jupyter kernelspec list
```

**在 Jupyter 中切换环境**：
1. 打开笔记本
2. 点击菜单 "Kernel" → "Change kernel"
3. 选择 "Python (ai-dev)"

**删除 kernel**：
```powershell
jupyter kernelspec remove ai-dev
```

### 4.4 JupyterLab 常用插件

```powershell
# 安装插件（在 JupyterLab 界面或命令行）
jupyter labextension install @jupyterlab/git
jupyter labextension install jupyterlab-plotly
```

**推荐插件**：
- `@jupyterlab/git`：Git 集成
- `jupyterlab-plotly`：交互式图表
- `@jupyterlab/toc`：目录生成

---

### 4.5 JupyterLab 高级配置

#### 4.5.1 代码补全与提示（IntelliSense）

JupyterLab 默认支持基础代码补全，但可以增强：

**安装 Jupyter AI 助手**：
```powershell
# 激活环境
conda activate ai-dev

# 安装 jupyterlab-ai（支持多种 AI 后端）
pip install jupyterlab-ai

# 安装代码补全增强
pip install jupyterlab-code-formatter
pip install black isort
```

**配置代码补全**：
1. 打开 JupyterLab
2. `Settings` → `Advanced Settings Editor`
3. 找到 `Code Completer`
4. 启用以下选项：
   - ✅ Show inline completions
   - ✅ Show types in documentation
   - ✅ Enable automatic suggestions

**使用 Tab 补全**：
- 输入部分代码后按 `Tab` 键
- 显示可用方法和参数
- 按 `Enter` 选择

#### 4.5.2 主题与外观配置

**更换主题**：
```powershell
# 安装主题扩展
pip install jupyterlab-theme-solarized-dark
pip install jupyterlab-material
```

**在界面中切换**：
1. `Settings` → `Theme`
2. 选择喜欢的主题：
   - **JupyterLab Dark**：深色护眼
   - **JupyterLab Light**：明亮清晰
   - **Solarized Dark**：经典配色

**调整字体大小**：
1. `Settings` → `Advanced Settings Editor`
2. 选择 `Theme`
3. 修改 `Code Font Size` 和 `Content Font Size`

#### 4.5.3 常用快捷键配置

**查看快捷键**：`Help` → `Show Keyboard Shortcuts`

**自定义快捷键**：
1. `Settings` → `Advanced Settings Editor`
2. 选择 `Keyboard Shortcuts`
3. 添加自定义配置：

```json
{
  "shortcuts": [
    {
      "command": "notebook:run-cell",
      "keys": ["Ctrl Enter"],
      "selector": ".jp-Notebook:focus"
    },
    {
      "command": "notebook:run-cell-and-insert-below",
      "keys": ["Shift Enter"],
      "selector": ".jp-Notebook:focus"
    }
  ]
}
```

**推荐快捷键**：
| 快捷键 | 功能 |
|--------|------|
| `Ctrl + /` | 切换注释 |
| `Ctrl + D` | 删除整行 |
| `Ctrl + Shift + -` | 分割单元格 |
| `M` | 转为 Markdown |
| `Y` | 转为代码 |
| `H` | 显示所有快捷键 |

#### 4.5.4 自动保存与检查点

**配置自动保存**：
1. `Settings` → `Advanced Settings Editor`
2. 选择 `Document Manager`
3. 设置 `Auto Save Delay`（默认 1000ms）

**手动创建检查点**：
- `File` → `Save and Checkpoint`
- 快捷键：`Ctrl S`

**恢复检查点**：
- `File` → `Revert to Checkpoint`

#### 4.5.5 多标签与分屏

**打开多标签**：
- 右键文件 → `Open in New Tab`
- 拖拽文件到顶部标签栏

**分屏查看**：
- 拖拽标签到窗口边缘
- 或使用 `View` → `Split`

#### 4.5.6 终端集成

**在 JupyterLab 中打开终端**：
1. 点击 `+` 启动器
2. 选择 `Terminal`
3. 或右键文件 → `New Terminal`

**优势**：
- 无需切换窗口
- 直接访问 Conda 环境
- 运行脚本、安装包

#### 4.5.7 变量查看器与数据探索

**安装变量查看器**：
```powershell
pip install jupyterlab-variableinspector
```

**使用**：
- 运行代码后，点击侧边栏变量图标
- 查看当前所有变量及其值
- 支持 DataFrame 预览

**数据探索技巧**：
```python
# 在单元格中运行
import pandas as pd
df = pd.read_csv('data.csv')
df.head()  # 预览前 5 行
df.info()  # 查看数据结构
df.describe()  # 统计信息
```

#### 4.5.8 性能优化

**解决 JupyterLab 卡顿**：

```powershell
# 清理缓存
jupyter lab clean

# 禁用不用的扩展
jupyter labextension disable some-extension

# 限制输出大小（在 notebook 中）
import sys
sys.set_int_max_str_digits(10000)
```

**配置内存限制**：
在 `jupyter_lab_config.py` 中添加：
```python
c.NotebookApp.max_buffer_size = 1073741824  # 1GB
```

#### 4.5.9 远程访问配置

**允许远程连接**：
```powershell
# 生成配置
jupyter lab --generate-config

# 编辑配置文件
# 设置 c.NotebookApp.ip = '0.0.0.0'
# 设置 c.NotebookApp.open_browser = False
```

**启动远程服务**：
```powershell
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
```

**安全建议**：
- 设置密码：`jupyter lab password`
- 使用 HTTPS（生产环境）
- 防火墙只开放必要端口

---

## 5. PyCharm 中使用 Conda 环境

### 5.1 配置步骤

**1. 创建 Conda 环境**（如前所述）

```powershell
conda create --name myproject python=3.10
conda activate myproject
pip install <所需包>
```

**2. PyCharm 中配置解释器**

- 打开 PyCharm
- `File` → `Settings` → `Project: xxx` → `Python Interpreter`
- 点击齿轮图标 → `Add...`
- 选择 `Conda Environment` → `Existing environment`
- 浏览选择 Conda 环境的 Python 解释器：
  - Windows: `C:\ProgramData\Miniconda3\envs\myproject\python.exe`
- 点击 `OK`

**3. 验证**

- 终端前缀应显示 `(myproject)`
- 运行 `import numpy` 等测试导入

### 5.2 在 PyCharm 中安装包

**方法 1**：使用 PyCharm 界面
- `Settings` → `Python Interpreter` → 点击 `+` → 搜索安装

**方法 2**：使用 PyCharm 终端
- 打开底部 Terminal
- 确认环境已激活
- 运行 `pip install <包名>`

### 5.3 常见问题

**问题**：PyCharm 找不到 Conda 环境

**解决**：
1. 确保 Conda 已正确安装
2. 在 PyCharm 中配置 Conda 路径：
   - `Settings` → `Tools` → `Terminal`
   - 设置 `Shell path` 为：`cmd.exe /K C:\ProgramData\Miniconda3\Scripts\activate.bat`

---

## 6. 常见问题解答

### Q1: Conda 下载速度太慢？

**解决**：配置国内镜像源（见 2.2 节）

### Q2: 环境激活失败？

```powershell
# 可能原因：PowerShell 执行策略限制
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 或使用 Anaconda Powershell Prompt
```

### Q3: 磁盘空间不足？

```powershell
# 清理 Conda 缓存
conda clean --all

# 删除不用的环境
conda env remove --name old-env
```

### Q4: 包冲突怎么办？

```powershell
# 创建全新环境
conda create --name fresh python=3.10

# 使用 --force-reinstall
pip install --force-reinstall <包名>
```

### Q5: 如何备份环境？

```powershell
# 导出配置
conda env export > backup.yml

# 恢复时
conda env create -f backup.yml
```

### Q6: Python 版本选择建议？

| 版本 | 推荐度 | 说明 |
|------|--------|------|
| 3.9 | ⭐⭐⭐⭐ | 稳定，兼容性好 |
| 3.10 | ⭐⭐⭐⭐⭐ | 推荐！平衡性能和兼容 |
| 3.11 | ⭐⭐⭐⭐ | 性能提升，部分包可能不兼容 |
| 3.12+ | ⭐⭐ | 太新，生态不完善 |

---

## 📚 延伸阅读

- [Conda 官方文档](https://docs.conda.io/)
- [JupyterLab 文档](https://jupyterlab.readthedocs.io/)
- [PyCharm 文档](https://www.jetbrains.com/pycharm/docs/)

---

_最后更新：2026-03-16_
