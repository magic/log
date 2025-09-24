/**
 * ANSI codes for styling.
 * @readonly
 * @type {Record<string, [number, number]>}
 */
export const codes: Record<string, [number, number]>
/**
 * @typedef {keyof typeof codes} CodeKey
 */
/**
 * @template {CodeKey} K
 * @typedef {(str?: string | number) => string} StyleFn
 */
/**
 * @typedef {((key?: CodeKey, str?: string | number | (string | number)[]) => string) & { [K in CodeKey]: StyleFn<K> } & { codes: typeof codes }} PaintFn
 */
/**
 * Paint a string with ANSI escape codes.
 *
 * @type {PaintFn}
 */
export const paint: PaintFn
export default paint
export type CodeKey = keyof typeof codes
export type StyleFn<K extends CodeKey> = (str?: string | number) => string
export type PaintFn = ((key?: CodeKey, str?: string | number | (string | number)[]) => string) & {
  [K in CodeKey]: StyleFn<K>
} & {
  codes: typeof codes
}
