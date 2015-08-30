
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

module.exports = {
    getCharacterById : getCharacterById
};

function getCharacterById(characterId){
    if(!characterId){
        return new Error("Character not found.")
    }
    return models.characters.findOne({where: {id: characterId}})
        .then(mapCharacter);
}

function mapCharacter(character){
    return {
        id: character.id,
        name: character.name
    }
}



