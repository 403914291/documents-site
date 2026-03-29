# Stable Diffusion ControlNet 详解

**最后更新：** 2026-03-26  
**难度：** ⭐⭐⭐ 专业

---

## 🎛️ 什么是 ControlNet？

ControlNet 是一个**精确控制**Stable Diffusion 生成的神经网络模型。

**核心作用：**
- 🎯 精确控制构图
- 🧍 控制人物姿势
- 🖼️ 保持边缘结构
- 🎨 控制深度关系
- 🔄 保持角色一致性

**类比理解：**
```
Stable Diffusion = 天才画家（有创造力但随意）
ControlNet = 艺术指导（告诉画家具体怎么画）
```

---

## 🔬 工作原理

### 传统 SD 生成流程

```
提示词 → SD 模型 → 随机生成 → 结果不可控
```

### 加入 ControlNet 后

```
提示词 + 控制图 → ControlNet → SD 模型 → 精确控制的结果
```

### 技术架构

```
┌─────────────┐
│  输入图像   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  预处理器   │  ← 提取控制信息（边缘/深度/姿势等）
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ ControlNet  │  ← 锁定 SD 的 U-Net 部分层
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SD 模型     │  ← 生成最终图像
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  输出图像   │
└─────────────┘
```

---

## 📦 ControlNet 模型类型

### 13 种常用预处理器详解

| 模型 | 功能 | 适用场景 | 推荐度 |
|------|------|---------|--------|
| **Canny** | 边缘检测 | 保持轮廓、线稿上色 | ⭐⭐⭐⭐⭐ |
| **Depth** | 深度图 | 保持空间关系、3D 结构 | ⭐⭐⭐⭐⭐ |
| **OpenPose** | 姿势检测 | 控制人物姿势、动作 | ⭐⭐⭐⭐⭐ |
| **SoftEdge** | 软边缘 | 保留大致轮廓，更自然 | ⭐⭐⭐⭐ |
| **Scribble** | 草图 | 手绘草图转成品 | ⭐⭐⭐⭐ |
| **Lineart** | 线稿 | 动漫线稿上色 | ⭐⭐⭐⭐ |
| **Normal Map** | 法线贴图 | 3D 表面细节控制 | ⭐⭐⭐ |
| **Segmentation** | 语义分割 | 分区控制、换装 | ⭐⭐⭐ |
| **Tile** | 分块放大 | 高清放大、细节增强 | ⭐⭐⭐⭐⭐ |
| **Inpaint** | 局部重绘 | 精确修复、替换 | ⭐⭐⭐⭐ |
| **Shuffle** | 颜色重组 | 保持构图换风格 | ⭐⭐⭐ |
| **Reference** | 参考图 | 保持角色一致性 | ⭐⭐⭐⭐⭐ |
| **IP2P** | 图像到图像 | 精确的 img2img | ⭐⭐⭐ |

---

## 🎯 Canny - 边缘检测

### 功能说明

提取图像的边缘轮廓，生成时保持相同轮廓。

### 适用场景

- 保持建筑/产品轮廓
- 线稿自动上色
- 照片转插画
- 保持构图不变

### 操作步骤

**1. 启用 ControlNet**
```
WebUI → ControlNet 标签
勾选 Enable
```

**2. 上传图像**
```
上传要提取边缘的图像
```

**3. 选择预处理器**
```
Preprocessor: canny
Model: control_v11p_sd15_canny [diff]
```

**4. 设置参数**

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| **Low Threshold** | 100 | 边缘检测下限 |
| **High Threshold** | 200 | 边缘检测上限 |
| **Control Weight** | 0.8-1.0 | 控制强度 |
| **Starting/Ending** | 0.0/1.0 | 作用区间 |

**5. 输入提示词**
```
描述想要的风格和颜色
```

**6. 点击生成**

### 实战案例：建筑照片转水彩画

```
原图：现代建筑照片
ControlNet: Canny
提示词：watercolor painting, soft colors, artistic
结果：保持建筑轮廓的水彩画
```

---

