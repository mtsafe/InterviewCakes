// Solved with a self balancing binary tree.

function canTwoMoviesFillFlight(movieLengths, flightLength) {
  // Determine if two movie runtimes add up to the flight length
  let leaf = {
    value: null,
    left: null,
    right: null,
    heightL: 0,
    heightR: 0,
  }
  let treeRoot = structuredClone(leaf)
  for (let movie of movieLengths) {
    if (movie < 1 || movie > flightLength - 1) continue
    if (movieHasMatch(treeRoot, movie, flightLength)) return true
    addMovieToTree(treeRoot, null, movie, flightLength)
  }
  return false

  function addMovieToTree(treeNode, treeNodeParent, movie, flightLength) {
    if (treeNode.value === null) {
      treeNode.value = movie
      return 1
    }

    if (treeNode.value > movie) {
      if (treeNode.left === null) treeNode.left = structuredClone(leaf)
      treeNode.heightL =
        1 + addMovieToTree(treeNode.left, treeNode, movie, flightLength)
    } else if (treeNode.value < movie) {
      if (treeNode.right === null) treeNode.right = structuredClone(leaf)
      treeNode.heightR =
        1 + addMovieToTree(treeNode.right, treeNode, movie, flightLength)
    } else return 1 + Math.max(treeNode.heightL, treeNode.heightR)

    if (getNodeBalanceValue(treeNode) > 1) {
      if (getNodeBalanceValue(treeNode.left) > 0) {
        rightRotation(treeNode, treeNodeParent)
      } else if (getNodeBalanceValue(treeNode.left) < 0) {
        leftRightRotation(treeNode, treeNodeParent)
      }
    } else if (getNodeBalanceValue(treeNode) < -1) {
      if (getNodeBalanceValue(treeNode.right) < 0) {
        leftRotation(treeNode, treeNodeParent)
      } else if (getNodeBalanceValue(treeNode.right) > 0) {
        rightLeftRotation(treeNode, treeNodeParent)
      }
    }
  }

  function getNodeBalanceValue(node) {
    return node.heightL - node.heightR
  }

  function leftRotation(node, grandparent) {
    const newParent = node.right

    if (grandparent !== null)
      if (grandparent.left === node) grandparent.left = newParent
      else grandparent.right = newParent

    newParent.left = node
    node.right = null

    return newParent
  }

  function rightRotation(node, grandparent) {
    const newParent = node.left

    if (grandparent !== null)
      if (grandparent.left === node) grandparent.left = newParent
      else grandparent.right = newParent

    newParent.right = node
    node.left = null

    return newParent
  }

  function leftRightRotation(node, grandparent) {
    leftRotation(node.left, node)
    return rightRotation(node, grandparent)
  }

  function rightLeftRotation(node, grandparent) {
    rightRotation(node.right, node)
    return leftRotation(node, grandparent)
  }

  function movieHasMatch(treeNode, movie, flightLength) {
    if (treeNode === null || treeNode.value === null) return false

    let movieMatch = flightLength - movie
    if (treeNode.value === movieMatch) return true
    if (treeNode.value > movieMatch) {
      return movieHasMatch(treeNode.left, movie, flightLength)
    }
    return movieHasMatch(treeNode.right, movie, flightLength)
  }
}

// Tests

let desc = "short flight"
let actual = canTwoMoviesFillFlight([2, 4], 1)
let expected = false
assertEquals(actual, expected, desc)

desc = "long flight"
actual = canTwoMoviesFillFlight([2, 4], 6)
expected = true
assertEquals(actual, expected, desc)

desc = "one movie half flight length"
actual = canTwoMoviesFillFlight([3, 8], 6)
expected = false
assertEquals(actual, expected, desc)

desc = "two movies half flight length"
actual = canTwoMoviesFillFlight([3, 8, 3], 6)
expected = true
assertEquals(actual, expected, desc)

desc = "lots of possible pairs"
actual = canTwoMoviesFillFlight([1, 2, 3, 4, 5, 6], 7)
expected = true
assertEquals(actual, expected, desc)

desc = "not using first movie"
actual = canTwoMoviesFillFlight([4, 3, 2], 5)
expected = true
assertEquals(actual, expected, desc)

desc = "multiple movies shorter than flight"
actual = canTwoMoviesFillFlight([5, 6, 7, 8], 9)
expected = false
assertEquals(actual, expected, desc)

desc = "only one movie"
actual = canTwoMoviesFillFlight([6], 6)
expected = false
assertEquals(actual, expected, desc)

desc = "no movies"
actual = canTwoMoviesFillFlight([], 2)
expected = false
assertEquals(actual, expected, desc)

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
