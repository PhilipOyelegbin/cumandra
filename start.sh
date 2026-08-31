#!/usr/bin/bash

docker build -f Dockerfile -t cumandra:latest .

docker run --rm \
  -p 8080:80 \
  --env-file .env \
  cumandra:latest -d
