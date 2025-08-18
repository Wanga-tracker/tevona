/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    typedRoutes: true, // still valid
    // serverActions: true,  ❌ removed (deprecated in Next.js 14.1.0)
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any host (can be tightened later)
      },
    ],
  },

  eslint: {
    dirs: ["src"], // Only lint our src directory
  },

  typescript: {
    ignoreBuildErrors: false, // Enforce strict typing
  },
};

export default nextConfig;
