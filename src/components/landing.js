import React from "react";
import './css-folder/landing.css';
import BodyClassName from 'react-body-classname';
import TagLogo from './css-folder/images/LogoMakr_1z6JBI.png';
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <div>
      <nav className="nav-style" id ="theText">
        <div className="userSign">
          <ul>
          <li>
            <img src ={TagLogo} className="logo" />
          </li>
          <li> <Link to="/login">
                Login
              </Link></li>
          <li>
            <Link to='/'></Link>
            <Link to="/signup">
              Signup
            </Link></li>
        </ul>
        </div>
      </nav>
      <div className ="mainHeader">
      <BodyClassName className="outside"></BodyClassName>
        <p>JOIN THE EXPERIENCE!</p>
      </div>
    </div>
  );
};

export default Landing;
