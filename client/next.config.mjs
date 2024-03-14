/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "bug-tracking-tool.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
