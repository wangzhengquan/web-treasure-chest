/** @type {import('next').NextConfig} */
const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin({
  debug: true
});

let nextConfig = {};
nextConfig = withVanillaExtract(nextConfig);
module.exports = nextConfig;
