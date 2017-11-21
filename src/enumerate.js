const SIDES = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g'
]
const TRIPLES = [
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

function toId (permutation) {
  let id = 0
  for (let triple = 0, exp = 1; triple < 6; ++triple, exp *= TYPES.length) {
    id += TYPES.indexOf(permutation[TRIPLES[triple]]) * exp
  }
  return id
}

function fromId (id) {
  const permutation = {}
  for (let triple = 0; triple < 6; ++triple, id = id / TYPES.length | 0) {
    permutation[TRIPLES[triple]] = TYPES[id % TYPES.length]
  }
  return permutation
}

module.exports = {
  SIDES,
  TRIPLES,
  TYPES,
  toId,
  fromId
}
