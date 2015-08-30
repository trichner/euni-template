/**
 * Created by Thomas on 16.04.2015.
 *
 * http://wiki.eve-id.net/APIv2_Page_Index
 */
var neow = require('neow');
var Q    = require('q');
var unirest = require('unirest');

var client = new neow.EveClient();

module.exports = {
    getCharacter : function(characterId){
        return client.fetch('eve:CharacterInfo',{characterID:characterId});
    },
    getCharacterSheet : function(characterId){
        return client.fetch('char:CharacterSheet',{characterID:characterId});
    },
    getCharacterId : function(characterNames){
        return client.fetch('eve:CharacterID',{names:characterNames})
    },
    getCharacterFromAccessToken : getCharacterFromAccessToken
}

function getCharacterId(accessToken){
    var deferred = Q.defer();
    unirest.get('https://login.eveonline.com/oauth/verify')
        .header('Accept', 'application/json')
        .header('Authorization', 'Bearer ' + accessToken)
        .end(function (res){
            //console.log('Verify Body' + JSON.stringify(res.body))
            deferred.resolve(res.body.CharacterID);
        });
    return deferred.promise;
}

function getCharacterFromAccessToken(accessToken){
    return getCharacterId(accessToken)
        .then(api.getCharacter)
}