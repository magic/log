const log = require('../src')

const oldEnv = process.env.NODE_ENV

const setEnv = (env = 'development') => {
  process.env.NODE_ENV = env

  return () => {
    process.env.NODE_ENV = oldEnv
  }
}

const resetEnv = () => () => {
  log.setLevel()
}

const fns = {
  logLevel: [
    { fn: () => log.level, expect: 0 },
    {
      before: resetEnv,
      fn: () => log.setLevel(1),
      expect: 1,
    },
    { fn: () => log.level, expect: 1, before: setEnv },
    { fn: () => log.setLevel(5), expect: 2, before: resetEnv },
    {
      fn: () => {
        log.setLevel(1)
        log.setLevel()
        return log.level
      },
      expect: 0,
    },
  ],
}

module.exports = fns
