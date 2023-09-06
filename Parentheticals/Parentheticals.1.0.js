function getClosingParen(sentence, openingParenIndex) {
  // Find the position of the matching closing parenthesis
  let index = 0,
    cnt = 0,
    closingParenDepth = -1,
    foundOpeningParenToggle = false
  for (letter of sentence) {
    if (letter === "(") cnt++
    if (letter === ")") cnt--
    if (index >= openingParenIndex) {
      if (foundOpeningParenToggle && cnt === closingParenDepth) return index
      if (index === openingParenIndex) {
        closingParenDepth = cnt - 1
        foundOpeningParenToggle = true
      }
    }
    index++
  }
  throw new Error("Catch THIS.")
}

// Tests

let desc = "all openers then closers"
let actual = getClosingParen("((((()))))", 2)
let expected = 7
assertEqual(actual, expected, desc)

desc = "mixed openers and closers"
actual = getClosingParen("()()((()()))", 5)
expected = 10
assertEqual(actual, expected, desc)

desc = "no matching closer"
const noCloser = () => getClosingParen("()(()", 2)
assertThrowsError(noCloser, desc)

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}

function assertThrowsError(func, desc) {
  try {
    func()
    console.log(`${desc} ... FAIL`)
  } catch (e) {
    console.log(`${desc} ... PASS`)
  }
}
