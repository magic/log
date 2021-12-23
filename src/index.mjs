import is from '@magic/types'

import { paint } from './lib/index.mjs'

const log = (...args) => console.log(...args)
log.levels = ['all', 'warn', 'error']

log.resetLevel = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
    log.level = 1
  } else {
    log.level = 0
  }
  return log.level
}

/* initialize loglevel */
log.resetLevel()

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

  return (log.level = lvl)
}

log.info = (...msg) => {
  if (log.getLevel() > 0) {
    return false
  }

  console.log(...msg)

  return true
}

log.success = (title, ...msg) => log.info(paint('green', title), ...msg)

log.error = (error, ...msg) => {
  if (is.error(error)) {
    console.error(paint('red', error.message), `\n${error.stack}\n`, ...msg)
    return true
  }

  console.error(paint('red', error), ...msg)

  return true
}

log.warn = (title, ...msg) => {
  if (log.getLevel() > 1) {
    return false
  }

  console.warn(paint('yellow', title), ...msg)

  return true
}

log.annotate = (...msg) => log.info(paint('grey', ...msg))

log.log = log

log.color = paint
log.paint = paint

log.time = (label, doLog = true) => {
  if (log.getLevel() > 1) {
    return false
  }

  if (doLog) {
    console.time(label)
  }
  return true
}

log.timeEnd = (label, doLog = true) => {
  if (log.getLevel() > 1) {
    return false
  }

  if (doLog) {
    console.timeEnd(label)
  }

  return true
}

log.hrtime = hrtime => process.hrtime(hrtime)

log.timeTaken = (startTime, oldPre = '', oldPost = '', doLog = true) => {
  let config = {
    pre: '',
    post: oldPost,
    log: doLog,
  }

  if (is.objectNative(oldPre)) {
    config = {
      ...config,
      ...oldPre,
    }
  } else {
    config.pre = oldPre
  }

  const [s, ns] = process.hrtime(startTime)
  let span = s * 1000000 + ns / 1000
  let unit = 'ns'

  if (span > 1500000) {
    unit = 's'
    span = span / 1000000
  } else if (ns > 1500) {
    unit = 'ms'
    span = span / 1000
  }

  span = span.toFixed(1)

  let res = `${span}${unit}`

  if (config.pre) {
    const { pre = '' } = config
    console.log({ pre })
    // do not add a space if this is part of a string concat
    if (pre.endsWith('"') || pre.endsWith("'")) {
      res = pre + res
    } else {
      res = `${pre} ${res}`
    }
  }

  if (config.post) {
    const { post } = config
    // do not add a space if this is part of a string concat
    if (post.startsWith('"') || post.startsWith("'")) {
      res += post
    } else {
      res = `${res} ${post}`
    }
  }

  if (config.log) {
    log(res)
  }

  return res
}

export default log
