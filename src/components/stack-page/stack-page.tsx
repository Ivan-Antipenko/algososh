import React, { useState } from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./class";

type TItem = {
  value: string;
  color: ElementStates;
};

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<TItem>());
  const [stackArr, setStackArr] = useState<TItem[]>(stack.arr);
  const [inputState, setInputState] = useState("");
  const [isAddLoad, setAddLoad] = useState(false);
  const [isRemoveLoad, setRemoveLoad] = useState(false);

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  const clearInput = () => {
    setInputState("");
  };

  const addEl = async () => {
    setAddLoad(true);
    stack.push({ value: inputState, color: ElementStates.Changing });
    setStackArr([...stack.elements()]);
    clearInput();
    await delay(SHORT_DELAY_IN_MS);
    stack.lastEl.color = ElementStates.Default;
    setStackArr([...stack.elements()]);
    setAddLoad(false);
  };

  const deleteEl = async () => {
    setRemoveLoad(true);
    stack.lastEl.color = ElementStates.Changing;
    setStackArr([...stack.elements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.elements()]);
    setRemoveLoad(false);
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
          <Button
            extraClass="addButton"
            text="Добавить"
            onClick={addEl}
            isLoader={isAddLoad}
            disabled={!inputState}
          />
          <Button
            extraClass="removeButton"
            text="Удалить"
            onClick={deleteEl}
            disabled={stack.arr.length <= 0}
            isLoader={isRemoveLoad}
          />
          <Button
            extraClass="clearButton"
            text="Очистить"
            onClick={clearArr}
            disabled={stack.arr.length <= 0}
          />
        </div>
      </div>

      <ul className={styles.circle_list}>
        {stackArr?.map((el, index) => (
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
