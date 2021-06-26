async function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let curr = i;
    updateColor(arr, i, colors.blocker);
    for (let j = i + 1; j < arr.length; j++) {
      updateColor(arr, j, colors.travel);
      if (arr[j] < arr[curr]) {
        curr = j;
      }
      await sleep(delay - 50);
      updateColor(arr, j, colors.default);
    }
    swap(arr, i, curr);
    updateHeight(arr, i);
    updateHeight(arr, curr);
    updateColor(arr, i, colors.sorted);
  }
  //   console.log("selection sort", arr);
  endAlgo();
}

async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
}
