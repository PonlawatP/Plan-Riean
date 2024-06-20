docker build -f "./Dockerfile-nginx" -t nginx_custom .
docker stop planriean-nginx
docker rm planriean-nginx
docker compose --profile nginx up -d