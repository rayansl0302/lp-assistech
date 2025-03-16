gunzip site.docker.gz -f && \
docker load --input site.docker && \
docker compose down && \
docker compose up -d
