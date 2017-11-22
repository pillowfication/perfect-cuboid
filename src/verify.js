const { SIDES, TRIPLES, fromId } = require('./enumerate')
const { UNKNOWN } = require('./Statement')
const proofTable = require('./proof-table')

function deepClone (object) {
  return JSON.parse(JSON.stringify(object))
}

function rulePasses (triple, rule, knowledge) {
  for (const { side, truth, divisibility } of rule.if) {
    if (knowledge[triple[side]][divisibility] !== truth) {
      return false
    }
  }
  return true
}

function firstRulePassed (permutation, knowledge) {
  for (const triple of TRIPLES) {
    for (const rule of proofTable[permutation[triple]]) {
      if (rulePasses(triple, rule, knowledge)) {
        // Check if new information is available
        const { side, truth, divisibility } = rule.then
        if (knowledge[triple[side]][divisibility] !== truth) {
          return {
            if: rule.if.map(condition => ({
              triple,
              side: condition.side,
              truth: condition.truth,
              divisibility: condition.divisibility
            })),
            then: {
              triple,
              side,
              truth,
              divisibility
            }
          }
        }
      }
    }
  }
  return null
}

function verify (id, _recordSteps = true) {
  const permutation = fromId(id)

  // Initialize knowledge
  const knowledge = {}
  for (const side of SIDES) {
    knowledge[side] = {
      d2: UNKNOWN,
      d3: UNKNOWN,
      d4: UNKNOWN,
      d5: UNKNOWN
    }
  }
  const steps = _recordSteps && [{ rule: null, knowledge: deepClone(knowledge) }]

  while (true) {
    const nextRule = firstRulePassed(permutation, knowledge)
    if (nextRule) {
      const { triple, side, truth, divisibility } = nextRule.then
      const sideKnowledge = knowledge[triple[side]]

      // New information found
      if (sideKnowledge[divisibility] === UNKNOWN) {
        sideKnowledge[divisibility] = truth

        _recordSteps && steps.push({ rule: nextRule, knowledge: deepClone(knowledge) })

      // Contradiction found
      } else {
        return _recordSteps
          ? { contradiction: nextRule, steps }
          : true
      }

    // No new information could be found
    } else {
      return _recordSteps
        ? { contradiction: null, steps }
        : false
    }
  }
}

module.exports = verify
