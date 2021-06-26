async function heapSortHelper(arr) {
  const pq = new Heap(arr);
  await pq.upheapify();
  for (let i = 0; i < arr.length; i++) {
    arr[i] = pq.heap[i + 1];
    await updateHeight(arr, i);
    updateColor(arr, i, colors.blocker);
  }
  await pq.downHeapify();
  endAlgo();
}

class Heap {
  constructor(arr) {
    this.array = arr;
    this.heap = [];
    this.heap[0] = -1;
    this.size = 0;
  }

  upheapify() {
    let N = this.array.length;
    for (let i = 0; i < N; i++) {
      this.upheapifyHelper(this.array[i]);
    }
    console.log("heap ", this.heap);
  }

  async downHeapify() {
    let N = this.array.length;
    for (let i = 0; i < N; i++) {
      await this.downHeapifyHelper();
    }
    console.log("sortedheapsa", this.heap);
  }

  async downHeapifyHelper() {
    this.swap(1, this.size);
    swap(arr, 0, this.size - 1);
    await updateHeight(arr, 0);
    await updateHeight(arr, this.size - 1);
    updateColor(arr, this.size - 1, colors.sorted);
    // console.log(this.size, this.heap);
    let idx = 1;
    this.size--;
    while (idx < this.size) {
      updateColor(arr, idx - 1, colors.travel);
      await sleep(delay - 20);
      let maxIdx = idx;
      if (2 * idx <= this.size) {
        if (this.heap[2 * idx] > this.heap[maxIdx]) {
          maxIdx = 2 * idx;
        }
      }
      if (2 * idx + 1 <= this.size) {
        if (this.heap[2 * idx + 1] > this.heap[maxIdx]) {
          maxIdx = 2 * idx + 1;
        }
      }
      if (maxIdx == idx) {
        updateColor(arr, idx - 1, colors.blocker);
        await sleep(delay - 70);
        break;
      } else {
        this.swap(maxIdx, idx);
        swap(arr, maxIdx - 1, idx - 1);
        await updateHeight(arr, maxIdx - 1);
        await updateHeight(arr, idx - 1);
        updateColor(arr, idx - 1, colors.blocker);
        idx = maxIdx;
      }
    }
  }

  upheapifyHelper(val) {
    let len = this.heap.length;
    this.heap[len] = val;
    this.size++;
    let idx = len;
    while (idx > 1) {
      let par = Math.floor(idx / 2);
      if (this.heap[par] < this.heap[idx]) {
        this.swap(par, idx);
      }
      idx = par;
    }
  }

  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}
