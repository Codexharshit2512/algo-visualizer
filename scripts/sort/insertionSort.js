async function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    updateColor(arr, i, colors.sorted);
    if (i == arr.length - 1) {
      break;
    }

    await sleep(delay);
    let j = i + 1;
    let k = j - 1;
    let curr = arr[j];
    updateColor(arr, j, colors.travel);
    for (k = j - 1; k >= 0; k--) {
      await sleep(delay);
      updateColor(arr, k, colors.travel);
      if (arr[k] > arr[k + 1]) {
        swap(arr, k, k + 1);
        await updateHeight(arr, k);
        await updateHeight(arr, k + 1);
        updateColor(arr, k, colors.sorted);
        updateColor(arr, k + 1, colors.sorted);
      } else {
        updateColor(arr, k, colors.sorted);
        updateColor(arr, k + 1, colors.sorted);
        await sleep(delay);
        break;
      }
    }
  }
  endAlgo();
  //   console.log("insertion sort", arr);
}
