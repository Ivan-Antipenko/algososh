import { ElementStates } from "../../types/element-states";

class ListNode<T> {
  value!: T | string;
  color!: ElementStates;
}

export class List<T> {
  constructor(givenArr: ListNode<T>[]) {
    this.arr = givenArr;
  }
  arr: ListNode<T>[] = [];
  head = 0;
  tail = this.arr.length - 1;

  pushInHead = (el: ListNode<T>) => {
    this.arr.unshift(el);
  };

  removeHead = () => {
    this.arr.shift();
  };

  pushInTail = (el: ListNode<T>) => {
    this.arr.push(el);
  };

  removeTail = () => {
    this.arr.pop();
  };

  pushByIndx = (el: ListNode<T>, position: string) => {
    const num = Number(position);
    return this.arr.splice(num, 0, el);
  };

  removeByIndx = (position: string) => {
    const num = Number(position);
    return this.arr.splice(num, 1);
  };

  getLastEl = (): ListNode<T> => {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (this.arr[i].value != "") {
        return this.arr[i];
      }
    }
    return this.arr[0];
  };

  setAllElDefaultCollor = () => {
    for (let i = 0; i <= this.arr.length - 1; i++) {
      this.arr[i].color = ElementStates.Default;
    }
  };

  setHead = () => {
    this.head = 0;
  };

  setTail = () => {
    this.tail = this.arr.length - 1;
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  isEmpty = () => {
    return this.arr.length === 0;
  };
}
