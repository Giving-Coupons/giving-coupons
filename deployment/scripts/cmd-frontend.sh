#!/bin/sh

while :; do
# Run the following commands every 6 hours
sleep 6h & wait ${!};
# Reload NGINX so that it serves the latest certificates
nginx -s reload;
done &
# Run NGINX in foreground so that Docker can track it properly
nginx -g "daemon off;"
