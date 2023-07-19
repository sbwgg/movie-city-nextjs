/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    i18n: {
        locales: i18n.locales,
        defaultLocale: i18n.defaultLocale,
        localeDetection: true,
    },

    env: {
        BASE_URL: process.env.BASE_URL,
        API_KEY: process.env.API_KEY,
        IMAGE_PATH: process.env.IMAGE_PATH,
        BACKDROP_PATH: process.env.BACKDROP_PATH
    },

    images: {
        domains: ['image.tmdb.org']
    }
}

module.exports = nextConfig
