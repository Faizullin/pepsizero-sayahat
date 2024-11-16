/** @type {import('next').NextConfig} */

// const {i18n} = require('./next-i18next.config.js');

const nextConfig = {
    reactStrictMode: true,

    output: 'standalone',

    // output: 'export',
    // experimental: {
    //     serverActions: true,
    // }
    // i18n: {
    //     locales: ['en-US', 'ru-RU'],
    //     defaultLocale: 'ru-RU',
    // },
    // i18n,
};

export default nextConfig;
