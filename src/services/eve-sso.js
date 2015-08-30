/**
 * Created by Thomas on 16.04.2015.
 *
 * http://wiki.eve-id.net/APIv2_Page_Index
 */
var Q    = require('q');
var unirest = require('unirest');

module.exports = {
    getCharacterIdFromAccessToken : getCharacterIdFromAccessToken
}

function getCharacterIdFromAccessToken(accessToken){
    var deferred = Q.defer();
    unirest.get('https://login.eveonline.com/oauth/verify')
        .header('Accept', 'application/json')
        .header('Authorization', 'Bearer ' + accessToken)
        .end(function (res){
            deferred.resolve(res.body.CharacterID);
        });
    return deferred.promise;
}
