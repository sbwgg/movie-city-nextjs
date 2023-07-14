/** @type {import('next').NextConfig} */
const { i18n } = require('./services/next-i18next.config');

const nextConfig = {
    i18n: {
        locales: i18n.locales,
        defaultLocale: i18n.defaultLocale,
        localeDetection: false
    },

    env: {
        BASE_URL: process.env.BASE_URL,
        API_KEY: process.env.API_KEY
    },

    images: {
        domains: ['image.tmdb.org']
    }
}

module.exports = nextConfig
