/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
      HOST_API_KEY: process.env.HOST_API_KEY || "https://api.example.com/",
      HOST_API_FE: process.env.HOST_API_FE || "https://app.example.com/",
      ENCRYPT_PUBLIC_KEY: process.env.ENCRYPT_PUBLIC_KEY || ""
  },
  // Add webpack configuration to fix chunk loading issues
  webpack: (config) => {
    // Optimize chunks to reduce the number of small chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Vendor chunk for third-party libraries
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        // Common chunk for shared code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;