import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const calcFibonacci = (str: string) => {
  const num = Number(str);
  let fibArr = ["1", "1"];
  for (let i = 2; i < num + 1; i++) {
    let prev1 = Number(fibArr[i - 1]);
    let prev2 = Number(fibArr[i - 2]);
    let res = prev1 + prev2;
    fibArr.push(String(res));
  }
  return fibArr;
};

const showFibArr = async (
  arr: string[],
  setResultArr: Dispatch<SetStateAction<string[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) => {
  for (let i = 0; i <= arr.length - 1; i++) {
    setLoad(true);
    await delay(SHORT_DELAY_IN_MS);
    setResultArr(arr.slice(0, i + 1));
  }
  setLoad(false);
};

export const FibonacciPage: React.FC = () => {
  let [inputState, setInputState] = useState("");
  let [resultArr, setResultArr] = useState<string[]>([]);
  let [isLoad, setLoad] = useState(false);

  const changeValueInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((inputState = evt.target.value));
  };

  const runFibCalc = () => {
    showFibArr(calcFibonacci(inputState), setResultArr, setLoad);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input_button_wrapper}>
        <Input
          min={1}
          max={19}
          isLimitText={true}
          type="number"
          onChange={changeValueInput}
        />
        <Button
          text="Рассчитать"
          onClick={runFibCalc}
          disabled={!inputState}
          isLoader={isLoad}
        />
      </div>
      <ul className={styles.circle_list}>
        {resultArr?.map((el: string, index: number) => (
          <li key={index}>
            <Circle letter={el} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
