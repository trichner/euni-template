var Q = require('q');
var app = require('express')();

var parser = require('./parser')
var authenticator = require('./authenticator');

var characters = require('./characters');
var templates = require('./templates');

var env       = process.env.NODE_ENV || "production";
var config    = require(__dirname + '/../config/config.json')[env];

app.use('/',parser);

if(env != "test"){
    app.use(authenticator);
}

app.use('/characters',characters);
app.use('/templates',templates);

module.exports = app;
