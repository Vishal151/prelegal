#!/bin/bash
set -e
cd "$(dirname "$0")/.."
docker rm -f prelegal 2>/dev/null || true
docker build -t prelegal .
docker run -d --name prelegal --env-file .env -p 8000:8000 prelegal
echo "Prelegal running at http://localhost:8000"
