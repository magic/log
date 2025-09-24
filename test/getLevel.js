import { is } from '@magic/test'

import log from '../src/index.js'

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
  { fn: () => log.getLevel, expect: is.function, info: 'getLevel is a function' },
  {
    fn: () => log.getLevel(),
    expect: isProd() ? 1 : 0,
    info: 'getLevel returns correct level based on NODE_ENV',
  },
  {
    fn: () => log.resetLevel(),
    expect: isProd() ? 1 : 0,
    info: 'resetLevel returns correct level based on NODE_ENV',
  },
  {
    fn: deleteAndReset('resetLevel'),
    expect: isProd() ? 1 : 0,
    info: 'resetLevel works when level is undefined',
  },
  {
    fn: deleteAndReset('getLevel'),
    expect: isProd() ? 1 : 0,
    info: 'getLevel works when level is undefined',
  },
  {
    fn: resetEnv('production', 'getLevel', true),
    expect: 1,
    info: 'getLevel returns 1 when NODE_ENV is production',
  },
  {
    fn: resetEnv('development', 'getLevel', true),
    expect: 0,
    info: 'getLevel returns 0 when NODE_ENV is development',
  },
]
