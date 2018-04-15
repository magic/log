const color = require('./color')

const {
  isError,
  isDate,
  isFunction,
  isString,
  isNumber,
  isArray,
} = require('@magic/types')

const mapArg = arg => {
  if (typeof arg === 'string' || typeof arg === 'number') {
    return arg
  }

  if (isArray(arg)) {
    arg = deepJoin(arg)
  } else if (isFunction(arg) || isDate(arg) || isError(arg)) {
    arg = arg.toString()
  } else if (typeof arg === 'object') {
    arg = JSON.stringify(arg)
  }

  return arg
}

const deepJoin = args => args.map(mapArg).join(' ')

const colorize = (cl = 'white', ...args) => {
  const clFn = color[cl]
  if (typeof clFn !== 'function') {
    return [].concat(cl, args).join(' ')
  }

  if (args.length === 0) {
    return ''
  }

  const deepJoined = deepJoin(args)

  const ret = clFn(deepJoined)
  return ret
}

module.exports = colorize
