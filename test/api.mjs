import is from '@magic/types'

import log from '../src/index.mjs'

export default [
  { fn: () => log, expect: is.function },
  { fn: () => log.levels, expect: is.array },
  { fn: () => log.resetLevel, expect: is.function },
  { fn: () => log.setLevel, expect: is.function },
  { fn: () => log.warn, expect: is.function },
  { fn: () => log.success, expect: is.function },
  { fn: () => log.error, expect: is.function },
  { fn: () => log.info, expect: is.function },
  { fn: () => log.log, expect: is.function },
  { fn: () => log.log, expect: is.function },
]
