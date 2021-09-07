# TileDB Cloud library for NodeJS


[Installation](#installation) <br/>
[Basic usage](#basic-usage) <br/>
[Cap'n Proto serialization](#capn-proto-serialization) <br/>
[Queries](#queries) <br/>
[Development](#development)

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
const config = new tiledb.v1.Configuration({
  apiKey: "<insert token from setting page here>"
});

// Username and passwords are also supported, uncomment below and comment out above to use username/password auth instead
// const config = {
//   username: "<tiledb-cloud-username>",
//   password: "<tiledb-cloud-password>"
// };

// First we must create API objects.
// In the future we will improve and simplify this interface
const arrayApi = new tiledb.v1.ArrayApi(config);

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
const config = new tiledb.v1.Configuration({
  apiKey: "<insert token from setting page here>"
});

// Username and passwords are also supported, uncomment below and comment out above to use username/password auth instead
// const config = {
//   username: "<tiledb-cloud-username>",
//   password: "<tiledb-cloud-password>"
// };

// First we must create API objects.
// In the future we will improve and simplify this interface
const sqlAPI = new tiledb.v1.SqlApi(config);

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

const config = new tiledb.v1.Configuration({
  apiKey: "<insert token from setting page here>"
});
const arrayApi = new tiledb.v1.ArrayApi(config);

arrayApi
  .updateArrayMetadataCapnp(
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
`deserializeCapnp` helper function receives an `ArrayBuffer` and the type of the data expected. Library provides a `DeserializableType` enum for all the supported types.

```javascript
const tiledb = require("@tiledb-inc/tiledb-cloud");

const config = new tiledb.v1.Configuration({
  apiKey: "<insert token from setting page here>"
});
const arrayApi = new tiledb.v1.ArrayApi(config);

arrayApi
  .getArrayMetadataCapnp("ns", "array_name", {
    headers: {
      "Accept": "application/capnp",
    },
  })
  .then((data) => {
    // data.data is an ArrayBuffer
    console.log(tiledb.deserializeCapnp(data.data, tiledb.DeserializableType.arrayMetadata));
  })
```

## Queries

TileDB-Cloud-JS supports TileDB queries, by serializing data to capnproto.

### Basic read query

Dimensions should always be an array of 2 (start of the range and the end of the range). `bufferSize` dictates the server the number of bytes that should allocated to make this query.

```javascript
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const dimension1 = [636800,637800];
const dimension2 = [851000,853000];

const query = {
    layout: Layout.RowMajor,
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

tileDBQuery.ReadQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns an object with keys the name of the attributes and values the result
      console.log(result);
  })
```

### Multi range read queries

A dimension could be an array of ranges as well

```javascript
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const dimension1 = [636800,637800];
const dimension2 = [[1577836800, 1588878856], [1577836800, 1578878856]];

const query = {
    layout: Layout.RowMajor,
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

tileDBQuery.ReadQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns an object with keys the name of the attributes and values the result
      console.log(result);
  })
```

### Selecting whole dimension

By setting a dimension as an empty array, query will select the whole dimension.

```javascript
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const dimension1 = [636800,637800];
// Setting empty array, query will select whole 2nd dimension
const dimension2 = [];

const query = {
    layout: Layout.RowMajor,
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

tileDBQuery.ReadQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns an object with keys the name of the attributes and values the result
      console.log(result);
  })
```


### Write queries

For write queries user should provide an object with the attribute values and the coordinates of the cells (rows and cols in the object below). In this case we are writing to cells [1, 1] up to [1, 3].

```javascript
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const query = {
  layout: Layout.Unordered,
  values: {
    rows: {
      values: [1, 1, 1],
    },
    cols: {
      values: [1, 2, 3],
    },
    attr1: {
      values: [2, 3, 38],
    },
    attr2: {
      values: [10, 20, 30],
    },
  },
};

tileDBQuery.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })
```

### Dense writes with subarray

For Dense arrays we can provide a subarray instead of the coordinates and set the order (e.g. layout set to row-major).

```javascript
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const query = {
  layout: Layout.RowMajor,
  subarray: [[1, 1], [1, 3]],
  values: {
    attr1: {
      values: [2, 3, 38],
    },
    attr2: {
      values: [10, 20, 30],
    },
  },
};

tileDBQuery.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })
```

### Write queries with nullables and var-length attributes

For nullables and var-length attributes user should provide `validity` attribute and/or the `offsets`.

```javascript
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const query = {
  layout: Layout.Unordered,
  values: {
      a1: {
          values: [100, 200],
          validity: [1, 0],
      },
      a2: {
          values: [10, 10, 20],
          offsets: [0, 8, 12],
          validity: [1, 0],
      },
      a3: {
          values: ['abcdewxyz'],
          offsets: [0, 3, 5],
          validity: [1, 0],
      },
      rows: {
          values: [1, 1]
      },
      cols: {
          values: [1, 2]
      }
  }
};

tileDBQuery.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
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
