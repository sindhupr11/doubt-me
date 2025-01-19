/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co"]
  },
  env: {
    IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  },
};

export default nextConfig;
