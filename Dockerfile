FROM node:12.7-alpine AS Builder

WORKDIR /app
COPY . .
RUN rm -rf node_modules/
RUN npm install
RUN npm run build -- --prod


FROM nginx:1.17.1-alpine as Runner

RUN echo "events{} \
http { \
  include /etc/nginx/mime.types; \
  server { \
      listen 80; \
      server_name localhost; \
      root /usr/share/nginx/html; \
      index index.html; \
      location / { \
          try_files \$uri \$uri/ /index.html; \
      } \
  } \
}" > /etc/nginx/nginx.conf
COPY --from=Builder /app/dist/portal-web /usr/share/nginx/html
CMD [ "/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
