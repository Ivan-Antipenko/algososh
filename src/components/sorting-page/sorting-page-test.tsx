import { ElementStates } from "../../types/element-states";
import {
  startingBubbleAscending,
  startingBubbleDescending,
  startingChoiseAscending,
  startingChoiseDescending,
} from "./sorting-page";

const setSortArray = jest.fn();
const setLoad = jest.fn();

const arrWithOneChar = [{ value: 1, color: ElementStates.Default }];
const testArrPrev = [
  { value: 8, color: ElementStates.Default },
  { value: 4, color: ElementStates.Default },
  { value: 9, color: ElementStates.Default },
  { value: 15, color: ElementStates.Default },
];

const testArrResultAscending = [
  { value: 4, color: ElementStates.Default },
  { value: 8, color: ElementStates.Default },
  { value: 9, color: ElementStates.Default },
  { value: 15, color: ElementStates.Default },
];

const testArrResultDescending = [
  { value: 15, color: ElementStates.Default },
  { value: 9, color: ElementStates.Default },
  { value: 8, color: ElementStates.Default },
  { value: 4, color: ElementStates.Default },
];

describe("sorting testing |", () => {
  it("sorting with an empty array", async () => {
    await startingChoiseAscending([], setLoad, setSortArray);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("sorting by ascending selection with one element", async () => {
    await startingChoiseAscending(arrWithOneChar, setLoad, setSortArray);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("sorting by descending selection with one element", async () => {
    await startingChoiseDescending(arrWithOneChar, setLoad, setSortArray);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("sort by descending bubble with one element", async () => {
    await startingBubbleDescending(arrWithOneChar, setLoad, setSortArray);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("sort by ascending bubble with one element", async () => {
    await startingBubbleAscending(arrWithOneChar, setLoad, setSortArray);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("sorting by selection in descending order", async () => {
    await startingChoiseDescending(testArrPrev, setLoad, setSortArray);
    expect(testArrPrev).toStrictEqual(testArrResultDescending);
  });

  it("sorting by selection in ascending order", async () => {
    await startingChoiseAscending(testArrPrev, setLoad, setSortArray);
    expect(testArrPrev).toStrictEqual(testArrResultAscending);
  });

  it("Bubble sorting in descending order", async () => {
    await startingBubbleDescending(testArrPrev, setLoad, setSortArray);
    expect(testArrPrev).toStrictEqual(testArrResultDescending);
  });

  it("Bubble sorting in ascending order", async () => {
    await startingBubbleAscending(testArrPrev, setLoad, setSortArray);
    expect(testArrPrev).toStrictEqual(testArrResultAscending);
  });
});
