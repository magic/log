import { is } from '@magic/test'

import log from '../src/index.js'

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

export default [
  { fn: resetEnvAndLog('development'), expect: 0, info: 'development env defaults to log level 0' },
  { fn: resetEnvAndLog('production'), expect: 1, info: 'production env defaults to log level 1' },
]
