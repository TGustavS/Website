class Graph {
  constructor() {
    this.nodes = new Set();
    this.edges = {};
  }

  addNode(node) {
    this.nodes.add(node);
    this.edges[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.edges[node1].push({ node: node2, weight: weight });
    this.edges[node2].push({ node: node1, weight: weight });
  }

  dijkstra(startNode) {
    const visited = new Set();
    const distances = {};
    const previousNodes = {};
    const queue = new PriorityQueue();

    // Initialize distances with infinity and previous nodes as null
    for (const node of this.nodes) {
      distances[node] = Infinity;
      previousNodes[node] = null;
    }

    distances[startNode] = 0;
    queue.enqueue(startNode, 0);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue().element;

      if (visited.has(currentNode)) {
        continue;
      }

      visited.add(currentNode);

      for (const neighbor of this.edges[currentNode]) {
        const { node, weight } = neighbor;
        const tentativeDistance = distances[currentNode] + weight;

        if (tentativeDistance < distances[node]) {
          distances[node] = tentativeDistance;
          previousNodes[node] = currentNode;
          queue.enqueue(node, tentativeDistance);
        }
      }
    }

    return { distances, previousNodes };
  }

  shortestPath(startNode, endNode) {
    const { distances, previousNodes } = this.dijkstra(startNode);
    const path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previousNodes[currentNode];
    }

    if (path[0] === startNode) {
      return path;
    } else {
      return `There is no path from ${startNode} to ${endNode}`;
    }
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Example usage:
const graph = new Graph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addEdge("A", "B", 2);
graph.addEdge("A", "C", 4);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 7);
graph.addEdge("C", "D", 3);

console.log(graph.shortestPath("A", "D")); // Output: [ 'A', 'B', 'C', 'D' ]
