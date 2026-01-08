import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs"; // 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
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
      { text: 'AI沉浸式学习',  items:[
        {text:'AI学习资料',link:'markdown-examples'},
        {text:'AI实战项目',link:'/AI_docs'},
        {text:'AI视频教程',link:'/videos/'}
      ] },
      {text:'示例',link:'www.googo.com'}
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
      "/pythond_docs": set_sidebar("/python_docs"),
      "/AI_docs": set_sidebar("/AI_docs"),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      {icon: 'gitee',link:'htts://github.com'}
    ],
    footer:{
      copyright:"Copyright@ 2026.01.06 create site"
    }
  }
})
