export function colorize(...args: (string | number | (string | number)[])[]): string
export default colorize
export type CodeKey = keyof typeof paint.codes
import paint from './paint.js'
