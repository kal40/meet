import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents />", () => {
  let NumberOfEventsWrapper, numberOfEventsInput;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents numberOfEvents={32} updateNumberOfEvents={() => {}} />
    );
    numberOfEventsInput = NumberOfEventsWrapper.find(".number-of-events");
  });

  test("<NumberOfEvents /> and numberOfEvents-input are both rendered", () => {
    expect(NumberOfEventsWrapper).toBeDefined();
    expect(numberOfEventsInput).toBeDefined();
  });

  test("numberOfEvents-input is 32 (number type) by default", () => {
    expect(NumberOfEventsWrapper.find("input").prop("type")).toBe("number");
    expect(NumberOfEventsWrapper.find("input").prop("value")).toEqual(32);
  });
});
