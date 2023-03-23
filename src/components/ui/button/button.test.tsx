import { fireEvent, screen, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Direction } from "../../../types/direction";
import { Button } from "./button";

describe("Button testing |", () => {
  it("Button with text", () => {
    const tree = renderer.create(<Button text="text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("disabled Button", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with loader", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with sorting ascending", () => {
    const tree = renderer
      .create(<Button sorting={Direction.Ascending} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with sorting descending", () => {
    const tree = renderer
      .create(<Button sorting={Direction.Descending} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with linkedList - big", () => {
    const tree = renderer.create(<Button linkedList="big" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with linkedList - small", () => {
    const tree = renderer.create(<Button linkedList="small" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button callback test", () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack} />);
    fireEvent.click(screen.getByRole("button"));
    expect(callBack).toHaveBeenCalled();
  });
});
