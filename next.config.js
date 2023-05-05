/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    i18n: {
      // All supported locales.
      // The pseudo locale is used for testing, it displays text as "Ţĥĩś ĩś àń ēxàmƥĺē", making it easier
      // to identify untranslated strings.
      locales: ['en', 'cy', 'pseudo'],
      // Any unsupported languages will default to english
      defaultLocale: 'en'
    },
    experimental: {
      swcPlugins: [
        ['@lingui/swc-plugin', {}]
      ]
    }
}

module.exports = nextConfig
