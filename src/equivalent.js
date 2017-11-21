const { TYPES } = require('./enumerate')

const SYMMETRIES = [
  [ 0, 1, 2, 3, 4, 5 ],
  [ 2, 0, 1, 4, 5, 3 ],
  [ 1, 2, 0, 5, 3, 4 ],
  [ 1, 0, 2, 3, 5, 4 ],
  [ 2, 1, 0, 5, 4, 3 ],
  [ 0, 2, 1, 4, 3, 5 ]
]

function getEquivalents (id) {
  const permutationArray = []
  for (let triple = 0; triple < 6; ++triple, id = id / TYPES.length | 0) {
    permutationArray[triple] = id % TYPES.length
  }

  const equivalents = SYMMETRIES.map(symmetry => {
    let id = 0
    for (let triple = 0, exp = 1; triple < 6; ++triple, exp *= TYPES.length) {
      id += permutationArray[symmetry[triple]] * exp
    }
    return id
  })

  return equivalents
    .sort((a, b) => a > b ? 1 : -1)
    .reduce((unique, curr) => {
      if (unique.indexOf(curr) === -1) {
        unique.push(curr)
      }
      return unique
    }, [])
}

module.exports = {
  SYMMETRIES,
  getEquivalents
}
