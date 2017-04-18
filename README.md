# B-Works Web Site

VueJS single page application https://www.b-works.io

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and prerender pages
npm run build && npm run prerender
```

**Note:** after significant changes you need to run the last build command in order
to update the prerendered HTML pages, then commit and pull on the server.

**Heads up:** sometimes (especially when using just npm run prerender) the output
is truncated, i.e. the important part (the rendered full-text HTML) is missing.
In order to avoid this always build *and* prerender, and diff the result before
committing!

## Configuration

```src/config/app.json``` needs to be created from the template first.

``` json
{
     "defaultLanguage": "en",
     "activeLanguages": ["de", "en"],
     "api": {
       "baseUrl": "//backend.b-works.io/"
     },
     "social": {
       "facebook": "https://www.facebook.com/Bworks.io",
       "twitter": "https://twitter.com/_B_works",
       "instagram": "https://www.instagram.com/bworks.io",
       "linkedin": "https://www.linkedin.com/company/b-works"
     }
   }
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
