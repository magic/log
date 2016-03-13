import { isNumber, isString } from 'magic-types';

import color from 'bash-color';

const logLevels = ['all', 'warnings', 'errors'];

const colorize =
  (color, ...args) =>
    args.map(
      arg =>
        color(arg)
    );

export const log =
  (...args) =>
    log.logLevel === 0 &&
    console.log(...args);

log.logLevel = 0;

log.setLogLevel =
  ({ logLevel }) => {
    if (isNumber(logLevel)) {
      if (logLevels.length < logLevel) {
        log.setLogLevelError({ logLevel });
        return;
      }

      log.logLevel = logLevels[logLevel];
    } else if (isString(logLevel)) {
      const logLevelIndex = logLevels.indexOf(logLevel);

      if (logLevelIndex === -1) {
        log.setLogLevelError({ logLevel });
        return;
      }

      log.logLevel = logLevelIndex;
    }
  };

log.setLogLevelError =
  ({ logLevel }) =>
    log.error('logLevel', logLevel, 'does not exist');

log.warn =
  (...args) =>
    log.logLevel >= 1 &&
    console.log(...colorize(color.yellow, ...args));

log.error =
  (...args) =>
    console.error(...colorize(color.red, ...args));

log.success =
  (...args) =>
    log.logLevel === 0 &&
    console.log(...colorize(color.green, ...args));

log.info =
  (...args) =>
    log(...args);

export default log;
