var fixtures = require('../../lib/fixtures').User,
  User = require('../../lib/models').User,
  Factory = require('../../lib/factory');

describe('Factory', function() {
  describe('fills', function() {
    before(Factory.fill);

    it('Users', function( done ) {
      User.count({}, function( err, count ) {
        if (err) {
          return done(err);
        }

        assert.operator(count, '>', 0);
        assert.equal(count, fixtures.length);
        done();
      });
    });
  });

  describe('flush', function() {
    before(Factory.fill);

    it('Users', function( done ) {
      Factory.flush(function( err ) {
        if (err) {
          return done(err);
        }

        User.count({}, function( err, count ) {
          if (err) {
            return done(err);
          }

          assert.equal(count, 0);
          done();
        });
      })
    });
  });
});