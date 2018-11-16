const is = require('@magic/types')

const log = require('../src')

const logKeys = Object.values(log)

const isProd = () => process.env.NODE_ENV === 'production'

module.exports = [
  { fn: () => log, expect: is.function },
  { fn: () => log.resetLevel() && log.getLevel(), expect: isProd() ? 1 : 0 },
  { fn: () => log.levels, expect: is.array },
  { fn: () => log.setLevel, expect: is.function },
  { fn: () => log.warn, expect: is.function },
  { fn: () => log.success, expect: is.function },
  { fn: () => log.error, expect: is.function },
  { fn: () => log.info, expect: is.function },
  { fn: () => log.log, expect: is.function },
  { fn: () => log.log, expect: is.function },
]
