export const state = {
  title: '@magic/log',
  description: 'nodejs console.log with environment aware loglevels.',
  logotext: '@magic/log',
  menu: [
    { to: '/#getting-started', text: 'getting started' },
    { to: '/#install', text: 'install' },
    { to: '/#import', text: 'import' },
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
    {
      to: '/#changelog',
      text: 'changelog',
      items: [
        { to: '-0.0.3', text: 'v0.0.3' },
        { to: '-0.1.0', text: 'v0.1.0' },
        { to: '-0.1.1', text: 'v0.1.1' },
        { to: '-0.1.2', text: 'v0.1.2' },
      ],
    },
    { to: '/#source', text: 'source' },
  ],
}
