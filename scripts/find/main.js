let delay = parseInt($(".delay-input input").val());
// let size = parseInt($(".size-input input").val());
let rows = 19;
let cols = 51;
let source = [2, 3];
let target = [17, 47];
let graph = [];
// let arr = [];
let sourceNode = $(`<p class="source">S</p>`);
let targetNode = $(`<p class="target">T</p>`);
let blockCells = 0;
let algoRunning = false;
let gridEmpty = true;
$(".delay-indicator").html(
  `Delay: ${parseInt($(".delay-input input").val())}ms`
);
$(".delay-input input").change(function (e) {
  const val = parseInt($(this).val());
  $(".delay-indicator").html(`Delay: ${val}ms`);
  delay = val;
});

function generateGrid() {
  gridEmpty = true;
  $("#start-btn").css({ cursor: "pointer" });
  $("#start-btn").removeClass("disabled");
  arr = [];
  let grid = $("#main-grid");
  grid.html("");
  graph = [];
  for (let i = 0; i < rows; i++) {
    const row = $(`<div class="row"></div>`);
    graph.push([]);
    for (let j = 0; j < cols; j++) {
      const node = $(
        `<div id="row-${i}-col-${j}" class="node unvisited"></div>`
      );
      if (i == source[0] && j == source[1]) {
        node.append(sourceNode);
      }
      if (i == target[0] && j == target[1]) {
        node.append(targetNode);
      }
      addBoundaryClasses(node, i, j);
      row.append(node);
      graph[graph.length - 1].push(0);
    }
    grid.append(row);
  }
  console.log("grpah", graph);
  let sNode = grabSourceNode();
  sNode.addClass("source-node");
  let tNode = grabTargetNode();
  tNode.addClass("target-node");
  assignNodeEventListners();
  assignSourceAndTargetListeners();
}

function addBoundaryClasses(elem, i, j) {
  if (i == 0) {
    elem.addClass("boundary-top");
  }
  if (i == rows - 1) {
    elem.addClass("boundary-bottom");
  }
  if (j == 0) {
    elem.addClass("boundary-left");
  }
  if (j == cols - 1) {
    elem.addClass("boundary-right");
  }
}

function grabSourceNode() {
  let row = source[0];
  let col = source[1];
  return $(`#row-${row}-col-${col}`);
}

function grabTargetNode() {
  let row = target[0];
  let col = target[1];
  return $(`#row-${row}-col-${col}`);
}

$("#algo-selector").change(function (e) {
  if (algoRunning) return;
  const value = $("#algo-selector").val();
  if (value == "Dijkstra") {
    assignWeightsToGraph(graph);
  } else {
    removeWeights(graph);
  }
});

$("#start-btn").click(async function (e) {
  if (algoRunning) return;
  if (!gridEmpty) return;
  const value = $("#algo-selector").val();
  // const rand = getRandomInt(0, size - 1);
  switch (value) {
    case "Bfs":
      startAlgorithm();
      await Bfshelper(graph, source, target);
      break;
    case "Dijkstra":
      startAlgorithm();
      await dijkstraHelper(graph, source, target);
      break;
    // case "Dfs":
    //   break;
    default:
      break;
  }
});

function startAlgorithm() {
  gridEmpty = false;
  algoRunning = true;
  $("#clear-btn").css({ cursor: "not-allowed" });
  $("#start-btn").css({ cursor: "not-allowed" });
  $("#clear-blocks").css({ cursor: "not-allowed" });
  $("#clear-btn").addClass("disabled");
  $("#start-btn").addClass("disabled");
  $("#clear-blocks").addClass("disabled");
}

function endAlgorithm() {
  algoRunning = false;
  $("#clear-btn").css({ cursor: "pointer" });

  $("#clear-blocks").css({ cursor: "pointer" });
  $("#clear-btn").removeClass("disabled");

  $("#clear-blocks").removeClass("disabled");
}

$("#clear-btn").click(function (e) {
  if (!algoRunning) {
    generateGrid();
  }
});

$(document).ready(function (e) {
  generateGrid();
});
let sourceDragging = false;
let targetDragging = false;
let blockDragging = false;
function assignSourceAndTargetListeners() {
  let sNode = grabSourceNode();
  let tNode = grabTargetNode();
  sNode[0].addEventListener("mousedown", NodeMouseDown, true);
  tNode[0].addEventListener("mousedown", NodeMouseDown, true);
}

function removeSourceAndTargetListeners() {
  let sNode = grabSourceNode()[0];
  let tNode = grabTargetNode()[0];
  sNode.removeEventListener("mousedown", NodeMouseDown, true);
  tNode.removeEventListener("mousedown", NodeMouseDown, true);
}

