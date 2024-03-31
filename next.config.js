/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
    APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/public/images/**",
      },
    ],
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
