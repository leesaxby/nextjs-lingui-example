# NextJs and Lingui internationalisation

An example of internationalisation using NextJs and Lingui (https://lingui.dev/)

## Lingui

Compared to other i18ln libraries Lingui is light weight in terms of bundle size, config and workflow.

`react-intl 12.7 kB gzipped`\
`lingui 3.9 kB gzipped`

Lingui's `<Trans>` macro makes the untranslated strings, within the pages, more readable than purely using id's.

react-intl: `<FormattedMessage id="page.title.main"/>`

lingui: `<Trans>More readable string when viewing markup</Trans>`

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Development Workflow

- Add translatable strings by wrapping them in the `<Trans>` marco
- When strings are ready for translation, run `yarn extract` to pull strings into `locales/{locale}/messages.po` files
- Manually translate strings in the `.po` files
- Run `yarn compile` to create runtime (minified) `.js` translation files. 
  - These files are considered build artefacts and should not be checked in to version control.
  - The remote build process will need to run `yarn compile` to generate the runtime translation files (`.js`)


## How

The app is wrapped with the `<I18nProvider>` provider.

The runtime translation files are imported into the pages via `getStaticProps` or `getServerSideProps`.

### getStaticProps

**A version of the page will be generated for each locale**. This is important to consider because it can increase build times depending on how many locales are configured inside getStaticProps.

To decrease the build time of dynamic pages with `getStaticProps`, use a fallback mode.
This allows you to return only the most popular paths and locales from getStaticPaths for prerendering during the build. Then, Next.js will build the remaining pages at runtime as they are requested.

Further reading https://nextjs.org/docs/pages/building-your-application/routing/internationalization#how-does-this-work-with-static-generation

### getServerSideProps

Having to load the required locale file with `getServerSideProps` could impact performance.\
A couple of ways to improve this are:
 - Use the experimental feature `experimental-extractor` that will provide only the translations required for the page, instead of the full catalog of translations. https://lingui.dev/guides/message-extraction#dependency-tree-crawling-experimental.
 - We may be able to load the required catalogs in the `<App>` component and provided the translations to children via the `<I18nProvider>` provider or a custom context.

### NEXT_LOCALE Cookie

In the `LangSwitcher` component, when a user changes locale, we create a `NEXT_LOCALE` cookie and store the selected locale.\
When a user returns to the site, NextJs will automatically route the user to the locale stored in the cookie.

### Pseudolocalization

Alongside the regular locales we also have a `pseudo` locale, which we can enable for development and testing.\
`pseudo` strings remaing readable but make it easy to spot any untranslated strings e.g. `Ńēxţĵś Ĺĩńĝũĩ Ēxàmƥĺē`.

## Testing

An example test file using jest/react testing library is located here `pages/index.test.js`\
We simply wrap the component we wish to test with the `<18nProvider>`, passing in our locale files.

```
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

i18n.load({
  en: messages,
  cy: cyMessages
})

const I18nWrapper = () => (
  <I18nProvider i18n={i18n}>
      <Component />
  </I18nProvider>
)
```

We then activate the required locale before rendering.

```
act(() => {
  i18n.activate('cy')
})

render(<I18nWrapper />);
expect(screen.getByText('Enghraifft Iaith NextJs')).toBeInTheDocument();
```
