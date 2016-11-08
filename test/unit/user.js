var fixtures = require('../../lib/fixtures').User,
  User = require('../../lib/models').User,
  async = require('async');

describe('Users', function() {
  it('validates', function( done ) {
    async.each(fixtures, function( fixture, cb ) {
      new User(fixture).validate(cb);
    }, done);
  });
});