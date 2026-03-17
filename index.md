---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "沉浸式学习资料库"
  text: "一站式学习"
  tagline: 持续学习，不断进步！每天进步一点点
  image:
    src: /lottie/work2.json
    alt: 背景图
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
    details: 图文理解、图文问答等多模态 AI 技术
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
      src: /svg/ollama.svg
    link: /AI_Infrastructure/01-Ollama 完全指南
    details: 本地运行大模型的最佳选择，开箱即用

layoutClass: home-layout-custom
---

<!-- Lottie 动画容器 - VitePress Hero Image 标准位置 -->
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
/* 自定义 Hero 布局 - 适配 VitePress 标准结构 */
.home-layout-custom .VPHomeHero {
  position: relative;
}

.home-layout-custom .VPHomeHero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero 文字区域 */
.home-layout-custom .VPHomeHero .text {
  text-align: left;
  padding-right: 24px;
}

/* Lottie 动画容器 - VitePress Hero Image 标准位置（右侧） */
.lottie-hero-container {
  width: 100%;
  max-width: 480px;
  height: auto;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  /* 使用 VitePress CSS 变量适配深色模式 */
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  opacity: 0.95;
  transition: opacity 0.3s ease;
}

.lottie-hero-container:hover {
  opacity: 1;
}

/* 平板设备响应式 - 调整布局和大小 */
@media (max-width: 960px) {
  .home-layout-custom .VPHomeHero .container {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: center;
  }

  .home-layout-custom .VPHomeHero .text {
    text-align: center;
    padding-right: 0;
  }

  .lottie-hero-container {
    max-width: 320px;
    margin: 0 auto;
  }
}

/* 移动设备响应式 - 缩小动画并调整位置 */
@media (max-width: 768px) {
  .home-layout-custom .VPHomeHero .container {
    padding: 0 16px;
  }

  .lottie-hero-container {
    max-width: 200px;
    margin-top: 16px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08));
  }
}

/* 小屏幕移动设备 - 隐藏动画 */
@media (max-width: 480px) {
  .lottie-hero-container {
    display: none;
  }
}

/* 深色模式适配 - 使用 VitePress 变量 */
@media (prefers-color-scheme: dark) {
  .lottie-hero-container {
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }
}

/* VitePress dark 类支持 */
.dark .lottie-hero-container {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

/* 确保动画内容不遮挡文字 - VitePress 默认 z-index 层级 */
.lottie-hero-container {
  z-index: 1;
}

.home-layout-custom .VPHomeHero .text {
  z-index: 2;
  position: relative;
}
</style>