## 🧍 OpenPose - 姿势控制

### 功能说明

检测并控制人物骨骼姿势，精确控制动作。

### 适用场景

- 控制人物特定姿势
- 多人场景布局
- 舞蹈/动作场景
- 保持角色动作一致

### 操作步骤

**1. 启用 ControlNet**

**2. 上传参考图**
```
包含目标姿势的图片
或使用姿态编辑器手动调整
```

**3. 选择预处理器**
```
Preprocessor: openpose_full
Model: control_v11p_sd15_openpose [diff]
```

**4. 设置参数**

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| **Control Weight** | 0.8-1.0 | 控制强度 |
| **Detect Hands** | ✅ | 检测手部 |
| **Detect Body** | ✅ | 检测身体 |
| **Detect Face** | ✅ | 检测面部 |

**5. 输入提示词**
```
描述人物外观、服装、场景
```

**6. 点击生成**

### 实战案例：保持角色姿势

```
原图：电影截图中的经典姿势
ControlNet: OpenPose
提示词：warrior in armor, fantasy background, epic lighting
结果：保持相同姿势的奇幻战士
```

### 姿态编辑器

**WebUI 内置编辑器：**
```
1. 点击"OpenPose Editor"
2. 拖拽骨骼节点调整姿势
3. 点击"Send to ControlNet"
4. 生成
```

---

## 🏔️ Depth - 深度控制

### 功能说明

提取图像的深度信息（前后距离关系）。

### 适用场景

- 保持空间透视关系
- 3D 场景重建
- 室内场景设计
- 风景照风格转换

### 操作步骤

**1. 启用 ControlNet**

**2. 上传图像**

**3. 选择预处理器**
```
Preprocessor: depth_midas
或 depth_zoe（更精确）
Model: control_v11f1p_sd15_depth [diff]
```

**4. 设置参数**

| 参数 | 推荐值 |
|------|--------|
| **Control Weight** | 0.7-0.9 |
| **Starting/Ending** | 0.0/1.0 |

**5. 输入提示词**
```
描述新风格
```

**6. 点击生成**

### 实战案例：房间重新装修

```
原图：客厅照片
ControlNet: Depth
提示词：modern minimalist interior, white walls, wooden floor
结果：保持空间结构的现代简约风格客厅
```

---

## ✏️ Scribble - 草图控制

### 功能说明

从手绘草图生成精细图像。

### 适用场景

- 草图快速变现
- 概念设计
- 分镜创作
- 儿童画转专业图

### 操作步骤

**1. 启用 ControlNet**

**2. 上传草图**
```
手绘草图照片或数字绘画
```

**3. 选择预处理器**
```
Preprocessor: scribble_hed
Model: control_v11p_sd15_scribble [diff]
```

**4. 设置参数**

| 参数 | 推荐值 |
|------|--------|
| **Control Weight** | 0.8-1.0 |

**5. 输入提示词**
```
详细描述想要的效果
```

**6. 点击生成**

### 实战案例：草图转概念图

```
原图：简单的建筑草图
ControlNet: Scribble
提示词：futuristic city, skyscrapers, flying cars, sunset
结果：精细的未来城市概念图
```

---

## 🎨 Tile - 分块放大

### 功能说明

在放大图像时添加细节，而不是简单插值。

### 适用场景

- 高清放大（4x-8x）
- 细节增强
- 老照片修复放大
- 低分辨率图提升

### 操作步骤

**1. 启用 ControlNet**

**2. 上传低分辨率图**

**3. 选择预处理器**
```
Preprocessor: tile_resample
Model: control_v11f1e_sd15_tile [diff]
```

**4. 设置参数**

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| **Control Weight** | 0.8-1.0 | 控制强度 |
| **Down Sampling Rate** | 1.0 | 降采样率 |

**5. 设置高分辨率**
```
Width/Height: 设置目标分辨率
```

**6. 输入提示词**
```
添加细节描述
```

**7. 点击生成**

### 实战案例：老照片高清修复

