import { is } from '@magic/test'

import log from '../src/index.mjs'

const resetEnv =
  (env, fn, set = false) =>
  () => {
    const oldEnv = process.env.NODE_ENV
    process.env.NODE_ENV = env
    if (set) {
      log.setLevel()
    }

    const lvl = log[fn]()
    process.env.NODE_ENV = oldEnv
    return lvl
  }

const isProd = () => process.env.NODE_ENV === 'production'

const deleteAndReset = fn => {
  const oldLevel = log.level
  log.level = undefined
  const ret = log[fn]()
  log.level = oldLevel
  return ret
}

export default [
  { fn: () => log.getLevel, expect: is.function },
  { fn: () => log.getLevel(), expect: isProd() ? 1 : 0 },
  { fn: () => log.resetLevel(), expect: isProd() ? 1 : 0 },
  { fn: deleteAndReset('resetLevel'), expect: isProd() ? 1 : 0 },
  { fn: deleteAndReset('getLevel'), expect: isProd() ? 1 : 0 },
  { fn: resetEnv('production', 'getLevel', true), expect: 1 },
  { fn: resetEnv('development', 'getLevel', true), expect: 0 },
]
