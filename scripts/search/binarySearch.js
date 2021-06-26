async function binarySearch(arr, val) {
  let low = 0,
    high = arr.length - 1;
  let pans = -1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    updateColor(arr, mid, colors.travel);
    await sleep(delay);
    if (arr[mid] > val) {
      high = mid - 1;
    } else if (arr[mid] < val) {
      low = mid + 1;
    } else {
      updateColor(arr, mid, colors.success);
      pans = mid;
      break;
    }
  }
  $(".search-msg").remove();
  if (pans != -1) {
    $(".search-result").html("");
    const result = `<div class="search-result success">Element Found At Index: ${pans}</div>`;
    $("body").append(result);
  } else {
    $(".search-result").html("");
    const result = `<div class="search-result fail">Element Not Found</div>`;
    $("body").append(result);
  }
  endAlgo();
}
