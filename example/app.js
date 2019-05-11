module.exports = {
  state: {
    title: '@magic/log',
    description: 'nodejs console.log + loglevels',
    logotext: '@magic/log',
    menu: [
      { to: '/#getting-started', text: 'getting started' },
      { to: '/#install', text: 'install' },
      { to: '/#usage', text: 'usage' },
      {
        to: '/#log-levels',
        text: 'log levels',
        items: [
          { to: '-all', text: 'all' },
          { to: '-warnings', text: 'warnings' },
          { to: '-errors', text: 'errors' },
          { to: '-resetlevel', text: 'resetLevel' },
          { to: '-getlevel', text: 'getLevel' },
        ],
      },
      {
        to: '/#log-functions',
        text: 'log functions',
        items: [
          { to: '-info', text: 'log.info' },
          { to: '-success', text: 'log.success' },
          { to: '-error', text: 'log.error' },
          { to: '-warn', text: 'log.warn' },
          { to: '-annotate', text: 'log.annotate' },
        ],
      },
      { to: '/#source', text: 'source' },
    ],
  },
}
