<script setup>
import DefaultTheme from 'vitepress/theme'
import Share from './components/Share.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <Share />
    </template>
  </Layout>
</template>
