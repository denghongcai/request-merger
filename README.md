# request-merger

[![NPM version](https://img.shields.io/npm/v/request-merger.svg?style=flat)](https://www.npmjs.com/package/request-merger)
[![NPM download](https://img.shields.io/npm/dm/request-merger.svg?style=flat)](https://www.npmjs.com/package/request-merger)
[![Build Status](https://travis-ci.org/denghongcai/request-merger.svg?branch=master)](https://travis-ci.org/denghongcai/request-merger)
[![Coverage Status](https://coveralls.io/repos/github/denghongcai/request-merger/badge.svg?branch=master)](https://coveralls.io/github/denghongcai/request-merger?branch=master)

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
console.dir(Promise.all([
  request('https://httpbin.org/get')
  request('https://httpbin.org/get')
  request('https://httpbin.org/get')
  request('https://httpbin.org/get')
  request('https://httpbin.org/get')
]));
```

run above code, you'll find that only one request is sent.
