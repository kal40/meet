import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class Event extends Component {
  state = { collapsed: true };
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <Card
        style={{ width: "60rem" }}
        className="my-3 mx-auto shadow-sm p-3 rounded-2 text-ligth"
      >
        <Card.Body>
          <Card.Title>{event.summary}</Card.Title>
          <Card.Text>
            <p className="start">{event.start.dateTime}</p>
            <p className="location">{`Location: ${event.location}`}</p>
            {!collapsed && (
              <div className="event__Details">
                <h3 className="about">About this event:</h3>
                <a
                  className="link"
                  href={event.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See details on Google Calendar
                </a>
                <p className="description">{event.description}</p>
              </div>
            )}
          </Card.Text>
          <Button variant="primary text-light" onClick={this.toggleDetails}>
            {collapsed ? "Show" : "Hide"} Details
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Event;
