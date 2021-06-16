# TileDB Cloud library for NodeJS

### TileDB-Cloud-JS is an axios-based NodeJS API for [TileDB Cloud](https://docs.tiledb.com/cloud/).

> Note: This is an **experimental** package and aims to be similar to [TileDB-Cloud-Py](https://github.com/TileDB-Inc/TileDB-Cloud-Py).  

## Installation
```bash
npm install @tiledb-inc/tiledb-cloud
```

### Basic usage:

```javascript
const tiledb = require("@tiledb-inc/tiledb-cloud");

// API tokens are the recommend way to access the cloud apis
const config = new tiledb.Configuration({
  apiKey: "<insert token from setting page here>"
});

// Username and passwords are also supported, uncomment below and comment out above to use username/password auth instead
// const config = {
//   username: "<tiledb-cloud-username>",
//   password: "<tiledb-cloud-password>"
// };

// First we must create API objects.
// In the future we will improve and simplify this interface
const arrayApi = new tiledb.ArrayApi(config);

arrayApi.getArraysInNamespace('<tiledb-cloud-username>').then((res) => {
  console.log(res);
}).catch((ex) => {
  console.log(ex);
});


```

### Serverless SQL example:

```javascript

const tiledb = require('@tiledb-inc/tiledb-cloud');

// API tokens are the recommend way to access the cloud apis
const config = new tiledb.Configuration({
  apiKey: "<insert token from setting page here>"
});

// Username and passwords are also supported, uncomment below and comment out above to use username/password auth instead
// const config = {
//   username: "<tiledb-cloud-username>",
//   password: "<tiledb-cloud-password>"
// };

// First we must create API objects.
// In the future we will improve and simplify this interface
const sqlAPI = new tiledb.SqlApi(config);

// SQL query
const sql = "select `rows`, AVG(a) as avg_a from `tiledb://TileDB-Inc/quickstart_dense` GROUP BY `rows`";

const sqlDetails = {
  query: sql
};

// Run SQL and print any returned data to console
sqlAPI.runSQL("<tiledb-cloud-username>", sqlDetails).then((res) => {
  console.log(res.data)
  /*
    Will print:
      [
        { avg_a: '2.5000', rows: 1 },
        { avg_a: '6.5000', rows: 2 },
        { avg_a: '10.5000', rows: 3 },
        { avg_a: '14.5000', rows: 4 }
      ]
   */
}).catch((ex) => {
  // handle error
});


```


## Cap'n Proto serialization

Endpoints that support cap'n proto mime type user should set appropriate headers (Accept for GET requests and Content-Type for POST/PUT) to `application/capnp`.

For `POST` requests library will automatically serialize data to cap'n proto.

```javascript
const tiledb = require("@tiledb-inc/tiledb-cloud");

const config = new tiledb.Configuration({
  apiKey: "<insert token from setting page here>"
});
const arrayApi = new tiledb.ArrayApi(config);

arrayApi
  .updateArrayMetadataCap(
    "ns",
    "array_name",
    data,
    {
      headers: {
        "Content-Type": "application/capnp",
      },
    })
```

For `GET` requests library provides methods to deserialize data. If Accept header is set to "application/capnp", library will set `responseType` to `arraybuffer` since helpers accept [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) to deserialize the response (user can still override `responseType`).
`capnpDeserializer` helper function receives an `ArrayBuffer` and the type of the data expected (Right now only "arrayMetadata" is supported for the /array_metadata endpoint).

```javascript
const tiledb = require("@tiledb-inc/tiledb-cloud");

const config = new tiledb.Configuration({
  apiKey: "<insert token from setting page here>"
});
const arrayApi = new tiledb.ArrayApi(config);

arrayApi
  .getArrayMetadataCap("ns", "array_name", {
    headers: {
      "Accept": "application/capnp",
    },
  })
  .then((data) => {
    // data.data is an ArrayBuffer
    console.log(tiledb.capnpDeserializer(data.data, "arrayMetadata"));
  })
```

## Development

For capnproto encoding you need to [install capnproto](https://capnproto.org/install.html)

Debian / Ubuntu: `apt-get install capnproto` <br/>
Arch Linux: `sudo pacman -S capnproto` <br/>
Homebrew (OSX): `brew install capnp`

and the schema compiler

```
npm install -g capnpc-ts
```

Then run:
```
npm run capnp
```

## Useful links
[TileDB Cloud documentation](https://docs.tiledb.com/cloud/)  
[TileDB Cloud console](https://console.tiledb.com)  
[TileDB website](https://tiledb.com)  
