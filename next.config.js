/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
    APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
    APP_API_URL: process.env.APP_API_URL,
    APP_IMAGE_HOST: process.env.APP_IMAGE_HOST,
  },
  images: {
    domains: ["localhost"],
  },
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
};

module.exports = nextConfig;
