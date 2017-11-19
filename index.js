const { TYPES, getEquivalents } = require('./src/enumerate')
const verify = require('./src/verify')

const checked = {}
const passed = []

const start = Date.now()
for (let id = 0, end = Math.pow(TYPES.length, 6); id < end; ++id) {
  if (checked[id] !== undefined) {
    continue
  }

  const hasContradiction = verify(id, false)
  if (!hasContradiction) {
    console.log(id)
    passed.push(id)
  }

  for (const equivalent of getEquivalents(id)) {
    checked[equivalent] = hasContradiction
  }
}
console.log(`Done in ${((Date.now() - start) / 1000).toFixed(2)}s`)
