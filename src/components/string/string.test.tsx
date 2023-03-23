import { ElementStates } from "../../types/element-states";
import { reverseString } from "./string";

const setResultArr = jest.fn();
const setLoad = jest.fn();

const arrWithEvenCharPrev = [
  { value: "a", color: ElementStates.Default },
  { value: "b", color: ElementStates.Default },
  { value: "c", color: ElementStates.Default },
  { value: "d", color: ElementStates.Default },
];

const arrWithEvenCharNext = [
  { value: "d", color: ElementStates.Modified },
  { value: "c", color: ElementStates.Modified },
  { value: "b", color: ElementStates.Modified },
  { value: "a", color: ElementStates.Modified },
];

describe("string testing |", () => {
  it("reverse with an even number of characters", async () => {
    const tmpArr = arrWithEvenCharPrev;
    await reverseString(tmpArr, setLoad, setResultArr);
    expect(arrWithEvenCharPrev).toStrictEqual(arrWithEvenCharNext);
  });

  it("reverse with an odd number of characters", async () => {
    const tmpArr = arrWithEvenCharPrev.splice(-1, 1);
    const tmpArr2 = arrWithEvenCharNext.splice(-1, 1);
    await reverseString(tmpArr, setLoad, setResultArr);
    expect(tmpArr).toStrictEqual(tmpArr2);
  });

  it("reverse with one character", async () => {
    const tmpArr = arrWithEvenCharPrev.splice(-1, 3);
    const tmpArr2 = arrWithEvenCharNext.splice(-1, 3);
    await reverseString(tmpArr, setLoad, setResultArr);
    expect(tmpArr).toStrictEqual(tmpArr2);
  });

  it("reverse with empty value", () => {
    const uglyArr = [{ value: "" }];
    const uglyArr2 = [{ value: "" }];
    expect(uglyArr).toStrictEqual(uglyArr2);
  });
});
