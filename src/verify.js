const { SIDES, TRIPLETS, fromId } = require('./enumerate')
const proofTable = require('./proof-table')

const UNKNOWN = 0

function deepClone (object) {
  return JSON.parse(JSON.stringify(object))
}

function rulePasses (rule, triplet, state) {
  for (const { side, truth, d } of rule._if) {
    if (state[triplet[side]][d] !== truth) {
      return false
    }
  }
  return true
}

function firstRulePassed (permutation, state) {
  for (const triplet of TRIPLETS) {
    for (const rule of proofTable[permutation[triplet]]) {
      if (rulePasses(rule, triplet, state)) {
        // Check if new information is available
        const { side, truth, d } = rule._then
        if (state[triplet[side]][d] !== truth) {
          return { triplet, rule }
        }
      }
    }
  }
  return null
}

function verify (id, _recordState = true) {
  const permutation = fromId(id)

  // Initialize state
  const state = {}
  for (const side of SIDES) {
    state[side] = {
      d2: UNKNOWN,
      d3: UNKNOWN,
      d4: UNKNOWN,
      d5: UNKNOWN
    }
  }
  const stateArray = _recordState && [{ state }]

  while (true) {
    const nextPassed = firstRulePassed(permutation, state)
    if (nextPassed) {
      const { triplet, rule } = nextPassed
      const { side, truth, d } = rule._then
      const sideState = state[triplet[side]]

      // New information found
      if (sideState[d] === UNKNOWN) {
        sideState[d] = truth

        _recordState && stateArray.push({
          state: deepClone(state),
          rule: nextPassed
        })

      // Contradiction found
      } else {
        return _recordState
          ? { contradiction: nextPassed, stateArray }
          : true
      }

    // No new information could be found
    } else {
      return _recordState
        ? { contradiction: null, stateArray }
        : false
    }
  }
}

module.exports = verify
