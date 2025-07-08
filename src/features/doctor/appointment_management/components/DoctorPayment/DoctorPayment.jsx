import React, { useState } from "react";
import "./doctorPayment.scss";

// Giả sử bác sĩ hiện tại là "Nguyễn Văn B"
const currentDoctor = "Nguyễn Văn B";

const mockAppointments = [
    {
        id: 1,
        doctor: "Nguyễn Văn B",
        patient: "Trần Thị A",
        date: "2025-06-24",
        price: 500000,
        status: "done",
    },
    {
        id: 2,
        doctor: "Nguyễn Văn B",
        patient: "Lê Văn B",
        date: "2025-06-25",
        price: 300000,
        status: "done",
    },
    {
        id: 3,
        doctor: "Nguyễn Văn B",
        patient: "Nguyễn Thị C",
        date: "2025-06-25",
        price: 400000,
        status: "done",
    },
    {
        id: 4,
        doctor: "Nguyễn Văn B",
        patient: "Phạm Văn D",
        date: "2025-06-26",
        price: 200000,
        status: "pending", // không tính
    },
];

function DoctorPayment() {
    const [hasPaid, setHasPaid] = useState(false);
    const [message, setMessage] = useState("");

    const appointmentsDone = mockAppointments.filter(
        (item) =>
            item.status === "done" &&
            item.doctor.toLowerCase() === currentDoctor.toLowerCase()
    );

    const totalEarned = appointmentsDone.reduce(
        (sum, item) => sum + item.price,
        0
    );
    const hospitalCut = Math.floor(totalEarned * 0.3);

    const [doctorBalance, setDoctorBalance] = useState(totalEarned);

    const handlePayment = () => {
        if (!hasPaid && doctorBalance >= hospitalCut) {
            setDoctorBalance(doctorBalance - hospitalCut);
            setMessage("💰 Nộp tiền thành công!");
            setHasPaid(true);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="payment-container">
            <h2>Nộp Tiền Cho Bệnh Viện</h2>

            <table className="payment-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Bệnh Nhân</th>
                        <th>Ngày</th>
                        <th>Số Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentsDone.length > 0 ? (
                        appointmentsDone.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.patient}</td>
                                <td>{item.date}</td>
                                <td>{item.price.toLocaleString()} VND</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">
                                Không có dữ liệu phù hợp
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {appointmentsDone.length > 0 && (
                <div className="summary">
                    <p>
                        💼 Tổng Tiền Khám:{" "}
                        <strong>{totalEarned.toLocaleString()} VND</strong>
                    </p>
                    <p>
                        🩺 Tiền Bác Sĩ Đang Có:{" "}
                        <strong>{doctorBalance.toLocaleString()} VND</strong>
                    </p>
                    <p>
                        🏥 Phải Nộp Cho Bệnh Viện (30%):{" "}
                        <strong>{hospitalCut.toLocaleString()} VND</strong>
                    </p>

                    {!hasPaid && (
                        <button className="pay-btn" onClick={handlePayment}>
                            Nộp
                        </button>
                    )}
                    {message && <p className="success-message">{message}</p>}
                </div>
            )}
        </div>
    );
}

export default DoctorPayment;
