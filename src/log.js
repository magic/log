"use strict";
import color from 'bash-color';

var verbose = process.env !== 'production';

export function log() {
  if ( verbose ) {
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
}

export function warn() {
  arguments[0] = color.yellow(arguments[0]);
  Function.prototype.apply.apply(console.warn, [console, arguments]);
}

export function error() {
  arguments[0] = color.red(arguments[0]);
  Function.prototype.apply.apply(console.error, [console, arguments]);
}

export function success() {
  if (verbose) {
    arguments[0] = color.green(arguments[0]);
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
}

export function info() {
  if (verbose) {
    arguments[0] = color.green(arguments[0]);
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
}

export default log;
