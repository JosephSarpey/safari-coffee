/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async rewrites() {
    return [
    {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/api/:path*'
          : 'https://safari-backend-77ds.onrender.com/api/:path*',
      },
      {
        source: '/socket.io/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/socket.io/:path*'
          : 'https://safari-backend-77ds.onrender.com/socket.io/:path*',
      },
    ]
  },
};

export default nextConfig;
