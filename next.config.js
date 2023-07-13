/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
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
