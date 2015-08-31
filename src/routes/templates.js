var templateService = require('./../services/templates');
var router = require('express-promise-router')();

router.get('/', function (req, res, next) {
    return templateService.getTemplates()
        .then(res.json.bind(res))
});

router.get('/:id.json', function (req, res, next) {
    var templateId = req.params.id;
    return templateService.getTemplateById(templateId)
        .then(res.json.bind(res))
});

module.exports = router;
