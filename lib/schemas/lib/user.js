var validate = require('mongoose-validator'),
  mongoose = require('mongoose');

var schema = module.exports = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    index: true,
    validate: validate({
      validator: 'isEmail'
    })
  },
  name: {
    givenName: {
      type: String
    },
    familyName: {
      type: String
    }
  },
  password: {
    required: true,
    select: false,
    type: String
  },
  role: {
    select: false,
    type: String,
    index: true,
    enum: [
      'Admin',
      'Editor',
      'Author',
      'Contributor',
      'Subscriber'
    ],
    default: 'Subscriber'
  },
  createdAt: {
    select: false,
    type: Date,
    default: Date
  },
  updatedAt: {
    select: false,
    type: Date,
    default: Date
  }
});

schema.pre('save', function( next ) {
  if (!this.isNew && this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

var toObject = schema.options.toObject = {},
  toJSON = schema.options.toJSON = {};

toObject.transform = toJSON.transform = function( doc, ret ) {
  delete ret.password;
};