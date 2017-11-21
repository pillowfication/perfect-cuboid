// The original code calculated all possible primitive equivalents.
// I didn't really care about that, so this file only calculates if a cuboid is a primitive.

// var d2 = [, 0, , 1, , 2, 4, 5, , 6, 8, 10];
// var d345 = [[, , 0, , , 1, , 3, 4, , 6, 9], [, , , 0, , , , 2, , 4, , 8], [, , , , 0, , 1, , 2, 3, 5, 7]];
//
// function cases2(c) {
//   var a = CtoA(c), b = [], r = [], i, j, l, d = [];
//   for (i = 0; i < 6; ++i)
//     switch (a[i]) {
//       case 1: case 5: case 6: case 10:
//         a[i] = d2[a[i]];
//         break;
//       case 3: case 7: case 9: case 11:
//         b.push(i);
//         break;
//       default:
//         return r;
//         break;
//     }
//   for (i = 0, l = 1<<b.length; i < l; ++i) {
//     d = a.slice(0);
//     for (j = 0; j < b.length; ++j)
//       if (i>>j&1)
//         d[b[j]] = d2[d[b[j]]];
//     d = AtoC(d);
//     if (d == c)
//       continue;
//     d = equiv(d)[0], j = r.length;
//     while (--j >= 0 && r[j] > d);
//     if (typeof r[j] == "undefined" || r[j] != d)
//       r.splice(j+1, 0, d);
//   }
//   return r;
// }
//
// function cases345(c, d) {
//   var a = CtoA(c), b = d345[d], r = [], i;
//   for (i = 0; i < 6; ++i)
//     if (typeof b[a[i]] == "undefined")
//       return r;
//   for (i = 0; i < 64; ++i) {
//     d = a.slice(0);
//     for (j = 0; j < 6; ++j)
//       if (i>>j&1)
//         d[j] = b[d[j]];
//     d = AtoC(d);
//     if (d == c)
//       continue;
//     d = equiv(d)[0], j = r.length;
//     while (--j >= 0 && r[j] > d);
//     if (typeof r[j] == "undefined" || r[j] != d)
//       r.splice(j+1, 0, d);
//   }
//   return r;
// }

const { TRIPLES, fromId } = require('./enumerate')

const TYPES_MAP = {
  'xN': null,
  'x2': 2,
  'x3': 3,
  'x4': 4,
  'x5': 5,
  'x2 x3': 6,
  'x2 x5': 10,
  'x3 x4': 12,
  'x3 x5': 15,
  'x4 x5': 20,
  'x2 x3 x5': 30,
  'x3 x4 x5': 60
}

function gcd (a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function isNotPrimitive (id) {
  const permutation = fromId(id)
  let divisor = 0

  for (const triple of TRIPLES) {
    const type = permutation[triple]
    if (type === 'xN') {
      return false
    }

    divisor = gcd(divisor, TYPES_MAP[type])
    if (divisor === 1) {
      return false
    }
  }

  return true
}

module.exports = {
  isNotPrimitive
}
