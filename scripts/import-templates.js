#!/usr/bin/env node

//process.env.NODE_ENV = "development";

var path = require("path");
var Q = require('q');
var fs = require("fs");

var models = require('../src/models');

var templatesDir = path.join(__dirname, 'templates/');

models.sequelize.sync()
    .then(function () {
        var templates = fs.readdirSync(templatesDir);

        templates = templates.filter(filterJSON);

        console.log("Importing " + JSON.stringify(templates));

        templates = templates.map(loadTemplate)
            .map(decorateTemplate)
            .map(importTemplate)

        Q.all(templates)
            .then(function () {
                console.log("All imported.");
            })
            .catch(function (err) {
                console.error(err);
            })
    })

function importTemplate(template) {
    return models.templates.findOrCreate({
        where: {externalId: template.id}, defaults: {
            externalId: template.id,
            name: template.name,
            type: template.type,
            template: template.template
        }
    })
        .spread(function (importedTemplate, created) {
            if (created) {
                return importedTemplate;
            } else {
                return destroyValues(importedTemplate);
            }
        })
        .then(function (importedTemplate) {
            var promises = template.values.map(function (value) {
                return importedTemplate.createValue(value);
            })
            return Q.all(promises);
        })
        .then(function () {
            console.log("Imported %s", template.name)
            return;
        })
}

function destroyValues(template){
    return models.templateValues.destroy({where: {templateId: template.id}})
        .then(function () {
            return template;
        })
}

function filterJSON(filename) {
    return endsWith(filename, '.json');
}

function loadTemplate(filename) {
    return require(path.join(templatesDir, filename));
}

function decorateTemplate(template) {
    var mapped = JSON.parse(JSON.stringify(template));
    mapped.template = fs.readFileSync(path.join(templatesDir, template.template), "utf8");
    return mapped;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}