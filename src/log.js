const is = require('@magic/types')

const color = require('./color')

const isProd = process.env.NODE_ENV === 'production'

const log = (...args) => console.log(...args)

const level = process.env.NODE_ENV === 'production' ? 1 : 0
log.level = level
log.levels = ['all', 'warnings', 'errors']

log.setLevel = (lvl = level) => {
  if (is.number(lvl)) {
    if (lvl >= log.levels.length) {
      lvl = log.levels.length - 1
    }
  } else if (is.string(lvl)) {
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

log.warn = (...a) => console.warn(color('yellow', JSON.stringify(a)))

log.annotate = msg => log.info(color('grey', msg))

log.log = (...a) => log.level === 0 && console.log(...a)

log.pass = ({ msg, expString }) =>
  log.info(color('green', '* pass:'), msg, 'expected', expString)

log.fail = ({ msg, result, expString, exp }) =>
  log(
    color('red', '* fail:'),
    `\`${msg}\``,
    `expected: ${expString}`,
    `got: ${result} === ${exp}`,
  )

log.color = color

module.exports = log
