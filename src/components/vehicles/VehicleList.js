import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddVehicle from "./AddVehicle";
import BodyClassName from "react-body-classname";
import "../css-folder/createVehicle.css";

// import EditVehicle from "./EditVehicle"

class VehicleList extends Component {
  constructor() {
    super();
    this.state = { listOfVehicles: [], listOfVehiclesUserVehicles: [] };
  }

  // getVehiclesFromUser = () => {
  //   axios
  //     .get(`http://localhost:5000/api/vehicles`)
  //     .then((responseFromApi = {}));
  // };

  getAllVehicles = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/vehicles`)
      .then((responseFromApi) => {
        this.setState({
          listOfVehicles: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getAllVehicles();
  }

  render() {
    return (
      <div>
        <BodyClassName className="theeVehicle"></BodyClassName>
        <div className="vehicleContain">
          <div className="vehicleForm">
            <AddVehicle getVehicle={this.getAllVehicles} />
          </div>
          <div className="eventNames">
            {this.state.listOfVehicles.map((vehicle) => {
              return (
                <div key={vehicle._id}>
                  <Link to={`/vehicles/${vehicle._id}`}>
                    <h3>{vehicle.model}</h3>
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

export default VehicleList;
