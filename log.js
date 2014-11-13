'use strict';
var color = require('bash-color')
  , verbose = true
  , log
;
log = function() {
  Function.prototype.apply.apply(console.log, [console, arguments]);
}
log.warn = function () {
  arguments[0] = color.yellow(arguments[0]);
  Function.prototype.apply.apply(console.log, [console, arguments]);
}
log.error = function() {
  arguments[0] = color.red(arguments[0]);
  Function.prototype.apply.apply(console.log, [console, arguments]);
}
log.success = function() {
  arguments[0] = color.green(arguments[0]);
  Function.prototype.apply.apply(console.log, [console, arguments]);
}
module.exports = log;
