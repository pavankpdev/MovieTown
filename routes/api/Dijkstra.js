const router = require("express").Router();
const axios = require("axios");
const { MAP_QUEST_API_KEY, MAP_QUEST_URL } = require("../../config/keys");
router.post("/", (req, res) => {
  //  get the data from the client
  let body = req.body.data;

  // function to get distance between individual theaters
  const getDistance = async (loc1, loc2) => {
    const location = await axios.get(
      `${MAP_QUEST_URL}key=${MAP_QUEST_API_KEY}&from=${loc1}&to=${loc2}&unit=k`
    );
    //return the distance in kilometers
    return Math.ceil(location.data.route.distance);
  };

  // function to calculate shortest distance between nodes
  let shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
    let shortest = null;
    // for each node in the distances object
    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  };

  //Dijkstra algorithm implementation
  let dijkstraAlgorithm = (graph, startNode, endNode) => {
    // establish object for recording distances from the start node
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
    console.log(distances);
    // track paths
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
      parents[child] = startNode;
    }

    // track nodes that have already been visited
    let visited = [];

    // find the nearest node
    let node = shortestDistanceNode(distances, visited);

    // for that node
    while (node) {
      // find its distance from the start node & its child nodes
      let distance = distances[node];
      let children = graph[node];
      // for each of those child nodes
      for (let child in children) {
        // make sure each child node is not the start node
        if (String(child) === String(startNode)) {
          continue;
        } else {
          // save the distance from the start node to the child node
          let newdistance = distance + children[child];
          // if there's no recorded distance from the start node to the child node in the distances object
          // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
          // save the distance to the object
          // record the path
          if (!distances[child] || distances[child] > newdistance) {
            distances[child] = newdistance;
            parents[child] = node;
          }
        }
      }
      // move the node to the visited set
      visited.push(node);
      // move to the nearest neighbor node
      node = shortestDistanceNode(distances, visited);
    }

    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();

    // return the shortest path from start node to end node & its distance
    let results = {
      distance: distances[endNode],
      path: shortestPath,
    };
    results.path.shift();
    return res.send(results);
  };

  // function to generate graph using the client value to feed to dijkstra algorithm
  async function generateGraph(user, theaters, destination) {
    const graph = {
      //  user node
      [user]: {
        //  user's children nodes
        [theaters[0].theater_name]: theaters[0].distance,
        [theaters[3].theater_name]: theaters[3].distance,
        [theaters[5].theater_name]: theaters[5].distance,
      },
      // theater 1  to theater 2 & theater 4 node
      [theaters[0].theater_name]: {
        [theaters[1].theater_name]: await getDistance(
          theaters[0].geometry,
          theaters[1].geometry
        ),
        [theaters[3].theater_name]: await getDistance(
          theaters[0].geometry,
          theaters[3].geometry
        ),
      },
      // theater 2  to theater 3 & theater 5 node
      [theaters[1].theater_name]: {
        [theaters[2].theater_name]: await getDistance(
          theaters[1].geometry,
          theaters[2].geometry
        ),
        [theaters[4].theater_name]: await getDistance(
          theaters[1].geometry,
          theaters[4].geometry
        ),
      },
      // theater 3  to theater 9 node
      [theaters[2].theater_name]: {
        [theaters[8].theater_name]: await getDistance(
          theaters[2].geometry,
          theaters[8].geometry
        ),
      },
      // theater 4  to theater 5 & theater 6 node
      [theaters[3].theater_name]: {
        [theaters[4].theater_name]: await getDistance(
          theaters[3].geometry,
          theaters[4].geometry
        ),
        [theaters[5].theater_name]: await getDistance(
          theaters[3].geometry,
          theaters[5].geometry
        ),
      },
      // theater 5  to theater 9 & theater 7 node
      [theaters[4].theater_name]: {
        [theaters[8].theater_name]: await getDistance(
          theaters[4].geometry,
          theaters[8].geometry
        ),
        [theaters[6].theater_name]: await getDistance(
          theaters[4].geometry,
          theaters[6].geometry
        ),
      },
      // theater 6  to theater 7 node
      [theaters[5].theater_name]: {
        [theaters[6].theater_name]: await getDistance(
          theaters[5].geometry,
          theaters[6].geometry
        ),
      },
      // theater 7  to theater 8 node
      [theaters[6].theater_name]: {
        [theaters[7].theater_name]: await getDistance(
          theaters[6].geometry,
          theaters[7].geometry
        ),
      },
      // theater 8  to theater 9 node
      [theaters[7].theater_name]: {
        [theaters[8].theater_name]: await getDistance(
          theaters[7].geometry,
          theaters[8].geometry
        ),
      },
      // theater 9 node
      [theaters[8].theater_name]: {
        [theaters[8].theater_name]: {},
      },
    };
    return { graph, user, destination };
  }
  generateGraph(body.user, body.theaters, body.destination)
    .then((data) => dijkstraAlgorithm(data.graph, data.user, data.destination))
    .catch((err) => console.error("err", err));
});

module.exports = router;
