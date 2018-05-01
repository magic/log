const is = require('@magic/types')

const { paint } = require('./lib')

const isProd = process.env.NODE_ENV === 'production'

const log = (...args) => console.log(...args)
log.levels = ['all', 'warn', 'error']
log.level = isProd ? 1 : 0

log.setLevel = lvl => {
  if (is.string(lvl)){
    lvl = log.levels.indexOf(lvl)
  }

  if (!is.number(lvl)) {
    lvl = process.env.NODE_ENV === 'production' ? 1 : 0
  }

  log.level = Math.min(log.levels.length - 1, Math.max(0, lvl))

  return log.level
}

log.info = (...a) => {
  if (log.level > 0) {
    return false
  }

  console.log(...a)

  return true
}

log.success = (a, ...b) => log.info(paint('green', a), ...b)

log.error = (...args) => {
  const [a, ...b] = args
  const msg = [paint('red', a), ...b]
  console.error(msg)
  return true
}

log.warn = (...args) => {
  if (log.level > 1) {
    return false
  }

  const [a, ...b] = args
  const msg = [paint('yellow', a), ...b]
  console.warn(msg)
  
  return true
}

log.annotate = (...a) => log.info(paint('grey', ...a))

log.log = log

log.color = paint
log.paint = paint

log.setLevel()

module.exports = log
