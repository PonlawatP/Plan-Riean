docker run -it --rm --name certbot \
  -v "$(pwd)/data/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/data/certbot/www:/var/www/certbot" \
  -v "$(pwd)/data/certbot/conf/cloudflare.ini:/etc/letsencrypt/cloudflare.ini" \
  certbot/certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
  --email plgmcdesign@gmail.com \
  -d '*.planriean.com' -d 'planriean.com' \
  --agree-tos \
  --no-eff-email