import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HealthImg from "../../../images/healthycare.jpg";
import "./Login_register.scss";
Register.propTypes = {};

function Register(props) {
  const [toggle, setToggle] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [avata, setAvata] = useState(null);
  const Specification = [
    { id: 1, name: "Nội tổng quát" },
    { id: 2, name: "Ngoại tổng quát" },
    { id: 3, name: "Tim mạch" },
    { id: 4, name: "Hô hấp" },
    { id: 5, name: "Tiêu hóa" },
    { id: 6, name: "Thận – Tiết niệu" },
    { id: 7, name: "Nội tiết – Đái tháo đường" },
    { id: 8, name: "Thần kinh" },
    { id: 9, name: "Cơ xương khớp" },
    { id: 10, name: "Tai – Mũi – Họng" },
    { id: 11, name: "Mắt (Nhãn khoa)" },
    { id: 12, name: "Da liễu" },
    { id: 13, name: "Sản – Phụ khoa" },
    { id: 14, name: "Nhi khoa" },
    { id: 15, name: "Răng – Hàm – Mặt" },
    { id: 16, name: "Ung bướu" },
    { id: 17, name: "Hồi sức cấp cứu" },
    { id: 18, name: "Y học cổ truyền" },
  ];
  const [dataPatient, setDataPatient] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    sex: "",
    cccd: "",
    address: "",
    avata: null,
  });
  const [dataDoctor, setDataDoctor] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    sex: "",
    cccd: "",
    address: "",
    avata: null,
    specification: "",
    experience: "",
    image_Certification: null,
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;

    if (file && file.type.startsWith("image/")) {
      const previewURL = URL.createObjectURL(file);
      if (name === "avata") {
        // Avatar dùng cho cả patient và doctor
        if (!toggle) {
          setAvata(previewURL);
          setDataPatient((prev) => ({
            ...prev,
            avata: file,
          }));
        } else {
          setAvata(previewURL); // dùng chung ảnh preview avatar
          setDataDoctor((prev) => ({
            ...prev,
            avata: file,
          }));
        }
      }

      if (name === "image_Certification") {
        // Chỉ dùng cho doctor
        setImageSrc(previewURL);
        setDataDoctor((prev) => ({
          ...prev,
          image_Certification: file,
        }));
      }
    } else {
      alert("Vui lòng chọn một file hình ảnh hợp lệ.");
    }
  };
