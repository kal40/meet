import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    errorText: "",
    numberOfEvents: this.props.numberOfEvents,
  };
  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 100) {
      this.setState({
        errorText: "Please specify a number between 1-100.",
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
        <h4 className="mb-4">Number of Events:</h4>
        <div
          className="position-fixed start-50 translate-middle-x"
          style={{ top: "286px" }}
        >
          <ErrorAlert text={this.state.errorText} />
        </div>
        <Form.Group controlId="numberOfEvents" className="mb-4 ">
          <Form.Control
            className="number-of-events mx-auto"
            style={{ width: "5rem" }}
            type="number"
            value={this.state.numberOfEvents}
            onChange={(event) => {
              this.handleInputChanged(event);
            }}
          />
        </Form.Group>
      </div>
    );
  }
}

export default NumberOfEvents;
