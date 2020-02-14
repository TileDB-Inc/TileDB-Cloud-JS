### Usage

```javascript
const tiledb = require('tiledb-cloud');

const username = 'tiledb-username';
const password = 'tiledb-password';

const arrayApi = new tiledb.ArrayApi(username, password);

arrayApi.getArraysInNamespace('namespace').then((res) => {
  console.log(res);
}).catch((ex) => {
  console.log(ex);
});

```
