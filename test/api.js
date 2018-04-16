const { isObject, isFunction } = require('@magic/types')

const log = require('../src')

const logKeys = Object.values(log)

const isProd = process.env.NODE_ENV === 'production'

const fns = [
  { fn: () => log, expect: isFunction },
  { fn: () => log.level, expect: isProd ? 1 : 0 },
  { fn: () => log.levels, expect: Array.isArray },
  { fn: () => log.setLevel, expect: isFunction },
  { fn: () => log.warn, expect: isFunction },
  { fn: () => log.success, expect: isFunction },
  { fn: () => log.error, expect: isFunction },
  { fn: () => log.info, expect: isFunction },
  { fn: () => log.log, expect: isFunction },
]

module.exports = fns
