import React, { Component } from "react";
import axios from "axios";
import service from "../../api/service";

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: "",
      model: "",
      year: "",
      seats: 0,
      imageUrl: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // this method handles just the file upload
  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("${process.env.REACT_APP_BACKEND_URL}/vehicles", this.state, {
        withCredentials: true,
      })
      .then(() => {
        this.props.getVehicle();
        this.setState({
          vehicleType: "",
          model: "",
          year: "",
          seats: 0,
          imageUrl: "",
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Vehicle</label>
          <input
            type="text"
            name="vehicleType"
            value={this.state.vehicleType}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={this.state.model}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={this.state.year}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Seats</label>
          <input
            type="number"
            name="seats"
            value={this.state.seats}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddVehicle;
