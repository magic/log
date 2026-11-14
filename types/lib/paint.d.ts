export namespace codes {
  let reset: readonly [0, 0]
  let bold: readonly [1, 22]
  let italic: readonly [3, 23]
  let underline: readonly [4, 24]
  let strikethrough: readonly [9, 29]
  let black: readonly [30, 39]
  let red: readonly [31, 39]
  let green: readonly [32, 39]
  let yellow: readonly [33, 39]
  let blue: readonly [34, 39]
  let purple: readonly [35, 39]
  let cyan: readonly [36, 39]
  let white: readonly [37, 39]
  let grey: readonly [94, 39]
}
/**
 * @type {PaintFn}
 */
export const paint: PaintFn
export default paint
export type CodeKey = keyof typeof codes
export type StyleFn = (str?: string | number) => string
export type PaintFn = ((key: string, ...str: (string | number)[]) => string) & {
  codes: typeof codes
} & Record<CodeKey, (str?: string | number) => string>
