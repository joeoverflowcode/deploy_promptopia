/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:"/deploy_promptopia",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config;
  }
}

module.exports = nextConfig