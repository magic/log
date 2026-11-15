# @magic/log

enhanced console.log with environment-aware log levels.

[html-docs](https://magic.github.io/log)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@magic/log.svg
[npm-url]: https://www.npmjs.com/package/@magic/log

---

## installation

```bash
npm install @magic/log
```

## import

```javascript
import log from '@magic/log'
```

---

## usage

### log levels

Three log levels are available: `all` (0), `warn` (1), `error` (2).

```javascript
// set logLevel to all (default in development)
log.setLevel('all')
log.setLevel(0)

// logLevel warn: output warnings and errors only
log.setLevel('warn')
log.setLevel(1)

// logLevel error: output only errors
log.setLevel('error')
log.setLevel(2)

// if production, set logLevel to "warn", if development, "all"
log.resetLevel()

// get current logLevel
log.getLevel()
```

### log functions

```javascript
// only outputs if logLevel === 'all'
log.info('Some interesting yet useless information')

// only outputs if logLevel === 'all'.
// output of first argument is green.
log.success('yay', 'only the first', 'argument was green')

// always outputs. first argument will be red
log.error('ERROR:', 'error message')

// outputs if logLevel === 'warn' || 'all'
log.warn('WARN:', 'warn message')

// make a message greyed out (only outputs if logLevel === 'all')
log.annotate('Annotate this message')

// timing utilities
// return process.hrtime to use in log.timeTaken
const start = log.hrtime()

// get delta between one hrtime and another
const delta = log.hrtime(start)

// print the s, ms, µs or ns since start
log.timeTaken(start, 'before', 'after')
// logs 'before xns after'

// timeTaken with config object (preferred)
log.timeTaken(start, { pre: 'before ', post: ' after', log: true })

// console.time / timeEnd wrappers (respects log level)
log.time('my-timer')
// ... do work
log.timeEnd('my-timer')
```

### color / paint utilities

The library exports `paint` and `colorize` for ANSI styling:

```javascript
import { paint, colorize } from '@magic/log/lib'

// paint: simple ANSI wrapper
paint('red', 'error message')
paint.red('error message')
paint.bold.green('success')

// colorize: chain colors with automatic detection
colorize('green', 'success', 'red', 'error')
colorize(['bold', 'green', 'success message'])
```

Available styles (via `paint.codes`):

- reset, bold, italic, underline, strikethrough
- black, red, green, yellow, blue, purple, cyan, white, grey

---

## api reference

### log object

| property                                | type                                                                                        | description                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `levels`                                | `string[]`                                                                                  | `['all', 'warn', 'error']`                |
| `level`                                 | `number`                                                                                    | current level (0=all, 1=warn, 2=error)    |
| `log`                                   | `LogFunction`                                                                               | default console.log passthrough           |
| `resetLevel(env?)`                      | `(env?: string) => number`                                                                  | reset based on NODE_ENV                   |
| `getLevel()`                            | `() => number`                                                                              | get current level                         |
| `setLevel(lvl?, env?)`                  | `(lvl?: string\|number\|null\|undefined, env?: string) => number`                           | set level by name or index                |
| `info(...msg)`                          | `(...msg: unknown[]) => boolean`                                                            | log if level === 0                        |
| `success(title, ...msg)`                | `(title: string, ...msg: unknown[]) => boolean`                                             | green title, logs if level === 0          |
| `error(err, ...msg)`                    | `(err: Error\|string, ...msg: unknown[]) => boolean`                                        | always logs, red, prints stack for Errors |
| `warn(title, ...msg)`                   | `(title: string, ...msg: unknown[]) => boolean`                                             | yellow title, logs if level <= 1          |
| `annotate(...msg)`                      | `(...msg: (string\|number)[]) => boolean`                                                   | greyed out, logs if level === 0           |
| `color`                                 | `PaintFn`                                                                                   | alias for `paint`                         |
| `paint`                                 | `PaintFn`                                                                                   | ANSI paint function                       |
| `time(label, doLog?)`                   | `(label: string, doLog?: boolean) => boolean`                                               | console.time wrapper                      |
| `timeEnd(label, doLog?)`                | `(label: string, doLog?: boolean) => boolean`                                               | console.timeEnd wrapper                   |
| `hrtime(start?)`                        | `(start?: [number, number]) => [number, number]`                                            | process.hrtime wrapper                    |
| `timeTaken(start, pre?, post?, doLog?)` | `(start: [number, number], pre?: string\|object, post?: string, doLog?: boolean) => string` | format elapsed time                       |

### log.setLevel(lvl?, env?)

- `lvl`: string ('all'\|'warn'\|'error') or number (0\|1\|2). Optional - if omitted, calls `resetLevel()`.
- `env`: defaults to `process.env.NODE_ENV`.
- Returns the new level as a number.

### log.timeTaken(startTime, config?)

Two signatures:

```javascript
// legacy positional
log.timeTaken(startTime, pre, post, doLog)

// preferred: config object
log.timeTaken(startTime, {
  pre: '', // string prepended to time
  post: '', // string appended to time
  log: true, // whether to console.log the result
})
```

Returns formatted string like `1.2ms`, `500µs`, `2.5s`, etc.

Auto-scales: ns → µs → ms → s.

Smart spacing: if `pre` ends with `"` or `'`, no space added before time. If `post` starts with `"` or `'`, no space added after time.

---

## changelog

### 0.1.26

- update dependencies

### 0.1.25

- update dependencies

### 0.1.24

- **setLevel parameter made optional**: `log.setLevel()` without arguments now calls `resetLevel()` (mirrors 0.1.23+ behavior)
- **paint / colorize signatures widened**: accepts `...any` instead of strict string/number arrays
- **paint internal refactor**: extracted `paintFn` for clarity, type-safe dynamic method attachment
- **TypeScript 6.x**: downgraded from 7.x for compatibility; added `npm run check` script (tsc + tsc:test + lint)
- **test fixes**: corrected ANSI code order for italic/underline/strikethrough; fixed microsecond hrtime test values
- **types updated**: exported types now match runtime (optional setLevel param, widened colorize args)
- **added oxlint config**: `oxlint.config.ts` for linting

### 0.1.23

- update dependencies

### 0.1.22

- change exports to export named and default
- update dependencies

### 0.1.21

- update dependencies

### 0.1.20

- export types from package.json files array
- update dependencies

### 0.1.19

- add jsdoc types
- add tests to get 100% coverage
- update dependencies

### 0.1.18

- update dependencies

### 0.1.17

- update dependencies

### 0.1.16

- update dependencies

### 0.1.15

- update dependencies

### 0.1.14

- update dependencies
- log.timeTaken now also returns µs if needed

### 0.1.13

- remove unwanted log from log.timeTaken

### 0.1.12

- update dependencies

### 0.1.11

- log.timeTaken now takes a config object as second parameter, `log.timeTaken(time, { pre: '', post: '', log: true })`. three argument call is possible too: `log.timeTaken(time, pre, post, log)`
- update dependencies

### 0.1.10

- update @magic/types to avoid circular dependency

### 0.1.9

- update dependencies

### 0.1.8

- bump required node version to 14.15.4
- update dependencies

### 0.1.7

- change log.level initialization

### 0.1.6

- update dependencies

### 0.1.5

- bump required node version to 14.2.0

### 0.1.4

- log.timeTaken(time, pre, post): if pre ends and post starts with a string delimiter, the time value between those string delimiters does not get spaces added around it.

### 0.1.3

- require node >= 13.5.0

### 0.1.2

- add log.hrtime and log.timeTaken

### 0.1.1

- bump to get this version to be the default for install.
- 0.1.0-cjs was preferred, but is deprecated.

### 0.1.0

- use ecmascript modules

### 0.0.3

- log.error now converts errors for better logging

---

## license

AGPL-3.0

## source

<https://github.com/magic/log>
