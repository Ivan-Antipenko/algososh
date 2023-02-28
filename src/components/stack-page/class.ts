export class Stack<T> {
  arr: T[] = [];

  push = (el: T) => {
    this.arr.push(el);
  };

  pop = () => {
    this.arr.pop();
  };

  clear = () => {
    this.arr = [];
  };

  get lastEl(): T {
    return this.arr[this.arr.length - 1];
  }

  elements = () => this.arr;

  size = () => this.arr.length;
}
