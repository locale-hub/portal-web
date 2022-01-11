
export const environment = {
  features: {
    sdk: 'true' === window['env']['LH_FEATURES_SDK'] ?? false,
    sentry: 'true' === window['env']['LH_FEATURES_SENTRY'] ?? false,
  },

  production: true,
  environment: window['env']['LH_APP_ENVIRONMENT'] ?? 'production',
  version: '1.3.0',
  refreshTokenInterval: 13 * 60 * 1000, // 13 minutes
  api: {
    uri: window['env']['LH_API_URI'] ?? '',
  },
  publicWeb: {
    hostname: 'https://locale-hub.com',
    releasesRoute: '/releases'
  },
  documentation: {
    uri: 'https://locale-hub.gitbook.io/',
  },
  sentry: {
    uri: window['env']['LH_SENTRY_URI'] ?? '',
  },
};
