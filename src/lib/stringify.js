const is = require('@magic/types')

const stringifyByType = a =>  {
  if (is.null(a) || is.undefined(a)) {
    return '' + a
  } else if (is.string(a) || is.number(a)) {
    return a
  } else if (is.array(a)) {
    return stringify(a)
  } else if (is.object(a)) {
    if (is.function(a) || is.date(a)) {
      return a.toString()
    }

    return JSON.stringify(a)
  }

  return '' + a
}

const byEmptyString = t => t !== ''

const stringify = (...str) =>
  is.len.eq(str, 1)
    ? str[0]
    : str.map(stringifyByType)
      .filter(byEmptyString)
      .join(' ')

module.exports = stringify
