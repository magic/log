const { is } = require('@magic/test')

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

const resetEnvAndLog = (env, arg) => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  const lvl = log.setLevel(arg)
  process.env.NODE_ENV = oldEnv
  return lvl
}

module.exports = [
  { fn: () => log.level, expect: defaultLevel() },
  { fn: () => log.setLevel(2), expect: 2 },
  { fn: () => log.setLevel('all') && log.level, expect: 0 },
  { fn: () => log.setLevel('warn') && log.level, expect: 1 },
  { fn: () => log.setLevel('error') && log.level, expect: 2 },
  { fn: resetEnvAndLog('development'), expect: 0 },
  { fn: resetEnvAndLog('production'), expect: 1 },
  { fn: resetEnvAndLog('production', 5), expect: 2 },
  { fn: resetEnvAndLog('development', 5), expect: 2 },
  { fn: () => log.setLevel(-1), expect: 0 },
  {
    fn: () => {
      log.setLevel(3)
      const lvl1 = log.level
      log.setLevel()
      const lvl2 = log.level
      return [lvl1, lvl2]
    },
    expect: is.deep.eq([2, defaultLevel()]),
  },
  { fn: () => log.setLevel(5) && log.level, expect: 2 },
  { fn: () => log.setLevel(1) && log.level, expect: 1 },
  { fn: () => log.setLevel(2) && log.level, expect: 2 },
  { fn: () => log.setLevel() && log.level, expect: defaultLevel() },
]
