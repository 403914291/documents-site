---
layout: doc
---

# 快速开始

本指南将帮助你快速搭建 OpenClaw 开发环境并创建第一个项目。

## 环境要求

在开始之前，请确保你的系统满足以下要求：

- **Node.js**: v16.0 或更高版本
- **npm** 或 **yarn**: 包管理工具
- **代码编辑器**: VS Code、WebStorm 等

## 安装步骤

### 1. 检查 Node.js 版本

```bash
node -v
npm -v
```

### 2. 创建项目

使用 npm 创建新的 OpenClaw 项目：

```bash
# 使用 npm 初始化
npm init openclaw@latest my-openclaw-app

# 或使用 yarn
yarn create openclaw my-openclaw-app
```

### 3. 安装依赖

```bash
cd my-openclaw-app
npm install
```

### 4. 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或构建生产版本
npm run build
```

## 项目结构

创建项目后，你会看到以下目录结构：

```
my-openclaw-app/
├── src/
│   ├── components/      # 组件目录
│   ├── utils/           # 工具函数
│   ├── config/          # 配置文件
│   └── index.js         # 入口文件
├── public/              # 静态资源
├── package.json         # 项目配置
└── README.md            # 项目说明
```

## 创建第一个组件

在 `src/components/` 目录下创建你的第一个组件 `hello.js`：

```javascript
// src/components/hello.js

export function hello(name) {
  console.log(`Hello, ${name}! Welcome to OpenClaw!`);
}
```

然后在入口文件中引入并使用：

```javascript
// src/index.js
import { hello } from './components/hello';

hello('OpenClaw Developer');
```

## 运行并查看结果

```bash
npm run dev
```

在控制台查看输出结果。

## 常见问题

### 安装失败

如果遇到安装问题，尝试：

```bash
# 清除缓存
npm cache clean --force

# 重新安装
npm install
```

### 端口被占用

如果默认端口被占用，可以在配置文件中修改：

```javascript
// config/server.js
export default {
  port: 3001  // 修改端口号
}
```

## 下一步

- [核心概念](./03-core-concepts.md) - 深入了解 OpenClaw 架构
- [实战项目](./04-projects.md) - 动手构建完整应用
