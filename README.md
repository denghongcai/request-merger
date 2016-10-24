# request-merger

### Installation
just

```bash
npm install --save request-merger
```

### Usage
example:

```javascript
const RequestMerger = require('request-merger');
const rp = require('request-promise');
const request = new RequestMerger(function (url) {
  return rp(url);
});
request('https://httpbin.org/get')
  .then(res => {
    console.log(res);
  });
```