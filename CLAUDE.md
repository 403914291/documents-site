# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 VitePress 构建的静态文档站点，内容为 AI 和 Python 技术学习资料。

## 常用命令

```bash
# 开发环境启动
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 目录结构

```
├── .vitepress/              # VitePress 配置
│   ├── config.mjs           # 站点配置（导航、侧边栏等）
│   └── utils/
│       └── auto_sidebar.mjs # 自动生成侧边栏工具
├── AI_docs/                 # AI 学习资料
├── AI_basics/               # AI 基础知识
├── python_docs/             # Python 学习资料
├── public/                  # 静态资源
│   ├── lottie/              # Lottie 动画文件
│   └── svg/                 # SVG 图标
└── index.md                 # 首页
```

## 架构说明

### 导航配置
- 位置：`.vitepress/config.mjs`
- 顶部导航在 `nav` 数组中配置
- 添加新页面时需在相应位置添加 `link`

### 侧边栏生成
- 使用 `auto_sidebar.mjs` 自动生成指定目录的侧边栏
- 配置位置：`config.mjs` 中的 `sidebar` 字段
- 自动读取目录下所有 `.md` 文件（排除 `index.md`、`assets` 等白名单）
- 支持嵌套子目录

### 首页定制
- `index.md` 使用 frontmatter 配置 Hero 区域和 Features
- 集成了 Lottie 动画（`public/lottie/work2.json`）
- 自定义 SVG 图标位于 `public/svg/`

### 文档组织
- 每个内容分类有独立的 `index.md` 作为入口
- 图片资源放在同级的 `assets/` 目录
- Markdown 支持 VitePress 所有默认组件（tip/warning/danger 等）
