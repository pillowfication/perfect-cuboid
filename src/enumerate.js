const SIDES = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g'
]
const TRIPLETS = [
  'abd',
  'ace',
  'bcf',
  'afg',
  'beg',
  'cdg'
]
const TYPES = [
  'xN',
  'x2',
  'x3',
  'x4',
  'x5',
  'x2 x3',
  'x2 x5',
  'x3 x4',
  'x3 x5',
  'x4 x5',
  'x2 x3 x5',
  'x3 x4 x5'
]
const SYMMETRIES = [
  [ 0, 1, 2, 3, 4, 5 ],
  [ 2, 0, 1, 4, 5, 3 ],
  [ 1, 2, 0, 5, 3, 4 ],
  [ 1, 0, 2, 3, 5, 4 ],
  [ 2, 1, 0, 5, 4, 3 ],
  [ 0, 2, 1, 4, 3, 5 ]
]

function toId (permutation) {
  let id = 0
  for (let triplet = 0, exp = 1; triplet < 6; ++triplet, exp *= TYPES.length) {
    id += TYPES.indexOf(permutation[TRIPLETS[triplet]]) * exp
  }
  return id
}

function fromId (id) {
  const permutation = {}
  for (let triplet = 0; triplet < 6; ++triplet, id = id / TYPES.length | 0) {
    permutation[TRIPLETS[triplet]] = TYPES[id % TYPES.length]
  }
  return permutation
}

function getEquivalents (id) {
  const permutationArray = []
  for (let triplet = 0; triplet < 6; ++triplet, id = id / TYPES.length | 0) {
    permutationArray[triplet] = id % TYPES.length
  }

  return SYMMETRIES.map(symmetry => {
    let id = 0
    for (let triplet = 0, exp = 1; triplet < 6; ++triplet, exp *= TYPES.length) {
      id += permutationArray[symmetry[triplet]] * exp
    }
    return id
  }).sort((a, b) => a > b)
}

module.exports = {
  SIDES,
  TRIPLETS,
  TYPES,
  SYMMETRIES,
  toId,
  fromId,
  getEquivalents
}
