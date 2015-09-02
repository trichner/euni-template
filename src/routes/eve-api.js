var router = require('express-promise-router')();
var crest = require('../services/crest');

router.get('/characterId.json', function (req, res, next) {
    var actingId = req.session.actingId;
    var characterName = req.query.name || req.body.name;

    return crest.getCharacterId(characterName)
        .then(res.json.bind(res))
});

module.exports = router;