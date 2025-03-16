FROM nginx:1.16-alpine AS production-stage

WORKDIR /usr/share/nginx/html

COPY . .

# copy config
COPY docker/nginx/gzip.conf /etc/nginx/gzip.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/docker

# make all files belong to the nginx user
RUN chown nginx:nginx -R /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
