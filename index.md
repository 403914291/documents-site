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
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


::: info
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
:::


 

<!-- 1. Lottie动画容器：通过CSS定位到hero区域的右侧（原image位置） -->
<div id="lottie-hero" style="
  /* 基于hero容器绝对定位 */
  position: absolute;
  right: 10%;  /* 距离右侧的间距，可调整 */
  top: 10%;   /* 垂直居中 */
  transform: translateY(-210%);
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
    path: '/documents-site/lottie/work2.json' // 动画JSON路径（确保在docs/public/lottie/下）
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
