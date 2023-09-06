function findRotationPoint(words) {
  // Find the rotation point in the vector
  let start = 0,
    mid,
    end = words.length - 1
  // while (words[start] > words[end]) {
  while (0 == 0) {
    mid = Math.floor((start + end) / 2)
    if (words[start] > words[mid]) {
      end = mid
    } else if (words[start] < words[mid]) {
      start = mid
    }
    if (start + 1 === end) break
  }

  return end
}

// Tests

let desc = "small array"
let actual = findRotationPoint(["cape", "cake"])
let expected = 1
assertEquals(actual, expected, desc)

desc = "medium array"
actual = findRotationPoint(["grape", "orange", "plum", "radish", "apple"])
expected = 4
assertEquals(actual, expected, desc)

desc = "large array"
actual = findRotationPoint([
  "ptolemaic",
  "retrograde",
  "supplant",
  "undulate",
  "xenoepist",
  "asymptote",
  "babka",
  "banoffee",
  "engender",
  "karpatka",
  "othellolagkage",
])
expected = 5
assertEquals(actual, expected, desc)

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
