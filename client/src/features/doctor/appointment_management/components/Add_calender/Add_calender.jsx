import React from "react";
import PropTypes, { object } from "prop-types";
import { useState } from "react";
import "./style_Add.scss";

Add_calender.propTypes = {};
function Add_calender(props) {
    const [data, setData] = useState({
        ngay: "",
        thoigianstart: "",
        thoigianend: "",
        doctor: "",
    });
    const [meseger, setMeseger] = useState("");
    const [errors, setErrors] = useState({});
    const [color, setColor] = useState("#f03242");
    const setinput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };
    const check_input = (e) => {
        e.preventDefault();
        const newErorrs = {};
        if (!data.ngay.trim()) {
            newErorrs.ngay = "vui lòng nhập ngày";
        }

        if (!data.thoigianstart.trim()) {
            newErorrs.thoigianstart = "vui lòng nhập thời gian bắt đầu";
        } else if (
            isNaN(data.thoigianstart) ||
            data.thoigianstart < 7 ||
            data.thoigianstart > 21
        ) {
            newErorrs.thoigianstart = "Giờ bắt đầu không hợp lệ (7 - 21)";
        }

        if (!data.thoigianend.trim()) {
            newErorrs.thoigianend = "vui lòng nhập thời gian kết thúc";
        } else if (
            isNaN(data.thoigianend) ||
            data.thoigianend < 0 ||
            data.thoigianend > 23
        ) {
            newErorrs.thoigianend = "Giờ kết thúc không hợp lệ (0 - 23)";
        } else if (parseInt(data.thoigianend) <= parseInt(data.thoigianstart)) {
            newErorrs.thoigianend = "Giờ kết thúc phải lớn hơn giờ bắt đầu";
        }

        if (!data.doctor.trim()) newErorrs.doctor = "vui lòng nhập doctor";
        if (Object.keys(newErorrs).length > 0) {
            setErrors(newErorrs);
            setMeseger("Lỗi");
        } else {
            setErrors({});
            setMeseger("Lưu Thành Công");
            setColor(!color ? "#f03242" : "green");
        }
        //chạy 3s sẽ tắt là load trang
        setTimeout(() => {
            setMeseger("");
            window.location.reload(); // 🔁 reload lại trang
        }, 3000);
    };
    return (
        <div className="add">
            {meseger && (
                <p style={{ backgroundColor: color, color: "white" }}>
                    {meseger}
                </p>
            )}
            <form action="" onSubmit={check_input}>
                <h2>Thêm lịch làm việc</h2>
                <div className="insert">
                    <div className="date">
                        <span> Ngày</span>
                        <input
                            type="date"
                            name="ngay"
                            id="input5"
                            onChange={setinput}
                        />
                    </div>
                    <div className="hourStart">
                        <span>Thời Gian Bắt Đầu</span>
                        <input
                            type="number"
                            name="thoigianstart"
                            id=""
                            min={"7"}
                            max={"20"}
                            style={{ marginRight: "2.2rem" }}
                            placeholder="7H"
                            onChange={setinput}
                        />
                    </div>
                    <div className="hourEnd">
                        <span>Thời Gian Kết Thúc</span>
                        <input
                            type="number"
                            name="thoigianend"
                            id=""
                            min={"8"}
                            max={"21"}
                            style={{ marginRight: "2.2rem" }}
                            placeholder="11H"
                            onChange={setinput}
                        />
                    </div>

                    <div className="doctor">
                        <span>Doctor</span>
                        <input
                            type="text"
                            name="doctor"
                            id="input5"
                            placeholder="Nguyễn Hoàng Huy"
                            onChange={setinput}
                        />
                    </div>
                </div>
                <button type="submit">Lưu</button>
            </form>
        </div>
    );
}

export default Add_calender;
