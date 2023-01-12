# TileDB Cloud library for NodeJS


[Installation](#installation) <br/>
[Basic usage](#basic-usage) <br/>
[Browser usage](#browser-usage) <br/>
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
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// First we must create the client.
const tiledbClient = new client(config);

tiledbClient.userProfile().then((res) => {
  console.log(res);
}).catch((ex) => {
  console.log(ex);
});


```

### Browser usage:

TileDB-Cloud-JS can also be used directly in the browser. Please see the following demo for more information:
- https://github.com/TileDB-Inc/TileDB-Cloud-JS-Demo

### Download a file in TileDB format:

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// First we must create the client.
const tiledbClient = new client(config);

client.downloadFile('namespace', 'tiledb_file').then((res) => {
  console.log('saved!');
});


```

### Download a TileDB notebook:

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// First we must create the client.
const tiledbClient = new client(config);

client.downloadNotebookToFile("kostas", "test_plot_widget").then((res) => {
  console.log('saved as test_plot_widget.ipynb');
});


```

### Serverless SQL example:

```javascript

import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);

// SQL query
const sql = "select `rows`, AVG(a) as avg_a from `tiledb://TileDB-Inc/quickstart_dense` GROUP BY `rows`";

// Run SQL and print any returned data to console
tiledbClient.sql.exec("<tiledb-cloud-username>", sql).then((res) => {
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

## Queries

TileDB-Cloud-JS supports TileDB queries, by serializing data to capnproto. `bufferSize` dictates the server the number of bytes that should allocated to make this query. In case the `bufferSize` is not enough, it will result to an incomplete query. For this reason `ReadQuery` is an async generator so a user could get results in batches.

### Basic read query

Dimensions should always be an array of 2 (start of the range and the end of the range).

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);

const query = {
    layout: "row-major",
    ranges: [dimension1, dimension2],
    bufferSize: 1500000000,
};

const generator = tiledbClient.query.ReadQuery("namespace", "arrayName", query);
generator.next().then(({value}) => {
    console.log(value)
});
```

### Incomplete reads in batches

Dimensions should always be an array of 2 (start of the range and the end of the range).

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);

const dimension1 = [636800,637800];
const dimension2 = [851000,853000];

const query = {
    layout: "row-major",
    ranges: [dimension1, dimension2],
    bufferSize: 1500,
};


// Iterate over all results
(async function() {
    for await (let results of tiledbClient.query.ReadQuery("namespace", "arrayName", query)) {
        console.log(results);
    }
})()


// Or manually iterate over the results
const generator = tileDBQuery.ReadQuery("namespace", "arrayName", query);
(async function() {
    const result = await generator.next();
    console.log(result.value);

    const result2 = await generator.next();
    console.log(result2.value);
})()
```

### Multi range read queries

A dimension could be an array of ranges as well

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);

const dimension1 = [636800,637800];
const dimension2 = [[1577836800, 1588878856], [1577836800, 1578878856]];

const query = {
    layout: "row-major",
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

// Iterate over all results
(async function() {
    for await (let results of tiledbClient.query.ReadQuery("my_namespace", "my_array", query)) {
      // returns an object with keys the name of the attributes and values the result
        console.log(results);
    }
})()
```

### Selecting whole dimension

By setting a dimension as an empty array, query will select the whole dimension.

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);

const dimension1 = [636800,637800];
// Setting empty array, query will select whole 2nd dimension
const dimension2 = [];

const query = {
    layout: "row-major",
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

// Iterate over all results
(async function() {
    for await (let results of tiledbClient.query.ReadQuery("my_namespace", "my_array", query)) {
      // returns an object with keys the name of the attributes and values the result
        console.log(results);
    }
})()
```


### Write queries

For write queries user should provide an object with the attribute values and the coordinates of the cells (rows and cols in the object below). In this case we are writing to cells [1, 1] up to [1, 3].

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);


const query = {
  layout: "unordered",
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

tiledbClient.query.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })
```

### Dense writes with subarray

For Dense arrays we can provide a subarray instead of the coordinates and set the order (e.g. layout set to row-major).

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);

const query = {
  layout: "row-major",
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

tiledbClient.query.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })
```

### Write queries with nullables and var-length attributes

For nullables and var-length attributes user should provide `validity` attribute and/or the `offsets`.

```javascript
import client from "@tiledb-inc/tiledb-cloud";

// API tokens are the recommend way to access the cloud apis
const config = {
  apiKey: "<insert token from setting page here>"
};

// Create a client instance
const tiledbClient = new client(config);


const query = {
  layout: "unordered",
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

tiledbClient.query.WriteQuery("my_namespace", "my_array", query)
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
