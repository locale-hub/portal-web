# PortalWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build Docker Image
```shell
docker build -t locale-hub/portal-web:2.0.0 .
```

## Run Docker Image
```shell
docker run --rm -p 4200:80 [--env-file .env] --name locale-hub-web locale-hub/portal-web:2.0.0
```

dotenv options
- **LH_FEATURES_SDK**: (boolean) Should SDK be enabled? default: `false`
- **LH_FEATURES_SENTRY**: (string) Should Sentry be enabled? default: `false`
- **LH_APP_ENVIRONMENT**: (string) Environment name. default `development`
- **LH_API_URI**: (string) Mandatory API uri.
- **LH_SENTRY_URI**: (string) Mandatory if feature enabled, Sentry uri
