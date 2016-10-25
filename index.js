/*
 * index
 *
 * Author: Hongcai Deng <admin@dhchouse.com>
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
    if (!this.isOnTheWay(key)) {
      this.worker
        .apply(this, args)
        .then(data => {
          this.emitter.emit(key, data);
          this.emitter.removeAllListeners(`${key}error`);
        })
        .catch(err => {
          this.emitter.emit(`${key}error`, err);
          this.emitter.removeAllListeners(key);
        });
    }
    return new Promise((resolve, reject) => {
      this.emitter.once(key, data => {
        resolve(data);
      });
      this.emitter.once(`${key}error`, reject);
    });
  }
  
  isOnTheWay(key) {
    return this.emitter.listenerCount(key) > 0;
  }
};