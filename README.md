# B-Works Web Site

VueJS single page application https://www.b-works.io

## Build Setup

``` bash
# install dependencies
yarn  # or npm install

# serve with hot reload at localhost:8080
yarn dev

# build and start for production with minification
yarn build
yarn start

# build for production and view the bundle analyzer report
REPORT=true yarn build
```

## Configuration

```src/config/app.json``` needs to be created from the template first.

``` json
{
     "defaultLanguage": "en",
     "activeLanguages": ["de", "en"],
     "api": {
       "baseUrl": "https://backend.b-works.io/"
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

## Deployment

```
now
now alias
```
