const is = require('@magic/types')

const { paint } = require('./lib')

const log = (...args) => console.log(...args)
log.levels = ['all', 'warn', 'error']
log.level = log.resetLevel

log.resetLevel = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
    log.level = 1
  } else {
    log.level = 0
  }
  return log.level
}

log.getLevel = () => (is.number(log.level) ? log.level : log.resetLevel())

log.setLevel = (lvl, env = process.env.NODE_ENV) => {
  if (is.undefinedOrNull(lvl)) {
    return log.resetLevel()
  }
  if (is.string(lvl)) {
    const idx = log.levels.indexOf(lvl)
    if (idx > -1) {
      lvl = idx
    }
  }

  if (!is.number(lvl) || lvl < 0) {
    if (env === 'production') {
      lvl = 1
    } else {
      lvl = 0
    }
  }

  if (lvl > log.levels.length - 1) {
    lvl = log.levels.length - 1
  }

  return log.level = lvl
}

log.info = (...msg) => {
  if (log.getLevel() > 0) {
    return false
  }

  console.log(...msg)

  return true
}

log.success = (a, ...b) => log.info(paint('green', a), ...b)

log.error = (...args) => {
  const [a, ...b] = args
  if (is.error(a)) {
    console.error(paint('red', a.message), ...b)
    return true
  }
  const msg = [paint('red', a), ...b]
  console.error(...msg)
  return true
}

log.warn = (...args) => {
  if (log.getLevel() > 1) {
    return false
  }

  const [a, ...b] = args
  const msg = [paint('yellow', a), ...b]
  console.warn(...msg)

  return true
}

log.annotate = (...a) => log.info(paint('grey', ...a))

log.log = log

log.color = paint
log.paint = paint

log.time = a => {
  if (log.getLevel() > 1) {
    return false
  }
  console.time(a)
  return true
}

log.timeEnd = a => {
  if (log.getLevel() > 1) {
    return false
  }

  console.timeEnd(a)
  return true
}

module.exports = log
