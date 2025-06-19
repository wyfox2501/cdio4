import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Doctor from "../../../../../images/dfc9485ada0eb3d69b67423762f56ba8.jpg"

home_appointment_management.propTypes = {};

function home_appointment_management(props) {
  return (
    <div>
     
        <div className="container">
          <img src={Doctor} alt="" />
        </div>
      
    </div>
  );
}

export default home_appointment_management;
