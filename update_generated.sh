#!/bin/sh

read -r -d '' USAGE <<'EOF'
Usage:
    gen.sh /path/to/TileDB-Cloud-API-Spec
Note: api is expected to exist under target path. For accurate file removal,
      the directory should be removed and re-created empty, before running this
      script.
EOF

if [[ -z "$1" ]]; then
  echo "$USAGE"
  exit 1
fi

REST_SRC=$(realpath $1)

docker run --rm \
    -v ${PWD}:/local \
    -v ${REST_SRC}/:/rest_src \
    swaggerapi/swagger-codegen-cli generate \
    -i /rest_src/openapi-v1.yaml \
    -l typescript-fetch \
    --type-mappings=Array=any \
    -o /local/api/src && pwd && ls


docker run --rm \
  -v ${PWD}/:/local \
  node:12.6.0 /bin/bash -c "cd /local/api && npm install && npm run build"

echo
echo "Output copied to /lib"
