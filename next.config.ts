import type { NextConfig } from "next";

const bucket = process.env.AWS_S3_BUCKET ?? "bryant-conti-portfolio-assets";
const region = process.env.AWS_REGION ?? "us-west-1";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${bucket}.s3.${region}.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: `${bucket}.s3.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
