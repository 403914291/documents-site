---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "沉浸式学习资料库"
  text: "一站式学习"
  tagline: 持续学习，不断进步！每天进步一点点
  image:
    src: /svg/Claude.svg
    alt: 随机 SVG 图标
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
    link: /AI_Infrastructure/02-部署指南/04-LMDeploy 全面指南
    details: 图文理解、图文问答等多模态 AI 技术
  - title: LlamaIndex
    icon:
      src: /svg/llamaindex.svg
    link: /AI_Infrastructure/02-部署指南/03-LlamaIndex 全面指南
    details: RAG 数据索引框架，构建私有知识库问答系统
  - title: 提示词工程
    icon:
      src: /svg/Claude.svg
    link: /AI_Infrastructure/01-LLM 实训营/10-提示词工程完整指南
    details: 系统学习提示词设计原则、技巧和实战应用
  - title: LLaMA Factory
    icon:
      src: /svg/llama-factory.svg
    link: /AI_Infrastructure/
    details: 一站式大模型微调工具，支持 100+ 模型高效训练
  - title: Ollama
    icon:
      src: /svg/Ollama.svg
    link: /AI_Infrastructure/02-部署指南/01-Ollama 全面指南
    details: 本地运行大模型的最佳选择，开箱即用
---

<script setup>
import { onMounted } from 'vue';

// 6 个随机 SVG 图标路径
const svgIcons = [
  '/svg/Claude.svg',
  '/svg/openclaw.svg',
  '/svg/lmdeploy.svg',
  '/svg/llamaindex.svg',
  '/svg/llama-factory.svg',
  '/svg/Ollama.svg'
];

onMounted(() => {
  // 客户端随机选择一个 SVG 图标
  const randomIndex = Math.floor(Math.random() * svgIcons.length);
  const randomSvg = svgIcons[randomIndex];

  // 等待 VitePress 渲染 hero 区域
  setTimeout(() => {
    // 查找 hero image 的 img 标签并替换 src
    const heroImage = document.querySelector('.VPHero .image-src');
    if (heroImage) {
      heroImage.src = randomSvg;
    }
  }, 50);
});
</script>

<style>
/*
 * Hero Image 样式
 * 显示随机选择的 SVG 图标
 */

/* 深色模式阴影 */
.VPHero .image-src {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}

.dark .VPHero .image-src {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}
</style>
