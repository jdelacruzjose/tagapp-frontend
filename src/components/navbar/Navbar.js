import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/auth-service";
import '../css-folder/navbar.css';
import TagLogo from '../css-folder/images/LogoMakr_1z6JBI.png';
import BodyClassName from 'react-body-classname';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }
  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getTheUser(null);
    });
  };
  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
         <img src ={TagLogo} className="logo"/>
          <ul>
            <li>Welcome, {this.state.loggedInUser.firstName}</li>
            <li>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" style={{ textDecoration: "none" }}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                Vehicle
              </Link>
            </li>
           
            <li>
              <Link to="/">
                <button className="btn btn-primary btn-block" onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
       <React.Fragment></React.Fragment>
      );
    }
  }
}
export default Navbar;
