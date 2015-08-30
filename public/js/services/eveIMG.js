/**
 * eveIMG
 *
 * Angular service to assemble URLs for the Eve Online image server.
 * https://image.eveonline.com/
 *
 *  Created: 13.04.2015
 *  Author: Thomas Richner - mail@trichner.ch
 */
app.factory('EveIMG', function() {
    var IMG_SERVER = 'https://image.eveonline.com/';
    var EVEIMG = {
        RENDER: IMG_SERVER + 'Render/',
        ALLIANCE: IMG_SERVER + 'Alliance/',
        CORPORATION: IMG_SERVER + 'Corporation/',
        CHARACTER: IMG_SERVER + 'Character/',
        TYPE: IMG_SERVER + 'Type/'
    }

    var IMG_TYPE = {
        JPG: '.jpg',
        PNG: '.png'
    }

    function assembleUrl(prefix,id,width,imgType){
        if(!id){
            return '';
        }
        return prefix + String(id) + '_' + String(width) + imgType
    }
    return {
        imgUrlRender : function(id,width){
            return assembleUrl(EVEIMG.RENDER,id,width,IMG_TYPE.PNG);
        },
        imgUrlType : function(id,width){
            return assembleUrl(EVEIMG.TYPE,id,width,IMG_TYPE.PNG);
        },
        imgUrlCharacter : function(id,width){
            return assembleUrl(EVEIMG.CHARACTER,id,width,IMG_TYPE.JPG);
        },
        imgUrlAlliance : function(id,width){
            return assembleUrl(EVEIMG.ALLIANCE,id,width,IMG_TYPE.PNG);
        },
        imgUrlCorporation : function(id,width){
            return assembleUrl(EVEIMG.CORPORATION,id,width,IMG_TYPE.PNG);
        }
    }
});