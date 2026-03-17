---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "沉浸式学习资料库"
  text: "一站式学习"
  tagline: 持续学习，不断进步！每天进步一点点
  image:
    src: /svg/Claude.svg
    alt: AI 技术栈图标
  actions:
    - theme: brand
      text: AI 沉浸式学习
      link: /AI_Infrastructure/
    - theme: alt
      text: AI 项目实战
      link: /AI_docs/
features:
  - title: Claude AI 助手
    icon:
      src: /svg/Claude.svg
    link: /AI_docs/Claude-Code
    details: Anthropic 推出的智能 AI 助手，擅长代码编写、问题解答和学习辅导
  - title: OpenClaw 小龙虾
    icon:
      src: /svg/openclaw.svg
    link: /OpenClaw/
    details: 开源技术栈，提供灵活可扩展的开发框架和社区支持
  - title: VLM 视觉语言模型
    icon:
      src: /svg/lmdeploy.svg
    link: /AI_Infrastructure/04-LMDeploy 完全指南
    details: 图文理解、视觉问答等多模态 AI 技术
  - title: LlamaIndex
    icon:
      src: /svg/llamaindex.svg
    link: /AI_Infrastructure/03-LlamaIndex 完全指南
    details: RAG 数据索引框架，构建私有知识库问答系统
  - title: LLaMA Factory
    icon:
      src: /svg/llama-factory.svg
    link: /AI_Infrastructure/
    details: 一站式大模型微调工具，支持 100+ 模型高效训练
  - title: Ollama
    icon:
      src: /svg/Ollama.svg
    link: /AI_Infrastructure/01-Ollama 完全指南
    details: 本地运行大模型的最佳选择，开箱即用

layoutClass: home-layout-custom
---

<!-- Hero 区域技术栈图标网格 -->
<div class="tech-stack-grid">
  <a href="/AI_docs/Claude-Code" class="tech-icon-item" title="Claude AI 助手">
    <img src="/svg/Claude.svg" alt="Claude" class="tech-icon" />
    <span class="tech-label">Claude</span>
  </a>
  <a href="/OpenClaw/" class="tech-icon-item" title="OpenClaw 小龙虾">
    <img src="/svg/openclaw.svg" alt="OpenClaw" class="tech-icon" />
    <span class="tech-label">OpenClaw</span>
  </a>
  <a href="/AI_Infrastructure/04-LMDeploy 完全指南" class="tech-icon-item" title="LMDeploy">
    <img src="/svg/lmdeploy.svg" alt="LMDeploy" class="tech-icon" />
    <span class="tech-label">LMDeploy</span>
  </a>
  <a href="/AI_Infrastructure/03-LlamaIndex 完全指南" class="tech-icon-item" title="LlamaIndex">
    <img src="/svg/llamaindex.svg" alt="LlamaIndex" class="tech-icon" />
    <span class="tech-label">LlamaIndex</span>
  </a>
  <a href="/AI_Infrastructure/" class="tech-icon-item" title="LLaMA Factory">
    <img src="/svg/llama-factory.svg" alt="LLaMA Factory" class="tech-icon" />
    <span class="tech-label">LLaMA Factory</span>
  </a>
  <a href="/AI_Infrastructure/01-Ollama 完全指南" class="tech-icon-item" title="Ollama">
    <img src="/svg/Ollama.svg" alt="Ollama" class="tech-icon" />
    <span class="tech-label">Ollama</span>
  </a>
</div>

<!-- Lottie 动画容器 -->
<div id="lottie-hero" class="lottie-hero-container"></div>

<script setup>
import lottie from 'lottie-web';
import { onMounted } from 'vue';

onMounted(() => {
  const container = document.getElementById('lottie-hero');
  if (container) {
    container.innerHTML = '';
  }

  lottie.loadAnimation({
    container: document.getElementById('lottie-hero'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/lottie/work2.json'
  });
});
</script>

<style>
/* Hero 区域整体布局 */
.home-layout-custom .VPHomeHero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
}

/* 技术栈图标网格 */
.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  padding: 0 1rem;
}

.tech-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.tech-icon-item:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: var(--vp-c-brand-soft);
}

.tech-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.tech-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition: color 0.3s ease;
}

.tech-icon-item:hover .tech-label {
  color: var(--vp-c-brand);
}

/* Lottie 动画容器 - 背景装饰 */
.lottie-hero-container {
  position: absolute;
  right: 5%;
  top: 40%;
  transform: translateY(-50%);
  width: 280px;
  height: 280px;
  z-index: 1;
  opacity: 0.6;
  pointer-events: none;
}

.home-layout-custom .VPHomeHero .container {
  max-width: 60%;
  z-index: 2;
}

/* 平板响应式 */
@media (max-width: 960px) {
  .tech-stack-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-width: 600px;
  }

  .lottie-hero-container {
    width: 220px;
    height: 220px;
    right: 2%;
  }

  .home-layout-custom .VPHomeHero .container {
    max-width: 70%;
  }
}

/* 手机响应式 */
@media (max-width: 768px) {
  .tech-stack-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding: 0 0.5rem;
  }

  .tech-icon-item {
    padding: 0.75rem 0.25rem;
  }

  .tech-icon {
    width: 40px;
    height: 40px;
  }

  .tech-label {
    font-size: 0.65rem;
  }

  .lottie-hero-container {
    display: none;
  }

  .home-layout-custom .VPHomeHero .container {
    max-width: 100%;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .tech-stack-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .tech-icon-item {
    padding: 0.5rem 0.25rem;
  }

  .tech-icon {
    width: 36px;
    height: 36px;
  }

  .tech-label {
    font-size: 0.6rem;
  }
}

/* 深色模式优化 */
.dark .tech-icon-item {
  border-color: var(--vp-c-border-mute);
}

.dark .tech-icon-item:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}
</style>
