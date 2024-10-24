/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
      fontFamily: {
        "marker": ["Permanent Marker", 'sans-serif'],
      }
		}
	},
	plugins: []
};
