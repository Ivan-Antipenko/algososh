import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TSortArr = {
  value: number;
  color: ElementStates;
};

const createRandomArr = (
  setSortArray: Dispatch<SetStateAction<TSortArr[]>>,
  sortArray: TSortArr[]
) => {
  const randomArr = [];
  const lenLimit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
  for (let i = 0; i <= lenLimit; i++) {
    randomArr.push({
      value: Math.floor(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  setSortArray((sortArray = randomArr));
};

const startingChoiseAscending = async (
  arr: TSortArr[],
  setSortArray: Dispatch<SetStateAction<TSortArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);

  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value <= tmp) {
        tmp = arr[j].value;
        jIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    if (tmp < arr[i].value) {
      arr[jIndex].value = arr[i].value;
      arr[i].value = tmp;
    }
    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
};

const startingChoiseDescending = async (
  arr: TSortArr[],
  setSortArray: Dispatch<SetStateAction<TSortArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);

  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value >= tmp) {
        tmp = arr[j].value;
        jIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    if (tmp > arr[i].value) {
      arr[jIndex].value = arr[i].value;
      arr[i].value = tmp;
    }
    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
};

const startingBubbleAscending = async (
  arr: TSortArr[],
  setSortArray: Dispatch<SetStateAction<TSortArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value > arr[j + 1].value) {
        const tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      }
      arr[j].color = ElementStates.Default;
    }

    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
};

const startingBubbleDescending = async (
  arr: TSortArr[],
  setSortArray: Dispatch<SetStateAction<TSortArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value < arr[j + 1].value) {
        const tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      }
      arr[j].color = ElementStates.Default;
    }

    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
};

export const SortingPage: React.FC = () => {
  const [sortArray, setSortArray] = useState<TSortArr[]>([]);
  const [radioType, setRadioType] = useState("choise");
  const [sortType, setSortType] = useState<Direction>();
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    return createRandomArr(setSortArray, sortArray);
  }, []);

  const changeRadioChoise = () => {
    setRadioType("choise");
  };

  const changeRadioBubble = () => {
    setRadioType("bubble");
  };

  const changeSortType = (sorting: Direction) => {
    setSortType(sorting);
    if (sortType === Direction.Ascending && radioType === "choise") {
      startingChoiseAscending(sortArray, setSortArray, setLoad);
    }
    if (sortType === Direction.Descending && radioType === "choise") {
      startingChoiseDescending(sortArray, setSortArray, setLoad);
    }
    if (sortType === Direction.Ascending && radioType === "bubble") {
      startingBubbleAscending(sortArray, setSortArray, setLoad);
    }
    if (sortType === Direction.Descending && radioType === "bubble") {
      startingBubbleDescending(sortArray, setSortArray, setLoad);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.all_buttons_wrapper}>
        <div className={styles.radio_wrapper}>
          <RadioInput
            label="Выбор"
            checked={radioType === "choise"}
            onChange={changeRadioChoise}
            disabled={isLoad}
          />
          <RadioInput
            label="Пузырёк"
            checked={radioType === "bubble"}
            onChange={changeRadioBubble}
            disabled={isLoad}
          />
        </div>

        <div className={styles.directions_wrapper}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoad}
            onClick={() => changeSortType(Direction.Ascending)}
            disabled={isLoad}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => changeSortType(Direction.Descending)}
            disabled={isLoad}
          />
        </div>

        <div>
          <Button
            extraClass={styles.array_button}
            text="Новый массив"
            onClick={() => createRandomArr(setSortArray, sortArray)}
            disabled={isLoad}
          />
        </div>
      </div>

      <div className={styles.columns_list_wrapper}>
        <ul className={styles.columns_list}>
          {sortArray?.map((el, index) => (
            <li key={index}>
              <Column index={el.value} state={el.color} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
