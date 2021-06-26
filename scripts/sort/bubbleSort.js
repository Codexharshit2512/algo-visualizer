// import { updateHeight } from "./updates";

async function bubblesort(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      updateColor(arr, j, colors.travel);
      updateColor(arr, j + 1, colors.travel);
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
      await updateHeight(arr, j);
      await updateHeight(arr, j + 1);
      updateColor(arr, j, colors.default);
      updateColor(arr, j + 1, colors.default);
    }
    updateColor(arr, arr.length - i - 1, colors.sorted);
  }
  endAlgo();
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