```
原图：512x512 老照片
ControlNet: Tile
目标分辨率：2048x2048
提示词：highly detailed, sharp focus, 8k
结果：4 倍放大且细节丰富的高清图
```

---

## 👤 Reference - 参考图

### 功能说明

保持角色一致性，生成同一角色的不同场景图。

### 适用场景

- 系列插画创作
- 角色多场景展示
- 保持面部特征
- 服装一致性

### 操作步骤

**1. 启用 ControlNet**

**2. 上传角色参考图**

**3. 选择预处理器**
```
Preprocessor: reference_only
或 reference_adain
Model: 无需选择（Reference 不需要模型）
```

**4. 设置参数**

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| **Control Weight** | 0.6-0.8 | 相似度控制 |

**5. 输入提示词**
```
描述新场景和动作
```

**6. 点击生成**

### 实战案例：角色系列图

```
参考图：角色正面照
ControlNet: Reference
提示词 1：character reading book in library
提示词 2：character walking in park
提示词 3：character drinking coffee in cafe
结果：同一角色在不同场景的系列图
```

---

## 🎛️ 多 ControlNet 组合

### 为什么要组合使用？

单个 ControlNet 只能控制一个方面，组合使用可以实现更精确的控制。

### 常见组合方案

### 方案 1：OpenPose + Reference

**用途：** 保持角色 + 控制姿势

```
ControlNet 1:
  - Preprocessor: openpose_full
  - Model: control_v11p_sd15_openpose
  - Weight: 0.8

ControlNet 2:
  - Preprocessor: reference_only
  - Weight: 0.6

提示词：warrior in battle stance, fantasy armor
结果：特定角色做出特定姿势
```

---

### 方案 2：Canny + Depth

**用途：** 保持轮廓 + 空间关系

```
ControlNet 1:
  - Preprocessor: canny
  - Model: control_v11p_sd15_canny
  - Weight: 0.7

ControlNet 2:
  - Preprocessor: depth_midas
  - Model: control_v11f1p_sd15_depth
  - Weight: 0.6

提示词：ancient temple, mystical atmosphere
结果：保持结构和空间感的场景
```

---

### 方案 3：Tile + Reference

**用途：** 高清放大 + 保持角色

```
ControlNet 1:
  - Preprocessor: tile_resample
  - Model: control_v11f1e_sd15_tile
  - Weight: 0.8

ControlNet 2:
  - Preprocessor: reference_only
  - Weight: 0.5

提示词：highly detailed, 8k, masterpiece
结果：高清放大且保持角色特征
```

---

## ⚙️ ControlNet 高级参数

### Control Weight（控制权重）

**定义：** ControlNet 对生成结果的影响程度

| 权重值 | 效果 | 适用场景 |
|--------|------|---------|
| 0.3-0.5 | 弱控制 | 保留大致感觉 |
| 0.6-0.8 | 中等控制 | 平衡控制与创作 |
| 0.9-1.0 | 强控制 | 精确复现 |
| 1.1-1.5 | 过控制 | 慎用，可能崩坏 |

---

### Starting/Ending Control Step

**定义：** ControlNet 在生成过程的哪个阶段起作用

**参数说明：**
- **Starting Step:** 从哪一步开始控制（0-1）
- **Ending Step:** 到哪一步结束控制（0-1）

**典型设置：**

| 设置 | 效果 | 场景 |
|------|------|------|
| 0.0 / 1.0 | 全程控制 | 标准用法 |
| 0.0 / 0.5 | 仅前期控制 | 保留后期创作空间 |
| 0.3 / 1.0 | 后期加强控制 | 先创作后约束 |

---

### Pixel Perfect

**功能：** 自动调整控制图分辨率以匹配输出

**建议：** ✅ 始终启用

---

### Resize Mode

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **Just Resize** | 直接拉伸 | 快速但不精确 |
| **Crop and Resize** | 裁剪后缩放 | 保持比例 |
| **Resize and Fill** | 缩放后填充 | 完整保留内容 |

---

## 📊 ControlNet 性能对比

### 显存占用（SD 1.5）

