# magic-server-log

simple server side logging.

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]


Installation:
```javascript
  npm install @magic/log
```

Usage:
```javascript
const log = require('@magic/log')

// set logLevel to all
log.setLevel('all')
log.setLevel(0)

// logLevel warn
log.setLevel('warn')
log.setLevel(1)

// only log errors:
log.setLevel('error')
log.setLevel(2)

// if production, set logLevel to "warn", if development, "all"
log.resetLevel()

// get current logLevel
log.getLevel()

// log functions:
// only outputs if logLevel === 'all'
log.info('Some interesting yet useless information')

// only outputs if logLevel === 'all'.
// output of first argument is green.
log.success('yay', 'only the first', 'argument was green')

// always outputs. first argument will be red
log.error('ERROR:', 'error messsage')

// outputs if logLevel === 'warn' || 'all'
log.warn('WARN:', 'warn message')

// make a message greyed out
log.annotate('Annotate this message')

```

[npm-image]: https://img.shields.io/npm/v/@magic/log.svg
[npm-url]: https://www.npmjs.com/package/@magic/log
[travis-image]: https://travis-ci.com/magic/log.svg?branch=master
[travis-url]: https://travis-ci.org/magic/log
[appveyor-image]: https://ci.appveyor.com/api/projects/status/yk1hmw7ilwb74h5y/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jaeh/log/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/log/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/log
