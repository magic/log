# @magic/log

simple server side logging.

basically console.log + loglevels + process.env awareness

[html-docs](https://magic.github.io/log)

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/@magic/log.svg
[npm-url]: https://www.npmjs.com/package/@magic/log
[travis-image]: https://api.travis-ci.org/magic/log.svg?branch=master
[travis-url]: https://travis-ci.org/magic/log
[appveyor-image]: https://img.shields.io/appveyor/ci/magic/log/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magic/log/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/log/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/log
[greenkeeper-image]: https://badges.greenkeeper.io/magic/log.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic/log.svg
[snyk-image]: https://snyk.io/test/github/magic/log/badge.svg
[snyk-url]: https://snyk.io/test/github/magic/log

#### installation:
```javascript
  npm install @magic/log
```

#### usage:

##### import
```javascript
import log from '@magic/log'
```

##### log levels
```javascript
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
```


##### log functions

```javascript
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

##### changelog

##### v0.0.3
log.error now converts errors for better logging

#### v0.1.0
use ecmascript modules