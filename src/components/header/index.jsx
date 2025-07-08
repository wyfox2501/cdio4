import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Cat from "../../images/cat.png";
import Healthycare from "../../images/healthycare.jpg";
import { Link, useNavigate } from "react-router-dom";

Header.propTypes = {
    dataheader: PropTypes.array,
};
Header.defaultProps = {
    dataheader: [],
};

const adminDataHeader = [
    { id: 1, title: "Tổng Quan", url: "/" },
    { id: 2, title: "Lập Kế Hoạch", url: "/lap-ke-hoach" },
    { id: 3, title: "Đặt Lịch", url: "/chon-bac-si" },
    { id: 4, title: "Quản Trị Viên", url: "/admin/role-manager" },
];

function Header() {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("role");
        navigate("/auth/dang-nhap");
    };

    return (
        <div className="menu">
            <div className="left-menu">
                <Link className="logo" to="/">
                    <img src={Healthycare} alt="HealthCare" />
                    <h4>HealthCare</h4>
                </Link>
                <div className="nav-links">
                    {adminDataHeader.map((item) => (
                        <Link key={item.id} to={item.url}>
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="right-menu">
                <img src={Cat} alt="Avatar" />
                <div className="dropdown">
                    <a href="#">Thông Tin Cá Nhân</a>
                    <a href="#">Thông Tin Lịch Hẹn</a>
                    <a onClick={signOut}>Đăng Xuất</a>
                </div>
            </div>
        </div>
    );
}

export default Header;
