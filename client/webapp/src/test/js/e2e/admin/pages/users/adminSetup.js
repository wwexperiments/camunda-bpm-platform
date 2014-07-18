'use strict';

var Base = require('./newUser');

module.exports = Base.extend({

  url: '/camunda/app/admin/default/setup/#/setup',

  createNewAdminButton: function() {
    return element(by.css('.btn.btn-primary'));
  }

});