const is = require('@magic/types')

const paint = require('./paint')
const stringify = require('./stringify')

const handleArg = arg => {
  if (!arg) {
    return ''
  }

  if (is.array(arg)) {
    arg = colorize(...arg)
  } else {
    arg = stringify(arg)
  }

  return arg
}

const colorize = (...args) => {
  if (is.empty(args)) {
    return ''
  } else if (args.length === 1) {
    const arg = args[0]
    if (is.array(arg)) {
      return colorize(...arg)
    }

    return paint.red(arg)
  }

  if (!args.some(arg => is.fn(paint[arg]))) {
    args = ['red', ...args]
  }

  return args.map((arg, i) => {
    if (is.function(paint[arg])) {
      return ''
    }

    arg = handleArg(arg)

    const color = i < 1 ? null : args[i - 1]
    const colorFn = paint[color]
    if (is.function(colorFn)) {
      return colorFn(arg)
    } else {
      return arg
    }
  })
  .filter(t => t !== '')
  .join(' ')
  .trim()
}

module.exports = colorize
