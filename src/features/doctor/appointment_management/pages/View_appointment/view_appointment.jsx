import React from "react";
import PropTypes from "prop-types";
import Calendar from "../../components/View_calendar_List/appointment";
// import Header from "../../../../component/header/index";
// import Sidebar from "../../dataSidebar";
View_calendar.propTypes = {};

function View_calendar(props) {
  const patient = [
    {
      id: "BN01",
      name: "Trần Minh Tú",
      date: "03/07/2025",
      time: "14H",
    },
    {
      id: "BN02",
      name: "Trần Đại Huân",
      date: "03/05/2025",
      time: "8H",
    },
  ];
  return (
    <div>
      <Calendar dataPatient={patient} />
    </div>
  );
}

export default View_calendar;
