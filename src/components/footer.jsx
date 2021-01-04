import React from "react";
import TagLogo from './css-folder/images/LogoMakr_1z6JBI.png';
import './css-folder/fullDashboard.css';


const Footer = () => {
  return (
    <div className="theFooter">
    <img src ={TagLogo} className="logo" />
    <p>© Tag Along LLC</p>
    </div>
  );
};

export default Footer;
