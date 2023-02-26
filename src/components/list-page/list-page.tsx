import React, { SetStateAction, useState } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TItem = {
  value: string;
  color: ElementStates;
  position?: number;
};

class List<T> {
  arr: TItem[] = [
    { value: "0", color: ElementStates.Default },
    { value: "34", color: ElementStates.Default },
    { value: "8", color: ElementStates.Default },
    { value: "1", color: ElementStates.Default },
  ];

  head = 0;
  tail = this.arr.length - 1;

  pushInHead = (el: TItem) => {
    this.arr.unshift(el);
  };

  removeHead = () => {
    this.arr.shift();
  };

  pushInTail = (el: TItem) => {
    this.arr.push(el);
  };

  removeTail = () => {
    this.arr.pop();
  };

  pushByIndx = (el: TItem, position: string) => {
    const num = Number(position);
    return this.arr.splice(num, 0, el);
  };

  removeByIndx = (position: string) => {
    const num = Number(position);
    return this.arr.splice(num, 1);
  };

  getLastEl = (): any => {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (this.arr[i].value != "") {
        return this.arr[i];
      }
    }
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
}

export const ListPage: React.FC = () => {
  const [list] = useState(new List<TItem>());
  const [listArr, setListArr] = useState(list.arr);

  let [inputState, setInputState] = useState("");
  let [inputIndxState, setInputIndxState] = useState("");
  let [smallCircle, setSmallCircle] = useState<TItem>({
    value: "",
    color: ElementStates.Changing,
    position: -1,
  });
  let [isbottomOper, setbottomOper] = useState(false);

  const setDefaultCircle = () => {
    setSmallCircle({
      value: "",
      position: -1,
      color: ElementStates.Changing,
    });
  };

  const clearInputs = () => {
    setInputIndxState((inputIndxState = ""));
    setInputState((inputState = ""));
  };

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((inputState = evt.target.value));
  };

  const changeIndxInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndxState((inputIndxState = evt.target.value));
  };

  const changeBottomOper = () => {
    setbottomOper((isbottomOper = !isbottomOper));
  };

  const addHeadEl = async () => {
    setSmallCircle({
      ...smallCircle,
      position: 0,
      value: inputState,
    });
    await delay(SHORT_DELAY_IN_MS);
    list.pushInHead({ value: inputState, color: ElementStates.Modified });
    setDefaultCircle();
    list.setTail();
    setListArr([...list.arr]);
    await delay(SHORT_DELAY_IN_MS);
    list.arr[list.head].color = ElementStates.Default;
    setListArr([...list.arr]);
    clearInputs();
  };

  const removeHeadEl = async () => {
    changeBottomOper();
    setSmallCircle({
      ...smallCircle,
      position: 0,
      value: list.arr[0].value,
    });
    await delay(SHORT_DELAY_IN_MS);
    list.removeHead();
    setDefaultCircle();
    changeBottomOper();
    list.setTail();
    setListArr([...list.arr]);
    clearInputs();
  };

  const addTailEl = async () => {
    setSmallCircle({
      ...smallCircle,
      position: list.arr.length - 1,
      value: inputState,
    });
    await delay(SHORT_DELAY_IN_MS);
    list.pushInTail({ value: inputState, color: ElementStates.Modified });
    list.setTail();
    setListArr([...list.arr]);
    setDefaultCircle();
    await delay(SHORT_DELAY_IN_MS);
    list.getLastEl().color = ElementStates.Default;
    setListArr([...list.arr]);
    clearInputs();
  };

  const removeTailEl = async () => {
    changeBottomOper();
    setSmallCircle({
      ...smallCircle,
      position: list.arr.length - 1,
      value: list.getLastEl().value,
    });
    list.getLastEl().value = "";
    setListArr([...list.arr]);
    await delay(SHORT_DELAY_IN_MS);
    list.removeTail();
    list.setTail();
    setListArr([...list.arr]);
    clearInputs();
    changeBottomOper();
  };

  const runAnimAddByIndx = async (num: number, end: number) => {
    for (let i = 0; i <= end; i++) {
      setSmallCircle({
        ...smallCircle,
        value: inputState,
        position: i,
      });
      await delay(SHORT_DELAY_IN_MS);
      list.arr[num].color = ElementStates.Changing;
      if (num < end) {
        num++;
      }
      setListArr([...list.arr]);
    }
  };

  const runAnimRemoveByIndx = async (end: number) => {
    for (let i = 0; i <= end; i++) {
      list.arr[i].color = ElementStates.Changing;
      setListArr([...list.arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    list.arr[end].color = ElementStates.Default;
    setSmallCircle({
      ...smallCircle,
      value: list.arr[end].value,
      position: end,
    });
    await delay(SHORT_DELAY_IN_MS);
  };

  const pushElByIndx = async () => {
    let num = 0;
    const end = Number(inputIndxState);
    await runAnimAddByIndx(num, end);
    setDefaultCircle();
    list.setAllElDefaultCollor();
    list.pushByIndx(
      { value: inputState, color: ElementStates.Modified },
      inputIndxState
    );
    list.setTail();
    setListArr([...list.arr]);
    await delay(SHORT_DELAY_IN_MS);
    list.arr[end].color = ElementStates.Default;
    setListArr([...list.arr]);
    clearInputs();
  };

  const removeByIndx = async () => {
    changeBottomOper();
    const end = Number(inputIndxState);
    await runAnimRemoveByIndx(end);
    list.removeByIndx(inputIndxState);
    list.setTail();
    setListArr([...list.arr]);
    setDefaultCircle();
    list.setAllElDefaultCollor();
    setListArr([...list.arr]);
    changeBottomOper();
    clearInputs();
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.input_button_wrapper}>
        <div className={styles.buttons_wrapper}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputState}
            onChange={changeInput}
          />
          <Button
            text="Добавить в head"
            onClick={addHeadEl}
            disabled={!inputState}
          />
          <Button
            text="Добавить в tail"
            disabled={!inputState}
            onClick={addTailEl}
          />
          <Button text="Удалить из head" onClick={removeHeadEl} />
          <Button text="Удалить из tail" onClick={removeTailEl} />
          <Input
            maxLength={4}
            type="number"
            value={inputIndxState}
            onChange={changeIndxInput}
            placeholder="Введите индекс"
          />
          <Button
            extraClass={styles.index_add}
            text="Добавить по индексу"
            disabled={!inputIndxState}
            onClick={pushElByIndx}
          />
          <Button
            extraClass={styles.index_remove}
            text="Удалить по индексу"
            disabled={!inputIndxState}
            onClick={removeByIndx}
          />
        </div>
      </div>
      <ul className={styles.circle_list}>
        {listArr?.map((el: TItem, index: number) => (
          <li className={styles.circles_box} key={index}>
            {smallCircle.position === index && (
              <Circle
                isSmall={true}
                letter={smallCircle.value}
                state={smallCircle.color}
                extraClass={`${isbottomOper && styles.bottom_circle}`}
              />
            )}
            <Circle
              extraClass={styles.default_circle}
              letter={el.value}
              state={el.color}
              index={index}
              tail={
                index === list.getTail() && index != smallCircle.position
                  ? "tail"
                  : ""
              }
              head={
                index === list.getHead() && index != smallCircle.position
                  ? "head"
                  : ""
              }
            />
            {index < listArr.length - 1 && (
              <div className={styles.arrow_box}>
                <ArrowIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
