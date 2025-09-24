import is from '@magic/types'
import { paint } from './lib/index.js'

/**
 * @typedef {(...msg: unknown[]) => void} LogFunction
 */

/**
 * @typedef {Object} LogMethods
 * @property {string[]} levels
 * @property {number} level
 * @property {(env?: string) => number} resetLevel
 * @property {() => number} getLevel
 * @property {(lvl: string | number | null | undefined, env?: string) => number} setLevel
 * @property {(...msg: unknown[]) => boolean} info
 * @property {(title: string, ...msg: unknown[]) => boolean} success
 * @property {(error: Error | string, ...msg: unknown[]) => boolean} error
 * @property {(title: string, ...msg: unknown[]) => boolean} warn
 * @property {(...msg: (string | number)[]) => boolean} annotate
 * @property {typeof paint} color
 * @property {typeof paint} paint
 * @property {(label: string, doLog?: boolean) => boolean} time
 * @property {(label: string, doLog?: boolean) => boolean} timeEnd
 * @property {(hrtime?: [number, number] | undefined) => [number, number]} hrtime
 * @property {(startTime: [number, number], oldPre?: string | object, oldPost?: string, doLog?: boolean) => string} timeTaken
 */

/**
 * @typedef {LogFunction & LogMethods} Log
 */

/**
 * @type {Log}
 */
const log = (/** @type {unknown[]} */ ...args) => console.log(...args)
log.levels = ['all', 'warn', 'error']

/** @type {number} */
log.level = 0

/**
 * @param {string} [env=process.env.NODE_ENV]
 * @returns {number}
 */
log.resetLevel = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
    log.level = 1
  } else {
    log.level = 0
  }
  return log.level
}

log.resetLevel()

/**
 * @returns {number}
 */
log.getLevel = () => (is.number(log.level) ? log.level : log.resetLevel())

/**
 * @param {string|number|null|undefined} lvl
 * @param {string} [env=process.env.NODE_ENV]
 * @returns {number}
 */
log.setLevel = (lvl, env = process.env.NODE_ENV) => {
  if (is.undefinedOrNull(lvl)) {
    return log.resetLevel()
  }
  if (is.string(lvl)) {
    const idx = log.levels.indexOf(lvl)
    if (idx > -1) {
      lvl = idx
    }
  }

  if (!is.number(lvl) || lvl < 0) {
    lvl = env === 'production' ? 1 : 0
  }

  if (lvl > log.levels.length - 1) {
    lvl = log.levels.length - 1
  }

  return (log.level = lvl)
}

/**
 * @param {...unknown} msg
 * @returns {boolean}
 */
log.info = (...msg) => {
  if (log.getLevel() > 0) return false
  console.log(...msg)
  return true
}

/**
 * @param {string} title
 * @param {...unknown} msg
 * @returns {boolean}
 */
log.success = (title, ...msg) => log.info(paint('green', title), ...msg)

/**
 * @param {Error|string} error
 * @param {...unknown} msg
 * @returns {boolean}
 */
log.error = (error, ...msg) => {
  if (is.error(error)) {
    console.error(paint('red', error.message), `\n${error.stack}\n`, ...msg)
    return true
  }
  console.error(paint('red', error), ...msg)
  return true
}

/**
 * @param {string} title
 * @param {...unknown} msg
 * @returns {boolean}
 */
log.warn = (title, ...msg) => {
  if (log.getLevel() > 1) return false
  console.warn(paint('yellow', title), ...msg)
  return true
}

/**
 * @param {...(string | number)} msg
 * @returns {boolean}
 */
log.annotate = (...msg) => log.info(paint('grey', ...msg))

log.color = paint
log.paint = paint

/**
 * @param {string} label
 * @param {boolean} [doLog=true]
 * @returns {boolean}
 */
log.time = (label, doLog = true) => {
  if (log.getLevel() > 1) return false
  if (doLog) console.time(label)
  return true
}

/**
 * @param {string} label
 * @param {boolean} [doLog=true]
 * @returns {boolean}
 */
log.timeEnd = (label, doLog = true) => {
  if (log.getLevel() > 1) return false
  if (doLog) console.timeEnd(label)
  return true
}

/**
 * @param {[number, number] | undefined} [hrtime]
 * @returns {[number, number]}
 */
log.hrtime = hrtime => process.hrtime(hrtime)

/**
 * @param {[number, number]} startTime
 * @param {string|object} [oldPre='']
 * @param {string} [oldPost='']
 * @param {boolean} [doLog=true]
 * @returns {string}
 */
log.timeTaken = (startTime, oldPre = '', oldPost = '', doLog = true) => {
  let config = {
    pre: '',
    post: oldPost,
    log: doLog,
  }

  if (is.objectNative(oldPre)) {
    config = { ...config, ...oldPre }
  } else {
    config.pre = String(oldPre)
  }

  const [s, ns] = process.hrtime(startTime)
  let span = s * 1_000_000_000 + ns
  let unit = 'ns'

  if (span > 1_100_000_000) {
    unit = 's'
    span /= 1_000_000_000
  } else if (span > 1_100_000) {
    unit = 'ms'
    span /= 1_000_000
  } else if (span > 1_100) {
    span /= 1_000
    unit = 'µs'
  }

  span = parseFloat(span.toFixed(1))
  let res = `${span}${unit}`

  if (config.pre) {
    res =
      config.pre.endsWith('"') || config.pre.endsWith("'")
        ? config.pre + res
        : `${config.pre} ${res}`
  }

  if (config.post) {
    res =
      config.post.startsWith('"') || config.post.startsWith("'")
        ? res + config.post
        : `${res} ${config.post}`
  }

  if (config.log) {
    log(res)
  }
  return res
}

export default log
