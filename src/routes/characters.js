var characterService = require('./../services/characters');
var router = require('express-promise-router')();

router.get('/me.json', function (req, res, next) {
    var actingId = req.session.actingId;
    return characterService.getCharacterById(actingId)
        .then(res.json.bind(res))
});

router.get('/:id.json', function (req, res, next) {
    var characterId = req.params.id;
    return characterService.getCharacterById(characterId)
        .then(res.json.bind(res))
});

module.exports = router;
