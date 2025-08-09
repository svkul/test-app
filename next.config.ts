import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://frontend-test-assignment-api.abz.agency/**"),
    ],
  },
};

export default nextConfig;
