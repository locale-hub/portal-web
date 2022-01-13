(function (window) {
    window['env'] = window['env'] || {};

    // Environment variables
    window['env']['LH_FEATURES_SDK'] = '${LH_FEATURES_SDK}';
    window['env']['LH_FEATURES_SENTRY'] = '${LH_FEATURES_SENTRY}';
    window['env']['LH_APP_ENVIRONMENT'] = '${LH_APP_ENVIRONMENT}';
    window['env']['LH_API_URI'] = '${LH_API_URI}';
    window['env']['LH_SENTRY_URI'] = '${LH_SENTRY_URI}';
})(this);
