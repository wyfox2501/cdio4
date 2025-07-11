import React, { useEffect, useState } from "react";
import "./styleCancel.scss";

const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
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
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/doctor/view_appointment",
                    {
                        withCredentials: true,
                        headers: {
                            "Cache-Control": "no-cache",
                        },
                    }
                );
                console.log("Dữ liệu từ backend:", response.data);
                const data = response.data.map((item) => ({
                    id: item.id,
                    name: item.patient_name,
                    date: item.appointment_date,
                    time: item.appointment_time,
                    sdt: item.patient_phone,
                    symptum: item.symptoms,
                }));
                console.log("Dữ liệu format FE:", data); // ✅ Thêm dòng này để kiểm tra dữ liệu đã format
                setPatients(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    const getWeekday = (dateStr) => {
        const date = new Date(dateStr);
        return daysOfWeek[date.getDay()];
    };

    const [startDay, setStartDay] = useState(new Date(2025, 6, 7)); // 7/7/2025
    const [endDay, setEndDay] = useState(new Date(startDay));

    useEffect(() => {
        const newEndDay = new Date(startDay);
        newEndDay.setDate(newEndDay.getDate() + 6);
        setEndDay(newEndDay);
    }, [startDay]);

    const nextDay = () => {
        setStartDay(
            (prev) => new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000)
        );
    };

    const prevDay = () => {
        setStartDay(
            (prev) => new Date(prev.getTime() - 7 * 24 * 60 * 60 * 1000)
        );
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
            <h2 style={{ color: "red", textAlign: "center" }}>Lịch Khám</h2>
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
                            {Array.from({ length: 7 }).map((_, i) => {
                                const currentDate = new Date(startDay);
                                currentDate.setDate(startDay.getDate() + i);
                                const weekday =
                                    daysOfWeek[currentDate.getDay()];
                                const formattedDate =
                                    currentDate.toLocaleDateString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                    });

                                return (
                                    <th key={i} className="time2">
                                        <div>{weekday}</div>
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "#888",
                                            }}
                                        >
                                            {formattedDate}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour}>
                                <td className="hour">{hour}</td>
                                {daysOfWeek.map((day) => (
                                    <td key={day + hour} className="date">
                                        {patients
                                            .filter((p) => {
                                                const weekday = getWeekday(
                                                    p.date
                                                );
                                                return (
                                                    weekday === day &&
                                                    p.time === hour
                                                );
                                            })
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

        const cancelAppointment = async () => {
            try {
                await fetch(
                    `http://localhost:5000/doctor/cancel/${formData.id}`,
                    { reason: formData.lydo },
                    { withCredentials: true }
                );
                onSuccess(formData.id);
            } catch (error) {
                console.error("Error cancelling appointment:", error);
                setMessage("Hủy lịch thất bại, thử lại!");
                setColor("#f03242");
            }
        };
        setTimeout(() => {
            cancelAppointment();
        }, 500);
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
