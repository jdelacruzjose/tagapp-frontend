import React, { Component } from "react";
import axios from "axios";

class EditVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: this.props.theVehicle.vehicleType,
      model: this.props.theVehicle.model,
      year: this.props.theVehicle.year,
      seats: this.props.theVehicle.seats
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const vehicleType = this.state.vehicleType;
    const model = this.state.model;
    const year = this.state.year;
    const seats = this.state.seats;

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/events/${this.props.theVehicle._id}`,
        {
            vehicleType,
            model,
            year,
            seats
        }
      )
      .then(() => {
        this.props.getTheVehicle();
        // after submitting the form, redirect to '/events'
        this.props.history.push("/vehicles");
      })
      .catch(error => console.log(error));
  };

  handleChangeVehicleType = event => {
    this.setState({
      vehicleType: event.target.value
    });
  };

  handleChangeModel = event => {
    this.setState({
      model: event.target.value
    });
  };

  handleChangeYear = event => {
    this.setState({
      year: event.target.value
    });
  };

  handleChangeSeats = event => {
    this.setState({
      seats: event.target.value
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={this.state.vehicleType}
            onChange={event => this.handleChangeVehicleType(event)}
          />

          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={this.state.model}
            onChange={event => this.handleChangeModel(event)}
          />

          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={this.state.year}
            onChange={e => this.handleChangeYear(e)}
          />

          <label>Seats:</label>
          <input
            type="text"
            name="seats"
            value={this.state.seats}
            onChange={e => this.handleChangeSeats(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditVehicle;