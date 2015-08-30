#!/usr/bin/env node
process.env.NODE_ENV = "development";
var models = require('../../models');
var path = require("path");
var Q = require('q');
var crest = require("../../services/crest");

var officers    = require(__dirname + '/euni-pos.json');

models.sequelize.sync()
    .then(function () {
        officers = officers.map(function (name) {
            return crest.getCharacterId(name);
        });

        Q.all(officers).then(function (characters) {
            return characters.map(function (character) {
                var entry = firstEntry(character.characters);
                return {
                    id: entry.characterID,
                    name: entry.name
                }
            })
        }).then(function (characters) {
            return characters.map(function (character) {
                return models.characters.create({
                    id: character.id,
                    name: character.name
                })
            })
        }).then(function (characters) {
            return Q.all(characters);
        }).then(function () {
            console.log('All imported.')
        })
    })


function firstKey(obj){
    return Object.keys(obj)[0];
}

function firstEntry(obj){
    return obj[firstKey(obj)];
}