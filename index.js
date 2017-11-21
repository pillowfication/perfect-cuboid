const { TYPES } = require('./src/enumerate')
const { getEquivalents } = require('./src/equivalent')
const { isNotPrimitive } = require('./src/primitive')
const verify = require('./src/verify')

const checked = {}
const passed = []

const start = Date.now()
for (let id = 0, end = Math.pow(TYPES.length, 6); id < end; ++id) {
  if (checked[id]) {
    continue
  }

  const hasContradiction = verify(id, false)
  if (!hasContradiction && !isNotPrimitive(id)) {
    console.log(id)
    passed.push(id)
  }

  for (const equivalent of getEquivalents(id)) {
    checked[equivalent] = true
  }
}
console.log(`Done. Found ${passed.length} in ${((Date.now() - start) / 1000).toFixed(2)}s`)
