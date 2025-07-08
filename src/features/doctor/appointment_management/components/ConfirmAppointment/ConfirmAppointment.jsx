import React, { useState } from "react";
import "./confirmAppointment.scss";

const testAppointments = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        date: "2025-06-25",
        time: "9H",
        doctor: "Nguyễn Văn B",
        symptom: "Sốt cao",
        status: "pending",
    },
    {
        id: 2,
        name: "Lê Thị C",
        date: "2025-06-25",
        time: "10H",
        doctor: "Nguyễn Văn B",
        symptom: "Đau đầu",
        status: "done",
    },
    {
        id: 3,
        name: "Trần Văn D",
        date: "2025-06-26",
        time: "14H",
        doctor: "Lê Thị C",
        symptom: "Mệt mỏi",
        status: "pending",
    },
];

function ConfirmAppointment() {
    const [appointments, setAppointments] = useState(testAppointments);
    const [filterDoctor, setFilterDoctor] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const handleConfirm = (id) => {
        const updated = appointments.map((item) =>
            item.id === id ? { ...item, status: "done" } : item
        );
        setAppointments(updated);
    };

    const handleCancel = (id) => {
        const updated = appointments.map((item) =>
            item.id === id ? { ...item, status: "canceled" } : item
        );
        setAppointments(updated);
    };

    const filtered = appointments.filter((item) => {
        const matchDoctor = filterDoctor
            ? item.doctor.toLowerCase().includes(filterDoctor.toLowerCase())
            : true;
        const matchDate = filterDate ? item.date === filterDate : true;
        return item.status === "pending" && matchDoctor && matchDate;
    });

    return (
        <div className="confirm-container">
            <h2>Chốt Lịch Khám</h2>
            <div className="filters">
                {/* <input
          type="text"
          placeholder="Tìm theo tên bác sĩ..."
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
        /> */}
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            <table className="confirm-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Bệnh Nhân</th>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Bác Sĩ</th>
                        <th>Triệu Chứng</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length > 0 ? (
                        filtered.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.doctor}</td>
                                <td>{item.symptom}</td>
                                <td>
                                    <button
                                        onClick={() => handleConfirm(item.id)}
                                    >
                                        Chốt
                                    </button>
                                    <button
                                        onClick={() => handleCancel(item.id)}
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor: "#e74c3c",
                                            color: "#fff",
                                        }}
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="no-data">
                                Không có lịch chờ chốt
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ConfirmAppointment;
