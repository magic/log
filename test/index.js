const run = require('@magic/test')

const api = require('./api')
const colorize = require('./colorize')
const log = require('./log')

const tests = {
  api,
  colorize,
  log,
}

console.log('tests')

run(tests)
