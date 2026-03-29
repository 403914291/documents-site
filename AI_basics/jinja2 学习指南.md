# Jinja2 学习指南

> Python 最强大的模板引擎，Web 开发必备技能

---

## 📖 目录

1. [Jinja2 简介](#1-jinja2-简介)
2. [安装与配置](#2-安装与配置)
3. [基础语法](#3-基础语法)
4. [控制结构](#4-控制结构)
5. [模板继承](#5-模板继承)
6. [过滤器](#6-过滤器)
7. [测试器](#7-测试器)
8. [宏与调用](#8-宏与调用)
9. [Python 集成](#9-python-集成)
10. [实战示例](#10-实战示例)
11. [最佳实践](#11-最佳实践)

---

## 1. Jinja2 简介

### 1.1 什么是 Jinja2？

Jinja2 是一个现代的、设计优雅的 **Python 模板引擎**。它由 Pocoo 团队开发（也是 Flask 框架的创造者），广泛应用于 Web 开发、配置文件生成、代码模板等场景。

**核心特点：**
- 🚀 **快速高效** - 编译为 Python 字节码，执行速度快
- 🔒 **安全可靠** - 沙箱执行环境，防止恶意模板代码
- 🎨 **语法简洁** - 类似 Django 模板，易于学习
- 🔧 **功能强大** - 支持继承、宏、过滤器、自定义函数
- 📦 **零依赖** - 仅需 Python 标准库

### 1.2 应用场景

| 场景 | 说明 |
|------|------|
| Web 开发 | Flask、Django 等框架的 HTML 模板渲染 |
| 代码生成 | 批量生成配置文件、源代码文件 |
| 报告生成 | HTML/PDF 报告、邮件模板 |
| 文档站点 | VitePress、MkDocs 等静态站点生成器 |
| 自动化运维 | 批量生成服务器配置文件 |

### 1.3 模板语法示例

```jinja2
{# 这是一个注释 #}
<!DOCTYPE html>
<html>
<head>
    <title>{{ page_title }}</title>
</head>
<body>
    <h1>欢迎，{{ user.name }}!</h1>
    
    {% if user.is_vip %}
        <p>尊贵的 VIP 用户，您好！</p>
    {% endif %}
    
    <ul>
    {% for item in items %}
        <li>{{ loop.index }}. {{ item.name }}</li>
    {% endfor %}
    </ul>
</body>
</html>
```

---

## 2. 安装与配置

### 2.1 安装 Jinja2

```bash
# 使用 pip 安装
pip install jinja2

# 验证安装
python -c "import jinja2; print(jinja2.__version__)"
```

### 2.2 基础使用

```python
from jinja2 import Template

# 创建模板对象
template = Template("Hello, {{ name }}!")

# 渲染模板
result = template.render(name="World")
print(result)  # 输出：Hello, World!
```

### 2.3 使用 FileSystemLoader

```python
from jinja2 import Environment, FileSystemLoader

# 创建环境，指定模板目录
env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=True  # 启用自动转义，防止 XSS
)

# 加载模板
template = env.get_template('index.html')

# 渲染
html = template.render(title="首页", user="老李")
```

### 2.4 常用配置选项

```python
from jinja2 import Environment, FileSystemLoader

env = Environment(
    loader=FileSystemLoader('templates'),
    
    # 模板语法定界符（可自定义）
    block_start_string='{%',
    block_end_string='%}',
    variable_start_string='{{',
    variable_end_string='}}',
    comment_start_string='{#',
    comment_end_string='#}',
    
    # 安全选项
    autoescape=True,        # 自动转义 HTML 特殊字符
    undefined=Undefined,    # 未定义变量的处理方式
    
    # 性能选项
    cache_size=400,         # 模板缓存数量
    auto_reload=True,       # 模板文件变更时自动重载
    
    # 空白控制
    trim_blocks=True,       # 删除块后的第一个换行
    lstrip_blocks=True,     # 删除块前的空白
)
```

---

## 3. 基础语法

### 3.1 变量输出

```jinja2
{# 基本变量输出 #}
{{ username }}
{{ user.email }}
{{ items[0] }}
{{ config['site_name'] }}

{# 使用点号访问属性和字典 #}
{{ user.name }}      {# 对象属性 #}
{{ user['name'] }}   {# 字典键值 #}
{{ user.get_name() }} {# 方法调用 #}
```

### 3.2 数学运算

```jinja2
{{ 1 + 2 }}        {# 3 #}
{{ 10 - 3 }}       {# 7 #}
{{ 2 * 5 }}        {# 10 #}
{{ 15 / 3 }}       {# 5.0 #}
{{ 15 // 3 }}      {# 5 - 整除 #}
{{ 17 % 5 }}       {# 2 - 取余 #}
{{ 2 ** 3 }}       {# 8 - 幂运算 #}
```

### 3.3 字符串操作

```jinja2
{{ 'Hello' ~ ' ' ~ 'World' }}  {# 字符串连接：Hello World #}
{{ 'Python'[0:2] }}            {# 字符串切片：Py #}
{{ 'test' in 'this is a test' }} {# 成员测试：true #}
```

### 3.4 比较运算

```jinja2
{{ 5 == 5 }}       {# true #}
{{ 5 != 3 }}       {# true #}
{{ 5 > 3 }}        {# true #}
{{ 5 < 10 }}       {# true #}
{{ 5 >= 5 }}       {# true #}
{{ 5 <= 10 }}      {# true #}
```

### 3.5 逻辑运算

```jinja2
{{ true and true }}   {# true #}
{{ true or false }}   {# true #}
{{ not false }}       {# true #}

{# 条件表达式（三元运算符）#}
{{ '成年' if age >= 18 else '未成年' }}
```

### 3.6 注释

```jinja2
{# 这是单行注释 #}

{# 
   这是多行注释
   可以跨越多行
#}

{# 注释中可以包含 {{ 变量 }} 但不会被渲染 #}
```

---

## 4. 控制结构

### 4.1 If 条件语句

```jinja2
{# 基本 if #}
{% if user.is_logged_in %}
    <p>欢迎回来，{{ user.name }}!</p>
{% endif %}

{# if-else #}
{% if items %}
    <p>共有 {{ items|length }} 个项目</p>
{% else %}
    <p>暂无项目</p>
{% endif %}

{# if-elif-else #}
{% if score >= 90 %}
    <p>优秀</p>
{% elif score >= 60 %}
    <p>及格</p>
{% else %}
    <p>不及格</p>
{% endif %}

{# 复合条件 #}
{% if user.is_vip and user.balance > 100 %}
    <p>尊贵 VIP 用户，余额充足</p>
{% endif %}
```

### 4.2 For 循环

```jinja2
{# 基本循环 #}
<ul>
{% for item in items %}
    <li>{{ item }}</li>
{% endfor %}
</ul>

{# 带索引的循环 #}
{% for user in users %}
    {{ loop.index }}. {{ user.name }}  {# 从 1 开始的索引 #}
    {{ loop.index0 }}. {{ user.email }} {# 从 0 开始的索引 #}
{% endfor %}

{# 循环信息变量 #}
{% for item in items %}
    {% if loop.first %}
        <li class="first">首个项目：{{ item }}</li>
    {% elif loop.last %}
        <li class="last">末尾项目：{{ item }}</li>
    {% else %}
        <li>{{ item }}</li>
    {% endif %}
{% endfor %}

{# 嵌套循环 #}
{% for category in categories %}
    <h2>{{ category.name }}</h2>
    <ul>
    {% for product in category.products %}
        <li>{{ product.name }}</li>
    {% else %}
        <li>该分类下无产品</li>
    {% endfor %}
    </ul>
{% endfor %}

{# 循环控制 #}
{% for i in range(10) %}
    {% if i == 5 %}
        {% break %}  {# 跳出循环 #}
    {% endif %}
    {{ i }}
{% endfor %}

{% for i in range(5) %}
    {% if i == 2 %}
        {% continue %}  {# 跳过本次迭代 #}
    {% endif %}
    {{ i }}
{% endfor %}
```

### 4.3 范围循环

```jinja2
{# 使用 range 函数 #}
{% for i in range(5) %}      {# 0, 1, 2, 3, 4 #}
    {{ i }}
{% endfor %}

{% for i in range(1, 6) %}   {# 1, 2, 3, 4, 5 #}
    {{ i }}
{% endfor %}

{% for i in range(0, 10, 2) %} {# 0, 2, 4, 6, 8 #}
    {{ i }}
{% endfor %}

{% for i in range(10, 0, -1) %} {# 10, 9, 8, ..., 1 #}
    {{ i }}
{% endfor %}
```

### 4.4 字典遍历

```jinja2
{% for key, value in config.items() %}
    <p>{{ key }}: {{ value }}</p>
{% endfor %}
```

---

## 5. 模板继承

### 5.1 基础模板（base.html）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}默认标题{% endblock %}</title>
    
    {% block head %}
    <link rel="stylesheet" href="/static/css/style.css">
    {% endblock %}
    
    {% block extra_head %}{% endblock %}
</head>
<body>
    <header>
        <nav>
            {% block navigation %}
            <a href="/">首页</a>
            <a href="/about">关于</a>
            <a href="/contact">联系</a>
            {% endblock %}
        </nav>
    </header>
    
    <main>
        {% block content %}{% endblock %}
    </main>
    
    <footer>
        {% block footer %}
        <p>&copy; 2026 我的网站</p>
        {% endblock %}
    </footer>
    
    {% block scripts %}
    <script src="/static/js/main.js"></script>
    {% endblock %}
</body>
</html>
```

### 5.2 子模板继承（index.html）

```html
{% extends "base.html" %}

{% block title %}首页 - 我的网站{% endblock %}

{% block extra_head %}
<link rel="stylesheet" href="/static/css/home.css">
{% endblock %}

{% block content %}
<h1>欢迎来到首页</h1>
<p>这是首页内容...</p>

{% for article in articles %}
    <article>
        <h2>{{ article.title }}</h2>
        <p>{{ article.summary }}</p>
    </article>
{% endfor %}
{% endblock %}

{% block scripts %}
{{ super() }}  {# 保留父模板的 scripts #}
<script src="/static/js/home.js"></script>
{% endblock %}
```

### 5.3 Include 包含

```jinja2
{# 包含另一个模板 #}
{% include 'sidebar.html' %}

{# 条件包含（如果文件不存在则忽略）#}
{% include 'sidebar.html' ignore missing %}

{# 从多个模板中选择第一个存在的 #}
{% include ['sidebar_user.html', 'sidebar_default.html'] %}
```

### 5.4 Import 导入宏

```jinja2
{# 导入整个模板作为模块 #}
{% import 'forms.html' as forms %}

{{ forms.input_field('username', '用户名') }}
{{ forms.textarea('content', '内容') }}

{# 只导入特定的宏 #}
{% from 'forms.html' import input_field, textarea %}

{{ input_field('email', '邮箱') }}
{{ textarea('message', '留言') }}

{# 导入并重命名 #}
{% from 'forms.html' import input_field as field %}

{{ field('phone', '电话') }}
```

---

## 6. 过滤器

### 6.1 常用内置过滤器

```jinja2
{# 字符串处理 #}
{{ name|lower }}              {# 转小写 #}
{{ name|upper }}              {# 转大写 #}
{{ name|title }}              {# 首字母大写 #}
{{ name|capitalize }}         {# 首字符大写 #}
{{ text|truncate(50) }}       {# 截断文本 #}
{{ text|striptags }}          {# 移除 HTML 标签 #}
{{ text|escape }}             {# HTML 转义 #}
{{ text|replace('old', 'new') }} {# 替换字符串 #}

{# 列表处理 #}
{{ items|length }}            {# 列表长度 #}
{{ items|first }}             {# 第一个元素 #}
{{ items|last }}              {# 最后一个元素 #}
{{ items|reverse }}           {# 反转列表 #}
{{ items|sort }}              {# 排序 #}
{{ items|unique }}            {# 去重 #}
{{ items|join(', ') }}        {# 连接为字符串 #}

{# 数值处理 #}
{{ price|round(2) }}          {# 四舍五入 #}
{{ price|abs }}               {# 绝对值 #}
{{ count|default(0) }}        {# 默认值 #}

{# 字典处理 #}
{{ config|dictsort }}         {# 按键排序 #}
{{ config|items }}            {# 获取键值对 #}

{# HTML 相关 #}
{{ content|safe }}            {# 标记为安全 HTML #}
{{ html|escape }}             {# HTML 转义 #}
```

### 6.2 过滤器链式调用

```jinja2
{{ name|lower|title }}
{{ items|reverse|first }}
{{ text|striptags|truncate(100)|escape }}
```

### 6.3 带参数的过滤器

```jinja2
{{ text|truncate(50, true, '...') }}  {# 截断，保持完整单词，自定义后缀 #}
{{ items|join(', ', '和') }}          {# 连接，指定分隔符 #}
{{ price|round(2, 'floor') }}         {# 向下取整 #}
{{ date|date('Y-m-d') }}              {# 日期格式化 #}
```

### 6.4 自定义过滤器

```python
# Python 代码中定义过滤器
def format_currency(value):
    """将数值格式化为货币形式"""
    return f"¥{value:,.2f}"

def format_phone(value):
    """将手机号格式化为 138-0000-0000"""
    if len(value) == 11:
        return f"{value[:3]}-{value[3:7]}-{value[7:]}"
    return value

# 注册到 Jinja2 环境
env.filters['currency'] = format_currency
env.filters['phone'] = format_phone
```

```jinja2
{# 模板中使用自定义过滤器 #}
{{ price|currency }}      {# ¥1,234.56 #}
{{ phone|phone }}         {# 138-0000-0000 #}
```

### 6.5 在模板中定义过滤器

```jinja2
{% filter upper %}
    这段文字会变成大写
{% endfilter %}

{% filter truncate(50) %}
    这是一段很长的文字，会被截断处理...
{% endfilter %}
```

---

## 7. 测试器

### 7.1 常用内置测试器

```jinja2
{# 类型测试 #}
{% if number is defined %}...{% endif %}
{% if value is none %}...{% endif %}
{% if flag is sameas true %}...{% endif %}

{% if age is integer %}...{% endif %}
{% if price is float %}...{% endif %}
{% if text is string %}...{% endif %}
{% if flag is boolean %}...{% endif %}
{% if items is iterable %}...{% endif %}
{% if data is mapping %}...{% endif %}
{% if func is callable %}...{% endif %}

{# 数值测试 #}
{% if num is even %}...{% endif %}
{% if num is odd %}...{% endif %}
{% if num is divisibleby 3 %}...{% endif %}

{# 字符串测试 #}
{% if name is lower %}...{% endif %}
{% if title is upper %}...{% endif %}
{% if text is startingwith 'Hello' %}...{% endif %}
{% if url is endingwith '.html' %}...{% endif %}

{# 集合测试 #}
{% if item in items %}...{% endif %}
{% if 'admin' in user.roles %}...{% endif %}
```

### 7.2 自定义测试器

```python
# Python 代码中定义测试器
def is_valid_email(value):
    """测试是否为有效的邮箱格式"""
    import re
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, value))

def is_adult(value):
    """测试是否成年"""
    return value >= 18

# 注册到 Jinja2 环境
env.tests['valid_email'] = is_valid_email
env.tests['adult'] = is_adult
```

```jinja2
{# 模板中使用自定义测试器 #}
{% if email is valid_email %}
    <p>邮箱格式正确</p>
{% endif %}

{% if age is adult %}
    <p>已成年</p>
{% else %}
    <p>未成年</p>
{% endif %}
```

---

## 8. 宏与调用

### 8.1 定义宏

```jinja2
{# 基本宏定义 #}
{% macro input_field(name, type='text', value='', placeholder='') %}
<input type="{{ type }}" 
       name="{{ name }}" 
       value="{{ value }}"
       placeholder="{{ placeholder }}">
{% endmacro %}

{# 带默认值的宏 #}
{% macro button(text='提交', type='submit', class='btn') %}
<button type="{{ type }}" class="{{ class }}">
    {{ text }}
</button>
{% endmacro %}

{# 复杂宏 - 表单字段 #}
{% macro form_field(label, name, type='text', required=False, error=None) %}
<div class="form-group {% if error %}has-error{% endif %}">
    <label for="{{ name }}">
        {{ label }}
        {% if required %}<span class="required">*</span>{% endif %}
    </label>
    <input type="{{ type }}" 
           id="{{ name }}" 
           name="{{ name }}"
           {% if required %}required{% endif %}>
    {% if error %}
        <span class="error">{{ error }}</span>
    {% endif %}
</div>
{% endmacro %}
```

### 8.2 调用宏

```jinja2
{# 同一模板内调用 #}
{{ input_field('username', placeholder='请输入用户名') }}
{{ button('立即注册', class='btn-primary') }}

{# 调用带 required 的字段 #}
{{ form_field('邮箱', 'email', type='email', required=True) }}
{{ form_field('密码', 'password', type='password', required=True, error='密码不能为空') }}
```

### 8.3 宏的导入与导出

**forms.html**
```jinja2
{% macro input(name, type='text') %}
<input type="{{ type }}" name="{{ name }}">
{% endmacro %}

{% macro textarea(name, rows=5) %}
<textarea name="{{ name }}" rows="{{ rows }}"></textarea>
{% endmacro %}

{% macro select(name, options) %}
<select name="{{ name }}">
    {% for value, label in options %}
    <option value="{{ value }}">{{ label }}</option>
    {% endfor %}
</select>
{% endmacro %}
```

**使用模板**
```jinja2
{# 导入整个模块 #}
{% import 'forms.html' as forms %}

{{ forms.input('username') }}
{{ forms.textarea('content', rows=10) }}
{{ forms.select('category', [('1', '分类 1'), ('2', '分类 2')]) }}

{# 只导入特定宏 #}
{% from 'forms.html' import input, textarea %}

{{ input('email', type='email') }}
{{ textarea('message') }}
```

### 8.4 可变参数宏

```jinja2
{% macro list_items(*items) %}
<ul>
{% for item in items %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
{% endmacro %}

{# 调用 #}
{{ list_items('苹果', '香蕉', '橙子') }}

{% macro tag_cloud(**tags) %}
<div class="tag-cloud">
{% for name, count in tags.items() %}
    <span class="tag" data-count="{{ count }}">{{ name }}</span>
{% endfor %}
</div>
{% endmacro %}
```

---

## 9. Python 集成

### 9.1 基础集成

```python
from jinja2 import Environment, FileSystemLoader, select_autoescape

# 创建环境
env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape(['html', 'xml']),
    trim_blocks=True,
    lstrip_blocks=True
)

# 加载模板
template = env.get_template('index.html')

# 渲染
html = template.render(
    title="首页",
    user={"name": "老李", "email": "li@example.com"},
    items=["项目 1", "项目 2", "项目 3"]
)

# 输出到文件
with open('output.html', 'w', encoding='utf-8') as f:
    f.write(html)
```

### 9.2 Flask 集成

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', 
                          title="首页",
                          user=current_user)

@app.route('/user/<username>')
def user_profile(username):
    user = get_user(username)
    return render_template('profile.html', user=user)

if __name__ == '__main__':
    app.run(debug=True)
```

### 9.3 自定义全局函数

```python
from jinja2 import Environment, FileSystemLoader

def format_date(date, format='%Y-%m-%d'):
    """格式化日期"""
    return date.strftime(format)

def gravatar_url(email, size=80):
    """生成 Gravatar 头像 URL"""
    import hashlib
    hash_email = hashlib.md5(email.lower().encode()).hexdigest()
    return f"https://www.gravatar.com/avatar/{hash_email}?s={size}"

# 创建环境并注册全局函数
env = Environment(loader=FileSystemLoader('templates'))
env.globals['format_date'] = format_date
env.globals['gravatar_url'] = gravatar_url

# 或者使用 dict 一次性注册
env.globals.update({
    'format_date': format_date,
    'gravatar_url': gravatar_url,
    'site_name': '我的网站',
    'version': '1.0.0'
})
```

```jinja2
{# 模板中使用全局函数 #}
<img src="{{ gravatar_url(user.email, 100) }}" alt="头像">
<p>发布日期：{{ format_date(article.created_at) }}</p>
<footer>{{ site_name }} v{{ version }}</footer>
```

### 9.4 模板继承与上下文

```python
# 基础上下文
base_context = {
    'site_name': '我的网站',
    'current_year': 2026,
    'navigation': [
        {'name': '首页', 'url': '/'},
        {'name': '关于', 'url': '/about'},
        {'name': '联系', 'url': '/contact'}
    ]
}

# 渲染时合并上下文
template = env.get_template('page.html')
html = template.render(**base_context, title="具体页面", content="页面内容")
```

### 9.5 模板字符串渲染

```python
from jinja2 import Template

# 直接从字符串创建模板
template = Template("""
Hello, {{ name }}!

{% for item in items %}
- {{ item }}
{% endfor %}
""")

result = template.render(
    name="老李",
    items=["苹果", "香蕉", "橙子"]
)
print(result)
```

### 9.6 批量生成文件

```python
from jinja2 import Environment, FileSystemLoader
import os

env = Environment(loader=FileSystemLoader('templates'))

# 配置文件模板
config_template = env.get_template('nginx.conf.j2')

# 批量生成服务器配置
servers = [
    {'name': 'web1', 'ip': '192.168.1.10', 'port': 80},
    {'name': 'web2', 'ip': '192.168.1.11', 'port': 80},
    {'name': 'api1', 'ip': '192.168.1.20', 'port': 8080},
]

for server in servers:
    config = config_template.render(server=server)
    
    # 写入配置文件
    filename = f"configs/{server['name']}.conf"
    os.makedirs('configs', exist_ok=True)
    with open(filename, 'w') as f:
        f.write(config)
    
    print(f"生成配置：{filename}")
```

---

## 10. 实战示例

### 10.1 HTML 邮件模板

**templates/email/welcome.html**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background: #4CAF50; 
            color: white; 
            text-decoration: none; 
            border-radius: 4px;
        }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>欢迎加入 {{ site_name }}!</h1>
        </div>
        
        <div class="content">
            <p>亲爱的 {{ user.name }}，</p>
            
            <p>感谢您注册 {{ site_name }}！我们很高兴您能成为我们社区的一员。</p>
            
            <p>您的账号信息：</p>
            <ul>
                <li>用户名：{{ user.username }}</li>
                <li>邮箱：{{ user.email }}</li>
                <li>注册时间：{{ register_date }}</li>
            </ul>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="{{ activate_url }}" class="button">激活账号</a>
            </p>
            
            <p>如果按钮无法点击，请复制以下链接到浏览器：</p>
            <p><small>{{ activate_url }}</small></p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ current_year }} {{ site_name }}. 保留所有权利.</p>
            <p>如果您没有注册此账号，请忽略此邮件。</p>
        </div>
    </div>
</body>
</html>
```

**Python 渲染代码**
```python
from datetime import datetime

html = template.render(
    site_name="我的网站",
    user={
        'name': '老李',
        'username': 'liyong',
        'email': 'li@example.com'
    },
    register_date=datetime.now().strftime('%Y-%m-%d %H:%M'),
    activate_url="https://example.com/activate?token=abc123",
    current_year=2026
)
```

### 10.2 代码生成器

**templates/python/class.py.j2**
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
{{ class_name }} - {{ description }}

自动生成于：{{ generation_date }}
"""

{% for import in imports %}
{{ import }}
{% endfor %}


class {{ class_name }}:
    """{{ class_name }} 类说明"""
    
    def __init__(self{% for param in constructor_params %}, {{ param.name }}{% if param.default %}={{ param.default }}{% endif %}{% endfor %}):
        """
        初始化 {{ class_name }}
        
        {% for param in constructor_params %}
        :param {{ param.name }}: {{ param.description }}
        {% endfor %}
        """
        {% for param in constructor_params %}
        self.{{ param.name }} = {{ param.name }}
        {% endfor %}
    
    {% for method in methods %}
    def {{ method.name }}(self{% for param in method.params %}, {{ param }}{% endfor %}):
        """{{ method.description }}"""
        {{ method.body|indent(8) }}
    
    {% endfor %}

    def __str__(self):
        return f"{{ class_name }}({% for param in constructor_params[:3] %}{{ self.{{ param.name }}}}, {% endfor %}...)"
```

**Python 生成代码**
```python
from jinja2 import Environment, FileSystemLoader
from datetime import datetime

env = Environment(loader=FileSystemLoader('templates/python'))
template = env.get_template('class.py.j2')

code = template.render(
    class_name="UserService",
    description="用户服务类",
    generation_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    imports=[
        "from typing import Optional, List",
        "from datetime import datetime"
    ],
    constructor_params=[
        {'name': 'db_connection', 'description': '数据库连接'},
        {'name': 'cache_ttl', 'description': '缓存时间', 'default': '3600'}
    ],
    methods=[
        {
            'name': 'get_user',
            'params': ['user_id: int'],
            'description': '获取用户信息',
            'body': 'pass  # TODO: 实现获取用户逻辑'
        },
        {
            'name': 'create_user',
            'params': ['username: str', 'email: str'],
            'description': '创建新用户',
            'body': 'pass  # TODO: 实现创建用户逻辑'
        }
    ]
)

with open('user_service.py', 'w', encoding='utf-8') as f:
    f.write(code)
```

### 10.3 配置文件生成

**templates/docker-compose.yml.j2**
```yaml
version: '3.8'

services:
{% for service in services %}
  {{ service.name }}:
    image: {{ service.image }}
    container_name: {{ service.container_name|default(service.name) }}
    {% if service.ports %}
    ports:
    {% for port in service.ports %}
      - "{{ port }}"
    {% endfor %}
    {% endif %}
    {% if service.volumes %}
    volumes:
    {% for volume in service.volumes %}
      - {{ volume }}
    {% endfor %}
    {% endif %}
    {% if service.environment %}
    environment:
    {% for key, value in service.environment.items() %}
      - {{ key }}={{ value }}
    {% endfor %}
    {% endif %}
    {% if service.networks %}
    networks:
    {% for network in service.networks %}
      - {{ network }}
    {% endfor %}
    {% endif %}
    {% if service.depends_on %}
    depends_on:
    {% for dep in service.depends_on %}
      - {{ dep }}
    {% endfor %}
    {% endif %}

{% endfor %}
networks:
{% for network in networks %}
  {{ network.name }}:
    driver: {{ network.driver|default('bridge') }}
{% endfor %}
```

**Python 生成配置**
```python
config = template.render(
    services=[
        {
            'name': 'web',
            'image': 'nginx:latest',
            'ports': ['80:80', '443:443'],
            'volumes': ['./html:/usr/share/nginx/html'],
            'networks': ['frontend'],
            'depends_on': ['api']
        },
        {
            'name': 'api',
            'image': 'python:3.11-slim',
            'container_name': 'myapp-api',
            'ports': ['8000:8000'],
            'volumes': ['./app:/app'],
            'environment': {
                'DATABASE_URL': 'postgresql://user:pass@db:5432/mydb',
                'REDIS_URL': 'redis://cache:6379/0',
                'DEBUG': 'false'
            },
            'networks': ['frontend', 'backend'],
            'depends_on': ['db', 'cache']
        },
        {
            'name': 'db',
            'image': 'postgres:15',
            'environment': {
                'POSTGRES_USER': 'user',
                'POSTGRES_PASSWORD': 'pass',
                'POSTGRES_DB': 'mydb'
            },
            'volumes': ['postgres_data:/var/lib/postgresql/data'],
            'networks': ['backend']
        },
        {
            'name': 'cache',
            'image': 'redis:7-alpine',
            'networks': ['backend']
        }
    ],
    networks=[
        {'name': 'frontend'},
        {'name': 'backend'}
    ]
)
```

### 10.4 博客文章列表

**templates/blog/index.html**
```html
{% extends "base.html" %}

{% block title %}博客文章 - {{ site_name }}{% endblock %}

{% block content %}
<div class="blog-container">
    <h1>博客文章</h1>
    
    {# 分类筛选 #}
    <div class="filters">
        <a href="/blog" class="{% if not current_category %}active{% endif %}">全部</a>
        {% for category in categories %}
        <a href="/blog?category={{ category.slug }}" 
           class="{% if current_category == category.slug %}active{% endif %}">
            {{ category.name }}
        </a>
        {% endfor %}
    </div>
    
    {# 文章列表 #}
    <div class="articles">
        {% if articles %}
            {% for article in articles %}
            <article class="article-card">
                <header>
                    <h2>
                        <a href="/blog/{{ article.slug }}">{{ article.title }}</a>
                    </h2>
                    <div class="meta">
                        <span class="author">{{ article.author.name }}</span>
                        <span class="date">{{ article.published_at|date('Y-m-d') }}</span>
                        <span class="category">{{ article.category.name }}</span>
                    </div>
                </header>
                
                <div class="excerpt">
                    {{ article.excerpt|truncate(200) }}
                </div>
                
                <footer>
                    <a href="/blog/{{ article.slug }}" class="read-more">阅读全文 →</a>
                    <span class="tags">
                        {% for tag in article.tags[:5] %}
                        <span class="tag">{{ tag.name }}</span>
                        {% endfor %}
                    </span>
                </footer>
            </article>
            {% endfor %}
            
            {# 分页 #}
            <nav class="pagination">
                {% if pagination.has_prev %}
                <a href="/blog?page={{ pagination.prev_num }}">← 上一页</a>
                {% endif %}
                
                <span class="page-info">
                    第 {{ pagination.page }} / {{ pagination.pages }} 页
                </span>
                
                {% if pagination.has_next %}
                <a href="/blog?page={{ pagination.next_num }}">下一页 →</a>
                {% endif %}
            </nav>
        {% else %}
            <div class="no-articles">
                <p>暂无文章</p>
            </div>
        {% endif %}
    </div>
</div>
{% endblock %}
```

---

## 11. 最佳实践

### 11.1 安全建议

```python
# ✅ 启用自动转义
env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=True  # 防止 XSS 攻击
)

# ✅ 使用沙箱环境执行不可信模板
from jinja2.sandbox import SandboxedEnvironment

sandbox = SandboxedEnvironment()

# ❌ 不要直接渲染用户输入的模板
# 危险：user_template = Template(user_input)

# ✅ 如果必须渲染用户内容，使用沙箱
try:
    result = sandbox.from_string(user_input).render()
except Exception as e:
    # 处理不安全操作
    result = "模板渲染失败"
```

### 11.2 性能优化

```python
# ✅ 启用模板缓存
env = Environment(
    loader=FileSystemLoader('templates'),
    cache_size=400,      # 缓存 400 个模板
    auto_reload=False    # 生产环境关闭自动重载
)

# ✅ 预编译模板
template = env.get_template('index.html')
# 模板会被缓存，后续调用直接使用

# ✅ 批量渲染时使用相同的 Environment
# 避免重复创建 Environment 实例

# ✅ 使用 trim_blocks 和 lstrip_blocks 减少输出体积
env = Environment(
    trim_blocks=True,    # 删除块标签后的第一个换行
    lstrip_blocks=True   # 删除块标签前的空白
)
```

### 11.3 代码组织

```
templates/
├── base.html              # 基础模板
├── components/            # 可复用组件
│   ├── header.html
│   ├── footer.html
│   ├── navigation.html
│   └── forms.html
├── pages/                 # 页面模板
│   ├── index.html
│   ├── about.html
│   └── contact.html
├── emails/                # 邮件模板
│   ├── welcome.html
│   └── reset_password.html
└── macros/                # 宏模板
    ├── forms.html
    └── ui.html
```

### 11.4 命名规范

```jinja2
{# ✅ 好的命名 #}
{% block page_title %}{% endblock %}
{% macro form_input(name, type) %}{% endmacro %}
{% if user.is_authenticated %}{% endif %}

{# ❌ 避免的命名 #}
{% block t %}{% endblock %}              {# 含义不明 #}
{% macro f(n, t) %}{% endmacro %}        {# 缩写难懂 #}
{% if u.a %}{% endif %}                  {# 过度简化 #}
```

### 11.5 错误处理

```python
from jinja2 import Environment, FileSystemLoader, TemplateNotFound, UndefinedError

env = Environment(loader=FileSystemLoader('templates'))

try:
    template = env.get_template('index.html')
    html = template.render(user=user)
except TemplateNotFound:
    # 模板不存在
    html = "<h1>404 - 模板未找到</h1>"
except UndefinedError as e:
    # 未定义的变量
    print(f"模板错误：{e}")
    html = "<h1>渲染错误</h1>"
except Exception as e:
    # 其他错误
    print(f"未知错误：{e}")
    html = "<h1>服务器错误</h1>"
```

### 11.6 调试技巧

```python
# ✅ 启用调试模式
env = Environment(
    loader=FileSystemLoader('templates'),
    auto_reload=True,    # 模板变更自动重载
    undefined=DebugUndefined  # 未定义变量时抛出详细错误
)

# ✅ 使用 StrictUndefined 捕获所有未定义变量
from jinja2 import StrictUndefined

env = Environment(undefined=StrictUndefined)

# ✅ 打印模板语法树
template = env.get_template('index.html')
print(template.render.__code__.co_consts)

# ✅ 记录模板渲染日志
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('jinja2')
```

### 11.7 常见陷阱

```jinja2
{# ❌ 陷阱 1：忘记转义用户输入 #}
{{ user_input }}  {# 可能包含 XSS 攻击 #}

{# ✅ 正确做法 #}
{{ user_input|escape }}
{# 或启用 autoescape=True #}

{# ❌ 陷阱 2：在循环中修改列表 #}
{% for item in items %}
    {% if item.should_remove %}
        {% set items = items|reject('equalto', item) %}
    {% endif %}
{% endfor %}

{# ✅ 正确做法：在 Python 中预处理数据 #}

{# ❌ 陷阱 3：过度复杂的模板逻辑 #}
{% if a and b or c and not d or e and f %}...{% endif %}

{# ✅ 正确做法：将复杂逻辑移到 Python 代码中 #}
{% if should_show_content %}...{% endif %}
```

---

## 📚 参考资源

- **官方文档**: https://jinja.palletsprojects.com/
- **GitHub 仓库**: https://github.com/pallets/jinja
- **Flask 集成**: https://flask.palletsprojects.com/templating/
- **中文教程**: https://github.com/xin-yi/jinja2-tutorial

---

_文档版本：1.0_
_最后更新：2026-03-29_
_作者：小蛋蛋 🦞_
