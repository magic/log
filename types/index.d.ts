export default log
export type LogFunction = (...msg: unknown[]) => void
export type LogMethods = {
  levels: string[]
  level: number
  resetLevel: (env?: string) => number
  getLevel: () => number
  setLevel: (lvl: string | number | null | undefined, env?: string) => number
  info: (...msg: unknown[]) => boolean
  success: (title: string, ...msg: unknown[]) => boolean
  error: (error: Error | string, ...msg: unknown[]) => boolean
  warn: (title: string, ...msg: unknown[]) => boolean
  annotate: (...msg: (string | number)[]) => boolean
  color: typeof paint
  paint: typeof paint
  time: (label: string, doLog?: boolean) => boolean
  timeEnd: (label: string, doLog?: boolean) => boolean
  hrtime: (hrtime?: [number, number] | undefined) => [number, number]
  timeTaken: (
    startTime: [number, number],
    oldPre?: string | object,
    oldPost?: string,
    doLog?: boolean,
  ) => string
}
export type Log = LogFunction & LogMethods
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
declare const log: Log
import { paint } from './lib/index.js'
