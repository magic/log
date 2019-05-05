module.exports = {
  state: {
    title: '@magic/log',
    description: 'nodejs console.log + loglevels',
    logotext: '@magic/log',
    menu: [
      { to: '/#getting-started', text: 'Getting started' },
      { to: '/#install', text: 'install' },
      { to: '/#usage', text: 'usage' },
      {
        to: '/#log-levels',
        text: 'log levels',
        items: [
          { to: '/#log-levels-all', text: 'all' },
          { to: '/#log-levels-warnings', text: 'warnings' },
          { to: '/#log-levels-errors', text: 'errors' },
          { to: '/#log-levels-resetlevel', text: 'resetLevel' },
          { to: '/#log-levels-getlevel', text: 'getLevel' },
        ],
      },
      {
        to: '/#log-functions',
        text: 'log functions',
        items: [
          { to: '/#log-functions-info', text: 'log.info' },
          { to: '/#log-functions-success', text: 'log.success' },
          { to: '/#log-functions-error', text: 'log.error' },
          { to: '/#log-functions-warn', text: 'log.warn' },
          { to: '/#log-functions-annotate', text: 'log.annotate' },
        ],
      },
    ],
  },
}
