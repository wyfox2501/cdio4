import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Cat from "../../images/cat.png";
import Healthycare from "../../images/healthycare.jpg";
import { PrivateRoute } from "../../PrivateRoute";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    title: 'Quản Lý Lịch',
    url: '/quan-li-lich'
  },
  {
    id: 3,
    title: 'Nộp tiền',
    url: '/nop-tien'
  },
  {
    id: 4,
    title: 'tư vấn',
    url: '/tu-van'
  },
  {
    id: 5,
    title: 'quản lý tài khoản',
    url: '/quan-li-tai-khoan'
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
    title: 'tư vấn',
    url: '/tu-van'
  },
  {
    id: 3,
    title: 'Đặt Lịch',
    url: '/chon-bac-si'
  },
  {
    id: 4,
    title: 'quản lý kế hoạch sức khỏe',
    url: '/quan-li-ke-hoach'
  },
  {
    id: 5,
    title: 'quản lý tài khoản',
    url: '/quan-li-tai-khoan'
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
    title: 'duyệt lịch khám',
    url: '/duyet-lich-kham'
  },
  {
    id: 3,
    title: 'quản lý tài khoản',
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
  const [user, setUser] = useState(null); // Lưu thông tin user từ server
  const role='';
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/me", { withCredentials: true })
      .then(res => {
        // Nếu lấy thông tin thành công, lưu user vào state
        // console.log("ROLE:", res.data); 
        setUser(res.data);
      })
      .catch(() => {
        // Nếu không đăng nhập hoặc có lỗi, đặt user = null
        setUser(null);
      })
  }, []);
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
            {/* <a onClick={signOut}>Đăng Xuất</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
