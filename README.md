# **Mongoose Fixture Factory**

Automate filling, flushing and replacing of database documents for testing purposes

[![Version npm](https://img.shields.io/npm/v/mongoose-fixture-factory.svg?style=flat-square)](https://www.npmjs.com/package/mongoose-fixture-factory)[![Support via Gratipay](https://img.shields.io/gratipay/Bajix.svg)](https://gratipay.com/Bajix)[![NPM Downloads](https://img.shields.io/npm/dm/mongoose-fixture-factory.svg?style=flat-square)](https://www.npmjs.com/package/mongoose-fixture-factory)[![Build Status](https://img.shields.io/codeship/f49055a0-29cc-0133-e5fe-2aebc0287da2.svg)](https://codeship.com/projects/98113)[![Dependencies](https://img.shields.io/david/Bajix/mongoose-fixture-factory.svg?style=flat-square)](https://david-dm.org/Bajix/mongoose-fixture-factory)

## Install

[![NPM](https://nodei.co/npm/mongoose-fixture-factory.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mongoose-fixture-factory/)

## Documentation

### `register(model, fixtures)`

Register a model and it's respective fixtures to be included when calling flush or fill.

`model` *{Function}*

Mongoose Model constructor.

`fixtures` *{Array}*

Stub data

### `fill(cb)`

Flush all registered collections, then insert the respective fixtures

### `flush(cb)`

Flush all registered collections

## Example

```
// .
// ├── test
// │   ├── unit
// │   └── ...
// │   ├── mocha.opts
// │   └── suite.js

// Suite

process.env.NODE_ENV = 'test';

var fixtures = require('fixtures'),
  Factory = require('factory'),
  models = require('models');

Factory.register(models, fixtures); // Convience syntax.

/*
// Manually calling register on each model/fixture pair.
//
//   Factory.register(models.Page, fixtures.Page);
//   Factory.register(models.User, fixtures.User);
//
 */

// Auth test

describe('Passwords', function() {
  before(Factory.flush);
  it('hashes passwords', function( done ) {
    var user = new User(fixture);
    user.password = 'password';
    user.save(function( err, user ) {
      if (err) {
        return done(err);
      }

      assert.lengthOf(user.password, 60);
      assert.equal(user.password.indexOf('$2a$10$'), 0);
      done();
    });
  });
});
```