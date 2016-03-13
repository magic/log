'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;

var _magicTypes = require('magic-types');

var _bashColor = require('bash-color');

var _bashColor2 = _interopRequireDefault(_bashColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var logLevels = ['all', 'warnings', 'errors'];

var colorize = function colorize(color) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.map(function (arg) {
    return color(arg);
  });
};

var log = exports.log = function log() {
  var _console;

  return log.logLevel === 0 && (_console = console).log.apply(_console, arguments);
};

log.logLevel = 0;

log.setLogLevel = function (_ref) {
  var logLevel = _ref.logLevel;

  if ((0, _magicTypes.isNumber)(logLevel)) {
    if (logLevels.length < logLevel) {
      log.setLogLevelError({ logLevel: logLevel });
      return;
    }

    log.logLevel = logLevels[logLevel];
  } else if ((0, _magicTypes.isString)(logLevel)) {
    var logLevelIndex = logLevels.indexOf(logLevel);

    if (logLevelIndex === -1) {
      log.setLogLevelError({ logLevel: logLevel });
      return;
    }

    log.logLevel = logLevelIndex;
  }
};

log.setLogLevelError = function (_ref2) {
  var logLevel = _ref2.logLevel;
  return log.error('logLevel', logLevel, 'does not exist');
};

log.warn = function () {
  var _console2;

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return log.logLevel >= 1 && (_console2 = console).log.apply(_console2, _toConsumableArray(colorize.apply(undefined, [_bashColor2.default.yellow].concat(args))));
};

log.error = function () {
  var _console3;

  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return (_console3 = console).error.apply(_console3, _toConsumableArray(colorize.apply(undefined, [_bashColor2.default.red].concat(args))));
};

log.success = function () {
  var _console4;

  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return log.logLevel === 0 && (_console4 = console).log.apply(_console4, _toConsumableArray(colorize.apply(undefined, [_bashColor2.default.green].concat(args))));
};

log.info = function () {
  return log.apply(undefined, arguments);
};

exports.default = log;
