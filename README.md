This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## NextJs and Lingui internationalisation

An example of internationalisation to a NextJs project using Lingui (https://lingui.dev/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Development Workflow

To learn more about Next.js, take a look at the following resources:

- Add translatable strings by wrapping them in the `<Trans>` marco
- When strings are ready for translation, run `yarn extract` to pull strings into `locals/{local}/messages.po` files
- Manually translate strings in the `.po` files
- Run `yarn compile` to create runtime (minified) `.js` translation files. 
  - These files are considered build artefacts and should not be checked in to version control.
  - The remote build process with need to run `yarn compile` to generate the runtime translation files (`.js`)


## How

The app is wrapped with the`<I18nProvider>`provider.

The runtime translation files are imported into the pages via `getStaticProps` or `getServerSideProps`.

### getStaticProps

**A version of the page will be generated for each locale**. This is important to consider because it can increase build times depending on how many locales are configured inside getStaticProps.\
To decrease the build time of dynamic pages with `getStaticProps`, use a fallback mode.
This allows you to return only the most popular paths and locales from getStaticPaths for prerendering during the build.\
Then, Next.js will build the remaining pages at runtime as they are requested.

Further reading https://nextjs.org/docs/pages/building-your-application/routing/internationalization#how-does-this-work-with-static-generation

### getServerSideProps

Having to load the required locale file with `getServerSideProps` could impact performance.\
A couple of ways to improve this are:
 - Use a new experimental feature that may provide only the translations required for the page, opposed to the full catalog of translations. https://lingui.dev/guides/message-extraction#dependency-tree-crawling-experimental.
 - We may be able to load the required catalog in the `<App>` component and provided to children via the `<I18nProvider>` provider or a custom context.

### NEXT_LOCALE Cookie

In the `LangSwitcher` component, when a user changes locale, we create a `NEXT_LOCALE` cookie and store the selected locale.\
When a user returns to the site, NextJs will automatically route the user to the locale stored in the cookie.
