function findDuplicate(intArray) {
  // Find a number that appears more than once ... in O(n) time
  let testArr = new Array(intArray.length)
  for (let i of intArray) {
    if (testArr[i] === i) return i
    testArr[i] = i
  }
  return 0
}

// Tests

let desc = "just the repeated number"
let actual = findDuplicate([1, 1])
let expected = 1
assertEqual(actual, expected, desc)

desc = "short array"
actual = findDuplicate([1, 2, 3, 2])
expected = 2
assertEqual(actual, expected, desc)

desc = "medium array"
actual = findDuplicate([1, 2, 5, 5, 5, 5])
expected = 5
assertEqual(actual, expected, desc)

desc = "long array"
actual = findDuplicate([4, 1, 4, 8, 3, 2, 7, 6, 5])
expected = 4
assertEqual(actual, expected, desc)

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
