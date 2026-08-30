#!/usr/bin/bash

docker build -f Dockerfile -t cumandra:1.0 .

docker run --rm \
  -p 8080:8000 \
  --env-file .env \
  cumandra:1.0 -d
