---
layout: doc
---

# 实战项目

通过实际项目练习，巩固 OpenClaw 开发技能。

## 项目一：待办事项应用

构建一个完整的待办事项管理系统。

### 功能需求

- [x] 创建新任务
- [x] 标记任务完成
- [x] 删除任务
- [x] 任务分类
- [x] 数据持久化

### 项目结构

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TaskList.js
│   │   ├── TaskItem.js
│   │   └── TaskForm.js
│   ├── services/
│   │   └── taskService.js
│   ├── models/
│   │   └── Task.js
│   └── index.js
└── package.json
```

### 核心代码

**1. 任务模型** (`models/Task.js`)

```javascript
export class Task {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date();
  }

  toggle() {
    this.completed = !this.completed;
  }
}
```

**2. 任务服务** (`services/taskService.js`)

```javascript
import { Task } from '../models/Task';

export class TaskService {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  create(title) {
    const task = new Task(this.nextId++, title);
    this.tasks.push(task);
    return task;
  }

  toggle(id) {
    const task = this.getById(id);
    if (task) task.toggle();
    return task;
  }

  delete(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }

  getById(id) {
    return this.tasks.find(t => t.id === id);
  }

  getAll() {
    return this.tasks;
  }
}
```

**3. 任务列表组件** (`components/TaskList.js`)

```javascript
export class TaskList {
  constructor(service) {
    this.service = service;
    this.container = null;
  }

  mount(container) {
    this.container = container;
    this.render();
  }

  render() {
    const tasks = this.service.getAll();
    this.container.innerHTML = `
      <ul class="task-list">
        ${tasks.map(task => `
          <li class="task-item ${task.completed ? 'completed' : ''}">
            <span>${task.title}</span>
            <button onclick="app.toggleTask(${task.id})">
              ${task.completed ? '撤销' : '完成'}
            </button>
            <button onclick="app.deleteTask(${task.id})">删除</button>
          </li>
        `).join('')}
      </ul>
    `;
  }
}
```

**4. 主应用** (`index.js`)

```javascript
import { createApp } from 'openclaw';
import { TaskService } from './services/taskService';
import { TaskList } from './components/TaskList';

const app = createApp({ name: 'todo-app' });
const taskService = new TaskService();
const taskList = new TaskList(taskService);

// 全局方法供组件调用
app.toggleTask = (id) => {
  taskService.toggle(id);
  taskList.render();
};

app.deleteTask = (id) => {
  taskService.delete(id);
  taskList.render();
};

app.mount(() => {
  taskList.mount(document.getElementById('app'));
});
```

## 项目二：API 服务

构建 RESTful API 服务。

### 功能需求

- [x] 用户认证
- [x] CRUD 操作
- [x] 数据验证
- [x] 错误处理
- [x] 日志记录

### 项目结构

```
api-server/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── logger.js
│   ├── routes/
│   │   └── users.js
│   ├── models/
│   │   └── User.js
│   └── index.js
└── package.json
```

### 核心代码

**1. 用户模型** (`models/User.js`)

```javascript
export class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
  }

  static validate(data) {
    const errors = [];
    if (!data.username || data.username.length < 3) {
      errors.push('用户名至少 3 个字符');
    }
    if (!data.email || !data.email.includes('@')) {
      errors.push('无效的邮箱地址');
    }
    return errors;
  }
}
```

**2. 认证中间件** (`middleware/auth.js`)

```javascript
export async function auth(ctx, next) {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: '未授权' };
    return;
  }

  try {
    // 验证 token
    ctx.user = await verifyToken(token);
    await next;
  } catch (e) {
    ctx.status = 401;
    ctx.body = { error: '无效的 token' };
  }
}
```

**3. 用户控制器** (`controllers/userController.js`)

```javascript
import { User } from '../models/User';

export const userController = {
  async list(ctx) {
    const users = await User.findAll();
    ctx.body = { data: users };
  },

  async create(ctx) {
    const errors = User.validate(ctx.request.body);
    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = { errors };
      return;
    }

    const user = await User.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = { data: user };
  },

  async update(ctx) {
    const user = await User.update(ctx.params.id, ctx.request.body);
    ctx.body = { data: user };
  },

  async delete(ctx) {
    await User.delete(ctx.params.id);
    ctx.status = 204;
  }
};
```

## 项目三：数据处理工具

构建批量数据处理工具。

### 功能需求

- [x] 文件读取
- [x] 数据转换
- [x] 数据过滤
- [x] 结果导出

### 核心代码

```javascript
import { createProcessor } from 'openclaw';

const processor = createProcessor({
  name: 'data-processor',
  workers: 4
});

// 定义处理管道
processor
  .read('./input/data.json')
  .transform(data => {
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  })
  .filter(item => item.active === true)
  .write('./output/processed.json');

// 执行处理
await processor.run();
```

## 总结

通过以上三个项目，你掌握了：

1. **前端应用开发**：组件设计、状态管理
2. **API 服务开发**：路由、中间件、控制器
3. **数据处理**：管道处理、批量操作

## 下一步

继续深入学习：

- 性能优化技巧
- 高级插件开发
- 生产环境部署
