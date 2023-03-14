import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = { numberOfEvents: 10 };

  componentDidMount() {
    this.setState({ numberOfEvents: this.props.numberOfEvents || 10 });
  }

  changeNumberOfEvents(value) {
    this.setState({ numberOfEvents: value });
  }

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="NumberOfEvents">
        <h3>Number of Events:</h3>
        <input
          className="numberOfEvents-input"
          type="number"
          value={numberOfEvents}
          onChange={(event) => {
            this.changeNumberOfEvents(event.target.value);
          }}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
