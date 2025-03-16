gunzip dev-site.docker.gz -f && \
docker load --input dev-site.docker && \
docker compose down && \
docker compose -f docker-compose.staging.yml up -d
