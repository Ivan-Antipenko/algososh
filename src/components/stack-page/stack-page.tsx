import React, { useEffect, useState } from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TItem = {
  value: string;
  color: ElementStates;
};

class Stack<T> {
  arr: TItem[] = [];

  push = (el: TItem) => {
    this.arr.push(el);
  };

  pop = () => {
    this.arr.pop();
  };

  clear = () => {
    this.arr = [];
  };

  get lastEl(): TItem {
    return this.arr[this.arr.length - 1];
  }

  elements = () => this.arr;

  size = () => this.arr.length;
}

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<TItem>());
  const [stackArr, setStackArr] = useState<TItem[]>(stack.arr);
  let [inputState, setInputState] = useState("");

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((inputState = evt.target.value));
  };

  const clearInput = () => {
    setInputState("");
  };

  const addEl = async () => {
    stack.push({ value: inputState, color: ElementStates.Changing });
    setStackArr([...stack.elements()]);
    clearInput();
    await delay(SHORT_DELAY_IN_MS);
    stack.lastEl.color = ElementStates.Default;
    setStackArr([...stack.elements()]);
  };

  const deleteEl = async () => {
    stack.lastEl.color = ElementStates.Changing;
    setStackArr([...stack.elements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.elements()]);
  };

  const clearArr = () => {
    stack.clear();
    setStackArr([...stack.elements()]);
  };

  const takeTop = (index: number, arr: TItem[]): string | null => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return null;
    }
  };

  return (
    <SolutionLayout title="Стек">
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
        {stackArr?.map((el: any, index: number) => (
          <li key={index}>
            <Circle
              letter={el.value}
              state={el.color}
              head={takeTop(index, stackArr)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
