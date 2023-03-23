import React, { useState } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { List } from "./class";

type TItem = {
  value: string;
  color: ElementStates;
  position?: number;
};

export const ListPage: React.FC = () => {
  const defaultValues = [
    { value: "0", color: ElementStates.Default },
    { value: "34", color: ElementStates.Default },
    { value: "8", color: ElementStates.Default },
    { value: "1", color: ElementStates.Default },
  ];
  const [list] = useState(new List(defaultValues));
  const [listArr, setListArr] = useState(list.arr);
  const [inputState, setInputState] = useState("");
  const [disbledbttn, setDisabledBttn] = useState(false);
  const [inputIndxState, setInputIndxState] = useState("");
  const [isbottomOper, setbottomOper] = useState(false);
  const [isAddHead, setAddHead] = useState(false);
  const [isRemoveHead, setRemoveHead] = useState(false);
  const [isAddTail, setAddTail] = useState(false);
  const [isRemoveTail, setRemoveTail] = useState(false);
  const [isAddIndx, setAddIndx] = useState(false);
  const [isRemoveIndx, setRemoveIndx] = useState(false);
  const [isOperationStarted, setOperationStarted] = useState(false);
  const [smallCircle, setSmallCircle] = useState<TItem>({
    value: "",
    color: ElementStates.Changing,
    position: -1,
  });

  const setDefaultCircle = () => {
    setSmallCircle({
      value: "",
      position: -1,
      color: ElementStates.Changing,
    });
  };

  const clearInputs = () => {
    setInputIndxState("");
    setInputState("");
  };

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  const changeIndxInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndxState(evt.target.value);
    const num = Number(evt.target.value);
    if (num > list.arr.length) {
      setDisabledBttn(true);
    } else {
      setDisabledBttn(false);
    }
  };

  const changeBottomOper = () => {
    setbottomOper((isbottomOper) => !isbottomOper);
  };

  const addHeadEl = async () => {
    setOperationStarted(true);
    setAddHead(true);
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
    setAddHead(false);
    setOperationStarted(false);
  };

  const removeHeadEl = async () => {
    setOperationStarted(true);
    setRemoveHead(true);
    changeBottomOper();
    setSmallCircle({
      ...smallCircle,
      position: 0,
      value: list.arr[0].value,
    });
    await delay(SHORT_DELAY_IN_MS);
    clearInputs();
    list.removeHead();
    setDefaultCircle();
    list.setTail();
    setListArr([...list.arr]);
    changeBottomOper();
    setRemoveHead(false);
    setOperationStarted(false);
  };

  const addTailEl = async () => {
    setOperationStarted(true);
    setAddTail(true);
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
    setAddTail(false);
    setOperationStarted(false);
  };

  const removeTailEl = async () => {
    setOperationStarted(true);
    setRemoveTail(true);
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
    setRemoveTail(false);
    setOperationStarted(false);
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
    setOperationStarted(true);
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
    setOperationStarted(false);
  };

  const pushElByIndx = async () => {
    setOperationStarted(true);
    setAddIndx(true);
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
    setAddIndx(false);
    setOperationStarted(false);
  };

  const removeByIndx = async () => {
    setOperationStarted(true);
    setRemoveIndx(true);
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
    setRemoveIndx(false);
    setOperationStarted(false);
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
            extraClass="addHead"
            text="Добавить в head"
            onClick={addHeadEl}
            disabled={!inputState || isOperationStarted}
            isLoader={isAddHead}
          />
          <Button
            extraClass="addTail"
            text="Добавить в tail"
            disabled={!inputState || isOperationStarted}
            onClick={addTailEl}
            isLoader={isAddTail}
          />
          <Button
            extraClass="removeHead"
            text="Удалить из head"
            onClick={removeHeadEl}
            isLoader={isRemoveHead}
            disabled={list.isEmpty() || isOperationStarted}
          />
          <Button
            extraClass="removeTail"
            text="Удалить из tail"
            onClick={removeTailEl}
            isLoader={isRemoveTail}
            disabled={list.isEmpty() || isOperationStarted}
          />
          <Input
            extraClass="index_input"
            maxLength={4}
            type="number"
            value={inputIndxState}
            onChange={changeIndxInput}
            placeholder="Введите индекс"
          />
          <Button
            extraClass={`${styles.index_add} addIndex`}
            text="Добавить по индексу"
            disabled={!inputIndxState || !inputState || isOperationStarted}
            onClick={pushElByIndx}
            isLoader={isAddIndx}
          />
          <Button
            extraClass={`${styles.index_remove} removeIndex`}
            text="Удалить по индексу"
            disabled={!inputIndxState || disbledbttn || isOperationStarted}
            onClick={removeByIndx}
            isLoader={isRemoveIndx}
          />
        </div>
      </div>
      <ul className={styles.circle_list}>
        {listArr?.map((el, index) => (
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
