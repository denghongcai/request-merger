/*
 * index
 *
 * Copyright (C) Alibaba Group Holding Limited.
 * Author: hongcai.dhc <hongcai.dhc@alibaba-inc.com>
 */

'use strict';

const EventEmitter = require('events');

module.exports = class RequestMerger {
  constructor(worker) {
    this.worker = worker;
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(Infinity)
  }

  request(...args) {
    const key = JSON.stringify(args);
    this.worker
      .apply(this, args)
      .then(data => {
        this.emitter.emit(key, data);
      })
      .catch(err => {
        this.emitter.emit(`${key}error`, err);
      });
    return new Promise((resolve, reject) => {
      this.emitter.once(key, resolve);
      this.emitter.once(`${key}error`, reject);
    });
  }
};