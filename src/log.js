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

log.success = (...a) => log.info(color('green', ...a))

const stringify = (str) => str.map(a => {
  if (is.array(a)) {
    return a.join(' ')
  } else if (is.object(a)) {
    return JSON.stringify(a)
  } else if (is.function(a.toString)) {
    return a.toString()
  }

  return a
})

log.error = (...a) => console.error(color('red', stringify(a)))

log.warn = (...a) => console.warn(color('yellow', stringify(a)))

log.annotate = (...msg) => log.info(color('grey', ...msg))

log.log = (...a) => log.level === 0 && console.log(...a)

log.color = color

module.exports = log
