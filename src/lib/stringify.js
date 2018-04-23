const is = require('@magic/types')

const stringify = (...str) =>
  str.length === 1
    ? str[0]
    : str
        .map(a => {
          if (is.null(a) || is.undefined(a)) {
            return '' + a
          }
          if (is.string(a) || is.number(a)) {
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
        })
        .filter(t => t !== '')
        .join(' ')

module.exports = stringify
