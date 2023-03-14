import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents />", () => {
  let NumberOfEventsWrapper, numberOfEventsInput;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    numberOfEventsInput = NumberOfEventsWrapper.find(
      "input.numberOfEvents-input"
    );
  });

  test("<NumberOfEvents /> and numberOfEvents-input are both rendered", () => {
    expect(NumberOfEventsWrapper).toBeDefined();
    expect(numberOfEventsInput).toBeDefined();
  });

  test("numberOfEvents-input is 10 (number type) by default", () => {
    expect(
      NumberOfEventsWrapper.find("input.numberOfEvents-input").prop("type")
    ).toBe("number");
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
  });

  test("numberOfEvents-input is changed and the value is reflected correctly", () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
    NumberOfEventsWrapper.find("input.numberOfEvents-input").simulate(
      "change",
      {
        target: { value: 15 },
      }
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(15);
  });
});
