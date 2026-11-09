import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vue-study.skillbox.cc",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vue-study.skillbox.cc/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  logging:
    process.env.NODE_ENV === "development"
      ? {
          fetches: {
            fullUrl: false,
          },
        }
      : undefined,
};

export default nextConfig;
