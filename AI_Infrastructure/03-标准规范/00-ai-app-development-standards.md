# AI 应用开发标准规范

> 深入 AI 应用开发的核心规范，涵盖模型选择、Prompt 工程、输出验证、安全控制、测试策略和性能优化
>
> 参考来源：
> - [Anthropic Production Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/production)
> - [OpenAI Production Guidelines](https://platform.openai.com/docs/guides/production)
> - [Microsoft AI Security](https://learn.microsoft.com/en-us/azure/ai-services/security)
> - [OWASP AI Security Guide](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

---

## 📋 目录

1. [AI 模型选择与评估](#-ai 模型选择与评估)
2. [Prompt 工程规范](#-prompt 工程规范)
3. [AI 输出验证与质量控制](#-ai 输出验证与质量控制)
4. [AI 应用安全](#-ai 应用安全)
5. [AI 应用测试策略](#-ai 应用测试策略)
6. [性能优化与成本控制](#-性能优化与成本控制)
7. [监控与日志](#-监控与日志)

---

## 🎯 AI 模型选择与评估

### 1. 模型选择矩阵

| 场景 | 推荐模型 | 理由 | 成本 |
|------|---------|------|------|
| 复杂推理 | Claude 3.5 Sonnet | 推理能力强，准确率高 | 中 |
| 快速响应 | Claude 3 Haiku | 延迟低，成本低 | 低 |
| 代码生成 | Claude 3.5 Sonnet | 代码质量高 | 中 |
| 简单问答 | Claude 3 Haiku | 成本低，速度快 | 低 |
| 长文档处理 | Claude 3.5 Sonnet (200K) | 上下文窗口大 | 中高 |

### 2. 模型评估指标

```python
# AI 模型评估框架
class ModelEvaluator:
    def __init__(self):
        self.metrics = {
            'accuracy': [],      # 准确率
            'latency': [],       # 延迟 (ms)
            'cost': [],          # 成本 ($/请求)
            'hallucination': [], # 幻觉率
            'toxicity': [],      # 有害内容率
        }
    
    def evaluate(self, response, expected):
        # 准确率评估
        accuracy = self.calculate_accuracy(response, expected)
        
        # 幻觉检测
        hallucination = self.detect_hallucination(response)
        
        # 毒性检测
        toxicity = self.check_toxicity(response)
        
        return {
            'accuracy': accuracy,
            'hallucination': hallucination,
            'toxicity': toxicity,
            'passed': accuracy > 0.9 and hallucination < 0.05
        }
```

### 3. A/B 测试策略

```python
# 多模型 A/B 测试
def ab_test_models(prompt, models=['haiku', 'sonnet'], sample_size=100):
    results = {}
    
    for model in models:
        scores = []
        for i in range(sample_size):
            response = call_llm(model, prompt)
            score = evaluate_response(response)
            scores.append(score)
        
        results[model] = {
            'avg_score': np.mean(scores),
            'std_dev': np.std(scores),
            'p95_latency': np.percentile(latencies, 95)
        }
    
    return select_best_model(results)
```

---

## ✍️ Prompt 工程规范

### 1. Prompt 结构模板

```markdown
# Role (角色)
你是一位 [专业角色]，擅长 [具体技能]

# Context (背景)
[任务背景信息]

# Task (任务)
[具体任务描述]

# Constraints (约束)
- 约束 1
- 约束 2
- 约束 3

# Output Format (输出格式)
[期望的输出格式]

# Examples (示例)
输入：[示例输入]
输出：[示例输出]
```

### 2. Prompt 版本管理

```python
# Prompt 版本控制
PROMPT_VERSIONS = {
    'customer_support_v1': {
        'version': '1.0.0',
        'created': '2026-03-24',
        'prompt': '''你是一位客服助手...''',
        'metrics': {
            'accuracy': 0.85,
            'satisfaction': 4.2
        }
    },
    'customer_support_v2': {
        'version': '2.0.0',
        'created': '2026-03-30',
        'prompt': '''你是一位资深客服专家...''',
        'metrics': {
            'accuracy': 0.92,
            'satisfaction': 4.7
        }
    }
}
```

### 3. Prompt 注入防护

```python
# 检测并阻止 Prompt 注入
def detect_prompt_injection(user_input):
    dangerous_patterns = [
        r'ignore\s+previous',
        r'forget\s+all',
        r'you\s+are\s+now',
        r'system\s+instruction',
        r'override\s+rules',
    ]
    
    for pattern in dangerous_patterns:
        if re.search(pattern, user_input, re.IGNORECASE):
            return True, 'Potential prompt injection detected'
    
    return False, 'Safe'

# 使用示例
is_injection, message = detect_prompt_injection(user_input)
if is_injection:
    return "无法处理该请求"
```

---

## ✅ AI 输出验证与质量控制

### 1. 多层验证架构

```python
class AIOutputValidator:
    def __init__(self):
        self.validators = [
            self.validate_format,
            self.validate_facts,
            self.validate_safety,
            self.validate_relevance,
        ]
    
    def validate(self, output, context=None):
        results = []
        
        for validator in self.validators:
            passed, message = validator(output, context)
            results.append({
                'validator': validator.__name__,
                'passed': passed,
                'message': message
            })
        
        return {
            'overall_passed': all(r['passed'] for r in results),
            'details': results
        }
    
    def validate_format(self, output, context):
        # 验证输出格式是否符合预期
        pass
    
    def validate_facts(self, output, context):
        # 事实核查（可调用搜索 API）
        pass
    
    def validate_safety(self, output, context):
        # 安全检查（有害内容、偏见等）
        pass
    
    def validate_relevance(self, output, context):
        # 相关性检查
        pass
```

### 2. 幻觉检测

```python
# 使用 RAG + 引用验证减少幻觉
def verify_with_rag(response, knowledge_base):
    claims = extract_claims(response)
    verified_claims = []
    
    for claim in claims:
        similar_docs = knowledge_base.search(claim, top_k=3)
        is_supported = any(
            calculate_similarity(claim, doc) > 0.8 
            for doc in similar_docs
        )
        verified_claims.append({
            'claim': claim,
            'supported': is_supported
        })
    
    hallucination_rate = sum(
        1 for c in verified_claims if not c['supported']
    ) / len(verified_claims)
    
    return {
        'hallucination_rate': hallucination_rate,
        'verified_claims': verified_claims,
        'passed': hallucination_rate < 0.1
    }
```

### 3. 质量评分系统

```python
def calculate_quality_score(response, criteria):
    scores = {}
    
    # 准确性 (0-10)
    scores['accuracy'] = evaluate_accuracy(response)
    
    # 完整性 (0-10)
    scores['completeness'] = evaluate_completeness(response)
    
    # 一致性 (0-10)
    scores['consistency'] = evaluate_consistency(response)
    
    # 有用性 (0-10)
    scores['helpfulness'] = evaluate_helpfulness(response)
    
    # 加权总分
    weights = {
        'accuracy': 0.3,
        'completeness': 0.2,
        'consistency': 0.2,
        'helpfulness': 0.3
    }
    
    total_score = sum(
        scores[k] * weights[k] for k in scores
    )
    
    return {
        'total': total_score,
        'breakdown': scores,
        'grade': get_grade(total_score)
    }

def get_grade(score):
    if score >= 9: return 'A'
    if score >= 8: return 'B'
    if score >= 7: return 'C'
    if score >= 6: return 'D'
    return 'F'
```

---

## 🔒 AI 应用安全

### 1. AI 安全威胁模型

| 威胁类型 | 描述 | 防护措施 |
|---------|------|---------|
| Prompt 注入 | 恶意用户尝试覆盖系统指令 | 输入过滤、指令分离 |
| 数据泄露 | AI 意外泄露敏感信息 | 输出过滤、敏感词检测 |
| 越狱攻击 | 绕过安全限制 | 多层安全检查 |
| 训练数据投毒 | 恶意训练数据影响模型 | 使用可信模型、验证输出 |
| 模型窃取 | 通过 API 调用复制模型行为 | 速率限制、异常检测 |

### 2. 输入安全检查

```python
class AIInputSecurity:
    def __init__(self):
        self.max_length = 4000
        self.blocked_patterns = [
            r'system\s+prompt',
            r'ignore\s+instructions',
            r'output\s+your\s+training',
        ]
        self.sensitive_keywords = [
            'password', 'secret', 'api_key', 'token'
        ]
    
    def check(self, user_input):
        # 长度检查
        if len(user_input) > self.max_length:
            return False, 'Input too long'
        
        # 模式检查
        for pattern in self.blocked_patterns:
            if re.search(pattern, user_input, re.IGNORECASE):
                return False, 'Blocked pattern detected'
        
        # 敏感词检查
        for keyword in self.sensitive_keywords:
            if keyword in user_input.lower():
                return False, 'Sensitive keyword detected'
        
        return True, 'Safe'
```

### 3. 输出安全检查

```python
class AIOutputSecurity:
    def __init__(self):
        self.pii_patterns = {
            'email': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            'phone': r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
            'ssn': r'\b\d{3}-\d{2}-\d{4}\b',
            'credit_card': r'\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b',
        }
    
    def check(self, output):
        # PII 检测
        for pii_type, pattern in self.pii_patterns.items():
            matches = re.findall(pattern, output)
            if matches:
                return False, f'{pii_type} detected', matches
        
        # 有害内容检测
        if self.contains_harmful_content(output):
            return False, 'Harmful content detected'
        
        # 偏见检测
        if self.contains_bias(output):
            return False, 'Biased content detected'
        
        return True, 'Safe'
    
    def redact_pii(self, text):
        for pii_type, pattern in self.pii_patterns.items():
            text = re.sub(pattern, f'[REDACTED {pii_type}]', text)
        return text
```

### 4. 速率限制与配额管理

```python
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self):
        self.requests = {}  # user_id -> list of timestamps
        self.limits = {
            'requests_per_minute': 60,
            'requests_per_hour': 1000,
            'tokens_per_day': 1000000
        }
    
    def check_rate_limit(self, user_id):
        now = datetime.now()
        
        # 清理旧记录
        if user_id not in self.requests:
            self.requests[user_id] = []
        
        self.requests[user_id] = [
            ts for ts in self.requests[user_id]
            if now - ts < timedelta(hours=1)
        ]
        
        # 检查限制
        if len(self.requests[user_id]) >= self.limits['requests_per_hour']:
            return False, 'Rate limit exceeded'
        
        self.requests[user_id].append(now)
        return True, 'OK'
```

---

## 🧪 AI 应用测试策略

### 1. 测试金字塔

```
           /\
          /  \
         / E2E \        端到端测试 (10%)
        /------\
       /  Integ \      集成测试 (30%)
      /----------\
     /   Unit     \    单元测试 (60%)
    /--------------\
```

### 2. Prompt 单元测试

```python
import pytest

class TestPrompts:
    def test_customer_support_greeting(self):
        prompt = load_prompt('customer_support', 'greeting')
        response = call_llm('haiku', prompt)
        
        assert '欢迎' in response or '您好' in response
        assert len(response) < 200
        assert is_polite(response)
    
    def test_code_generation_python(self):
        prompt = load_prompt('code_gen', 'python_function')
        response = call_llm('sonnet', prompt)
        
        assert is_valid_python(response)
        assert has_docstring(response)
        assert has_type_hints(response)
    
    def test_summarization_accuracy(self):
        document = load_test_document()
        expected_summary = load_expected_summary()
        
        prompt = build_summarization_prompt(document)
        response = call_llm('sonnet', prompt)
        
        similarity = calculate_similarity(response, expected_summary)
        assert similarity > 0.8
```

### 3. 集成测试

```python
class TestAIRAGSystem:
    @pytest.fixture
    def rag_system(self):
        return RAGSystem(
            llm='sonnet',
            vector_store=test_vector_store,
            retriever=test_retriever
        )
    
    def test_rag_retrieval(self, rag_system):
        query = "公司报销政策是什么？"
        response = rag_system.query(query)
        
        assert response.answer is not None
        assert len(response.sources) > 0
        assert all(hasattr(s, 'document_id') for s in response.sources)
    
    def test_rag_hallucination_rate(self, rag_system):
        test_cases = load_test_cases('hallucination_test.json')
        hallucinations = 0
        
        for case in test_cases:
            response = rag_system.query(case['question'])
            if not verify_facts(response.answer, case['facts']):
                hallucinations += 1
        
        rate = hallucinations / len(test_cases)
        assert rate < 0.1, f'Hallucination rate {rate} exceeds threshold'
```

### 4. 压力测试

```python
import asyncio
import aiohttp

async def stress_test_ai_api(concurrent_users=100, requests_per_user=10):
    """AI API 压力测试"""
    
    async def make_request(session, user_id):
        async with session.post(
            'https://api.example.com/v1/chat',
            json={'message': 'Hello'}
        ) as response:
            return await response.json()
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for i in range(concurrent_users):
            for j in range(requests_per_user):
                tasks.append(make_request(session, i))
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        success = sum(1 for r in results if not isinstance(r, Exception))
        total = len(results)
        
        return {
            'success_rate': success / total,
            'avg_latency': calculate_avg_latency(results),
            'p99_latency': calculate_p99_latency(results),
            'errors': [str(r) for r in results if isinstance(r, Exception)]
        }

# 运行压力测试
results = asyncio.run(stress_test_ai_api())
assert results['success_rate'] > 0.99
assert results['p99_latency'] < 2000  # 2 秒
```

---

## ⚡ 性能优化与成本控制

### 1. 缓存策略

```python
import hashlib
import redis

class AICache:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.ttl = {
            'factual': 86400,    # 事实性问题缓存 24 小时
            'creative': 3600,    # 创意性问题缓存 1 小时
            'code': 604800,      # 代码缓存 7 天
        }
    
    def get_cache_key(self, prompt, model):
        content = f"{prompt}:{model}"
        return f"ai_cache:{hashlib.md5(content.encode()).hexdigest()}"
    
    def get(self, prompt, model):
        key = self.get_cache_key(prompt, model)
        cached = self.redis.get(key)
        return json.loads(cached) if cached else None
    
    def set(self, prompt, model, response, category='factual'):
        key = self.get_cache_key(prompt, model)
        ttl = self.ttl.get(category, 3600)
        self.redis.setex(key, ttl, json.dumps(response))
    
    def should_cache(self, prompt):
        # 判断是否应该缓存
        if is_factual_question(prompt):
            return True
        if is_creative_question(prompt):
            return False
        return True
```

### 2. 批量处理优化

```python
# 批量处理减少 API 调用次数
def batch_process_requests(requests, batch_size=10):
    """批量处理请求，减少 API 调用成本"""
    
    batches = [
        requests[i:i + batch_size]
        for i in range(0, len(requests), batch_size)
    ]
    
    results = []
    for batch in batches:
        # 合并相似请求
        combined_prompt = combine_similar_prompts(batch)
        combined_response = call_llm('sonnet', combined_prompt)
        
        # 拆分结果
        batch_results = split_results(combined_response, batch)
        results.extend(batch_results)
    
    return results

# 成本对比
# 单独调用：100 请求 × $0.01 = $1.00
# 批量调用：10 批次 × $0.01 = $0.10
# 节省：90%
```

### 3. 模型路由优化

```python
class ModelRouter:
    """智能模型路由，平衡成本和质量"""
    
    def __init__(self):
        self.model_costs = {
            'haiku': 0.00025,    # $/1K tokens
            'sonnet': 0.003,
            'opus': 0.015,
        }
        self.model_quality = {
            'haiku': 0.7,
            'sonnet': 0.9,
            'opus': 0.95,
        }
    
    def route(self, request):
        complexity = analyze_complexity(request)
        
        if complexity < 0.3:
            return 'haiku'  # 简单问题用便宜模型
        elif complexity < 0.7:
            return 'sonnet'  # 中等问题用中等模型
        else:
            return 'opus'   # 复杂问题用最强模型
    
    def analyze_complexity(self, request):
        factors = {
            'length': len(request) / 1000,
            'technical_terms': count_technical_terms(request),
            'reasoning_required': detect_reasoning(request),
        }
        
        return sum(factors.values()) / len(factors)
```

### 4. 成本监控与告警

```python
class CostMonitor:
    def __init__(self):
        self.daily_budget = 100  # $/天
        self.alerts = {
            '50%': 'warning',
            '80%': 'critical',
            '100%': 'emergency'
        }
    
    def track_usage(self, model, tokens, cost):
        # 记录使用量
        redis_client.hincrby('daily_usage', model, tokens)
        redis_client.incrbyfloat('daily_cost', cost)
        
        # 检查预算
        current_cost = float(redis_client.get('daily_cost'))
        usage_ratio = current_cost / self.daily_budget
        
        if usage_ratio >= 1.0:
            self.send_alert('emergency', f'Daily budget exceeded: ${current_cost}')
        elif usage_ratio >= 0.8:
            self.send_alert('critical', f'80% of daily budget used: ${current_cost}')
        elif usage_ratio >= 0.5:
            self.send_alert('warning', f'50% of daily budget used: ${current_cost}')
    
    def send_alert(self, level, message):
        # 发送告警到 Slack/邮件
        pass
```

---

## 📊 监控与日志

### 1. 关键指标监控

```python
AI_METRICS = {
    # 性能指标
    'latency_p50': 'ms',
    'latency_p95': 'ms',
    'latency_p99': 'ms',
    
    # 质量指标
    'accuracy_rate': '%',
    'hallucination_rate': '%',
    'user_satisfaction': '1-5',
    
    # 安全指标
    'injection_attempts': 'count',
    'blocked_outputs': 'count',
    
    # 成本指标
    'tokens_per_request': 'count',
    'cost_per_request': '$',
    'daily_cost': '$',
}
```

### 2. 结构化日志

```python
import structlog

logger = structlog.get_logger()

def log_ai_request(request, response, metadata):
    logger.info(
        'ai_request',
        request_id=metadata['request_id'],
        model=metadata['model'],
        prompt_length=len(request),
        response_length=len(response),
        latency=metadata['latency'],
        tokens_used=metadata['tokens'],
        cost=metadata['cost'],
        user_id=metadata['user_id'],
        session_id=metadata['session_id'],
    )

def log_ai_error(error, request, metadata):
    logger.error(
        'ai_error',
        error_type=type(error).__name__,
        error_message=str(error),
        request_id=metadata['request_id'],
        model=metadata['model'],
        user_id=metadata['user_id'],
    )
```

### 3. 告警规则

```python
ALERT_RULES = {
    'high_latency': {
        'condition': 'latency_p95 > 5000',
        'threshold': 5000,  # ms
        'window': '5m',
        'severity': 'warning'
    },
    'high_error_rate': {
        'condition': 'error_rate > 0.05',
        'threshold': 0.05,  # 5%
        'window': '5m',
        'severity': 'critical'
    },
    'budget_exceeded': {
        'condition': 'daily_cost > daily_budget',
        'threshold': 1.0,  # 100%
        'window': '1h',
        'severity': 'emergency'
    },
    'hallucination_spike': {
        'condition': 'hallucination_rate > 0.1',
        'threshold': 0.1,  # 10%
        'window': '10m',
        'severity': 'critical'
    }
}
```

---

## 🔗 参考资料

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Anthropic Production Guide](https://docs.anthropic.com/en/docs/build-with-claude/production)
- [OpenAI Production Best Practices](https://platform.openai.com/docs/guides/production)
- [Microsoft AI Security Framework](https://learn.microsoft.com/en-us/azure/ai-services/security)
- [LangChain Production Deployment](https://python.langchain.com/docs/guides/production)

---

_最后更新：2026-03-24_
