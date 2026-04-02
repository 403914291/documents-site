# AI 应用开发标准规范

> 基于 Anthropic、OpenAI、Microsoft、Google 等领先 AI 公司的最佳实践，制定本开发规范
>
> 参考来源：
> - [Anthropic Responsible AI](https://www.anthropic.com/research/building-reliable-ai)
> - [OpenAI Best Practices](https://platform.openai.com/docs/guides)
> - [Microsoft AI Principles](https://www.microsoft.com/en-us/ai/responsible-ai)
> - [Google AI Principles](https://ai.google/principles/)

---

## 📋 目录

1. [核心原则](#-核心原则)
2. [代码规范](#-代码规范)
3. [安全规范](#-安全规范)
4. [测试规范](#-测试规范)
5. [文档规范](#-文档规范)
6. [部署规范](#-部署规范)
7. [AI 辅助开发规范](#-ai 辅助开发规范)

---

## 🎯 核心原则

### 1. 人类监督原则

**所有 AI 生成的代码必须经过人工审查**

- ✅ AI 生成的代码必须有人类审查
- ✅ 关键业务逻辑必须由人类编写或深度审查
- ✅ 安全相关代码禁止完全依赖 AI 生成

### 2. 透明性原则

**AI 参与程度必须明确标识**

- ✅ 在代码注释中标注 AI 生成的部分
- ✅ 在 PR 描述中说明 AI 参与程度
- ✅ 保留 AI 辅助决策的记录

### 3. 责任归属原则

**人类对最终代码质量负责**

- ✅ AI 是辅助工具，人类是责任主体
- ✅ 代码质量问题由人类开发者承担
- ✅ 建立 AI 辅助开发的追责机制

### 4. 公平性原则

**AI 应用应当公平对待所有用户**

- ✅ 避免算法歧视
- ✅ 测试不同用户群体的体验
- ✅ 定期审计算法公平性

### 5. 隐私保护原则

**保护用户数据和隐私**

- ✅ 最小化数据收集
- ✅ 数据加密存储和传输
- ✅ 提供数据删除机制

---

## 💻 代码规范

### 1. 项目结构

```
project/
├── src/                    # 源代码目录
│   ├── components/         # 组件
│   ├── services/           # 服务层
│   ├── utils/              # 工具函数
│   └── types/              # 类型定义
├── tests/                  # 测试代码
│   ├── unit/               # 单元测试
│   ├── integration/        # 集成测试
│   └── e2e/                # 端到端测试
├── docs/                   # 文档
├── scripts/                # 脚本工具
└── .claude/                # AI 代理配置
    └── skills/             # AI 技能
```

### 2. 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量 | 小驼峰 | `userName`, `totalCount` |
| 常量 | 大写下划线 | `MAX_RETRY`, `API_BASE_URL` |
| 函数 | 小驼峰，动词开头 | `getUserById`, `calculateTotal` |
| 类 | 大驼峰 | `UserService`, `HttpClient` |
| 组件 | 大驼峰 | `UserProfile`, `DataTable` |

### 3. 注释规范

```typescript
/**
 * 获取用户信息
 * @param userId - 用户 ID
 * @param options - 可选配置
 * @returns 用户信息对象
 * @throws {UserNotFoundError} 用户不存在时抛出
 * 
 * @ai-generated - 此函数由 AI 辅助生成，已人工审查
 */
async function getUser(userId: string, options?: GetUserOptions): Promise<User> {
  // 验证用户 ID 格式
  if (!isValidUserId(userId)) {
    throw new InvalidUserIdError('Invalid user ID format');
  }
  
  const user = await db.users.findById(userId);
  
  if (!user) {
    throw new UserNotFoundError(`User ${userId} not found`);
  }
  
  return user;
}
```

### 4. 错误处理

```typescript
// ✅ 正确：明确的错误类型和处理
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  if (error instanceof NetworkError) {
    logger.warn('Network error, retrying...', { error });
    return retryOperation();
  }
  logger.error('Operation failed', { error });
  return { success: false, error: error.message };
}

// ❌ 错误：空的 catch 块
try {
  await riskyOperation();
} catch (error) {
  // 什么都不做 - 禁止！
}
```

---

## 🔒 安全规范

### 1. 密钥管理

```typescript
// ✅ 正确：使用环境变量
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;

// ❌ 错误：硬编码密钥 - 禁止！
const apiKey = 'sk-1234567890abcdef';
```

### 2. 输入验证

```typescript
// ✅ 正确：验证所有输入
function createUser(input: CreateUserInput) {
  // 验证必填字段
  if (!input.email || !input.password) {
    throw new ValidationError('Missing required fields');
  }
  
  // 验证邮箱格式
  if (!isValidEmail(input.email)) {
    throw new ValidationError('Invalid email format');
  }
  
  // 验证密码强度
  if (!isStrongPassword(input.password)) {
    throw new ValidationError('Password too weak');
  }
  
  return db.users.create({
    email: sanitize(input.email),
    password: hash(input.password)
  });
}
```

### 3. AI 安全

```typescript
// ✅ 正确：限制 AI 权限
const aiConfig = {
  maxTokens: 1000,
  allowedModels: ['claude-3-sonnet'],
  blockedActions: ['delete', 'drop', 'exec'],
  requireHumanApproval: true
};

// ❌ 错误：无限制的 AI 访问 - 危险！
```

### 4. OWASP Top 10 防护

| 风险 | 防护措施 |
|------|---------|
| 注入攻击 | 参数化查询、输入验证 |
| 身份认证失效 | 多因素认证、会话管理 |
| 敏感数据泄露 | 加密、最小化收集 |
| XSS | 输出编码、CSP |
| 访问控制失效 | 基于角色的访问控制 |

---

## 🧪 测试规范

### 1. 测试覆盖率要求

| 代码类型 | 最低覆盖率 |
|----------|-----------|
| 核心业务逻辑 | 90% |
| 公共服务 | 80% |
| UI 组件 | 70% |
| 工具函数 | 85% |

### 2. 单元测试

```typescript
describe('UserService', () => {
  let userService: UserService;
  let mockDb: MockDatabase;
  
  beforeEach(() => {
    mockDb = new MockDatabase();
    userService = new UserService(mockDb);
  });
  
  describe('getUserById', () => {
    it('should return user when exists', async () => {
      const expectedUser = { id: '1', name: 'John' };
      mockDb.users.findById.mockResolvedValue(expectedUser);
      
      const result = await userService.getUserById('1');
      
      expect(result).toEqual(expectedUser);
    });
    
    it('should throw error when user not found', async () => {
      mockDb.users.findById.mockResolvedValue(null);
      
      await expect(userService.getUserById('999'))
        .rejects
        .toThrow(UserNotFoundError);
    });
  });
});
```

### 3. AI 生成代码的测试

```typescript
// ✅ AI 生成的代码必须有对应测试
// 文件：src/utils/ai-helper.ts (AI 生成)

// 文件：tests/utils/ai-helper.test.ts (对应测试)
describe('AI Helper', () => {
  it('should handle edge case X', () => {
    // 测试 AI 生成的边界情况处理
  });
});
```

---

## 📚 文档规范

### 1. README 结构

```markdown
# 项目名称

> 项目简介

## 快速开始

## 功能特性

## 安装指南

## 使用示例

## API 文档

## 贡献指南

## 许可证
```

### 2. 变更日志

```markdown
## [1.2.0] - 2026-03-24

### 新增
- 添加用户管理功能
- 支持批量导入导出

### 修复
- 修复登录页面的 XSS 漏洞
- 修复数据库连接池泄漏

### 变更
- 升级 Node.js 到 v20
- 重构用户认证模块
```

---

## 🚀 部署规范

### 1. CI/CD 流程

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build
        run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: ./deploy.sh
```

### 2. 回滚机制

```bash
#!/bin/bash
# rollback.sh

CURRENT_VERSION=$(cat .version)
echo "Rolling back from $CURRENT_VERSION"

git checkout $(git rev-list -n 2 HEAD | tail -1)
./deploy.sh

notify_team "Rolled back to previous version"
```

---

## 🤖 AI 辅助开发规范

### 1. 适用场景

| 场景 | 推荐度 | 说明 |
|------|--------|------|
| 代码补全 | ✅ 推荐 | 日常编码辅助 |
| 单元测试生成 | ✅ 推荐 | 提高测试覆盖率 |
| 文档生成 | ✅ 推荐 | API 文档、注释 |
| 代码重构 | ⚠️ 谨慎 | 需要人工审查 |
| 安全代码 | ❌ 禁止 | 必须由专家编写 |
| 核心算法 | ❌ 禁止 | 必须由专家编写 |

### 2. 审查清单

- [ ] AI 生成的代码是否经过人工审查
- [ ] 是否有对应的单元测试
- [ ] 是否标注了 AI 生成标识
- [ ] 是否存在安全漏洞
- [ ] 性能是否可接受

### 3. 质量指标

| 指标 | 目标值 |
|------|--------|
| AI 代码审查率 | 100% |
| AI 代码 bug 率 | < 5% |
| 人类修改率 | < 30% |

---

## 🔗 参考资料

- [Anthropic Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code)
- [OpenAI API 最佳实践](https://platform.openai.com/docs/best-practices)
- [Google AI 原则](https://ai.google/principles/)
- [Microsoft AI 开发指南](https://docs.microsoft.com/en-us/ai/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

_最后更新：2026-03-24_
