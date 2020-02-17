### Usage

```javascript
const tiledb = require('@tiledb-inc/tiledb-cloud');

const config = {
  username: 'tiledb-username',
  password: 'tiledb-password'
};

const arrayApi = new tiledb.ArrayApi(config);

arrayApi.getArraysInNamespace('namespace').then((res) => {
  console.log(res);
}).catch((ex) => {
  console.log(ex);
});

```
