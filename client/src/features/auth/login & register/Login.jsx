import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import HealthImg from "../../../images/healthycare.jpg";
import "./Login_register.scss";

Login.propTypes = {};

function Login(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataform = new FormData();
      dataform.append("email", data.email);
      dataform.append("password", data.password);
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        body: dataform,
        credentials: "include", // Để gửi cookie session
      });
      const result = await response.json();
      if (response.status === 401) {
        alert(result.message || "Invalid email or password");
        return;
      } else if (response.status === 403) {
        alert("Account is not active", result.message);
        return;
      } else if (response.status === 200) {
        alert("Login successful", result.message);
        if (result.user?.role === "doctor") {
          navigate("/doctor"); // hoặc "/quan-li-lich" nếu bạn đặt route là vậy
        } else if (result.user?.role === "patient") {
          navigate("/"); // hoặc "/patient" nếu bạn có layout riêng
        } else {
          navigate("/admin"); // fallback
        }
      } else {
        alert("Server error", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login">
      <div className="input_login">
        <h2 className="title">Sign In</h2>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <p>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </p>
          <p>
            <span>Password:</span>
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              minLength={6}
              maxLength={60}
              required
              onChange={handleChange}
            />
          </p>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Chưa có tài khoản? <Link to="/auth/register"> Đăng ký ngay</Link>
        </p>
      </div>
      <div className="bacgroud_login">
        <h2 className="title">Chào Mừng Bạn Đến Với HealthCare</h2>
        <img className="introduce-img" src={HealthImg} alt="HealthCare" />
        <p className="end">Vui Lòng Đăng Nhập Để Tiếp Tục</p>
      </div>
    </div>
  );
}

export default Login;
