//A function which calls the bfs function
async function Bfshelper(graph, source, target) {
  const path = await Bfs(graph, source, target);
  console.log(path);
  if (path) await generatePath(path);
  console.log(graph);
  endAlgorithm();
}
//creates a visited array of size of the grid in the dom
function createVisistedArray() {
  let vis = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    vis.push(row);
  }
  return vis;
}
//Function to check if a cell is valid or not-used by bfs and dijkstra
function isValidCell(i, j, vis, graph) {
  if (
    i < 0 ||
    i == rows ||
    j < 0 ||
    j == cols ||
    vis[i][j] ||
    graph[i][j] == -1
  )
    return false;
  return true;
}
//Actual bfs function
async function Bfs(graph, source, target) {
  let q = new Queue();
  let sr = source[0];
  let sc = source[1];
  q.add(new Pair(sr, sc, [], null));
  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let vis = createVisistedArray();
  vis[sr][sc] = true;
  await updateStatus(sr, sc);
  while (q.length() > 0) {
    let rem = q.remove();
    // if (rem.row == target[0] && rem.col == target[1]) {
    //   return rem.path;
    // }
    for (let j = 0; j < 4; j++) {
      let y = dirs[j][0];
      let x = dirs[j][1];
      if (isValidCell(rem.row + y, rem.col + x, vis, graph)) {
        vis[rem.row + y][rem.col + x] = true;
        await updateStatus(rem.row + y, rem.col + x);
        if (rem.row + y == target[0] && rem.col + x == target[1]) {
          let ans = rem.path.slice();
          ans.push([rem.row + y, rem.col + x]);
          return ans;
        }
        q.add(new Pair(rem.row + y, rem.col + x, rem.path, null));
      }
    }
  }
}

async function generatePath(path) {
  for (let i = 0; i < path.length; i++) {
    let cell = path[i];
    updatePathColor(cell[0], cell[1]);
    await sleep(50);
  }
}

async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
}

// let pq = new PriorityQueue();
// for (let i = 0; i < 9; i++) {
//   pq.add(Math.floor(Math.random() * 50));
// }
// console.log(pq);
// // for (let i = 0; i < pq.length(); i++) {
// //   let val = pq.remove();
// //   console.log(val);
// // }
// while (pq.length() > 0) {
//   let val = pq.remove();
//   console.log(val);
// }
