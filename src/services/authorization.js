
var Q = require('q');
var characterService  = require('./characters');

module.exports = {
    isAuthorized : function (characterId) {
        return characterService.getCharacterById(characterId)
            .then(function (character) {
                if(character){
                    return true;
                }else{
                    return new Error("Not authorized!");
                }
            })
    }
}