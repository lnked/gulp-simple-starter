# gulp-simple-starter

## Installation

#### GIT

```bash
# Create project folder
mkdir app

# Go to the project root
cd app

# Clone the repository (stable branch)
git clone -b master git@github.com:lnked/gulp-simple-starter.git .
```

OR

```bash
git init
git remote add origin git@github.com:lnked/gulp-simple-starter.git
git fetch origin
git pull origin master
```

```bash
# Install
yarn
# or
npm i
```

Or you can download the latest version at: https://github.com/lnked/gulp-simple-starter/releases/latest

## Run tasks

## Start a development server
```
yarn start / npm run start
yarn start:uncss / npm run start:uncss
```

## Build for production
```
yarn build / npm run build
yarn build:uncss / npm run build:uncss
```

## Lint
```
yarn lint / npm run lint
```

## Configuration

`.env` for example, it is used by default in the absence of other configurations
`.env.development` configurations work during server startup
`.env.production` configuration works in production build

# Example content and options explanation

```
GULP_APP_API_URL   // will be converted to API_URL and available in js scripts, it may be needed to set different API base url for dev and production build
TINYPNG_API_KEY    // api key for image optimization in the service https://tinypng.com
PURGE_CSS          // true / false to optimize styles
GZIP_ENABLED       // true / false compression of static files
REV_NAME_ENABLED   // true / false to add a prefix to static files (js, css)
TINYPNG_ENABLED    // true / false to enable image optimization through the tinping service
SOURCEMAPS_ENABLED // true / false to enable sourcemap file
MINIFY_HTML        // true / false to minimize html
BUNDLE_ANALYZER    // true / false when enabled, a script assembly report will be generated
```
