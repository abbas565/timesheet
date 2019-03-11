import React from "react";
import { shallow } from "enzyme";
import ThanksPage from "./ThanksPage";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const setUp = (props = { classes: "" }) => {
  const component = shallow(<ThanksPage.WrappedComponent {...props} />).dive();

  return component;
};

const findByTestAtrr = (component, atrr) => {
  const wrapper = component.find(`[data-test='${atrr}']`);
  return wrapper;
};

describe("<ThanksPage/> component test suit", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("only render without errors data-test=divdatatest", () => {
    const wrapper = findByTestAtrr(component, "divdatatest");
    expect(wrapper.length).toBe(1);
  });

  it("only render without errors data-test=paperdatatest", () => {
    const wrapper = findByTestAtrr(component, "paperdatatest");
    expect(wrapper.length).toBe(1);
  });

  it("renders <Typography /> components", (props = { classes: "" }) => {
    expect(component.find(Typography).length).toBe(2);
  });

  it("renders <FontAwesomeIcon /> components", (props = { classes: "" }) => {
    expect(component.find(FontAwesomeIcon).length).toBe(1);
  });

  it("renders <Paper /> components", (props = { classes: "" }) => {
    expect(component.find(Paper).length).toBe(1);
  });

  it("Render without errors and find .myclass", () => {
    expect(component.find(".myclass").length).toBe(1);
  });

  it("Render without errors and find .myclass", () => {
    expect(component.find(".myclass").length).toBe(1);
  });
});
