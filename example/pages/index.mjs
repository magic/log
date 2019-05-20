export const View = () => [
  h1('@magic/log'),
  p('nodejs console.log with loglevels and environment awareness.'),

  GitBadges('magic/log'),

  h2({ id: 'getting-started' }, 'getting started'),
  p('be in a nodejs project.'),

  h3({ id: 'install' }, 'install'),
  Pre('npm i --save-dev @magic/log'),

  h3({ id: 'import' }, 'import'),
  Pre("import log from '@magic/log'"),

  h2({ id: 'usage' }, 'usage:'),

  h3({ id: 'log-levels' }, 'log levels'),

  div([
    h4({ id: 'log-levels-all' }, 'all'),
    p('set logLevel to all'),
    Pre(`
log.setLevel('all')
log.setLevel(0)`),

    h4({ id: 'log-levels-warnings' }, 'warnings'),
    p('only output warnings and errors'),
    Pre(`
log.setLevel('warn')
log.setLevel(1)`),

    h4({ id: 'log-levels-errors' }, 'errors'),
    p('only log on error'),
    Pre(`
log.setLevel('error')
log.setLevel(2)`),

    h4({ id: 'log-levels-resetlevel' }, 'log.resetLevel'),
    p('if production, set logLevel to "warn", if development, "all"'),
    Pre('log.resetLevel()'),

    h4({ id: 'log-levels-getlevel' }, 'log.getLevel()'),
    p('get current logLevel'),
    Pre('log.getLevel()'),
  ]),

  h3({ id: 'log-functions' }, 'log functions'),

  div([
    h4({ id: 'log-functions-info' }, 'log.info'),
    p("only outputs if logLevel === 'all'"),
    Pre(`log.info('Some interesting yet useless information')`),

    h4({ id: 'log-functions-success' }, 'log.success'),
    p("only outputs if logLevel === 'all'."),
    p('output of first argument is green.'),
    Pre(`log.success('yay', 'only the first', 'argument was green')`),

    h4({ id: 'log-functions-error' }, 'log.error'),
    p('always outputs. first argument will be red'),
    Pre(`log.error('ERROR:', 'error messsage')`),

    h4({ id: 'log-functions-warn' }, 'warn'),
    p("outputs if logLevel === 'warn' || 'all'"),
    Pre("log.warn('WARN:', 'warn message')"),

    h4({ id: 'log-functions-annotate' }, 'annotate'),
    Pre("log.annotate('this message is subtle and greyed out')"),
  ]),

  h4({ id: 'changelog' }, 'changelog'),

  h5({ id: 'changelog-0.0.3' }, '0.0.3'),
  p('log.error now converts errors for better logging'),

  h5({ id: 'changelog-0.1.0' }, '0.1.0'),
  p('use ecmascript modules'),

  h2({ id: 'source' }, 'source'),
  p([
    'the source for this page is in the ',
    Link({ to: 'https://github.com/magic/log/tree/master/example' }, 'example directory'),
    ' and gets built and published to github using ',
    Link({ to: 'https://github.com/magic/core' }, '@magic/core'),
  ]),
]