| ControlNet 类型 | 显存占用 | 推荐显卡 |
|----------------|---------|---------|
| Canny | +1GB | GTX 1060 6GB+ |
| OpenPose | +1.2GB | GTX 1060 6GB+ |
| Depth | +1.5GB | GTX 1070 8GB+ |
| Tile | +1GB | GTX 1060 6GB+ |
| 双 ControlNet | +2-3GB | RTX 3060 12GB+ |

### 生成速度影响

| 配置 | 速度影响 |
|------|---------|
| 无 ControlNet | 基准 100% |
| 单个 ControlNet | 80-90% |
| 双 ControlNet | 60-70% |
| 三 ControlNet | 40-50% |

---

## 🎯 实战工作流

### 工作流 1：角色设计

```
目标：设计游戏角色三视图

步骤：
1. 收集参考图（姿势、服装、风格）
2. 使用 OpenPose 设定标准姿势
3. 使用 Reference 保持角色一致性
4. 生成正面、侧面、背面三视图
5. 使用 Tile 放大到 2048x2048
6. 后期处理细节
```

---

### 工作流 2：建筑可视化

```
目标：建筑草图转效果图

步骤：
1. 准备建筑草图
2. 使用 Canny 提取轮廓
3. 使用 Depth 保持空间关系
4. 提示词描述材质和风格
5. 生成多个方案对比
6. 选择最佳方案 Tile 放大
```

---

### 工作流 3：漫画创作

```
目标：漫画分镜上色

步骤：
1. 绘制漫画线稿
2. 使用 Lineart 或 Canny 提取线稿
3. 提示词描述每格场景
4. 批量生成上色版本
5. 使用 Inpaint 修正细节
6. 后期合成漫画页面
```

---

## 📝 常见问题

### Q1: ControlNet 后图像质量下降？

**解决方案：**
1. 启用 Hires. fix
2. 使用 Tile 进行放大细化
3. 调整 Control Weight（降低到 0.7-0.8）
4. 增加 Sampling Steps

### Q2: ControlNet 不起作用？

**检查清单：**
- [ ] 是否正确启用 ControlNet
- [ ] 是否选择了对应模型
- [ ] Control Weight 是否过低
- [ ] 预处理器是否匹配
- [ ] 图像尺寸是否合适

### Q3: 多个 ControlNet 冲突怎么办？

**解决方案：**
1. 降低各 ControlNet 的权重
2. 调整 Starting/Ending Step 错开作用区间
3. 优先保留最重要的 ControlNet
4. 尝试不同的组合顺序

### Q4: 显存不足怎么办？

**解决方案：**
1. 使用 --medvram 参数启动
2. 减少 ControlNet 数量
3. 降低图像分辨率
4. 使用 SDXL Turbo（显存优化）

### Q5: 如何保存 ControlNet 配置？

**方法：**
1. 使用 WebUI 的"Save preset"功能
2. 截图保存参数设置
3. 记录在提示词文档中
4. 使用 PNG Info 从生成图提取

---

## 🎓 学习资源

### 官方资源
- [ControlNet GitHub](https://github.com/lllyasviel/ControlNet)
- [ControlNet 论文](https://arxiv.org/abs/2302.05543)
- [ControlNet v1.1 发布](https://github.com/lllyasviel/ControlNet-v1-1-nightly)

### 模型下载
- [ControlNet 1.5 模型](https://huggingface.co/lllyasviel/ControlNet-v1-1)
- [ControlNet SDXL 模型](https://huggingface.co/diffusers/controlnet-canny-sdxl-1.0)

### 社区教程
- [ControlNet 完全指南 - B 站](https://www.bilibili.com/video/BV1xx4y1X7Kz)
- [ControlNet 实战技巧 - YouTube](https://www.youtube.com/results?search_query=controlnet+tutorial)

---

## 📖 下一章预告

**[06-LoRA 训练指南](./06-LoRA 训练.md)**
- LoRA 训练原理
- 数据集准备
- 训练参数配置
- 实战：训练角色 LoRA

---

_本教程持续更新中 | 2026-03-26_
