import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'samco.com.vn',
        port: '',
        pathname: '/vnt_upload/**', // Cho phép tất cả các ảnh trong thư mục /vnt_upload/
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Thêm cả hostname cho các ảnh mẫu
      },
      {
        protocol: 'https',
        hostname: 'static.automotor.vn', // Thêm cho các ảnh tin tức
      },
      {
        protocol: 'https',
        hostname: 'xekhach-bacviet.vn',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tgdd.vn',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fptplay.net',
      },
    ],
  },
};

export default nextConfig;
