import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Cat from "../../images/cat.png";
import Healthycare from "../../images/healthycare.jpg";

import { Link } from "react-router-dom";
// import { GetRole } from "../../services/jwt-services/JWTService";
import { useNavigate } from "react-router-dom";

Header.propTypes = {
  dataheader: PropTypes.array,
};
Header.defaultProps = {
  dataheader: [],
};

const doctorDataHeader = [
  {
    id: 1,
    title: 'Tổng Quan',
    url: '/'
  },
  {
    id: 2,
    title: 'Lập Kế Hoạch',
    url: '/lap-ke-hoach'
  },
  {
    id: 2,
    title: 'Quản Lý Lịch',
    url: '/quan-li-lich'
  },
  {
    id: 3,
    title: 'Nộp tiền',
    url: '/nop-tien'
  }
];

const patientDataHeader = [
  {
    id: 1,
    title: 'Tổng Quan',
    url: '/'
  },
  {
    id: 2,
    title: 'Lập Kế Hoạch',
    url: '/lap-ke-hoach'
  },
  {
    id: 3,
    title: 'Đặt Lịch',
    url: '/chon-bac-si'
  }
];

const adminDataHeader = [
  {
    id: 1,
    title: 'Tổng Quan',
    url: '/'
  },
  {
    id: 2,
    title: 'Lập Kế Hoạch',
    url: '/lap-ke-hoach'
  },
  {
    id: 3,
    title: 'Đặt Lịch',
    url: '/chon-bac-si'
  },
  {
    id: 4,
    title: 'Quản Trị Viên',
    url: '/admin/role-manager'
  }
];



function Header() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("role");
    navigate("/auth/dang-nhap");
  };
  const [isAnotherPatient, setIsAnotherPatient] = React.useState(false);
  


  return (
    <div>
      <div class="menu">
        <div class="left-menu">
          <Link className="health" to="/">
            <img src={Healthycare} alt="HealthCare" />
            <h4>HealthCare</h4>
          </Link>
          <div className="funtion">
            { adminDataHeader.map((item) => (
                  <Link key={item.id} to={`${item.url}`}>
                    {item.title}
                  </Link>
                ))}
          </div>
          {/* <div class="function">
            {GetRole().split(",").includes("Admin")
              ? adminDataHeader.map((item) => (
                  <Link key={item.id} to={`${item.url}`}>
                    {item.title}
                  </Link>
                )):
                GetRole().split(",").includes("Doctor") ? 
                doctorDataHeader.map((item) => (
                  <Link key={item.id} to={`${item.url}`}>
                    {item.title}
                  </Link>
                )): 
                patientDataHeader.map((item) => (
                  <Link key={item.id} to={`${item.url}`}>
                    {item.title}
                  </Link>
                ))
              }
          </div> */}
        </div>
        <div class="right-menu">
          <img src={Cat} alt="" />
          <div class="drop-menu">
            <a href="">Thông Tin Cá Nhân</a>
            <a href="">Thông Tin Lịch Hẹn</a>
            <a onClick={signOut}>Đăng Xuất</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
