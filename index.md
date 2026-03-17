---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "沉浸式学习资料库"
  text: "一站式学习"
  tagline: 持续学习，不断进步！每天进步一点点
  image:
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
      src: /svg/ollama.svg
    link: /AI_Infrastructure/01-Ollama 完全指南
    details: 本地运行大模型的最佳选择，开箱即用

layoutClass: home-layout-custom
---

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
.home-layout-custom .VPHomeHero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lottie-hero-container {
  position: absolute;
  right: 10%;
  top: 30%;
  transform: translateY(-50%);
  width: 350px;
  height: 350px;
  z-index: 1;
}

.home-layout-custom .VPHomeHero .container {
  max-width: 50%;
  z-index: 2;
}

@media (max-width: 768px) {
  .lottie-hero-container {
    display: none;
  }
  .home-layout-custom .VPHomeHero .container {
    max-width: 100%;
  }
}
</style>
