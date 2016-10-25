/*
 * index.test
 *
 * Author: Hongcai Deng <admin@dhchouse.com>
 */

'use strict';

const should = require('should');
const RequestMerger = require('../index');

describe('RequestMerger', function (done) {
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
        done();
      });
  });

  it('should request only once', function (done) {
    let i = 0;
    const rm = new RequestMerger(function () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(++i);
        }, 100);
      });
    });
    rm
      .request()
      .then(url => {
        should(url).eql(1);
        return rm.request();
      })
      .then(url => {
        should(url).eql(2);
        done();
      });
  });

  it('should request multi-key ok', function (done) {
    let i = 0;
    const rm = new RequestMerger(function () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(++i);
        }, 100);
      });
    });
    rm
      .request(0)
      .then(url => {
        should(url).eql(1);
        return rm.request(1);
      })
      .then(url => {
        should(url).eql(2);
        done();
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
    return Promise.all([
      rm
        .request()
        .should.be.rejected(),
      rm
        .request()
        .should.be.rejected()]);
  });

  it('should not interfere other request if error', function () {
    const rm = new RequestMerger(function (i) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (i === 0) {
            resolve(i);
          } else {
            reject(new Error());
          }
        }, 100);
      });
    });
    return Promise.all([
      rm
        .request(0)
        .should.be.fulfilledWith(0),
      rm
        .request(1)
        .should.be.rejected()
    ])
  });
});