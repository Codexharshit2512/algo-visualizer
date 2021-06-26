async function ternarySearch(arr, val) {
  let low = 0,
    high = arr.length - 1;
  let pans = -1;
  while (low <= high) {
    let mid1 = low + Math.floor((high - low) / 3);
    let mid2 = high - Math.floor((high - low) / 3);
    updateColor(arr, mid1, colors.travel);
    await sleep(50);
    updateColor(arr, mid2, colors.travel);
    await sleep(delay);
    if (arr[mid1] == val) {
      updateColor(arr, mid1, colors.success);
      pans = mid1;
      break;
    } else if (arr[mid2] == val) {
      updateColor(arr, mid2, colors.success);
      pans = mid2;
      break;
    } else if (arr[mid1] > val) {
      high = mid1 - 1;
    } else if (arr[mid2] < val) {
      low = mid2 + 1;
    } else {
      low = mid1 + 1;
      high = mid2 - 1;
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
