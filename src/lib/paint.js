import is from '@magic/types'

/**
 * ANSI codes for styling.
 * @readonly
 */
export const codes = /** @type {const} */ ({
  reset: [0, 0],

  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  purple: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  grey: [94, 39],
})

/**
 * @typedef {keyof typeof codes} CodeKey
 */

/**
 * @typedef {(str?: string | number) => string} StyleFn
 */

/**
 * @typedef {((key: string | number, ...str: (string | number | (string | number)[])[]) => string) & { codes: typeof codes } & Record<CodeKey, (str?: string | number) => string>} PaintFn
 */

/**
 * Paint a string with ANSI escape codes.
 */
const paintFn = (key = 'red', str) => {
  if (!is.string(key) || !(key in codes)) {
    key = 'red'
  }

  if (is.empty(str)) {
    return ''
  }

  const val = codes[key]

  const style = {
    open: `\u001b[${val[0]}m`,
    close: `\u001b[${val[1]}m`,
  }

  if (is.array(str)) {
    str = str.join(' ')
  }

  return style.open + str + style.close
}

/**
 * @type {PaintFn}
 */
export const paint = /** @type {PaintFn} */ (paintFn)

// Attach each style method dynamically with type safety
Object.keys(codes).forEach(code => {
  paint[code] = (/** @type {string} */ str) => paint(code, str)
})

paint.codes = codes

export default paint
