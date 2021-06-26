function updateColor(arr, i, color) {
  $($(".arr-num")[i]).css({ "background-color": color });
}
async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
}
