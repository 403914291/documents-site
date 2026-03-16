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
      text: AI沉浸式学习
      link: /markdown-examples
    - theme: alt
      text: AI 项目实战
      link: /api-examples
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
 
---


<!-- ::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
::: -->


 

<!-- 1. Lottie动画容器：通过CSS定位到hero区域的右侧（原image位置） -->
<div id="lottie-hero" style="
  /* 基于hero容器绝对定位 */
  position: absolute;
  right: 10%;  /* 距离右侧的间距，可调整 */
  top: 40%;   /* 垂直居中 */
  transform: translateY(-180%);
  width: 350px;  /* 动画尺寸，和你的需求匹配 */
  height: 350px;"></div>

<!-- 2. 初始化Lottie动画的脚本 -->
<script setup>
import lottie from 'lottie-web';
import { onMounted } from 'vue';

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById('lottie-hero'), // 对应上面的容器ID
    renderer: 'svg',       // 矢量渲染，清晰度高
    loop: true,            // 循环播放
    autoplay: true,        // 自动播放
    path: 'lottie/work2.json' // 动画JSON路径（确保在/public/lottie/下）
  });
});
</script>

<!-- 3. 调整hero文字区域的宽度，避免和动画重叠（适配默认布局） -->
<style>
/* VitePress默认home布局的hero文字容器类名 */
.VPHomeHeroContent {
  max-width: 50%; /* 缩小文字区域宽度，给右侧动画留空间 */
}
/* 确保hero容器是相对定位，让动画的绝对定位生效 */
.VPHomeHero {
  position: relative;
}
</style>
