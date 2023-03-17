import React, { Component } from "react";

class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    this.props.updateEvents(undefined, event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <h3>Number of Events:</h3>
        <input
          className="number-of-events"
          type="number"
          value={this.props.numberOfEvents}
          onChange={(event) => {
            this.handleInputChanged(event);
          }}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
