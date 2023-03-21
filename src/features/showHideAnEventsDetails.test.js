import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the main page was open", () => {});

    when("the user see list of events are loaded", () => {});

    then("the details of the events are invisible", () => {
      const detailsButton = EventWrapper.find("button.details-btn");
      expect(EventWrapper.state("collapsed")).toBe(true);
      expect(detailsButton).toBeDefined();
      expect(detailsButton.text()).toBe("show details");
      expect(EventWrapper.find("h3.about")).toHaveLength(0);
      expect(EventWrapper.find("a.link")).toHaveLength(0);
      expect(EventWrapper.find("p.description")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    and,
    then,
  }) => {
    given("the main page was open", () => {});

    when("the user see list of events are loaded", () => {});

    and("click on the “Show Details” button on any of the event card", () => {
      const detailsButton = EventWrapper.find("button.details-btn");
      detailsButton.simulate("click");
    });

    then(
      "specific event is being expanded with details and the „Show Details” button is replace by the „Hide Details” button",
      () => {
        expect(EventWrapper.find("h3.about")).toHaveLength(1);
        expect(EventWrapper.find("a.link")).toHaveLength(1);
        expect(EventWrapper.find("p.description")).toHaveLength(1);
        expect(EventWrapper.state("collapsed")).toBe(false);
        expect(EventWrapper.find("button.details-btn").text()).toBe(
          "hide details"
        );
      }
    );
  });

  test("User can collapse an event to hide its details", ({
    given,
    and,
    when,
    then,
  }) => {
    given("the main page was open", () => {});

    and(
      "the user clicked on the “Show Details” button on any of the event card",
      () => {}
    );

    when(
      "user clicks on the “Hide Details” button on any of the event cards that were clicked in the previous step",
      () => {
        const detailsButton = EventWrapper.find("button.details-btn");
        detailsButton.simulate("click");
      }
    );

    then(
      "the specific event is being collapsed and the event card will be shown without details",
      () => {
        expect(EventWrapper.state("collapsed")).toBe(true);
        expect(EventWrapper.find("h3.about")).toHaveLength(0);
        expect(EventWrapper.find("a.link")).toHaveLength(0);
        expect(EventWrapper.find("p.description")).toHaveLength(0);
        expect(EventWrapper.find("button.details-btn").text()).toBe(
          "show details"
        );
      }
    );
  });
});
