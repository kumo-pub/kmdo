import type { StarlightUserConfig } from '@astrojs/starlight/types';
import { group } from './config/sidebar';

/**
 * Starlight sidebar configuration object for the global site sidebar.
 *
 * - Top-level groups become tabs.
 * - Use the `group()` utility function to define groups. This uses labels from our
 *   `src/content/nav/*.ts` files instead of defining labels and translations inline.
 *
 */
export const sidebar = [
	// Start tab
	group('start', {
		items: [
			'getting-started',
			group('start.welcome', {
				items: [
					'start/why-kmdo',
					'start/islands'
				],
			}),
			group('start.newProject', {
				items: ['install-and-setup'],
			}),
			group('start.config', {
				items: [
					'configuring-kumo',
				],
			}),
		],
	}),

	// Guides tab
	group('guides', {
		items: [
			'troubleshooting',
			'contribute',
		],
	}),

	// Reference tab
	group('reference', {
		items: [
			'kumo-ref',
		],
	}),

	// Integrations tab
	group('integrations', {
		items: [
			'integrations-guide',
		],
	}),
] satisfies StarlightUserConfig['sidebar'];
