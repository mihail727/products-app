import { defineNuxtConfig } from 'nuxt';
import modulesConfig from './configs/nuxt.modules.config';
import metaConfig from './configs/nuxt.meta.config';

export default defineNuxtConfig({
	...modulesConfig,
	...metaConfig,
	nitro: {
		output: {
			dir: '~~/build',
		},
	},
	srcDir: 'src',
});
