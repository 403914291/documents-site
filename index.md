---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "沉浸式学习资料库"
  text: "一站式学习"
  tagline: 持续学习，不断进步！每天进步一点点
  image:
    src: /svg/Claude.svg
    alt: Hero 动画
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

<!-- Lottie 动画容器 - 覆盖在 VitePress Hero Image (SVG 占位图) 上方 -->
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
/* 自定义 Hero 布局 - 使用 VitePress 标准结构 */
.home-layout-custom .VPHomeHero {
  position: relative;
}

/* Hero 容器 - 保持 VitePress 默认网格布局 */
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

/*
 * Lottie 动画容器 - 绝对定位到 VitePress .VPImage 位置
 * 覆盖在 SVG 占位图上方，保持相同尺寸和位置
 */
.lottie-hero-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 480px;
  height: auto;
  aspect-ratio: 1 / 1;
  pointer-events: none; /* 让点击穿透到下方的 SVG 占位图 */
  z-index: 10;
}

/* 隐藏 SVG 占位图，但保留其占位空间 */
.home-layout-custom .VPHomeHero .image img {
  opacity: 0;
  position: relative;
  z-index: 1;
}

/* 确保 SVG 占位图容器保持尺寸 */
.home-layout-custom .VPHomeHero .image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 桌面端悬停效果 */
.lottie-hero-container:hover {
  z-index: 11;
}

/* 平板设备响应式 */
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
  }
}

/* 移动设备响应式 */
@media (max-width: 768px) {
  .home-layout-custom .VPHomeHero .container {
    padding: 0 16px;
  }

  .lottie-hero-container {
    max-width: 200px;
    margin-top: 16px;
  }
}

/* 小屏幕移动设备 - 隐藏动画 */
@media (max-width: 480px) {
  .lottie-hero-container {
    display: none;
  }

  /* 小屏幕显示 SVG 占位图 */
  .home-layout-custom .VPHomeHero .image img {
    opacity: 1;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .lottie-hero-container {
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }
}

/* VitePress dark 类支持 */
.dark .lottie-hero-container {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

/* 默认阴影效果 */
.lottie-hero-container {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}
</style>
