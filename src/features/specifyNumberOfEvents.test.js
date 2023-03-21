import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import { getEvents } from "../api";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let NumberOfEventsWrapper, numberOfEventsInput;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents numberOfEvents={32} updateNumberOfEvents={() => {}} />
    );
    numberOfEventsInput = NumberOfEventsWrapper.find(".number-of-events");
  });

  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    given("the main page was open", () => {});

    when("user does not specify the number of events to be shown", () => {});

    then(
      "the user will receive the first 32 upcoming events on the screen",
      () => {
        expect(NumberOfEventsWrapper.find("input").prop("type")).toBe("number");
        expect(NumberOfEventsWrapper.find("input").prop("value")).toEqual(32);
      }
    );
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    const AppWrapper = mount(<App />);

    given("the main page was open", async () => {
      await getEvents();
    });

    when("user types on the number of events to be shown", async () => {
      const numberOfEventsInput = AppWrapper.find(NumberOfEvents).find("input");
      await numberOfEventsInput.simulate("change", {
        target: { value: 15 },
      });
    });

    then(
      "user will receive the “typed” number of upcoming events on the screen",
      () => {
        expect(AppWrapper.state("events")).toHaveLength(15);
        AppWrapper.unmount();
      }
    );
  });
});
