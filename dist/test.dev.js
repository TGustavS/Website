"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Graph =
/*#__PURE__*/
function () {
  function Graph() {
    _classCallCheck(this, Graph);

    this.nodes = new Set();
    this.edges = {};
  }

  _createClass(Graph, [{
    key: "addNode",
    value: function addNode(node) {
      this.nodes.add(node);
      this.edges[node] = [];
    }
  }, {
    key: "addEdge",
    value: function addEdge(node1, node2, weight) {
      this.edges[node1].push({
        node: node2,
        weight: weight
      });
      this.edges[node2].push({
        node: node1,
        weight: weight
      });
    }
  }, {
    key: "dijkstra",
    value: function dijkstra(startNode) {
      var visited = new Set();
      var distances = {};
      var previousNodes = {};
      var queue = new PriorityQueue(); // Initialize distances with infinity and previous nodes as null

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _node = _step.value;
          distances[_node] = Infinity;
          previousNodes[_node] = null;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      distances[startNode] = 0;
      queue.enqueue(startNode, 0);

      while (!queue.isEmpty()) {
        var currentNode = queue.dequeue().element;

        if (visited.has(currentNode)) {
          continue;
        }

        visited.add(currentNode);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.edges[currentNode][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var neighbor = _step2.value;
            var node = neighbor.node,
                weight = neighbor.weight;
            var tentativeDistance = distances[currentNode] + weight;

            if (tentativeDistance < distances[node]) {
              distances[node] = tentativeDistance;
              previousNodes[node] = currentNode;
              queue.enqueue(node, tentativeDistance);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return {
        distances: distances,
        previousNodes: previousNodes
      };
    }
  }, {
    key: "shortestPath",
    value: function shortestPath(startNode, endNode) {
      var _this$dijkstra = this.dijkstra(startNode),
          distances = _this$dijkstra.distances,
          previousNodes = _this$dijkstra.previousNodes;

      var path = [];
      var currentNode = endNode;

      while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
      }

      if (path[0] === startNode) {
        return path;
      } else {
        return "There is no path from ".concat(startNode, " to ").concat(endNode);
      }
    }
  }]);

  return Graph;
}();

var PriorityQueue =
/*#__PURE__*/
function () {
  function PriorityQueue() {
    _classCallCheck(this, PriorityQueue);

    this.items = [];
  }

  _createClass(PriorityQueue, [{
    key: "enqueue",
    value: function enqueue(element, priority) {
      var queueElement = {
        element: element,
        priority: priority
      };
      var added = false;

      for (var i = 0; i < this.items.length; i++) {
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
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (this.isEmpty()) {
        return null;
      }

      return this.items.shift();
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.items.length === 0;
    }
  }]);

  return PriorityQueue;
}(); // Example usage:


var graph = new Graph();
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