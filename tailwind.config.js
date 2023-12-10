/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			fontFamily: {
				Mont: ["Montserrat", "sans-serif"],
				SS3: ["SourceSans3", "sans-serif"],
			},
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1660px",
		},
	},
	plugins: [],
};
