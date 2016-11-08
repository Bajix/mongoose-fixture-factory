process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
process.env.NODE_ENV = 'test';

var fixtures = require('../lib/fixtures'),
  Factory = require('../lib/factory'),
  models = require('../lib/models'),
  chai = require('chai');

global.assert = chai.assert;
global.expect = chai.expect;

Factory.register(models, fixtures);