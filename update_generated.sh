#!/bin/sh

read -r -d '' USAGE <<'EOF'
Usage:
    gen.sh /path/to/TileDB-REST /path/to/output/[api]
Note: api is expected to exist under target path. For accurate file removal,
      the directory should be removed and re-created empty, before running this
      script.
EOF

if [[ -z "$1" || -z "$2" ]]; then
  echo "$USAGE"
  exit 1
fi

REST_SRC=$(realpath $1)
TARGET_PATH=$(realpath $2)

OUTPUT_PATH=$(mktemp -d /tmp/api_gen.XXXXXX)

PACKAGE_NAME="rest_api"

mkdir -p ${OUTPUT_PATH}/

################################################################################
# minimize output to what we want
# docs/*
# cat <<EOF > ${OUTPUT_PATH}/.openapi-generator-ignore
# test/
# test/*
# git_push.sh
# tox.ini
# test-requirements.txt
# setup.py
# .gitignore
# .travis.yml
# EOF

################################################################################
# openapi-generator config
cat <<EOF > ${OUTPUT_PATH}/openapi_config-api
  {
  "projectName": "tiledb-cloud",
  "packageName": "${PACKAGE_NAME}",
  "documentationPage": false,
  "generateSourceCodeOnly": true
  }
EOF

docker run --rm  \
  -v ${REST_SRC}/:/dc_src \
  -v ${OUTPUT_PATH}:/gen \
  openapitools/openapi-generator-cli:v4.2.3 generate \
    -c /gen/openapi_config-api -o /gen \
    -i /dc_src/openapi-v1.yaml -g typescript-axios -p npmName=@tiledb-inc/tiledb-cloud -p supportsES6=true --type-mappings=Array=any

docker run --rm \
  -v ${OUTPUT_PATH}/:/js \
  node:12.6.0 /bin/bash -c "cd /js && npm install && npm run build"

# Copy the built output to working our directory
cp -r ${OUTPUT_PATH}/dist/ ${TARGET_PATH}/lib
cp ${OUTPUT_PATH}/README.md ${TARGET_PATH}/

echo
echo "Output copied from '${OUTPUT_PATH}' to '${TARGET_PATH}'"
