import { is } from '@magic/test'
import log from '../src/index.js'

const isProd = () => process.env.NODE_ENV === 'production'
const defaultLevel = () => (isProd() ? 1 : 0)

const resetEnvAndLog = (env, arg) => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  const lvl = log.setLevel(arg)
  process.env.NODE_ENV = oldEnv
  return lvl
}

const envLvl = process.env.NODE_ENV === 'production' ? 1 : 0

export default [
  { fn: () => log.setLevel(2), expect: 2, info: 'Set level by number: 2 maps to "error"' },
  { fn: () => log.setLevel(1), expect: 1, info: 'Set level by number: 1 maps to "warn"' },
  { fn: () => log.setLevel(0), expect: 0, info: 'Set level by number: 0 maps to "all"' },
  {
    fn: () => log.setLevel(-1),
    expect: envLvl,
    info: 'Negative level defaults to environment default',
  },
  {
    fn: () => log.setLevel('all') && log.level,
    expect: 0,
    info: 'Set level by string "all" works',
  },
  {
    fn: () => log.setLevel('warn') && log.level,
    expect: 1,
    info: 'Set level by string "warn" works',
  },
  {
    fn: () => log.setLevel('error') && log.level,
    expect: 2,
    info: 'Set level by string "error" works',
  },
  { fn: resetEnvAndLog('development'), expect: 0, info: 'Reset level in development environment' },
  { fn: resetEnvAndLog('production'), expect: 1, info: 'Reset level in production environment' },
  {
    fn: resetEnvAndLog('production', 5),
    expect: 2,
    info: 'Level above max clamps to highest level ("error")',
  },
  {
    fn: resetEnvAndLog('development', 5),
    expect: 2,
    info: 'Level above max clamps to highest level in development',
  },
  {
    fn: () => {
      log.setLevel(3)
      const lvl1 = log.level
      log.setLevel()
      const lvl2 = log.level
      return [lvl1, lvl2]
    },
    expect: is.deep.eq([2, defaultLevel()]),
    info: 'Set level above max, then reset to default for current environment',
  },
  { fn: () => log.setLevel(5) && log.level, expect: 2, info: 'log.level has a maximum of 2' },
  {
    fn: () => log.setLevel() && log.level,
    expect: defaultLevel(),
    info: 'Reset level without argument returns default',
  },
]
