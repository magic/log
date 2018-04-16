const log = require('../src')

const oldEnv = process.env.NODE_ENV

const setEnv = (env = 'development') => {
  process.env.NODE_ENV = env

  return () => {
    process.env.NODE_ENV = oldEnv
  }
}

const resetEnv = () => {
  log.setLevel()

  return () => log.setLevel()
}

const isProd = () => process.env.NODE_ENV === 'production'

const defaultLevel = () => (isProd() ? 1 : 0)

const fns = {
  logLevel: [
    { fn: () => log.level, expect: defaultLevel() },
    {
      fn: () => log.setLevel(2),
      expect: 2,
    },
    { fn: () => log.setLevel(5), expect: 2 },
    {
      fn: () => {
        log.setLevel(3)
        const lvl1 = log.level
        log.setLevel()
        const lvl2 = log.level
        return [lvl1, lvl2]
      },
      expect: ([lvl1, lvl2]) => lvl1 === 2 && lvl2 === defaultLevel(),
    },
    { fn: () => log.setLevel(5) && log.level, expect: 2 },
    { fn: () => log.setLevel(1) && log.level, expect: 1 },
    { fn: () => log.setLevel(2) && log.level, expect: 2 },
    { fn: () => log.setLevel() && log.level, expect: defaultLevel() },
  ],
}

module.exports = fns
