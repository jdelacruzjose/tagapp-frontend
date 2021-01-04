import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // REDIRECT
import EditEvent from "./EditEvent";
import "../css-folder/eventDetails.css";
import "../css-folder/carSeating.css";

import TheMap from "../google/maps";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theEvent: null,
    };
  }

  componentDidMount() {
    this.getSingleEvent();
  }

  getVehicle = (theInfo) => {
    console.log(theInfo);
    let theId = "";
    if (theInfo) {
      theId = theInfo.transportation[0];
    }
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/vehicles/${theId}`)
      .then((responseFromApi) => {
        console.log("responseFromApi: ", responseFromApi);
        const theSingleVehicle = responseFromApi.data;
        const numOfSeats = responseFromApi.seats;
        console.log(`The num of seats is ${numOfSeats}`);
        this.setState({
          numberSeats: numOfSeats,
        });
      });
  };

  getSingleEvent = async () => {
    const { params } = this.props.match;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/events/${params.id}`)
      .then((responseFromApi) => {
        const theEvent = responseFromApi.data;
        console.log("the event from EVentDetails.js: ", theEvent);
        this.setState(theEvent, () => {
          this.getVehicle(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  displaySeats = () => {
    let theContainer = document.getElementById("carContainer");
    let theDiv = document.createElement("div");
    theDiv.textContent = "Hello";
    console.log(theContainer);
    if (this.state.numberSeats > 0) {
      for (let i = 0; i < this.state.numberSeats; i++) {
        theContainer.innerHTML += `<div id="carSeat"><p>Seat # ${i}</p></div>`;
      }
    } else {
      return <div>NO SEATS AVAILABLE</div>;
    }
  };

  // DELETE EVENT:
  deleteEvent = () => {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}//events/${params.id}`)
      .then(() => {
        this.props.history.push("/events"); // !!!
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ownershipCheck = (event) => {
    if (
      this.props.loggedInUser &&
      event.owner === this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteEvent(this.state._id)}>
            Delete Event
          </button>
        </div>
      );
    }
  };

  renderEditForm = () => {
    if (!this.state.eventName) {
      // this.getSingleEvent();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return (
        <EditEvent
          theEvent={this.state}
          getTheEvent={this.getSingleEvent}
          {...this.props}
        />
      );
    }
  };

  render() {
    if (this.state !== null) {
      return (
        <div className="mainEventDetails">
          <div className="info">
            <h1>{this.state.eventName}</h1>
            <p>{this.state.description}</p>
            <p>{this.state.category}</p>
            {this.state.author && (
              <p>
                {this.state.author.firstName} {this.state.author.lastName}
              </p>
            )}

            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
            {/* <h3>{this.state.transportation}</h3> */}
            {/*   <p>{this.state.lat}</p>
          <p>{this.state.lng}</p> */}
            <img src={this.state.imageUrl} alt="boohoo" height="300" />
          </div>
          <TheMap className="theBigMap" theEvent={this.state} />

          <div>
            <h1>Your Vehicle</h1>
            {/* {this.state.transportation} */}

            <div id="carContainer">
              {this.state.numberSeats > 0 && this.displaySeats()}
            </div>
          </div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteEvent()}>Delete Event</button>
          <br />
          <div>{this.ownershipCheck(this.state)}</div>
          <Link to={"/events"}>Back to Events</Link>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default EventDetails;
