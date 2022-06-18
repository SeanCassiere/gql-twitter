/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["cdn.shopify.com", "icon-library.com"],
	},
};

module.exports = nextConfig;
