import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import history from "../../history";
import '../css-folder/loginApp.css';
import BodyClassName from 'react-body-classname';
import TagLogoAlt from '../css-folder/images/LogoMakr_4NKy7z.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then(response => {
        console.log("WE LOGGED IN AND HERES THE USER ", response);
        this.setState({ username: "", password: "" });
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
        <BodyClassName className="inside"></BodyClassName>
        <div className="theLoginBox">  
          <div className="theLogin">
          <Link to={"/"}> 
          <img src ={TagLogoAlt} className="logo" />
          </Link>
            <form onSubmit={this.handleFormSubmit}>
              <p>Username:</p>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
              <p>Password:</p>
              <input 
                type="password"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <button className="btn btn-primary btn-block" 
              type="submit">Log In</button>

            </form>
            <br />
          </div>
        </div>
            <p>
             <br />
              Don't have account?
              <Link to={"/signup"}> Signup!</Link>
            </p>
      </div>
    );
  }
}

export default Login;
