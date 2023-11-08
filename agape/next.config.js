/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,

    serverComponentsExternalPackages: ["sequelize", "cls-hooked", "minio"],
  },
};

module.exports = nextConfig;
