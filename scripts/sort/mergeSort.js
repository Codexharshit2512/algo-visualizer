async function mergeSortHelper(arr) {
  await mergeSort(arr, 0, arr.length - 1);
  endAlgo();
}

async function mergeSort(arr, low, high) {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    updateColor(arr, mid, colors.blocker);
    await sleep(delay);
    await mergeSort(arr, low, mid);
    await sleep(delay - 50);
    await mergeSort(arr, mid + 1, high);
    updateColor(arr, mid, colors.sorted);
    await merge(arr, low, mid, high);
  }
}

async function merge(arr, low, mid, high) {
  let L = [],
    R = [];
  for (let i = low, k = 0; i <= mid; i++, k++) L[k] = arr[i];
  for (let i = mid + 1, k = 0; i <= high; i++, k++) R[k] = arr[i];
  let i = 0,
    j = 0,
    k = low;
  while (i < L.length && j < R.length) {
    if (L[i] < R[j]) {
      arr[k++] = L[i];
      i++;
    } else {
      arr[k++] = R[j];
      j++;
    }
    updateColor(arr, k - 1, colors.sorted);
    await updateHeight(arr, k - 1);
  }

  while (i < L.length) {
    arr[k++] = L[i];
    i++;
    updateColor(arr, k - 1, colors.sorted);
    await updateHeight(arr, k - 1);
  }
  while (j < R.length) {
    arr[k++] = R[j];
    j++;
    updateColor(arr, k - 1, colors.sorted);
    await updateHeight(arr, k - 1);
  }
}
