'use strict';

var Q       = require('q');
var expect  = require('expect.js');
var request = require('supertest');
var path    = require("path");

var models = require('../../models');
var app     = require('../../routes/root')

describe('routes/accounts', function () {
    //before(function () {
    //    return models.sequelize.sync({force: true})
    //        .then(function () {
    //            return models.templates.create(expectedTemplate);
    //        })
    //})

    //=== Service Tests
    var expectedAccount = {
        id: "35361",
        apiKeyId: "1337"
    };

    it('loads all', function (done) {
      request(app).get('/api/templates/')
          .expect('Content-Type', /json/)
          .expect(function (res) {
              expect(res.body).to.eql(expectedAccount);
          })
          .expect(200, done);
    });

    it('loads id', function (done) {
        request(app).get('/api/templates/someTemplate.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedAccount);
            })
            .expect(200, done);
    });
});
