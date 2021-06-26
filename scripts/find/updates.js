async function updateStatus(row, col, algo) {
  //   console.log(row + " " + col)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      $($(`#row-${row}-col-${col}`)[0]).removeClass("unvisited");
      $($(`#row-${row}-col-${col}`)[0]).addClass("visited");
      resolve();
    }, delay);
  });
}

function updatePathColor(row, col) {
  $(`#row-${row}-col-${col}`).css({ background: "#66DE93" });
}
