import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs"; // 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
  /**
   * base - 站点根路径配置
   *
   * 使用场景：
   * 1. 自定义域名部署：使用 '/'（根路径）
   * 2. GitHub Pages 部署（无自定义域名）：使用 '/仓库名/'，例如 '/documents-site/'
   * 3. Vercel/Netlify：通常使用 '/' 即可
   *
   * 注意：路径必须以 / 开头和结尾
   */
  // 使用自定义域名 docs.esupagent.com
  base: '/',
  title: "沉浸式学习资料库",
  description: "一站式 AI 学习平台，提供 LLM 教程、部署指南、实战项目等丰富资源",
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'description', content: '沉浸式学习资料库 - 一站式 AI 学习平台，提供 LLM 教程、部署指南、实战项目、OpenClaw 技能等丰富资源' }],
    ['meta', { name: 'keywords', content: 'AI,LLM，机器学习，深度学习，教程，文档，OpenClaw,Claude Code' }],
    ['meta', { name: 'author', content: '小蛋蛋' }],
    ['meta', { property: 'og:title', content: '沉浸式学习资料库' }],
    ['meta', { property: 'og:description', content: '一站式 AI 学习平台' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  sitemap: {
    hostname: 'https://docs.esupagent.com',
  },
  // 启用干净 URL，访问 /AI_docs/Claude-Code 自动映射到 /AI_docs/Claude-Code.html
  cleanUrls: true,
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
        {text:'AI 基础',link:'/AI_basics/'}
      ] },
      { text: 'Claude Code',  items:[
        {text:'Claude-Code',link:'/AI_docs/Claude-Code'},
        {text:'Skills',link:'/AI_docs/Skills/'}
      ]},
       { text: 'openClaw',  items:[
        {text:'新手指南',link:'/OpenClaw/'},
        {text:'Skills',link:'/OpenClaw/skills/'}
      ]},
      {text:'示例中心',link:'/examples/'}
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
      "/AI_docs": set_sidebar("/AI_docs"),
      '/AI_basics/': set_sidebar('/AI_basics'),
      '/examples/': set_sidebar('/examples'),
      '/OpenClaw/': set_sidebar('/OpenClaw'),
      '/OpenClaw/skills/': set_sidebar('/OpenClaw/skills'),
      '/OpenClaw/skills/wechat-mp-cn/': set_sidebar('/OpenClaw/skills/wechat-mp-cn'),
      '/AI_Infrastructure/': [
        {
          text: '📚 LLM 基础教程',
          collapsed: false,
          items: [
            { text: '01-AI 大模型技术全景', link: '/AI_Infrastructure/01-LLM 基础教程/01-AI 大模型技术全景' },
            { text: '02-机器学习基础', link: '/AI_Infrastructure/01-LLM 基础教程/02-机器学习基础' },
            { text: '03-大模型工作原理', link: '/AI_Infrastructure/01-LLM 基础教程/03-大模型工作原理' },
            { text: '04-Transformer', link: '/AI_Infrastructure/01-LLM 基础教程/04-Transformer' },
            { text: '05-注意力机制', link: '/AI_Infrastructure/01-LLM 基础教程/05-注意力机制' },
            { text: '06-KV 缓存', link: '/AI_Infrastructure/01-LLM 基础教程/06-KV 缓存' },
            { text: '07-RLHF 人类反馈强化学习', link: '/AI_Infrastructure/01-LLM 基础教程/07-RLHF 人类反馈强化学习' },
            { text: '08-预训练', link: '/AI_Infrastructure/01-LLM 基础教程/08-预训练' },
            { text: '09-微调', link: '/AI_Infrastructure/01-LLM 基础教程/09-微调' },
            { text: '10-提示词工程完整指南', link: '/AI_Infrastructure/01-llm 实训营/10-提示词工程完整指南' }
          ]
        },
        {
          text: '🚀 部署指南',
          collapsed: true,
          items: [
            { text: '01-Ollama 完全指南', link: '/AI_Infrastructure/02-部署指南/01-Ollama-完全指南' },
            { text: '02-vLLM 完全指南', link: '/AI_Infrastructure/02-部署指南/02-vLLM-完全指南' },
            { text: '03-LlamaIndex 完全指南', link: '/AI_Infrastructure/02-部署指南/03-LlamaIndex-完全指南' },
            { text: '04-LMDeploy 完全指南', link: '/AI_Infrastructure/02-部署指南/04-LMDeploy-完全指南' }
          ]
        },
        {
          text: '📋 标准规范',
          collapsed: true,
          items: [
            { text: 'AI 应用开发标准规范', link: '/AI_Infrastructure/03-标准规范/00-ai-app-development-standards' }
          ]
        },
        {
          text: '🎨 Stable Diffusion',
          collapsed: false,
          items: [
            { text: '📖 教程索引', link: '/AI_Infrastructure/stable-diffusion/' },
            { text: '01-入门指南', link: '/AI_Infrastructure/stable-diffusion/01-入门指南' },
            { text: '02-模型选择', link: '/AI_Infrastructure/stable-diffusion/02-模型选择' },
            { text: '03-提示词工程', link: '/AI_Infrastructure/stable-diffusion/03-提示词工程' },
            { text: '04-图生图与修复', link: '/AI_Infrastructure/stable-diffusion/04-图生图' },
            { text: '05-ControlNet 详解', link: '/AI_Infrastructure/stable-diffusion/05-controlnet' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      {icon: 'gitee',link:'https://gitee.com'}
    ],
    footer:{
      copyright:"Copyright@ 2026.01.06 create site"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vitepress'],
          'search-vendor': ['mark.js', 'minisearch'],
        }
      }
    }
  }
})
