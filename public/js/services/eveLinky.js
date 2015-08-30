/**
 * eveLinky
 *
 * Angular service to assemble URLs for Eve Online.
 *
 *  Created: 30.08.2015
 *  Author: Thomas Richner - mail@trichner.ch
 */

/* Examples:
 * <url=http://tools.eveuniversity.org/apply.php>this link</url>
 * <url=joinChannel:100>E-Uni</url>
 * <url=joinChannel:-9518631>Q&A.EUNI</url>
 * <url=showinfo:16159//937872513>Ivy League</url>
 * <url=showinfo:1377//698922015>Thomion</url>
 */
app.factory('EveLinky', function() {
    var TEMPLATES = {
        CORPORATION : "<url=showinfo:2//{id}>{name}</url>",
        CHARACTER : "<url=showinfo:1377//{id}>{name}</url>",
        ALLIANCE : "<url=showinfo:16159//{id}>{name}</url>",
        CHANNEL : "<url=joinChannel:{id}>{name}</url>",
        CONTRACT : "<url=contract:30002200//{id}>{name}</url>",
        FITTING : "<url=fitting:{dna}>{name}</url>",
        ITEM : "<url=showinfo:25812//{id}>{name}</url>",
        WEBURL : "<url={url}>{name}</url>"
    }

    function interpolateUrl(template,values){
        for(var key in values){
            template = template.replace(handlebar(key),values[key]);
        }
        return template;
    }
    function handlebar(key){
        return '{'.concat(String(key)).concat('}');
    }
    return {
        urlCorporation : function(id,name){
            return interpolateUrl(TEMPLATES.CORPORATION,{id:id,name:name});
        },
        urlAlliance : function(id,name){
            return interpolateUrl(TEMPLATES.ALLIANCE,{id:id,name:name});
        },
        urlChannel : function(id,name){
            return interpolateUrl(TEMPLATES.CHANNEL,{id:id,name:name});
        },
        urlCharacter : function(id,name){
            return interpolateUrl(TEMPLATES.CHARACTER,{id:id,name:name});
        },
        urlItem : function(id,name){
            return interpolateUrl(TEMPLATES.ITEM,{id:id,name:name});
        },
        urlFitting : function(dna,name){
            return interpolateUrl(TEMPLATES.FITTING,{dna:dna,name:name});
        },
        urlWeb : function(url,name){
            return interpolateUrl(TEMPLATES.WEBURL,{url:url,name:name});
        },
        urlContract : function(id,name){
            return interpolateUrl(TEMPLATES.CONTRACT,{id:id,name:name});
        }
    }
});