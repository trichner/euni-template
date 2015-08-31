'use strict';

var expect = require('expect.js');
var Q = require('q');

var models = require('../../models');

describe('models/templates', function () {
    var expectedTemplate = {
        externalId: "someTemplate",
        name: "Some Template",
        type: "mail",
        template: "I <3 {{character.name}} even more!!!"
    };

    before(function () {
        return models.sequelize.sync({force: true})
            .then(function () {
                return models.templates.create(expectedTemplate);
            })
    })

    it('adds a template', function () {
        return models.templates.create({
            externalId: "exampleTemplate",
            name: "Example Template",
            type: "mail",
            template: "I <3 {{character.name}}"
        }).should.eventually.resolve;
    });


    it('finds a template', function () {
        return models.templates.findOne({
            where: {externalId: expectedTemplate.externalId}
        })
            .then(function (template) {
                template = template.dataValues;
                expectedTemplate.id = template.id;
                return template;
            })
            .should.become(expectedTemplate);
    });

    var newValue = {path: "character.name"};
    it('adds a value', function () {
        return models.templates.findOne({
                where: {externalId: "someTemplate"}
            })
            .then(function (template) {
                return template.createValue(newValue);
            })
            .should.be.fulfilled;
    });

    var newValues = [{path: "character.3"},{path: "character.1"},{path: "character.2"}];
    it('adds values', function () {
        var promises = newValues.map(function (value) {
            return models.templates.findOne({
                where: {externalId: "someTemplate"}
                })
                .then(function (template) {
                    return template.createValue(value);
                })
        })

        return Q.all(promises).should.be.fulfilled;
    });

    it('adds invalid values', function () {
        return models.templates.findOne({
                where: {externalId: "someTemplate"}
            })
            .then(function (template) {
                return template.createValue({path: null});
            })
            .should.be.rejected;
    });
});
