/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
      // NEXT_PUBLIC_HOST_API_KEY:process.env.NEXT_PUBLIC_HOST_API_KEY,
      // NEXT_PUBLIC_HOST_API_FE:process.env.NEXT_PUBLIC_HOST_API_FE,
      // NEXT_PUBLIC_ENCRYPT_PUBLIC_KEY:process.env.NEXT_PUBLIC_ENCRYPT_PUBLIC_KEY


      HOST_API_KEY:process.env.HOST_API_KEY,
      HOST_API_FE:process.env.HOST_API_FE,
      ENCRYPT_PUBLIC_KEY:process.env.ENCRYPT_PUBLIC_KEY
  },
};

//   const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   });
export default nextConfig;