# Angular starter

Simple project for start with Angular2.

# Setup

1. On Linux/Mac - install [nvm](https://github.com/creationix/nvm) and using `nvm install node v5.x` command. On Windows - download node v5.x binaries and install them.
3. run `npm install`

# Run

Just run `npm run serve`. During first build there can appear errors like `duplicate identifier`, this is caused by need of manually load typings from Angular 2 sources. This behaviour should be fixed in one of next versions of Angular 2 and this starter.

# Tests

There is command `npm run test` which does the same thing as `npm run serve` but instead of openning an app in browser, it opens tests page.
If you have run `npm run serve` - don't worry! Just open `0.0.0.0:8000/runSpec.html` address in your browser.

# Troubleshooting

If tsd fails due to exceeded rate limit, provide `GITHUB_TOKEN` environment variable with token to your github account. Token can be generated in you profile settings.

Sometimes changes in source files aren't handled properly - you can just run `npm run build` to rebuild app.
