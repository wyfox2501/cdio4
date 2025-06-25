import React, { useState } from "react";
// import PropTypes from "prop-types";
import "./styleCancel.scss";

function CancelSchedule() {
    const schedule = [
        {
            name: "trần minh tú",
            sdt: "03312456789",
            date: "2025-03-11",
            hour: 8,
            symptum: "đau ho, cảm",
        },
        {
            name: "trần đại huân",
            sdt: "0354612148",
            date: "2025-03-10",
            hour: 8,
            symptum: "đau ho, cảm",
        },
        {
            name: "huỳnh anh kha",
            sdt: "0354612148",
            date: "2025-03-10",
            hour: 11,
            symptum: "đau ho, cảm",
        },
    ];

    const [data, setData] = useState({
        ngay: "",
        thoigian: "",
        lydo: "",
        khachhang: "",
        sdt: "",
        trieuchung: "",
    });
    const [meseger, setMeseger] = useState("");
    const [color, setColor] = useState("#f03242");

    const setinput = (e) => {
        const { name, value } = e.target;
        const newData = {
            ...data,
            [name]: value,
        };

        setData(newData);

        if (
            (name === "ngay" || name === "thoigian") &&
            newData.ngay &&
            newData.thoigian
        ) {
            const match = schedule.find(
                (pre) =>
                    pre.date === newData.ngay &&
                    String(pre.hour) === String(newData.thoigian)
            );

            if (match) {
                newData.khachhang = match.name || "không có dữ liệu";
                newData.sdt = match.sdt || "không có dữ liệu";
                newData.trieuchung = match.symptum || "không có dữ liệu";
            } else {
                newData.khachhang = "";
                newData.sdt = "";
                newData.trieuchung = "";
            }
            setData(newData);
        }
    };

    const check_input = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.ngay.trim()) newErrors.ngay = "vui lòng nhập ngày";
        if (!data.thoigian.trim()) {
            newErrors.thoigian = "vui lòng nhập thời gian";
        } else if (
            isNaN(data.thoigian) ||
            data.thoigian < 7 ||
            data.thoigian > 21
        ) {
            newErrors.thoigian = "Giờ bắt đầu không hợp lệ (7 - 21)";
        }

        if (!data.lydo.trim()) newErrors.lydo = "vui lòng nhập lý do";
        if (!data.khachhang.trim())
            newErrors.khachhang = "vui lòng nhập khách hàng";
        if (!data.sdt.trim()) newErrors.sdt = "vui lòng nhập sdt";
        if (!data.trieuchung.trim())
            newErrors.trieuchung = "vui lòng nhập triệu chứng";

        if (Object.keys(newErrors).length > 0) {
            setMeseger("lỗi");
        } else {
            setMeseger("Lưu Thành Công");
            setColor("green");
        }

        setTimeout(() => {
            setMeseger("");
            window.location.reload();
        }, 5000);
    };

    return (
        <div className="add">
            {meseger && (
                <p style={{ backgroundColor: color, color: "white" }}>
                    {meseger}
                </p>
            )}
            <form onSubmit={check_input}>
                <h2>Hủy lịch</h2>
                <div className="insert">
                    <div className="date">
                        <span> Ngày</span>
                        <input type="date" name="ngay" onChange={setinput} />
                    </div>
                    <div className="hour">
                        <span>Thời Gian</span>
                        <input
                            type="number"
                            name="thoigian"
                            min="7"
                            max="21"
                            placeholder="7H"
                            onChange={setinput}
                        />
                    </div>
                    <div className="khachhang">
                        <span>Khách Hàng</span>
                        <input
                            type="text"
                            name="khachhang"
                            value={data.khachhang}
                            onChange={setinput}
                            // readOnly
                        />
                    </div>
                    <div className="sdt">
                        <span>SDT</span>
                        <input
                            type="number"
                            name="sdt"
                            value={data.sdt}
                            onChange={setinput}
                            // readOnly
                        />
                    </div>
                    <div className="trieuChung">
                        <span>Triệu Chứng</span>
                        <input
                            type="text"
                            name="trieuchung"
                            value={data.trieuchung}
                            onChange={setinput}
                            // readOnly
                        />
                    </div>
                    <div className="lyDo">
                        <span>Lý do</span>
                        <input
                            type="text"
                            name="lydo"
                            placeholder="cảm, sốt"
                            onChange={setinput}
                        />
                    </div>
                </div>
                <button type="submit">Lưu</button>
            </form>
        </div>
    );
}

// CancelSchedule.propTypes = {
//     // Không cần props nữa vì schedule đã gộp vào trong
// };

export default CancelSchedule;
