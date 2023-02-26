import React, { useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TItem = {
  value: string;
  color: ElementStates;
};

class Queue<T> {
  arr = Array.from({ length: 7 }, () => ({
    value: "",
    color: ElementStates.Default,
  }));

  head = -1;
  tail = -1;
  turn = 0;

  push = (el: TItem) => {
    if (this.head === -1 && this.tail === -1 && this.turn != 0) {
      this.arr[this.turn] = el;
      this.tail = this.turn - 1;
      this.head = this.turn;
      this.turn++;
    } else {
      this.arr[this.turn] = el;
      this.turn++;
    }
    if (this.tail < 6) {
      this.tail++;
    }
    if (this.head < 0) {
      this.head++;
    }
  };

  pop = () => {
    this.arr[this.head].value = "";
    if (this.head != this.tail) {
      this.head++;
    } else {
      this.head = -1;
      this.tail = -1;
      this.turn--;
    }
  };

  getLastEl = (): any => {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (this.arr[i].value != "") {
        return this.arr[i];
      }
    }
  };

  getFirstEl = (): any => {
    for (let i = 0; i <= this.arr.length - 1; i++) {
      if (this.arr[i].value != "") {
        return this.arr[i];
      }
    }
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  clearArr = () => {
    this.head = -1;
    this.tail = -1;
    this.turn = 0;
    return (this.arr = Array.from({ length: 7 }, () => ({
      value: "",
      color: ElementStates.Default,
      head: false,
    })));
  };

  elements = () => this.arr;

  size = () => this.arr.length;
}

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<TItem>());
  const [queueArr, setQueueArr] = useState(queue.arr);
  let [inputState, setInputState] = useState("");

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((inputState = evt.target.value));
  };

  const clearInput = () => {
    setInputState("");
  };

  const clearArr = () => {
    queue.clearArr();
    setQueueArr(queue.elements());
  };

  const addEl = async () => {
    queue.push({ value: inputState, color: ElementStates.Changing });
    setQueueArr([...queue.arr]);
    clearInput();
    await delay(SHORT_DELAY_IN_MS);
    queue.getLastEl().color = ElementStates.Default;
    setQueueArr([...queue.arr]);
  };

  const deleteEl = async () => {
    queue.getFirstEl().color = ElementStates.Changing;
    setQueueArr([...queue.arr]);
    await delay(SHORT_DELAY_IN_MS);
    queue.getFirstEl().color = ElementStates.Default;
    queue.pop();
    setQueueArr([...queue.arr]);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.input_button_wrapper}>
        <Input
          maxLength={4}
          isLimitText={true}
          value={inputState}
          onChange={changeInput}
        />
        <div className={styles.buttons_wrapper}>
          <Button text="Добавить" onClick={addEl} disabled={!inputState} />
          <Button text="Удалить" onClick={deleteEl} />
          <Button text="Очистить" onClick={clearArr} />
        </div>
      </div>
      <ul className={styles.circle_list}>
        {queueArr?.map((el: TItem, index: number) => (
          <li key={index}>
            <Circle
              letter={el.value}
              state={el.color}
              index={index}
              tail={index === queue.getTail() ? "tail" : ""}
              head={index === queue.getHead() ? "head" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
