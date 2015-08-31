var Q = require('q');

var parser = require('./parser')
var authenticator = require('./authenticator');

var characters = require('./characters')

var env       = process.env.NODE_ENV || "production";
var config    = require(__dirname + '/../config/config.json')[env];

var app = require('express')();

app.use('/',parser);

if(env != "test"){
    app.use(authenticator);
}

app.use('/characters',characters);


module.exports = app;
