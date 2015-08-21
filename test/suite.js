process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
process.env.NODE_ENV = 'test';

var fixtures = require('fixtures'),
  Factory = require('factory'),
  models = require('models'),
  chai = require('chai');

global.assert = chai.assert;
global.expect = chai.expect;

Factory.register(models, fixtures);