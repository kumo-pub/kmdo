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
					'start/islands',
					'basic/components'
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
			group('guides.pkg', {
				items: [
					'guides/pkg',
					'guides/pkg/general',
					'guides/pkg/sboms',
					group('guides.pkg.archives', {
						items: [
							'guides/pkg/archives/archives',
							'guides/pkg/archives/source',
							'guides/pkg/archives/linux',
							'guides/pkg/archives/makeself',
							'guides/pkg/archives/checksums',
							'guides/pkg/archives/snapcraft',
							'guides/pkg/archives/chocolatey',
							'guides/pkg/archives/docker',
							'guides/pkg/archives/docker_digests',
							'guides/pkg/archives/ko',
						]
					}),
					group('guides.pkg.builds', {
						items: [
							'guides/pkg/builds',
							'guides/pkg/builds/hooks',
							'guides/pkg/builds/cpp',
							'guides/pkg/builds/go',
							'guides/pkg/builds/python',
							'guides/pkg/builds/poetry',
							'guides/pkg/builds/uv',
							'guides/pkg/builds/rust',
						]
					}),
					group('guides.pkg.sign', {
						items: [
							'guides/pkg/sign/binary_sign',
							'guides/pkg/sign/docker_sign',
							'guides/pkg/sign/sign',
						]
					}),
					group('guides.pkg.publish', {
						items: [
							'guides/pkg/publish/release',
							'guides/pkg/publish/snapshots',
							'guides/pkg/publish/blobs',
							'guides/pkg/publish/nix',
							'guides/pkg/publish/aur',
							'guides/pkg/publish/aurs',
							'guides/pkg/publish/krew',
							'guides/pkg/publish/changelog',
							'guides/pkg/publish/http',
							'guides/pkg/publish/artifactory',
							'guides/pkg/publish/publishers',
							'guides/pkg/publish/attestations',
							'guides/pkg/publish/milestones',
							'guides/pkg/publish/scm',
						]
					}),
				]
			}),
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
	
	// Integrations tab
	group('shooting', {
		items: [
			'shooting/dirty',
		],
	}),
] satisfies StarlightUserConfig['sidebar'];
