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
			group('reference.pkg', {
				items: [
					'ref/pkg', 
					'ref/pkg/pkg_init',
					'ref/pkg/pkg_build',
					'ref/pkg/pkg_check',
					'ref/pkg/pkg_healthcheck',
					'ref/pkg/pkg_jsonschema',
					'ref/pkg/pkg_mcp',
					'ref/pkg/pkg_release',
				]
			}),
				group('reference.helper', {
				items: [
					'ref/helper/completion',
					'ref/helper/completion_bash',
					'ref/helper/completion_zsh',
					'ref/helper/completion_powershell',
					'ref/helper/completion_fish',
				]
			}),

		],
	}),

	// Integrations tab
	group('integrations', {
		items: [
			'integrations-guide',
		],
	}),
] satisfies StarlightUserConfig['sidebar'];
