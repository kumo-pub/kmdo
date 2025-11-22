// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import astroExpressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';


function getSidebar(lang) {
	if (lang === 'zh-CN') { // 与 locales 中的 lang 一致
		return [
			{ label: '指南', items: [{ label: '示例指南', slug: 'guides/example' }] },
			// autogenerate 路径相对于 src/content/docs/zh/，所以直接写 'reference'
			{ label: '参考', autogenerate: { directory: 'reference' } },
		];
	}
	return [
		{ label: 'Guides', items: [{ label: 'Example Guide', slug: 'guides/example' }] },
		// 英文路径相对于 src/content/docs/en/，直接写 'reference'
		{ label: 'Reference', autogenerate: { directory: 'reference' } },
	];
}

// https://astro.build/config
export default defineConfig({
	outDir: '../docs',
	integrations: [
		astroExpressiveCode(),
		mdx(),
		starlight({
			title: {
				en: 'Kumo Docs',
				'zh-CN': 'Kumo 文档',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					lang: 'en',
					label: 'English'
				},
				'zh-CN': {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
sidebar: [
				{
					label: 'Guides',
					translations: {
						'zh-CN': '指南'
					},
					items: [
						{ 
							label: 'Example Guide', 
							translations: {
								'zh-CN': '示例指南'
							},
							link: '/guides/example' 
						},
					],
				},
			],

		}),
	],
});