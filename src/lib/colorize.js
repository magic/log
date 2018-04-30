const is = require('@magic/types')

const paint = require('./paint')
const stringify = require('./stringify')

const colorize = (...args) => {
  if (is.empty(args)) {
    return ''
  } else if (args.length === 1) {
    if (is.array(args[0])) {
      return colorize(args[0])
    }

    return paint.red(args[0])
  } else if (!args.some(t => is.fn(paint[t]))) {
    return args
      .map((v, i) => (i === 0 ? paint.red(v) : v))
      .filter(t => t !== '')
      .join(' ')
      .trim()
  }

  return args
    .map((t, i) => {
      if (is.array(t)) {
        return colorize(...t)
      } else if (is.fn(paint[args[i - 1]])) {
        if (is.date(t) || is.regex(t) || is.function(t)) {
          t = t.toString()
        } else if (is.object(t)) {
          t = JSON.stringify(t)
        }

        return paint[args[i - 1]](t)
      } else {
        if (is.fn(paint[args[i]])) {
          return ''
        }

        if (is.date(t) || is.regex(t) || is.function(t)) {
          t = t.toString()
        } else if (is.object(t)) {
          t = JSON.stringify(t)
        }

        return t
      }
    })
    .filter(t => t !== '')
    .join(' ')
    .trim()
}

module.exports = colorize
