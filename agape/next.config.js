/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "cls-hooked", "minio"],
  },
};

module.exports = nextConfig;
