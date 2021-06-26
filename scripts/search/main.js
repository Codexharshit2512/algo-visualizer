let delay = parseInt($(".delay-input input").val());
let size = parseInt($(".size-input input").val());
let play = false;
let arrEmpty = true;
let arr = [];

$(".delay-indicator").html(
  `Delay: ${parseInt($(".delay-input input").val())}ms`
);
$(".delay-input input").change(function (e) {
  const val = parseInt($(this).val());
  $(".delay-indicator").html(`Delay: ${val}ms`);
  delay = val;
});

$(".size-indicator").html(`Size: ${parseInt($(".size-input input").val())}`);
$(".size-input input").change(function (e) {
  const val = parseInt($(this).val());
  $(".size-indicator").html(`Size: ${val}`);
  size = val;
  generateArray();
});

function generateArray() {
  arr = [];
  for (let i = 0; i < size; i++) {
    const num = getRandomInt(1, 99);
    arr.push(num);
  }
  addarrayToDom();
  console.log(arr);
}

function addarrayToDom() {
  arrEmpty = true;
  $(".search-container").html("");
  for (let i = 0; i < arr.length; i++) {
    const elem = `<div id="${i}" class="arr-num">${arr[i]}</div>`;
    $(".search-container").append($(elem));
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function (e) {
  generateArray();
});

$("#shuffle-btn").click(function (e) {
  if (play) return;
  $(".search-result").html("");
  $(".search-msg").remove();
  generateArray();
});

$("#search-btn").click(async function (e) {
  if (play) return;
  if (!arrEmpty) {
    $("#clear-btn").click();
  }
  const value = $("#search-selector").val();
  const num = parseInt($("#search-input").val());
  if (!num) return;

  loadSearchHtml(num);
  switch (value) {
    case "linear search":
      startAlgo();
      linearsearch(arr, num);
      break;
    case "binary search":
      arr.sort((a, b) => a - b);
      addarrayToDom();
      startAlgo();
      await sleep(500);
      binarySearch(arr, num);
      break;
    case "ternary search":
      arr.sort((a, b) => a - b);
      addarrayToDom();
      startAlgo();
      await sleep(500);
      ternarySearch(arr, num);
      break;
    default:
      break;
  }
});

function startAlgo() {
  play = true;
  arrEmpty = false;
  $("#clear-btn").css({ cursor: "not-allowed" });
  $("#search-btn").css({ cursor: "not-allowed" });
  $("#shuffle-btn").css({ cursor: "not-allowed" });
  $("#clear-btn").addClass("disabled");
  $("#search-btn").addClass("disabled");
  $("#shuffle-btn").addClass("disabled");
}

function endAlgo() {
  play = false;
  $("#clear-btn").css({ cursor: "pointer" });
  $("#shuffle-btn").css({ cursor: "pointer" });
  $("#clear-btn").removeClass("disabled");
  $("#shuffle-btn").removeClass("disabled");
  $("#search-btn").css({ cursor: "pointer" });
  $("#search-btn").removeClass("disabled");
  console.log(arrEmpty);
}

function loadSearchHtml(val) {
  const searchHtml = $(
    `<p class="search-msg">Element to be searched:${val}</p>`
  );
  $("body").append(searchHtml);
}

$("#clear-btn").click(function (e) {
  if (play) return;
  addarrayToDom();
  $(".search-result").html("");
  $(".search-msg").remove();
});
