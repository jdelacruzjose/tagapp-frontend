import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css-folder/createEvent.css";
import BodyClassName from "react-body-classname";

import AddEvent from "./AddEvent";

class EventList extends Component {
  constructor() {
    super();
    this.state = { listOfEvents: [] };
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/events`)
      .then((responseFromApi) => {
        this.setState({
          listOfEvents: responseFromApi.data,
        });
      });
  };

  render() {
    return (
      <div>
        <BodyClassName className="theeEvent"></BodyClassName>
        <div className="eventContain">
          <div className="theForm">
            <AddEvent getEvent={this.getAllEvents} />
          </div>
          <div className="eventNames">
            {this.state.listOfEvents.map((event) => {
              return (
                <div key={event._id}>
                  <Link to={`/events/${event._id}`}>
                    <h3>{event.eventName}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
