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
  console.log("getPath()")
  // console.log("graph " + typeof graph)
  // console.log("startNode " + typeof startNode)
  // console.log("endNode " + typeof endNode)
  if (
    typeof graph !== "object" ||
    typeof startNode !== "string" ||
    typeof endNode !== "string"
  )
    return null
  if (!Object.hasOwn(graph, startNode) || !Object.hasOwn(graph, endNode)) {
    throw new Error("validation error")
  }
  console.log(`startNode=${startNode} endNode=${endNode}`)

  // Breadth-first search (BFS); copying graph and removing key:value pairs
  const morePath = getPathRecurse(graph, null, [startNode], endNode, 1)
  if (!Array.isArray(morePath)) return null
  return morePath

  function getPathRecurse(graph, ancestry, startArrParam, endNode, depth) {
    console.log(`getPathRecurse(graph, startArr, endNode, ${depth})`)
    console.dir(graph)
    console.dir(startArrParam)
    console.dir(endNode)
    let startArr = startArrParam.filter(Boolean)
    if (depth > 20) throw new Error("recursion depth > 20")
    // Trivial Cases
    if (
      typeof graph !== "object" ||
      !Array.isArray(startArr) ||
      JSON.stringify(startArr) === "[]" ||
      endNode === null
    )
      return null

    let reducedGraph = graph
    let childArr = []
    for (let node of startArr) {
      console.log(`node=${node}, endNode=${endNode}`)
      if (node === endNode) return [endNode]
      childArr = childArr.concat(reducedGraph[node])
      reducedGraph = getReducedGraph(reducedGraph, node)
    }

    const morePath = getPathRecurse(
      reducedGraph,
      ancestry,
      childArr,
      endNode,
      depth + 1
    )
    if (!Array.isArray(morePath)) return null
    return [endNode].concat(morePath)
  }

  function getReducedGraph(graph, node) {
    console.log(`getReducedGraph(graph, ${node})`)
    console.dir(graph)
    let newGraph = {}
    for (let key of Object.keys(graph)) {
      if (key !== node) {
        let valueArr = graph[key]
        if (typeof valueArr !== "object") return null
        console.log("valueArr")
        console.dir(valueArr)
        if (valueArr.includes(node)) {
          valueArr.splice(
            valueArr.findIndex(x => x === node),
            1
          )
        }
        valueArr = valueArr.filter(Boolean)
        if (JSON.stringify(valueArr) !== "[]") newGraph[key] = valueArr
      }
    }
    return newGraph
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
