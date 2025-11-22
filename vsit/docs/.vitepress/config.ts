
import { defineConfig } from 'vitepress'

export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN'
    }
  },
    themeConfig: {
    // 语言选择器配置
    localeLinks: {
      text: 'Languages',
      items: [
        { text: 'English', link: '/' },
        { text: '简体中文', link: '/zh-CN/' }
      ]
    },
    sidebar: {
    '/': [
      { text: 'Guides', items: [{ text: 'Example Guide', link: '/example' }] }
    ],
    '/zh-CN/': [
      { text: '指南', items: [{ text: '示例指南', link: '/zh-CN/example' }] }
    ]
  }
  }
})