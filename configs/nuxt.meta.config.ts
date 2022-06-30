import type { NuxtConfig } from 'nuxt';

export default {
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
			htmlAttrs: {
				lang: 'ru',
			},
			link: [
				{
					rel: 'icon',
					href: '/favicon.svg',
					type: 'image/svg+xml',
				},
			],
		},
	},
} as NuxtConfig;
