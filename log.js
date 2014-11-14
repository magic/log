'use strict';
var color   = require('bash-color')
  , log
;

log = function() {
  
  this.verbose = true;

  this.warn = function () {
    arguments[0] = color.yellow(arguments[0]);
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
  this.error = function() {
    arguments[0] = color.red(arguments[0]);
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
  this.success = function() {
    if ( log.verbose ) {
      arguments[0] = color.green(arguments[0]);
      Function.prototype.apply.apply(console.log, [console, arguments]);
    }
  }
  this.info = function() {
    if ( log.verbose ) {
      Function.prototype.apply.apply(console.log, [console, arguments]);
    }
  }
  //this function will actually be called
  return function() {
    if ( log.verbose ) {
      Function.prototype.apply.apply(console.log, [console, arguments]);
    }
  }
}

module.exports = log;
