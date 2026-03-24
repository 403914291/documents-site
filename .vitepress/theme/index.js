// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Share from './components/Share.vue'
import Layout from './Layout.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册 lottie-web 供页面使用
    // 注册分享组件
    app.component('Share', Share)
  }
}
