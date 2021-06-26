async function linearsearch(arr, val) {
  let idx = -1;
  for (let i = 0; i < arr.length; i++) {
    // if (i > 0) {
    //   updateColor(arr, i - 1, colors.default);
    // }
    updateColor(arr, i, colors.travel);
    await sleep(delay - 20);
    if (arr[i] == val) {
      updateColor(arr, i, colors.success);
      idx = i;
      break;
    }
  }
  $(".search-msg").remove();
  if (idx != -1) {
    $(".search-result").html("");
    const result = `<div class="search-result success">Element Found At Index: ${idx}</div>`;
    $("body").append(result);
  } else {
    $(".search-result").html("");
    const result = `<div class="search-result fail">Element Not Found</div>`;
    $("body").append(result);
  }
  endAlgo();
}
