let delay = parseInt($(".delay-input input").val());
let size = parseInt($(".size-input input").val());
let play = false;
// let empty = true;
let arr = [];

$(".delay-indicator").html(
  `Delay: ${parseInt($(".delay-input input").val())}ms`
);
$(".delay-input input").change(function (e) {
  e.preventDefault();
  const val = parseInt($(this).val());
  $(".delay-indicator").html(`Delay: ${val}ms`);
  delay = val;
  console.log(val);
});

$(".size-indicator").html(`Size: ${parseInt($(".size-input input").val())}`);
$(".size-input input").change(function (e) {
  e.preventDefault();
  if (play) return;
  const val = parseInt($(this).val());
  $(".size-indicator").html(`Size: ${val}`);
  size = val;
  shuffleArray();
});

function generateArray() {
  arr = [];
  for (let i = 0; i < size; i++) {
    const num = getRandomInt(10, 500);
    arr.push(num);
  }
  console.log(arr);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$("#shuffle-btn").click(function (e) {
  if (play) return;
  shuffleArray();
});

function getWidth() {
  let width;
  if (size > 50) {
    width = 800 / size;
  } else width = 800 / size;
  if (width > 30) return 30;
  return width;
}

function addBarsToDom() {
  const fragment = document.createDocumentFragment();
  $(".bars-container").html("");
  arr.forEach((num, index) => {
    const height = Math.floor(num);
    const width = getWidth();
    let bar = `<div id="bar-${index}" style="height:${num}px;width:${width}px;" class="bar"></div>`;
    $(".bars-container").append(bar);
  });

  if (arr.length > 90) {
    $(".bar").css({ "margin-left": "4px" });
  } else {
    $(".bar").css({ "margin-left": "5px" });
  }
}

$("#sort-btn").click(function (e) {
  if (play) return;
  const value = $("#sort-selector").val();
  startAlgo();
  switch (value) {
    case "Bubble sort":
      bubblesort(arr);
      break;
    case "Selection sort":
      selectionSort(arr);
      break;
    case "Merge sort":
      mergeSortHelper(arr);
      break;
    case "Quick sort":
      quicksortHelper(arr);
      break;
    case "Insertion sort":
      insertionSort(arr);
      break;
    case "Heap sort":
      heapSortHelper(arr);
      break;
    default:
      break;
  }
});

function startAlgo() {
  play = true;
  $("#sort-btn").css({ cursor: "not-allowed" });
  $("#shuffle-btn").css({ cursor: "not-allowed" });
  $("#sort-btn").addClass("disabled");
  $("#shuffle-btn").addClass("disabled");
}

function endAlgo() {
  play = false;
  $("#sort-btn").css({ cursor: "pointer" });
  $("#shuffle-btn").css({ cursor: "pointer" });
  $("#sort-btn").removeClass("disabled");
  $("#shuffle-btn").removeClass("disabled");
}

$(document).ready(function (e) {
  shuffleArray();
});

function shuffleArray() {
  generateArray();
  addBarsToDom();
}
