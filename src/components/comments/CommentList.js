import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import AddEvent from "./AddEvent";

class CommentList extends Component {
  constructor() {
    super();
    this.state = { listOfComments: [] };
  }

  getAllCommentsFromEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/events`)
      .then((responseFromApi) => {
        this.setState({
          listOfEvents: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getAllEvents();
  }

  render() {
    return (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfEvents.map((event) => {
            return (
              <div key={event._id}>
                <Link to={`/events/${event._id}`}>
                  <h3>{event.eventName}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{event.description} </p> */}
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <AddEvent getEvent={this.getAllEvents} />
        </div>
        {/* <div>
          <AddComment getComment={this.getAllComments} />
        </div> */}
      </div>
    );
  }
}

export default EventList;
