/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    typedRoutes: true,
    serverActions: true, // Future-proof for Next.js server actions
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any host (we can tighten later)
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
