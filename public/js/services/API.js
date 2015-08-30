/**
 * API
 *
 * Angular service to interact with the e-uni tools backend.
 *
 *  Created: 13.04.2015
 *  Author: Thomas Richner - mail@trichner.ch
 */
app.factory('API', function($q,$http) {
    var API = {};
    var API_PREFIX = 'api'
    var URL = {
        CHARACTERS_ME : API_PREFIX +'/characters/me.json'
    }

    API.getMe = function(){
        return $http.get(URL.CHARACTERS_ME);
    }

    return API;
});