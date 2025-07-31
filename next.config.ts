import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SSR for proper API route handling
  output: 'standalone',

  // Ensure API routes are properly handled
  experimental: {
    serverComponentsExternalPackages: [],
  },

  // Configure for Amplify deployment
  trailingSlash: false,

    // Enable image optimization
  images: {
    unoptimized: false,
  },

  // Pass through environment variables
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },

 };

export default nextConfig;
