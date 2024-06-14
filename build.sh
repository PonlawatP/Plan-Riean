docker build -f "./Dockerfile-nginx" -t nginx_custom .
docker compose --profile nginx up -d