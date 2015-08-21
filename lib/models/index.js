var mongoose = require('mongoose'),
  schemas = require('schemas'),
  config = require('config');

mongoose.connect(config.db.uri);

for (var key in schemas) {
  exports[key] = mongoose.model(key, schemas[key]);
}