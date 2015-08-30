"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var Q = require("q");

// Better stacktraces for promise chains
Q.longStackSupport = true;

// Better testing with promises
chai.should();
chai.use(chaiAsPromised);

global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

global.fulfilledPromise = Q.resolve;
global.rejectedPromise = Q.reject;
global.defer = Q.defer;
global.waitAll = Q.all;

// Environement for tests
process.env.NODE_ENV = 'test';