const is = require('@magic/types')

const { paint } = require('./lib')

const isProd = process.env.NODE_ENV === 'production'

const log = (...args) => console.log(...args)

const level = process.env.NODE_ENV === 'production' ? 1 : 0
log.level = level
log.levels = ['all', 'warn', 'error']

log.setLevel = (lvl = level) => {
  if (is.number(lvl)) {
    if (lvl >= log.levels.length) {
      lvl = log.levels.length - 1
    }
  } else if (is.string(lvl)) {
    lvl = log.levels.indexOf(lvl)
  }

  // catch indexOf === -1 for strings
  if (lvl < 0) {
    lvl = 0
  }

  log.level = lvl

  return lvl
}

log.info = (...a) => log.level === 0 && console.log(...a)

log.success = (a, ...b) => log.info(paint('green', a), ...b)

log.error = (a, ...b) => console.error(paint('red', a), ...b)

log.warn = (a, ...b) => console.warn(paint('yellow', a), ...b)

log.annotate = (...a) => log.info(paint('grey', ...a))

log.log = log

log.color = paint
log.paint = paint

module.exports = log
