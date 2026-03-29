# Stable Diffusion 完整教程

**最后更新：** 2026-03-26  
**总章节：** 5 章  
**难度：** ⭐→⭐⭐⭐ 循序渐进

---

## 📚 教程目录

### 📘 第一章：入门指南

**[阅读章节 →](./01-入门指南.md)**

**内容概览：**
- 什么是 Stable Diffusion
- 快速开始（在线/本地）
- 第一个图像生成
- 核心概念解析
- 实用技巧入门

**学完你将掌握：**
- ✅ 完成 Stable Diffusion 安装
- ✅ 生成第一张 AI 图像
- ✅ 理解基本参数含义
- ✅ 使用基础提示词

---

### 📗 第二章：模型选择

**[阅读章节 →](./02-模型选择.md)**

**内容概览：**
- 主流模型对比
- 按场景选择模型
- 模型下载与安装
- 模型融合技巧
- LoRA 模型使用

**学完你将掌握：**
- ✅ 根据需求选择合适模型
- ✅ 下载和安装新模型
- ✅ 使用 LoRA 增强效果
- ✅ 模型融合创造新风格

---

### 📙 第三章：提示词工程

**[阅读章节 →](./03-提示词工程.md)**

**内容概览：**
- 提示词标准结构
- 主体描述技巧
- 风格关键词库
- 权重控制技巧
- 高质量提示词模板

**学完你将掌握：**
- ✅ 编写专业级提示词
- ✅ 使用权重精确控制
- ✅ 避免常见提示词错误
- ✅ 快速优化提示词

---

### 📕 第四章：图生图与修复

**[阅读章节 →](./04-图生图.md)**

**内容概览：**
- 图生图基础操作
- 重绘强度详解
- 局部重绘技巧
- 图像扩展（Outpainting）
- 图像放大（Upscale）

**学完你将掌握：**
- ✅ 照片风格转换
- ✅ 图像局部修复
- ✅ 智能扩展画面
- ✅ 高清放大输出

---

### 📒 第五章：ControlNet 详解

**[阅读章节 →](./05-ControlNet.md)**

**内容概览：**
- ControlNet 工作原理
- 13 种预处理器详解
- 实战应用场景
- 多 ControlNet 组合

**学完你将掌握：**
- ✅ 精确控制构图
- ✅ 控制人物姿势
- ✅ 保持角色一致性
- ✅ 专业级图像控制

---

## 🎯 学习路径推荐

### 零基础入门（预计 2 周）

```
第 1-2 天：阅读第 1 章 → 安装软件 → 生成第一张图
第 3-4 天：阅读第 2 章 → 下载 2-3 个模型 → 对比效果
第 5-7 天：阅读第 3 章 → 练习提示词 → 建立词库
第 2 周：  阅读第 4 章 → 实战练习 → 完成作品
```

### 进阶提升（预计 1 周）

```
第 1-2 天：深入学习第 3 章 → 掌握权重控制
第 3-4 天：精通第 4 章 → 图生图实战
第 5-7 天：学习第 5 章 → ControlNet 应用
```

### 专业创作（持续学习）

```
- 每日练习提示词
- 尝试不同模型组合
- 学习高级 ControlNet 技巧
- 关注社区最新技术
- 建立个人风格
```

---

## 📖 快速查阅

### 常用提示词模板

**人像摄影：**
```
portrait of [subject], [features], [expression],
[environment], [lighting],
photorealistic, [camera], masterpiece, 8k
```

**风景摄影：**
```
[landscape/seascape], [main subject],
[time of day], [weather], [season],
[lighting], photorealistic, wide angle, 8k
```

**艺术创作：**
```
[subject], [action], [environment],
[art style], [artist reference],
[medium], masterpiece, highly detailed
```

---

### 常用负向提示词

```
ugly, duplicate, morbid, mutilated,
poorly drawn, bad anatomy, wrong anatomy,
extra limbs, missing limbs, deformed,
disfigured, bad proportions, blurry,
low quality, worst quality, watermark
```

---

### 参数速查表

