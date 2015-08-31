'use strict';

var expect = require('expect.js');

var modelsToTest = ['characters','templates','templateValues'];
var models = require('../../models');

describe('models/index', function () {
  before(function () {
    return models.sequelize.sync({ force: true });
  })
  //=== tests if the models were loaded
  modelsToTest.forEach(function (model) {
    it('returns the ' + model + ' model', function () {
      expect(models[model]).to.be.ok();
    });
  })

});
