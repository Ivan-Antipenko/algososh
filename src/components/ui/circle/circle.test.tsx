import { fireEvent, screen, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("Circle testing |", () => {
  it("Circle without letter", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with letter", () => {
    const tree = renderer.create(<Circle letter="letter" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with head", () => {
    const tree = renderer.create(<Circle head="head" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with Circle in head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle tail", () => {
    const tree = renderer.create(<Circle tail="tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with Circle in tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with index", () => {
    const tree = renderer.create(<Circle index={777} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle props isSmall = true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
