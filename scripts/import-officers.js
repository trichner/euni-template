#!/usr/bin/env node
process.env.NODE_ENV = "development";
var models = require('../src/models');
var path = require("path");
var Q = require('q');
var crest = require("../src/services/crest");

var officers = require(__dirname + '/euni-pos.json');

models.sequelize.sync()
    .then(function () {
        officers = officers.map(function (name) {
            return crest.getCharacterId(name);
        });

        Q.all(officers)
            .then(function (characters) {
                return characters
                    .map(function (character) {
                        return models.characters.findOrCreate({where: {id: character.id}, defaults: character})
                    })
            })
            .then(function (characters) {
                return Q.all(characters);
            })
            .then(function () {
                console.log('All imported.')
            })
            .catch(function (err) {
                console.error(err);
            })
    })


function firstKey(obj) {
    return Object.keys(obj)[0];
}

function firstEntry(obj) {
    return obj[firstKey(obj)];
}