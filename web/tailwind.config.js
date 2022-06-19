/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {},
	},
	variants: {
		extends: {},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
