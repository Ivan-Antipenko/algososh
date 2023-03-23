import styles from "./string.module.css";
import React, { useState, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

type TStringArr = {
  value: string;
  color: ElementStates;
};

export const reverseString = async (
  arr: TStringArr[],
  setLoad: Dispatch<SetStateAction<boolean>>,
  setResultArr: Dispatch<SetStateAction<TStringArr[]>>
) => {
  setLoad(true);

  let mid = Math.floor(arr.length / 2);

  for (let i = 0; i < mid; i++) {
    let len = arr.length - 1;

    if (i !== len - i) {
      arr[i].color = ElementStates.Changing;
      arr[len - i].color = ElementStates.Changing;
      setResultArr([...arr]);
      await delay(DELAY_IN_MS);
    }
    let tmp1 = arr[i];
    let tmp2 = arr[len - i];
    arr[i] = tmp2;
    arr[i].color = ElementStates.Modified;
    arr[len - i] = tmp1;
    arr[len - i].color = ElementStates.Modified;
  }
  arr[mid].color = ElementStates.Modified;
  setResultArr([...arr]);

  setLoad(false);
};

export const StringComponent: React.FC = () => {
  const [inputState, setInputState] = useState("");
  const [resultArr, setResultArr] = useState<TStringArr[]>([]);
  const [isLoad, setLoad] = useState(false);

  const changeValueInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  const deployString = () => {
    const tmpArr = inputState
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    reverseString(tmpArr, setLoad, setResultArr);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input_button_wrapper}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={inputState}
          onChange={changeValueInput}
        />
        <Button
          text="Развернуть"
          onClick={deployString}
          isLoader={isLoad}
          disabled={!inputState}
        />
      </div>
      <ul className={styles.circle_list}>
        {resultArr?.map((el, index) => (
          <li key={index}>
            <Circle letter={el.value} state={el.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
