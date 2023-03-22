import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    errorText: "",
  };
  handleInputChanged = (event) => {
    if (event.target.value < 1 || event.target.value > 32) {
      this.setState({
        errorText: "Please specify a number between 1-32.",
      });
    } else {
      this.props.updateEvents(undefined, event.target.value);
      this.setState({
        errorText: "",
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
          value={this.props.numberOfEvents}
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
