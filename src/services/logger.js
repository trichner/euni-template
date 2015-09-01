
var winston = require('winston');

module.exports = new (winston.Logger)({
    transports: [
        new winston.transports.Console({level: 'info'}), // change log level here!
        new winston.transports.File({level: 'verbose', filename: 'logs.log'}),
        new winston.transports.File({level: 'error', filename: 'error.log'})
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'exceptions.log'})
    ]
});