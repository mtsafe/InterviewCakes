// A simple, somewhat inefficient queue implementation
class Queue {
  constructor() {
    this.queue = []
    this.size = 0
  }

  enqueue(item) {
    this.queue.unshift(item)
    this.size += 1
  }

  dequeue() {
    this.size -= 1
    return this.queue.pop()
  }
}

function getPath(graph, startNode, endNode) {
  // Find the shortest route in the network between the two users
  // Trivial Cases
  if (
    typeof graph !== "object" ||
    typeof startNode !== "string" ||
    typeof endNode !== "string"
  )
    return null
  if (!Object.hasOwn(graph, startNode) || !Object.hasOwn(graph, endNode)) {
    throw new Error("validation error")
  }
  Object.freeze(graph)

  // Breadth-first search (BFS); copying graph and removing key:value pairs
  const morePath = getPathRecurse(graph, [], [[startNode]], endNode, 1)
  if (!Array.isArray(morePath)) return null
  return morePath

  function getPathRecurse(graph, visited, pathArrParam, endNode, depth) {
    if (depth > 20) throw new Error("recursion depth > 20")
    // Trivial Cases
    if (
      typeof graph !== "object" ||
      !Array.isArray(pathArrParam) ||
      JSON.stringify(pathArrParam) === "[]" ||
      endNode === null
    )
      return null

    let pathArr = pathArrParam.filter(Boolean)
    for (let path of pathArr) {
      let node = path[path.length - 1]
      if (visited.includes(node)) {
        removePathFromArr(path, pathArr)
        continue
      }
      visited.push(node)
      if (node === endNode) return path
      addChildren(path, pathArr, graph)
    }

    const morePath = getPathRecurse(graph, visited, pathArr, endNode, depth + 1)
    if (!Array.isArray(morePath)) return null
    return morePath
    // return [endNode].concat(morePath)
  }

  function addChildren(path, pathArr, graph) {
    let newPaths = []
    let node = path[path.length - 1]
    for (let child of graph[node]) {
      newPaths.push(path.concat([child]))
    }
    pathArr.splice(
      pathArr.findIndex(p => p === path),
      1,
      ...newPaths
    )
  }

  function removePathFromArr(path, pathArr) {
    pathArr.splice(
      pathArr.findIndex(p => p === path),
      1
    )
  }
}

// Tests
const graph = {
  a: ["b", "c", "d"],
  b: ["a", "d"],
  c: ["a", "e"],
  d: ["a", "b"],
  e: ["c"],
  f: ["g"],
  g: ["f"],
}

let desc = "two hop path 1"
let actual = getPath(graph, "a", "e")
let expected = ["a", "c", "e"]
assertDeepEqual(actual, expected, desc)

desc = "two hop path 2"
actual = getPath(graph, "d", "c")
expected = ["d", "a", "c"]
assertDeepEqual(actual, expected, desc)

desc = "one hop path 1"
actual = getPath(graph, "a", "c")
expected = ["a", "c"]
assertDeepEqual(actual, expected, desc)

desc = "one hop path 2"
actual = getPath(graph, "f", "g")
expected = ["f", "g"]
assertDeepEqual(actual, expected, desc)

desc = "one hop path 3"
actual = getPath(graph, "g", "f")
expected = ["g", "f"]
assertDeepEqual(actual, expected, desc)

desc = "zero hop path"
actual = getPath(graph, "a", "a")
expected = ["a"]
assertDeepEqual(actual, expected, desc)

desc = "no path"
actual = getPath(graph, "a", "f")
expected = null
assertDeepEqual(actual, expected, desc)

desc = "start node not present"
assertThrowsError(() => {
  getPath(graph, "h", "a")
}, desc)

desc = "end node not present"
assertThrowsError(() => {
  getPath(graph, "a", "h")
}, desc)

function assertDeepEqual(a, b, desc) {
  const aStr = JSON.stringify(a)
  const bStr = JSON.stringify(b)
  if (aStr !== bStr) {
    console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`)
  } else {
    console.log(`${desc} ... PASS`)
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
