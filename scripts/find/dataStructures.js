// Queue class
class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  add(val) {
    this.queue.push(val);
    this.size++;
  }

  remove() {
    try {
      let removedVal = this.queue.shift();
      this.size--;
      return removedVal;
    } catch (err) {
      console.log(err);
    }
  }

  length() {
    return this.size;
  }

  peek() {
    try {
      let val = this.queue[0];
      return val;
    } catch (err) {
      console.log(err);
    }
  }
}
// Pair class
class Pair {
  constructor(row, col, arr, wt) {
    this.row = row;
    this.col = col;
    this.path = arr.slice();
    this.wt = wt;
    this.path.push([row, col]);
  }
}
//Priority Queue class
class PriorityQueue {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  add(pair) {
    this.heap[this.size] = pair;
    let idx = this.size;
    this.size++;
    while (idx > 0) {
      let par;
      if (idx % 2 == 0) {
        par = Math.floor(idx / 2) - 1;
      } else {
        par = Math.floor(idx / 2);
      }
      if (this.heap[par].wt > this.heap[idx].wt) {
        this.swap(par, idx);
      }
      idx = par;
    }
  }

  remove() {
    // try {
    let val = this.heap[0];
    this.swap(0, this.size - 1);
    this.size--;
    let idx = 0;
    while (idx < this.size - 1) {
      let minIdx = idx;
      let leftChild = idx * 2 + 1;
      let rightChild = idx * 2 + 2;
      if (leftChild <= this.size - 1) {
        if (this.heap[leftChild].wt > this.heap[idx].wt) {
          minIdx = idx;
        } else minIdx = leftChild;
      }
      if (rightChild <= this.size - 1) {
        if (this.heap[rightChild].wt < this.heap[minIdx].wt) {
          minIdx = rightChild;
        }
      }
      if (minIdx == idx) break;
      this.swap(idx, minIdx);
      idx = minIdx;
    }

    return val;
  }

  length() {
    return this.size;
  }

  swap(idx1, idx2) {
    let temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  }
}
