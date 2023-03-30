#!/usr/bin/env bash

API_SPEC_VERSION=$1
API_SPEC_FILE="../TileDB-Cloud-API-Spec/openapi-$API_SPEC_VERSION.yaml"
if [ -f "$API_SPEC_FILE" ]; then
    echo "$API_SPEC_FILE renaming Array struct."
else 
    echo "$API_SPEC_FILE does not exist."
fi

sed -i 's/  Array:/  ArrayData:/' $API_SPEC_FILE
sed -i 's/#\/definitions\/Array"/#\/definitions\/ArrayData"/' $API_SPEC_FILE