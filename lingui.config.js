const nextConfig = require('./next.config');

module.exports = {
    locales: nextConfig.i18n.locales,
    pseudoLocale: 'pseudo',
    sourceLocale: nextConfig.i18n.defaultLocale,
    // this is crucial to make `lingui extract` work in nextjs with swc compiler in v3
    // and can be safely removed in v4 (upcoming release)
    extractBabelOptions: {
        presets: [
            "@babel/preset-typescript",
            "@babel/preset-react",
        ],
    },
    fallbackLocales: {
        default: 'en'
    },
    catalogs: [
        {
            path: 'locales/{locale}',
            include: ['pages', 'components']
        }
    ],
    format: 'po'
}
