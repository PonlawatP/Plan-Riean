docker run -it --rm --name certbot \
  -v "$(pwd)/data/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/data/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  --email plgmcdesign@gmail.com \
  -d '*.planriean.com' -d planriean.com \
  --agree-tos \
  --no-eff-email