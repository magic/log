const is = require('@magic/types')

const paint = require('./color')

const mapArg = arg => {
  if (is.string(arg) || is.number(arg)) {
    return arg
  }

  if (is.array(arg)) {
    arg = deepJoin(arg)
  } else if (is.function(arg) || is.date(arg) || is.error(arg)) {
    arg = arg.toString()
  } else if (is.object(arg)) {
    arg = JSON.stringify(arg)
  }

  return arg
}

const deepJoin = args => args.map(mapArg).join(' ')

const colorize = (cl, ...args) => {
  if (!cl && is.empty(args)) {
    return new Error('colorize called without arguments')
  }
  const clFn = paint[cl]

  if (!is.function(clFn)) {
    const str = []
      .concat(cl, args)
      .filter(t => t !== '')
      .join(' ')
    return paint.red(str)
  }

  if (is.empty(args)) {
    return ''
  }

  const deepJoined = deepJoin(args)

  const ret = clFn(deepJoined)
  return ret
}

module.exports = colorize
