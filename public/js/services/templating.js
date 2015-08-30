/**
 * eveIGB
 *
 * Angular service that presents the Eve Online in-game browser javascript
 * methods.
 *
 *  Created: 13.04.2015
 *  Author: Thomas Richner - mail@trichner.ch
 */
app.factory('Templating', function($http,$interpolate,EveLinky) {
    var TEMPLATES_DIR = 'templates/';
    function loadTemplate(template){
        return $http.get(TEMPLATES_DIR + template)
            .then(function (res) {
                return res.data;
            })
    }

    function decorateScope(values){
        for(var key in EveLinky){
            if(startsWith(key,"url")){
                values[key] = EveLinky[key];
            }
        }
        return values;
    }

    function startsWith(str,pattern){
        return str.indexOf(pattern) === 0;
    }

    return {
        render: function(template,values){
            if(!(typeof template === "string")){
                template = template.template;
            }
            values = decorateScope(values);

            return loadTemplate(template)
                .then(function (txt) {
                    var compiled = $interpolate(txt);
                    return compiled(values)
                })

        },
        load: function (template) {
            return loadTemplate(template);
        }
    }

});