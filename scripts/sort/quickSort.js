async function quicksortHelper(arr) {
  await quicksort(arr, 0, arr.length);
  endAlgo();
}

async function quicksort(arr, low, high) {
  if (low < high) {
    let j = await partition(arr, low, high);
    await sleep(delay);
    await quicksort(arr, low, j);
    await sleep(delay - 50);
    await quicksort(arr, j + 1, high);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low,
    j = high;
  while (i < j) {
    do {
      if (i > low) updateColor(arr, i - 1, colors.default);
      await sleep(delay - 20);
      i++;
      if (i < j) updateColor(arr, i, colors.travel);
      await sleep(delay - 50);
    } while (arr[i] <= pivot);
    do {
      if (j < high - 1) updateColor(arr, j + 1, colors.default);
      await sleep(delay - 50);
      j--;
      if (i < j) updateColor(arr, j, colors.travel);
      await sleep(delay - 50);
    } while (arr[j] > pivot);
    if (i < j) {
      swap(arr, i, j);
      await updateHeight(arr, i);
      await updateHeight(arr, j);
      updateColor(arr, i, colors.default);
      updateColor(arr, j, colors.default);
    }
  }
  swap(arr, low, j);
  await updateHeight(arr, low);
  await updateHeight(arr, j);
  updateColor(arr, j, colors.sorted);
  return j;
}
