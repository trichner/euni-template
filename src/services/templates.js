
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

module.exports = {
    getTemplateById : getTemplateById,
    getTemplates : getTemplates
};

function getTemplateById(templateId){
    if(!templateId){
        return new Error("Template not found.")
    }
    return models.templates.findOne({where: {externalId: templateId}})
        .then(mapTemplate);
}

function getTemplates(){
    return models.templates.findAll()
        .then(mapTemplates);
}

function mapTemplates(templates){
    return Q.all(templates.map(mapTemplate))
}

function mapTemplate(template){
    return template.getValues()
        .then(mapValues)
        .then(function (values) {
            return {
                id: template.externalId,
                type: template.type,
                name: template.name,
                template: template.template,
                values: values
            }
        })

}

function mapValues(values){
    return values.map(function (value) {
        return {
            path: value.path
        }
    })
}





