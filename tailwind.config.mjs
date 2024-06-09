/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily:{
				'sans' : 'neue-haas-grotesk-text'
			},

			colors:{
				'rosso' : '#E4221F',
			}
		},
	},
	plugins: [],
}
