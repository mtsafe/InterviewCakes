function getPermutations(string) {
  // Trivial cases
  if (string === "") return new Set([""])
  if (typeof string !== "string") return new Set([])

  // Generate all permutations of the input string
  let newString = string.repeat(1)
  let arr = []
  for (let i = 0; i < newString.length; i++) {
    for (let result of getPermutations(
      string.substring(0, i) + string.substring(i + 1)
    )) {
      arr.push(`${string[i]}${result}`)
    }
  }
  return new Set(arr)
}

// Tests

let desc = "empty string"
let input = ""
let actual = getPermutations(input)
let expected = new Set([""])
assert(isSetsEqual(actual, expected), desc)

desc = "one character string"
input = "a"
actual = getPermutations(input)
expected = new Set(["a"])
assert(isSetsEqual(actual, expected), desc)

desc = "two character string"
input = "ab"
actual = getPermutations(input)
expected = new Set(["ab", "ba"])
assert(isSetsEqual(actual, expected), desc)

desc = "three character string"
input = "abc"
actual = getPermutations(input)
expected = new Set(["abc", "acb", "bac", "bca", "cab", "cba"])
assert(isSetsEqual(actual, expected), desc)

function isSetsEqual(as, bs) {
  if (as.size !== bs.size) {
    return false
  }
  for (let a of as) {
    if (!bs.has(a)) return false
  }
  return true
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL`)
  }
}
