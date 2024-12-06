import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Add this line to allow images from Google
  },
};

export default nextConfig;
