#!/bin/bash
set -e

# Set up database if necessary
bundle exec rails db:create
bundle exec rails db:migrate

# Remove a potentially existing server.pid for Rails
rm -f /backend/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"
