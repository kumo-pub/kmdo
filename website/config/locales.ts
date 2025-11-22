import type { StarlightUserConfig } from '@astrojs/starlight/types';

/**
 * Starlight i18n configuration.
 * @see https://starlight.astro.build/reference/configuration/#locales
 */
export const localesConfig = {
	en: { label: 'English', lang: 'en', dir: 'ltr' },
	'zh-cn': { label: '简体中文', lang: 'zh-CN', dir: 'ltr' },
} satisfies StarlightUserConfig['locales'];

/** The only two languages to build to speed up Kumo's smoke tests. */
const twoLanguages: (keyof typeof localesConfig)[] = ['en', 'zh-cn'];

/** Starlight i18n configuration used for Kumo's smoke tests. */
export const twoLocalesConfig = Object.fromEntries(
	twoLanguages.map(function (lang) {
		const localeConfig = localesConfig?.[lang];
		if (!localeConfig) {
			throw new Error(
				`The locale config for Kumo smoke tests is referencing a non-existent language: "${lang}"`
			);
		}
		return [lang, localeConfig];
	})
);
