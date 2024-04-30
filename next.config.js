/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  env: {
    APP_URL: process.env.APP_URL,
    APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
    APP_API_URL: process.env.APP_API_URL,
    APP_IMAGE_HOST: process.env.APP_IMAGE_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
};

module.exports = nextConfig;