function NodeMouseDown(e) {
  e.preventDefault();

  let [row, col] = getIds($(this));
  if (row == source[0] && col == source[1]) {
    sourceDragging = true;
  } else {
    targetDragging = true;
  }
}

function assignNodeEventListners() {
  $(".node").mouseenter(function (e) {
    let sNode = grabSourceNode();
    let val = $("#algo-selector").val();
    const [row, col] = getIds($(this));
    if (
      sourceDragging &&
      !isEqual(row, col, "source") &&
      !$(`#row-${row}-col-${col}`).hasClass("block-cell")
    ) {
      removeSourceAndTargetListeners();
      removeEnds("source");
      $(this).addClass("source-node");
      if (val === "Dijkstra") {
        assignWeightToNode(source[0], source[1]);
        $(`#row-${row}-col-${col}`).html("");
        graph[row][col] = 0;
      }
      $(this).append(sourceNode);
      source = [row, col];
      assignSourceAndTargetListeners();
    } else if (
      targetDragging &&
      !isEqual(row, col, "target") &&
      !$(`#row-${row}-col-${col}`).hasClass("block-cell")
    ) {
      removeSourceAndTargetListeners();
      removeEnds("target");
      $(this).addClass("target-node");
      if (val === "Dijkstra") {
        assignWeightToNode(target[0], target[1]);
        $(`#row-${row}-col-${col}`).html("");
        graph[row][col] = 0;
        console.log(graph);
      }
      $(this).append(targetNode);

      target = [row, col];
      assignSourceAndTargetListeners();
    }

    $(".node").mousedown(function (e) {
      let [row, col] = getIds($(this));
      if (
        !isEqual(row, col, "source") &&
        !isEqual(row, col, "target") &&
        e.ctrlKey
      ) {
        blockDragging = true;
        $(this).addClass("block-cell");
        graph[row][col] = -1;
        $(this).html("");
        blockCells++;
      }
    });

    $(".node").mouseenter(function (e) {
      e.preventDefault();
      const [row, col] = getIds($(this));
      if (
        blockDragging &&
        !isEqual(row, col, "source") &&
        !isEqual(row, col, "target") &&
        !$(this).hasClass("block-cell")
      ) {
        $(this).addClass("block-cell");
        graph[row][col] = -1;
        $(this).html("");
        blockCells++;
      }
    });
  });

  $(".node").mousemove(function (e) {
    e.preventDefault();
    if (e.buttons == 0) {
      sourceDragging = false;
      targetDragging = false;
      blockDragging = false;
    }
  });
}

function assignWeightToNode(row, col) {
  let weight = getRandomInt(4, 50);
  graph[row][col] = weight;
  let weightNode = $(`<p class="weight">${weight}</p>`);
  $(`#row-${row}-col-${col}`).html("");
  $(`#row-${row}-col-${col}`).append(weightNode);
}

function getIds(elem) {
  const str = elem.attr("id").split("-");
  const row = parseInt(str[1]);
  const col = parseInt(str[3]);
  return [row, col];
}

function removeEnds(type) {
  if (type == "source") {
    let sNode = grabSourceNode();
    sNode.html("");
    sNode.removeClass("source-node");
  } else {
    let tNode = grabTargetNode();
    tNode.html("");
    tNode.removeClass("target-node");
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function assignWeightsToGraph(graph) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!$(`#row-${i}-col-${j}`).hasClass("block-cell")) {
        let weight = getRandomInt(4, 50);
        graph[i][j] = weight;
        let weightNode = $(`<p class="weight">${weight}</p>`);
        if (!isEqual(i, j, "source") && !isEqual(i, j, "target")) {
          $(`#row-${i}-col-${j}`).append(weightNode);
        }
      }
    }
  }
}

function removeWeights(graph) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      graph[i][j] = 0;
      if (!isEqual(i, j, "source") && !isEqual(i, j, "target")) {
        $(`#row-${i}-col-${j}`).html("");
      }
    }
  }
}

$("#clear-blocks").click(function (e) {
  if (!algoRunning) {
    clearBlockCells();
  }
});

function clearBlockCells() {
  if (blockCells > 0) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!isEqual(i, j, "source") && !isEqual(i, j, "target")) {
          $(`#row-${i}-col-${j}`).removeClass("block-cell");
          graph[i][j] = 0;
          let val = $("#algo-selector").val();
          if (val == "Dijkstra") {
            assignWeightToNode(i, j);
          }
        }
      }
    }
    blockCells = 0;
  }
}
function isEqual(row, col, type) {
  let cellHash = `${row}${col}`;
  if (type === "source") {
    let targetHash = `${target[0]}${target[1]}`;
    return cellHash === targetHash;
  } else {
    let sourceHash = `${source[0]}${source[1]}`;
    return cellHash === sourceHash;
  }
}
