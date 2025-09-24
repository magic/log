import is from '@magic/types'
import paint from './paint.js'
import stringify from './stringify.js'

/**
 * @typedef {keyof typeof paint.codes} CodeKey
 */

/**
 * @param {...(string | number | (string | number)[])} args
 * @returns {string}
 */
export const colorize = (...args) => {
  if (is.empty(args)) {
    return ''
  } else if (args.length === 1) {
    const arg = args[0]
    if (is.array(arg)) {
      return colorize(...arg)
    }
    return paint.red(arg)
  }

  if (!args.some(arg => typeof arg === 'string' && is.fn(paint[arg]))) {
    args = ['red', ...args]
  }

  return args
    .map((arg, i) => {
      if (typeof arg === 'string' && is.fn(paint[arg])) {
        return ''
      }

      if (!arg) {
        return ''
      }

      if (is.array(arg)) {
        arg = colorize(...arg)
      } else {
        arg = stringify(arg)
      }

      let colorFn
      if (i > 0) {
        const color = args[i - 1]
        if (typeof color === 'string' && paint[color]) {
          colorFn = paint[color]
        }
      }

      if (is.function(colorFn)) {
        return colorFn(arg)
      }
      return arg
    })
    .filter(t => t !== '')
    .join(' ')
    .trim()
}

export default colorize
