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
    title: "Tổng Quan",
    url: "/",
  },
  {
    id: 2,
    title: "Quản Lý Lịch",
    url: "/quan-li-lich",
  },
  {
    id: 3,
    title: "Nộp tiền",
    url: "/nop-tien",
  },
  {
    id: 4,
    title: "tư vấn",
    url: "/tu-van",
  },
  {
    id: 5,
    title: "quản lý tài khoản",
    url: "/quan-li-tai-khoan",
  },
];

const patientDataHeader = [
  {
    id: 1,
    title: "Tổng Quan",
    url: "/",
  },
  {
    id: 2,
    title: "tư vấn",
    url: "/tu-van",
  },
  {
    id: 3,
    title: "Đặt Lịch",
    url: "/chon-bac-si",
  },
  {
    id: 4,
    title: "quản lý kế hoạch sức khỏe",
    url: "/quan-li-ke-hoach",
  },
  {
    id: 5,
    title: "quản lý tài khoản",
    url: "/quan-li-tai-khoan",
  },
];

const adminDataHeader = [
  {
    id: 1,
    title: "Tổng Quan",
    url: "/",
  },
  {
    id: 2,
    title: "duyệt lịch khám",
    url: "/duyet-lich-kham",
  },
  {
    id: 3,
    title: "quản lý tài khoản",
    url: "/chon-bac-si",
  },
  {
    id: 4,
    title: "Quản Trị Viên",
    url: "/admin/role-manager",
  },
];

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Lưu thông tin user từ server
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 cái này là để gửi cookie
      });
      const result = await res.json();
      if (res.status === 200) {
        setUser(result.user); // cập nhật state user
      } else {
        navigate("/login");
        // alert(result.message);
      }
    };
    fetchUser();
  }, []);
  const signOut = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      if (res.status === 200) {
        navigate("/login");
      } else {
        alert("Đăng xuất không thành công");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Đăng xuất không thành công");
    }
  };
  return (
    <div>
      <div class="menu">
        <div class="left-menu">
          <Link className="health" to="/">
            <img src={Healthycare} alt="HealthCare" />
            <h4>HealthCare</h4>
          </Link>
          </div>
          <div className="mid">
            {user?.role === "doctor" && (
            <div className="funtion">
              {doctorDataHeader.map((item) => (
                <Link key={item.id} to={item.url}>
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {user?.role === "patient" && (
            <div className="funtion">
              {patientDataHeader.map((item) => (
                <Link key={item.id} to={item.url}>
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {user?.role === "admin" && (
            <div className="funtion">
              {adminDataHeader.map((item) => (
                <Link key={item.id} to={item.url}>
                  {item.title}
                </Link>
              ))}
            </div>
          )}
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
