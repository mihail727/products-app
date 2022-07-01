const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'~~/src/components/**/*.{vue,js,ts}',
		'~~/src/layouts/**/*.{vue,js,ts}',
		'~~/src/pages/**/*.{vue,js,ts}',
		'~~/src/app.vue',
		'~~/src/composables/**/*.{tsx,jsx,ts,js}',
	],
	theme: {
		extend: {},
		screens: {
			'2xs': '350px',
			xs: '425px',
			...defaultTheme.screens,
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
