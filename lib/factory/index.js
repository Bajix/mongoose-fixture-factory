var async = require('async'),
  models = {},
  store = {};

if (process.env.NODE_ENV !== 'test') {
  throw new Error('Cannot use mongoose-fixture-factory on a non-test environment');
}

function register( Model, fixtures ) {
  if (typeof Model === 'object') {
    for (var key in Model) {
      if (Model.hasOwnProperty(key) && fixtures.hasOwnProperty(key)) {
        return register(Model[key], fixtures[key]);
      }
    }
  } else {
    var name = Model.modelName;
    store[name] = fixtures
    models[name] = Model;
  }
};

function fill( cb ) {
  async.each(Object.keys(models), function( key, cb ) {
    var fixtures = store[key]
      Model = models[key];

    async.series([
      function( cb ) {
        Model.remove({}, cb);
      },
      function( cb ) {
        Model.create(fixtures, cb);
      }
    ], cb);
  }, cb);
}

function flush( cb ) {
  async.each(Object.keys(models), function(key, cb) {
    var Model = models[key];

    Model.remove({}, cb);
  }, cb);
}

exports.fill = fill;
exports.flush = flush;
exports.register = register;