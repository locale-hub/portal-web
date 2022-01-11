// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  features: {
    sdk: true,
    sentry: false,
  },

  production: false,
  environment: 'development',
  version: '1.3.0',
  refreshTokenInterval: 13 * 60 * 1000, // 13 minutes
  api: {
    uri: 'http://localhost:3000/v1',
  },
  publicWeb: {
    hostname: 'http://localhost:4202',
    releasesRoute: '/releases'
  },
  documentation: {
    uri: 'https://locale-hub.gitbook.io/',
  },
  sentry: {
    uri: '',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
