import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </>
    );
  }
}

export default EventList;
