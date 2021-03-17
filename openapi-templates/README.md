# TileDB-Cloud-JS openapi template
## Overwrites openapi-generator's `typescript-axios` template.

---

### Original template:  
https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/resources/typescript-axios

---

Example command:  
`openapi-generator generate -i /path/to/yaml -o /path/to/output -g typescript-axios -t ./openapi-templates`

---

## Notes:
The `default` keyword in objects is being replaced with `_default` for some reason (i.e. in AWSAccesSCredentials model)  
Adding `--reserved-words-mappings default=default` in the cli command fixes this issue.
