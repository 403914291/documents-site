import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs"; // 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
  /**
   * base - 站点根路径配置
   *
   * 使用场景：
   * 1. 自定义域名部署：使用 '/'（根路径）
   * 2. GitHub Pages 部署：使用 '/仓库名/'，例如 '/documents-site/'
   * 3. Vercel/Netlify：通常使用 '/' 即可
   *
   * 注意：路径必须以 / 开头和结尾
   */
  // base: '/',
  title: "沉浸式学习资料库",
  description: "一站式学习",
  themeConfig: {
    logo:'/images/logo.png',
    search: {
      provider: 'local'
    },
    outlineTitle: "目录",
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 沉浸式学习',  items:[
        {text:'AI 学习资料',link:'/AI_Infrastructure/'},
        {text:'AI 实战项目',link:'/AI_docs'},
        {text:'AI 视频教程',link:'/videos/'},
        {text:'AI 基础',link:'/AI_basics/'}
      ] },
      {text:'Claude Code',link:'/AI_docs/Claude-Code'},
       {text:'openClaw',link:'/OpenClaw/'},
      {text:'示例',link:'https://www.googo.com'}
    ],

    // sidebar: [
    //   {

    //     text: '示例',
    //     items: [
    //       { text: 'Markdown 示例', link: '/markdown-examples' },
    //       { text: 'Runtime API 示例', link: '/api-examples' }
    //     ]
    //   },
    //    {
    //     text: '示例',
    //     items: [
    //       { text: 'Markdown 示例', link: '/markdown-examples' },
    //       { text: 'Runtime API 示例', link: '/api-examples' }
    //     ]
    //   },
    //   {text:'学习一：环境搭建',link:'markdown-examples'},

    // ],
    sidebar: {
      "/python_docs": set_sidebar("/python_docs"),
      "/AI_docs": set_sidebar("/AI_docs"),
      '/AI_basics/': set_sidebar('/AI_basics'),
      '/OpenClaw/': set_sidebar('/OpenClaw'),
      '/AI_Infrastructure/': set_sidebar('/AI_Infrastructure')
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      {icon: 'gitee',link:'https://gitee.com'}
    ],
    footer:{
      copyright:"Copyright@ 2026.01.06 create site"
    }
  }
})
