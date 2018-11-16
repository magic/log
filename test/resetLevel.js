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
  log.resetLevel()

  return () => log.resetLevel()
}

const isProd = () => process.env.NODE_ENV === 'production'

const defaultLevel = () => (isProd() ? 1 : 0)

const resetEnvAndLog = env => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  const lvl = log.resetLevel()
  process.env.NODE_ENV = oldEnv
  return lvl
}

module.exports = [
  { fn: resetEnvAndLog('development'), expect: 0 },
  { fn: resetEnvAndLog('production'), expect: 1 },
]
