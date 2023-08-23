module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru'],
		localePath: './public/locales',
		localeExtension: 'json',
		localeStructure: '{{lng}}/{{ns}}',
		// To avoid issues when deploying to some paas (vercel...)
		localePath:
			typeof window === 'undefined'
				? require('path').resolve('./public/locales')
				: '/locales',
	},
}
