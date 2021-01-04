import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import history from "../../history";
import service from "../../api/service";
import '../css-folder/signupApp.css';
import BodyClassName from 'react-body-classname';
import TagLogoAlt from '../css-folder/images/LogoMakr_4NKy7z.png';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
    };
    this.service = new AuthService();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then(response => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const imageUrl = this.state.imageUrl;

    this.service
      .signup(username, password, firstName, lastName, imageUrl)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          imageUrl: "",
        });
        this.props.getUser(response);
        history.push("/dashboard");
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="theSignUpBox">
          <div className="signupForm">
            <BodyClassName className="signUpBody"></BodyClassName>
           <Link to={"/"}> 
           <img src ={TagLogoAlt} className="logo" />
           </Link>
            <form onSubmit={this.handleFormSubmit}>
              <div className="nameLast">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={e => this.handleChange(e)}
                  />
                <br />  
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={e => this.handleChange(e)}
                  />
              </div>
              <br />
              {/* <p>New Username:</p> */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
              <br />
              {/* <p>New Password:</p> */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <p>Upload Profile Picture:</p>
              <input type="file" onChange={e => this.handleFileUpload(e)} />
              <br />
              <button className="btn btn-primary btn-block" type="submit">Submit</button>
            </form>
          </div> 
        </div> 
            <p>
            <br />
              Already have account?
              <Link to={"/login"}> Login</Link>
            </p>
      </div>
    );
  }
}

export default Signup;
