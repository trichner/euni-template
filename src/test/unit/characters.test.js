'use strict';

var expect = require('expect.js');
var Q = require('q');

var models = require('../../models');

describe('models/characters', function () {
  before(function () {
    return models.sequelize.sync({ force: true })
        .then(function () {
          return models.characters.create({
            id: 42,
            name: 'Dagan'
          });
        })
  })

  it('adds a character', function () {
    return models.characters.create({
      id: 1,
      name: 'Logibro'
    }).should.eventually.resolve;
  });


  it('finds a character', function () {
    var expectedCharacter = {id:42,name:'Dagan'};
    return models.characters.findOne({
      where: {id: 42}
    }).then(function (character) {
      return character.dataValues;
    }).should.become(expectedCharacter);
  });

});
