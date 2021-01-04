import React, { Component } from "react";
import axios from "axios";
import AutoComplete from "../google/autoComplete";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: this.props.theEvent.eventName,
      description: this.props.theEvent.description,
      category: this.props.theEvent.category,
      startDate: this.props.theEvent.startDate,
      endDate: this.props.theEvent.endDate,
      lng: this.props.theEvent.lng,
      lat: this.props.theEvent.lat,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const eventName = this.state.eventName;
    const description = this.state.description;
    const category = this.state.category;
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const lng = this.state.lng;
    const lat = this.state.lat;

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/events/${this.props.theEvent._id}`,
        {
          eventName,
          description,
          category,
          startDate,
          endDate,
          lng,
          lat,
        }
      )
      .then(() => {
        this.props.getTheEvent();
        // after submitting the form, redirect to '/events'
        this.props.history.push("/events");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setCoord = (coordObj) => {
    console.log("coord in parent: ", coordObj);
    this.setState(
      {
        lng: coordObj.lng,
        lat: coordObj.lat,
      },
      () => console.log("state in add event", this.state)
    );
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={this.state.eventName}
            onChange={(event) => this.handleChange(event)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={(event) => this.handleChange(event)}
          />

          <label>Category:</label>
          <textarea
            name="category"
            value={this.state.category}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Start Date</label>
          <input
            name="startDate"
            type="date"
            value={this.state.startDate}
            onChange={(e) => this.handleChange(e)}
          ></input>

          <label>End Date</label>
          <input
            name="endDate"
            type="date"
            value={this.state.endDate}
            onChange={(e) => this.handleChange(e)}
          ></input>

          {<AutoComplete getCoord={(coordObj) => this.setCoord(coordObj)} />}

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditEvent;
