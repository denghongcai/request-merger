/*
 * index.test
 *
 * Author: Hongcai Deng <admin@dhchouse.com>
 */

'use strict';

const should = require('should');
const RequestMerger = require('../index');

describe('RequestMerger', function () {
  it('should request ok', function () {
    const rm = new RequestMerger(function (url) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(url);
        }, 100);
      });
    });
    rm
      .request('http://127.0.0.1')
      .then(url => {
        should(url).eql('http://127.0.0.1');
      });
  });

  it('should request only once', function () {
    let i = 0;
    const rm = new RequestMerger(function () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(i++);
        }, 100);
      });
    });
    rm
      .request()
      .then(url => {
        should(url).eql(0);
      });
    rm
      .request()
      .then(url => {
        should(url).eql(0);
      });
  });

  it('should request multi-key ok', function () {
    let i = 0;
    const rm = new RequestMerger(function () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(i++);
        }, 100);
      });
    });
    rm
      .request(0)
      .then(url => {
        should(url).eql(0);
      });
    rm
      .request(1)
      .then(url => {
        should(url).eql(1);
      });
  });

  it('should all error', function () {
    const rm = new RequestMerger(function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error());
        }, 100);
      });
    });
    rm
      .request()
      .catch(err => {
        should(err).be.Error;
      });
    rm
      .request()
      .catch(err => {
        should(err).be.Error;
      });
  });

  it('should not interfere other request if error', function () {
    const rm = new RequestMerger(function (i) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (i === 0) {
            resolve();
          } else {
            reject(new Error());
          }
        }, 100);
      });
    });
    rm
      .request(0)
      .then(i => {
        should(i).eql(0);
      });
    rm
      .request(1)
      .catch(err => {
        should(err).be.Error;
      });
  });
});