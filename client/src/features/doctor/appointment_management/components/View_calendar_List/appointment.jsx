import React, { useEffect, useState } from "react";
// import "./style.scss";
import "./styleCancel.scss"; // dùng lại style cũ

const daysOfWeek = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
];
const hours = [
    "7H",
    "8H",
    "9H",
    "10H",
    "11H",
    "12H",
    "13H",
    "14H",
    "15H",
    "16H",
    "17H",
    "18H",
    "19H",
    "20H",
    "21H",
];

function ViewCalendarKham() {
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [cancelData, setCancelData] = useState(null);
    const [patients, setPatients] = useState([
        {
            id: "BN01",
            name: "Trần Minh Tú",
            date: "2025-03-03",
            time: "14H",
            sdt: "03312456789",
            symptum: "Đau đầu",
        },
        {
            id: "BN02",
            name: "Trần Đại Huân",
            date: "2025-03-05",
            time: "8H",
            sdt: "0354612148",
            symptum: "Cảm cúm",
        },
    ]);

    const getWeekday = (dateStr) => {
        const date = new Date(dateStr);
        return daysOfWeek[date.getDay()];
    };

    const [startDay, setStartDay] = useState(new Date(2025, 2, 3));
    const [endDay, setEndDay] = useState(new Date(startDay));

    useEffect(() => {
        const newEndDay = new Date(startDay);
        newEndDay.setDate(newEndDay.getDate() + 6);
        setEndDay(newEndDay);
    }, [startDay]);

    const nextDay = () => {
        setStartDay((prev) => new Date(prev.setDate(prev.getDate() + 7)));
    };

    const prevDay = () => {
        setStartDay((prev) => new Date(prev.setDate(prev.getDate() - 7)));
    };

    const handleShowCancel = (patient) => {
        const formattedDate = new Date(patient.date).toISOString().slice(0, 10);
        setCancelData({
            id: patient.id,
            ngay: formattedDate,
            thoigian: parseInt(patient.time),
            khachhang: patient.name,
            sdt: patient.sdt || "",
            trieuchung: patient.symptum || "",
            lydo: "",
        });
        setShowCancelForm(true);
    };

    const handleCancelSuccess = (idToRemove) => {
        setPatients((prev) => prev.filter((p) => p.id !== idToRemove));
        setShowCancelForm(false);
        setCancelData(null);
    };

    const handleCloseForm = () => {
        setShowCancelForm(false);
        setCancelData(null);
    };

    return (
        <div className="container">
            <h2>Lịch Khám</h2>
            <div className="calender">
                <div className="head">
                    <span className="next" onClick={prevDay}>
                        ◀️
                    </span>
                    <span className="pre" onClick={nextDay}>
                        ▶️
                    </span>
                    <span>
                        {startDay.toLocaleDateString()} -{" "}
                        {endDay.toLocaleDateString()}
                    </span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="time1">Giờ</th>
                            {daysOfWeek.map((day) => (
                                <th key={day} className="time2">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour}>
                                <td className="hour">{hour}</td>
                                {daysOfWeek.map((day) => (
                                    <td key={day + hour} className="date">
                                        {patients
                                            .filter(
                                                (p) =>
                                                    getWeekday(p.date) ===
                                                        day && p.time === hour
                                            )
                                            .map((p, index) => (
                                                <div
                                                    key={index}
                                                    className="see"
                                                >
                                                    <span>👤</span> {p.name}
                                                    <span
                                                        onClick={() =>
                                                            handleShowCancel(p)
                                                        }
                                                    >
                                                        ❌
                                                    </span>
                                                </div>
                                            ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCancelForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <CancelSchedule
                            data={cancelData}
                            onClose={handleCloseForm}
                            onSuccess={handleCancelSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function CancelSchedule({ data, onClose, onSuccess }) {
    const [formData, setFormData] = useState(data);
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("#f03242");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.lydo.trim()) {
            setMessage("Vui lòng nhập lý do hủy");
            setColor("#f03242");
            return;
        }

        setMessage("Đã hủy lịch thành công!");
        setColor("green");

        setTimeout(() => {
            onSuccess(formData.id);
        }, 1000);
    };

    return (
        <div className="add cancel-form">
            <p style={{ backgroundColor: color, color: "white" }}>{message}</p>
            <form onSubmit={handleSubmit}>
                <h2>Hủy lịch khám</h2>
                <div className="insert">
                    <div className="date">
                        <span>Ngày</span>
                        <input
                            type="date"
                            name="ngay"
                            value={formData.ngay}
                            readOnly
                        />
                    </div>
                    <div className="hour">
                        <span>Thời gian</span>
                        <input
                            type="number"
                            name="thoigian"
                            value={formData.thoigian}
                            readOnly
                        />
                    </div>
                    <div className="khachhang">
                        <span>Khách hàng</span>
                        <input
                            type="text"
                            name="khachhang"
                            value={formData.khachhang}
                            readOnly
                        />
                    </div>
                    <div className="sdt">
                        <span>SĐT</span>
                        <input
                            type="text"
                            name="sdt"
                            value={formData.sdt}
                            readOnly
                        />
                    </div>
                    <div className="trieuChung">
                        <span>Triệu chứng</span>
                        <input
                            type="text"
                            name="trieuchung"
                            value={formData.trieuchung}
                            readOnly
                        />
                    </div>
                    <div className="lyDo">
                        <span>Lý do hủy</span>
                        <input
                            type="text"
                            name="lydo"
                            value={formData.lydo}
                            placeholder="VD: cảm, sốt"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="btn-group">
                    <button type="submit">Lưu</button>
                    <button type="button" onClick={onClose}>
                        Hủy bỏ
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ViewCalendarKham;
