import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: "all",
    numberOfEvents: 100,
    offlineText: "",
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    let isTokenValid;
    if (
      (accessToken && !navigator.onLine) ||
      window.location.href.startsWith("http://localhost")
    ) {
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
    const handleNetworkStateChange = () => {
      if (!navigator.onLine) {
        this.setState({
          offlineText:
            "The network is offline. During initial load or refresh the displayed list is loaded from the cache.",
        });
      } else {
        this.setState({
          offlineText: "",
        });
      }
    };

    handleNetworkStateChange();
    window.addEventListener("offline", handleNetworkStateChange);
    window.addEventListener("online", handleNetworkStateChange);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (
    location = this.state.selectedLocation,
    eventCount = this.state.numberOfEvents
  ) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
      });
    });
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <Row className="justify-content-center py-5">
          <Col md={9} className="mb-5 d-flex flex-column align-items-center">
            <h1 className="mb-4">Welcome to Meet App</h1>
            <div
              className="position-absolute start-50 translate-middle-x"
              style={{ top: "10px" }}
            >
              <WarningAlert text={this.state.offlineText} />
            </div>
            <h4 className="mb-4">Choose your nearest city</h4>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
            <NumberOfEvents
              numberOfEvents={this.state.numberOfEvents}
              updateEvents={this.updateEvents}
            />
          </Col>
        </Row>
        <Row className=" py-5 text-center">
          <h3 className="mb-4">Events in each city</h3>
          <Col>
            <EventGenre events={this.state.events} />
          </Col>
          <Col>
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 50, left: 0 }}
              >
                <CartesianGrid />
                <XAxis
                  type="category"
                  dataKey="city"
                  name="city"
                  angle="35"
                  minTickGap="2"
                  tick={{ textAnchor: "start" }}
                />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="number of events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            <EventList events={this.state.events} />
          </Col>
        </Row>
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
