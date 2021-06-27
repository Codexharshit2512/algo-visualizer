//Function which calls dijkstra algo
async function dijkstraHelper(graph, source, target) {
  console.log("dij started");
  console.log("src", source);
  console.log("tar", target);
  const path = await dijkstraAlgo(graph, source, target);
  if (path) await generatePath(path);
  endAlgorithm();
}
//Actual function for dijkstra algo
async function dijkstraAlgo(graph, source, target) {
  let pq = new PriorityQueue();
  let vis = createVisistedArray();
  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let sr = source[0];
  let sc = source[1];
  pq.add(new Pair(sr, sc, [], 0));
  while (pq.length() > 0) {
    let rem = pq.remove();
    vis[rem.row][rem.col] = true;
    await updateStatus(rem.row, rem.col, "dij");
    if (rem.row == target[0] && rem.col == target[1]) {
      return rem.path;
    }
    for (let i = 0; i < 4; i++) {
      let y = dirs[i][0];
      let x = dirs[i][1];
      if (isValidCell(rem.row + y, rem.col + x, vis, graph)) {
        pq.add(
          new Pair(
            rem.row + y,
            rem.col + x,
            rem.path,
            rem.wt + graph[rem.row + y][rem.col + x]
          )
        );
      }
    }
  }
}
