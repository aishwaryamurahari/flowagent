import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SSR for proper API route handling
  output: 'standalone',

  // Ensure API routes are properly handled
  serverExternalPackages: [],

  // Configure for Amplify deployment
  trailingSlash: false,

    // Enable image optimization
  images: {
    unoptimized: false,
  },

  // Pass through environment variables
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },

 };

export default nextConfig;