const handleChang = (event) => {
  const { name, value } = event.target;

  const finalValue =
    name === "sex" ? value === "true" : value;

  setDataPatient((prevData) => ({
    ...prevData,
    [name]: finalValue,
  }));
  setDataDoctor((prevData) => ({
    ...prevData,
    [name]: finalValue,
  }));
};
  const handleToggle = (boolen) => {
    setToggle(boolen);
  };
  const handsummitPatient = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", dataPatient.name);
      formData.append("email", dataPatient.email);
      formData.append("password", dataPatient.password);
      formData.append("phone", dataPatient.phone);
      formData.append("cccd", dataPatient.cccd);
      formData.append("birthday", dataPatient.birthday);
      formData.append("sex", dataPatient.sex);
      formData.append("address", dataPatient.address);
      formData.append("avata", dataPatient.avata);

      const response = await fetch("http://localhost:5000/api/users/patient", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert("Patient registered successfully:", data);
    } catch (error) {
      alert("Error in patient registration:", error);
    }
  };
  const handsummitDoctor = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", dataDoctor.name);
      formData.append("email", dataDoctor.email);
      formData.append("password", dataDoctor.password);
      formData.append("phone", dataDoctor.phone);
      formData.append("cccd", dataDoctor.cccd);
      formData.append("birthday", dataDoctor.birthday);
      formData.append("sex", dataDoctor.sex);
      formData.append("address", dataDoctor.address);
      formData.append("avata", dataDoctor.avata);
      formData.append("specification", dataDoctor.specification);
      formData.append("experience", dataDoctor.experience);
      formData.append("image_Certification", dataDoctor.image_Certification);

      const response = await fetch("http://localhost:5000/api/users/doctor", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert("Doctor registered successfully:", data);
    } catch (error) {
      alert("Error in doctor registration:", error);
    }
  };
  return (
    <div className="register">
      <div className="input_register">
        <h2 className="title">Sign Up</h2>
        {toggle === false ? (
          <form action="" onSubmit={handsummitPatient}>
            <p>
              <span>Name:</span>
              <input
                type="text"
                name="name"
                id=""
                required
                placeholder="Name"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Email:</span>
              <input
                type="email"
                name="email"
                id=""
                required
                placeholder="Email"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Password:</span>
              <input
                type="password"
                name="password"
                id=""
                minLength={6}
                maxLength={60}
                required
                placeholder="Password"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Phone:</span>
              <input
                type="text"
                name="phone"
                id=""
                minLength={10}
                maxLength={10}
                pattern="\d{10}"
                required
                placeholder="phone"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Birthday:</span>
              <input
                type="date"
                name="birthday"
                id=""
                required
                placeholder="Birthday"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Sex:</span>
              <select name="sex" required onChange={handleChang}>
                <option value="">Select Sex</option>
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </p>
            <p>
              <span>Address:</span>
              <input
                type="text"
                name="address"
                id=""
                required
                placeholder="Address"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>CCCD:</span>
              <input
                type="text"
                name="cccd"
                id=""
                minLength={12}
                maxLength={12}
                pattern="\d{12}"
                required
                placeholder="CCCD"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>avata:</span>
              <input
                type="file"
                name="avata"
                id="file"
                onChange={handleImageChange}
                required
              />
            </p>
            {avata && <img src={avata} alt="Preview" />}
            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form className="sign-in-form" onSubmit={handsummitDoctor}>
            <p>
              <span>Name:</span>
              <input
                type="text"
                name="name"
                id=""
                required
                placeholder="Name"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Email:</span>
              <input
                type="email"
                name="email"
                id=""
                required
                placeholder="Email"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Password:</span>
              <input
                type="password"
                name="password"
                id=""
                minLength={6}
                maxLength={60}
                required
                placeholder="Password"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Phone:</span>
              <input
                type="text"
                name="phone"
                id=""
                minLength={10}
                maxLength={10}
                pattern="\d{10}"
                required
                placeholder="phone"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Birthday:</span>
              <input
                type="date"
                name="birthday"
                id=""
                required
                placeholder="Birthday"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Sex:</span>
              <select name="sex" required onChange={handleChang}>
                <option value="">Select Sex</option>
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </p>
            <p>
              <span>Address:</span>
              <input
                type="text"
                name="address"
                id=""
                required
                placeholder="Address"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>CCCD:</span>
              <input
                type="text"
                name="cccd"
                id=""
                minLength={12}
                maxLength={12}
                pattern="\d{12}"
                required
                placeholder="CCCD"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>avata:</span>
              <input
                type="file"
                name="avata"
                id="file"
                onChange={handleImageChange}
                required
              />
            </p>
            {avata && <img src={avata} alt="Preview" />}
            {/* <p>
              <span>Specification:</span>
              <input
                type="text"
                name="specification"
                id=""
                required
                placeholder="Specification"
                onChange={handleChang}
              />
            </p> */}
            <p>
              <span>Specification:</span>
              <select
                name="specification"
                id=""
                onChange={handleChang}
                required
              >
                <option value="">Select Specification</option>
                {Specification.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <span>Education:</span>
              <input
                type="text"
                name="education"
                id=""
                required
                placeholder="Education (in years)"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Experience:</span>
              <input
                type="number"
                name="experience"
                id=""
                min={0}
                max={60}
                required
                placeholder="Experience (in years)"
                onChange={handleChang}
              />
            </p>
            <p>
              <span>Medical License:</span>
              <input
                type="file"
                name="image_Certification"
                id="file"
                onChange={handleImageChange}
                required
              />
            </p>
            {imageSrc && <img src={imageSrc} alt="Preview" />}
            <button type="submit">Sign In</button>
          </form>
        )}
        <p>
          đăng ký vai trò{" "}
          <button
            onClick={() => handleToggle(false)}
            style={{
              backgroundColor: toggle === false ? "#065AD8" : "#2c3037",
            }}
          >
            customer
          </button>{" "}
          &{" "}
          <button
            onClick={() => handleToggle(true)}
            style={{ backgroundColor: toggle === true ? "#065AD8" : "#2c3037" }}
          >
            doctor
          </button>
        </p>
        <p>
          Đã có tài khoản? <Link to="/auth/login"> Đăng nhập ngay</Link>
        </p>
      </div>
      <div className="bacgroud_register">
        <h2 className="title">Chào Mừng Bạn Đến Với HealthCare</h2>
        <img className="introduce-img" src={HealthImg} alt="HealthCare" />
        <p className="end">Vui Lòng Đăng Ký Để Tiếp Tục</p>
      </div>
    </div>
  );
}

export default Register;
