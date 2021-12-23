import { version } from '@magic/test'

import lib from '../src/index.mjs'

const spec = {
  error: 'fn',
  log: 'fn',
  warn: 'fn',
  levels: [
    'obj',
    {
      0: 'str',
      1: 'str',
      2: 'str',
    },
  ],
  resetLevel: 'fn',
  level: 'num',
  getLevel: 'fn',
  setLevel: 'fn',
  info: 'fn',
  success: 'fn',
  annotate: 'fn',
  color: 'fn',
  paint: 'fn',
  time: 'fn',
  timeEnd: 'fn',
  hrtime: 'fn',
  timeTaken: 'fn',
}

export default version(lib, spec)
