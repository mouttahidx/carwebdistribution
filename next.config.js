/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  staticPageGenerationTimeout: 1000,
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname:  'dashboard.carwebdistribution.ca',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        port: '10004',
        hostname:  'localhost',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  compiler: {
    removeConsole:false
  },
 async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
}

module.exports = nextConfig
