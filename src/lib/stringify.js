const is = require('@magic/types')

const stringifyByType = a => {
  if (is.array(a) && is.len.eq(a, 1)) {
    return stringifyByType(a[0])
  }

  if (is.string(a) || is.number(a)) {
    return a
  } else if (is.array(a)) {
    return stringify(...a)
  } else if (is.object(a)) {
    if (is.function(a) || is.date(a) || is.regexp(a)) {
      return a.toString()
    }

    return JSON.stringify(a)
  }

  return '' + a
}

const byEmptyString = t => t !== ''

const stringify = (...str) =>
  str
    .map(stringifyByType)
    .filter(byEmptyString)
    .join(' ')

module.exports = stringify
