'use strict';

var db = require('../config');
var User = require('./user');

var WallPhoto = db.Model.extend({
  tableName: 'wallPhotos',
  hasTimestamps: true,
  user: function() {
    return this.hasOne('User', 'user_id');
  }
});

module.exports = db.model('WallPhoto', WallPhoto);