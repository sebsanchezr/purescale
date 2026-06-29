/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.speedsize.com' },
      { protocol: 'https', hostname: 'www.lalingi.com' },
      { protocol: 'https', hostname: 'lalingi.com' },
      { protocol: 'https', hostname: 'poshmia.com' },
      { protocol: 'https', hostname: 'www.poshmia.com' },
      { protocol: 'https', hostname: 'www.goforthgoods.com' },
      { protocol: 'https', hostname: 'goforthgoods.com' },
      { protocol: 'https', hostname: 'www.revicedenim.com' },
      { protocol: 'https', hostname: 'revicedenim.com' },
    ],
  },
}

export default nextConfig