| 参数 | 人像 | 风景 | 动漫 | 产品 |
|------|------|------|------|------|
| **Steps** | 30 | 25 | 28 | 35 |
| **CFG** | 7 | 7.5 | 7 | 7 |
| **Sampler** | DPM++ 2M | Euler a | DPM++ SDE | DPM++ 2M |
| **Denoising** | 0.4 | 0.5 | 0.5 | 0.3 |

---

## 🔧 工具与资源

### 必备工具

| 工具 | 用途 | 网址 |
|------|------|------|
| **Stability Matrix** | 一键安装包 | [GitHub](https://github.com/LykosAI/StabilityMatrix) |
| **WebUI Forge** | 优化版 WebUI | [GitHub](https://github.com/lllyasviel/stable-diffusion-webui-forge) |
| **ComfyUI** | 专业工作流 | [GitHub](https://github.com/comfyanonymous/ComfyUI) |

### 模型下载

| 网站 | 特点 | 网址 |
|------|------|------|
| **Civitai** | 最大模型站 | https://civitai.com/ |
| **Hugging Face** | 官方模型 | https://huggingface.co/ |
| **LiblibAI** | 国内镜像 | https://www.liblib.ai/ |

### 提示词资源

| 网站 | 功能 | 网址 |
|------|------|------|
| **PromptHero** | 提示词库 | https://prompthero.com/ |
| **OpenArt** | 搜索复制 | https://openart.ai/ |
| **Danbooru** | 动漫标签 | https://danbooru.donmai.us/ |

---

## 📝 学习建议

### ✅ 应该做的

1. **多练习** - 每天生成 10+ 张图
2. **记录参数** - 保存优质作品的提示词和参数
3. **分析作品** - 研究好图的共同点
4. **关注社区** - 学习最新技术和技巧
5. **建立词库** - 积累自己的提示词库

### ❌ 应该避免的

1. **不要抄袭** - 学习但不照搬
2. **不要贪多** - 精通几个模型胜过浅尝辄止
3. **不要急躁** - 技术提升需要时间
4. **不要忽视基础** - 提示词比参数更重要
5. **不要闭门造车** - 多交流多分享

---

## 🎓 学习检查清单

### 入门级（完成第 1-2 章）

- [ ] 成功安装 Stable Diffusion
- [ ] 生成第一张图像
- [ ] 理解提示词基本结构
- [ ] 掌握核心参数调节
- [ ] 下载并安装 2 个模型
- [ ] 能区分不同模型风格

### 进阶级（完成第 3-4 章）

- [ ] 编写专业级提示词
- [ ] 使用权重精确控制
- [ ] 掌握图生图技巧
- [ ] 能进行风格转换
- [ ] 使用局部重绘修复
- [ ] 掌握图像放大技巧

### 专业级（完成第 5 章）

- [ ] 精通 ControlNet 使用
- [ ] 能控制人物姿势
- [ ] 保持角色一致性
- [ ] 创建复杂工作流
- [ ] 形成个人风格
- [ ] 能指导新手学习

---

## 📚 进阶阅读

### 官方文档

- [Stable Diffusion GitHub](https://github.com/Stability-AI/stablediffusion)
- [WebUI 文档](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)
- [ControlNet 论文](https://arxiv.org/abs/2302.05543)

### 社区教程

- [B 站 SD 教程合集](https://search.bilibili.com/all?keyword=stable%20diffusion)
- [知乎 SD 专栏](https://www.zhihu.com/topic/20831243)
- [Reddit SD 社区](https://www.reddit.com/r/StableDiffusion/)

### 高级主题

- [LoRA 训练教程](./advanced/lora-training.md)（待更新）
- [ControlNet 进阶](./advanced/controlnet-advanced.md)（待更新）
- [ComfyUI 工作流](./advanced/comfyui.md)（待更新）
- [商业应用案例](./advanced/commercial-use.md)（待更新）

---

## 🤝 反馈与贡献

本教程持续更新中，欢迎反馈和建议！

**发现问题？**
- 在 GitHub 提交 Issue
- 在评论区留言
- 联系作者

**贡献内容？**
- 提交教程补充
- 分享提示词模板
- 提供实战案例

---

_教程作者：小蛋蛋 🦞_  
_创建日期：2026-03-26_  
_最后更新：2026-03-26_
