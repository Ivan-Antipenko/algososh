import React, { useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./class";

class TItem {
  value!: string;
  color!: ElementStates;
}
export const defaultValues = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue(defaultValues));
  const [queueArr, setQueueArr] = useState(queue.arr);
  const [inputState, setInputState] = useState("");
  const [isAddLoad, setAddLoad] = useState(false);
  const [isRemoveLoad, setRemoveLoad] = useState(false);

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  const clearInput = () => {
    setInputState("");
  };

  const clearArr = () => {
    queue.clearArr();
    setQueueArr(queue.elements());
  };

  const addEl = async () => {
    setAddLoad(true);
    queue.push({ value: inputState, color: ElementStates.Changing });
    setQueueArr([...queue.arr]);
    clearInput();
    await delay(SHORT_DELAY_IN_MS);
    queue.getLastEl().color = ElementStates.Default;
    setQueueArr([...queue.arr]);
    setAddLoad(false);
  };

  const deleteEl = async () => {
    setRemoveLoad(true);
    queue.getFirstEl().color = ElementStates.Changing;
    setQueueArr([...queue.arr]);
    await delay(SHORT_DELAY_IN_MS);
    queue.getFirstEl().color = ElementStates.Default;
    queue.pop();
    setQueueArr([...queue.arr]);
    setRemoveLoad(false);
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
          <Button
            extraClass="addButton"
            text="Добавить"
            onClick={addEl}
            disabled={!inputState}
            isLoader={isAddLoad}
          />
          <Button
            extraClass="removeButton"
            text="Удалить"
            onClick={deleteEl}
            disabled={queue.isEmpty() || isAddLoad}
            isLoader={isRemoveLoad}
          />
          <Button
            extraClass="clearButton"
            text="Очистить"
            onClick={clearArr}
            disabled={queue.isEmpty() || isAddLoad || isRemoveLoad}
          />
        </div>
      </div>
      <ul className={styles.circle_list}>
        {queueArr?.map((el, index) => (
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
