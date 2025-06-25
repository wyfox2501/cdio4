import React from "react";
import PropTypes from "prop-types";
import "./styleSide.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import He from "../../../../../components/header/index";
Demo.propTypes = {
    managerList: PropTypes.array,
};
Demo.defaultProps ={
    managerList: [],
};

function Demo({managerList, viewList}) {
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isOn, setIsOn] = useState("#ffffff");
  const [activeLink, setActiveLink] = useState(null);
  const id = 1;
  //lên xún dropdown và đổi màu
  const toggleDropdown = (id) => {
    if (id===1){
        setIsOpen(!isOpen);
        setBgColor(isOpen ? "#ffffff" : "#DDF1F9");
    }
  };
  //đổi màu trong dropdowm
  const toggleColor = () => {
    setIsOn("#DDF1F9");
  };
  //đổi màu khi click chọn
  const handleClick = (id) => {
    setActiveLink(id); // Cập nhật thẻ đang được chọn
  };
  return (
    <div>
     <div className="sidebar">
      {managerList.map(data=>(
        <React.Fragment key={data.id}>
        <NavLink
        to={data.path}
          className="view-calendar"
          onClick={() => {
            toggleDropdown(data.id);
            handleClick(data.id)
            toggleColor();
          }}
          style={{
            backgroundColor: activeLink === data.id ? bgColor && isOn : "#ffffff",
          }}
        >
          <span>⚫</span>
          {data.title} { data.id===1 && (isOpen ? "▲" : "▼")}
        </NavLink>
        {isOpen && data.id===1 && (
            <div  className="calendar">
            {viewList.map(dataview=>(
            <NavLink
            key={dataview.id_view}
              to={dataview.path}
              style={{
                backgroundColor: activeLink === dataview.id_view ? isOn : "#ffffff",
              }}
              onClick={() => {
                toggleColor(dataview.id_view);
                handleClick(dataview.id_view);
              }}
            >
              {dataview.title}
            </NavLink>
            ))}
            </div>
        )}
        </React.Fragment>
        ))}
    </div>
    </div>
  );
}

export default Demo;
