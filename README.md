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

When you want to develop fully locally, you'll want to also spin up the
[middleware](https://github.com/bworksio/bworks-middleware) and point
```middlewareUrl``` to it, e.g.

``` json
{
     "api": {
       "middlewareUrl": "http://localhost:3000/",
       "baseUrl": "https://backend.b-works.io/"
     },
   }
```

The ```baseUrl``` is nowadays only used in ```fixUrls()``` and can be safely
ignored. 

## Deployment

```
now
now alias
```
