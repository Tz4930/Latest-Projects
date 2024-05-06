/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
    // domains: ['example.com'], 
  },
}

module.exports = nextConfig