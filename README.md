# request-merger

[![NPM version]](https://img.shields.io/npm/v/request-merger.svg?style=flat)
[![NPM download]](https://img.shields.io/npm/dm/request-merger.svg?style=flat)
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
request('https://httpbin.org/get')
  .then(res => {
    console.log(res);
  });
```