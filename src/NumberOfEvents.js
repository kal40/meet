import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    errorText: "",
    numberOfEvents: this.props.numberOfEvents,
  };
  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 32) {
      this.setState({
        errorText: "Please specify a number between 1-32.",
      });
    } else {
      this.props.updateEvents(undefined, value);
      this.setState({
        errorText: "",
        numberOfEvents: value,
      });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <h3>Number of Events:</h3>
        <input
          className="number-of-events"
          type="number"
          value={this.state.numberOfEvents}
          onChange={(event) => {
            this.handleInputChanged(event);
          }}
        ></input>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
