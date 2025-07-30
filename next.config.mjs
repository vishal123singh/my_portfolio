/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-quill"],
  images: {
    domains: ["images.unsplash.com", "randomuser.me", "cdn.prod.website-files.com"],
  },
};

export default nextConfig;
