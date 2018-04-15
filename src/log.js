const { isNumber, isString } = require('@magic/types')

const color = require('./color')

const isProd = process.env.NODE_ENV === 'production'

const log = (...args) => console.log(...args)

const level = process.env.NODE_ENV === 'production' ? 1 : 0
log.level = level
log.levels = ['all', 'warnings', 'errors']

log.setLevel = (lvl = level) => {
  if (typeof lvl === 'number') {
    if (lvl >= log.levels.length) {
      lvl = log.levels.length - 1
    }
  } else if (typeof lvl === 'string') {
    lvl = lvls.indexOf(lvl)
  }

  // catch indexOf === -1 for strings
  if (lvl < 0) {
    lvl = 0
  }

  log.level = lvl

  return lvl
}

log.info = (...a) => log.level === 0 && console.log(...a)

log.success = (...a) => log.info(color('green', a))

log.error = (...a) => console.error(color('red', JSON.stringify(a)))

log.pass = ({ msg, result }) =>
  log.level === 0 && console.log(color('green', '* pass:'), msg)

log.fail = ({ msg, result, expString, exp }) =>
  log(
    color('red', '* fail:'),
    `\`${msg}\``,
    `expected: ${expString}`,
    `got: ${result} === ${exp}`,
  )

log.warn = (...a) => console.warn(color('yellow', JSON.stringify(a)))

log.annotate = msg => log.info(color('grey', msg))

log.log = (...a) => log.level === 0 && console.log(...a)

log.color = color

module.exports = log
