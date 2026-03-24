<script setup>
import DefaultTheme from 'vitepress/theme'
import Share from './components/Share.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <slot name="doc-before" />
    </template>
    
    <template #doc-after>
      <slot name="doc-after" />
      <!-- 在文档内容后添加分享组件 -->
      <Share />
    </template>
  </Layout>
</template>

<style scoped>
/* 分享组件样式 */
</style>
