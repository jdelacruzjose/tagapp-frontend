import React, { Component } from "react";
import UserEvents from "./events/UserEvents";
import Concerts from "./concerts/concert";
import EventCountdown from "./events/EventCountdown";

import Countdown from "./events/test";
import axios from "axios";
import { throws } from "assert";
import BodyClassName from "react-body-classname";
import "./css-folder/fullDashboard.css";
import Footer from "../components/footer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: "",
      userLng: "",
      listOfEvents: [],
      nextEventObj: "",
      nextEventDate: "",
    };
  }

  componentDidMount() {
    this.getAllEvents();
    //this.getCurrentPosition()
  }

  getCurrentPosition = () => {
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition(
      (position) => {
        // console.log(`user lat: ${position.coords.latitude}`);
        // console.log(`user lng: ${position.coords.longitude}`);
        this.setState(
          {
            userLat: position.coords.latitude,
            userLng: position.coords.longitude,
          },
          () => {
            // console.log(this.state)
          }
        );
      },
      () => {
        console.log(new Error("Permission denied"));
      }
    );

    // console.log(this.state)
  };

  getAllEvents = () => {
    console.log("getAllEvents() working");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/events`)
      .then((responseFromApi) => {
        this.setState({
          listOfEvents: responseFromApi.data,
        });
      });
  };

  getNextEvent = () => {
    let copyOfEvents = this.state.listOfEvents;
    console.log("FROM DASBOARD getNextEvent => copyOfEvents: ", copyOfEvents);

    copyOfEvents = copyOfEvents.sort((a, b) =>
      parseFloat(a.startDate) > parseFloat(b.startDate) ? 1 : -1
    );

    let nextEvent = copyOfEvents[0];

    console.log("FROM DASHBOARD getNextEvent => nextEvent is: ", nextEvent);
    console.log(
      `FROM DASHBOARD getNextEvent => the getNext event date is: `,
      nextEvent.startDate
    );

    return nextEvent;
  };

  render() {
    this.getCurrentPosition();
    if (this.props.currentUser) {
      return (
        <div id="myNextBackground">
          <div className="myEvents">
            <div className="myTest">
              <BodyClassName className="theedashboard"></BodyClassName>
              <UserEvents myUser={this.props.currentUser} />
            </div>
            <div>
              {/* <EventCountdown /> */}
              {/* {<Countdown date={`${year}-12-24T00:00:00`} />} */}
              <div id="carContainer">
                {this.state.listOfEvents > 0 && this.displayEventInfo()}
              </div>
              {this.state.listOfEvents.length > 0 ? (
                <Countdown date={this.getNextEvent()} />
              ) : (
                <div>Not Working</div>
              )}
            </div>
            {this.state.userLat !== "" ? (
              <Concerts getUserCoords={this.state} />
            ) : (
              <div class="loader">Loading...</div>
            )}
            <div>
              <Footer />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="myNextBackground">
          <div className="myNextEvent">
            <div>
              <UserEvents />
            </div>
            <div>
              <EventCountdown />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
