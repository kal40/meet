import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    infoText: "",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      this.setState({
        query: value,
        suggestions,
        showSuggestions: true,
        infoText: "",
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: "",
    });

    this.props.updateEvents(suggestion, undefined);
  };

  render() {
    return (
      <div className="CitySearch">
        <div
          className="position-absolute start-50 translate-middle-x"
          style={{ top: "167px" }}
        >
          <InfoAlert text={this.state.infoText} />
        </div>
        <Form.Group
          controlId="citySearch"
          className="mb-4"
          style={{ width: "14rem" }}
        >
          <Form.Control
            type="text"
            className="city"
            value={this.state.query}
            onChange={this.handleInputChanged}
            onFocus={() => {
              this.setState({ showSuggestions: true });
            }}
            onBlur={() =>
              setTimeout(() => {
                this.setState({ showSuggestions: false });
              }, 200)
            }
          />
        </Form.Group>
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: "none" }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
