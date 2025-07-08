import React, { useState } from "react";
import PropTypes from "prop-types";
import "./appointmentHistory.scss";

const testData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        date: "2025-06-24",
        time: "10H",
        symptom: "Sốt, ho",
        doctor: "Nguyễn Văn B",
        status: "done",
    },
    {
        id: 2,
        name: "Trần Thị B",
        date: "2025-06-25",
        time: "14H",
        symptom: "Đau đầu",
        doctor: "Nguyễn Văn B",
        status: "done",
    },
    {
        id: 3,
        name: "Phạm Văn C",
        date: "2025-06-25",
        time: "15H",
        symptom: "Cảm cúm",
        doctor: "Lê Thị C",
        status: "pending", // sẽ bị loại bỏ vì không "done"
    },
];

function AppointmentHistory({ data = testData }) {
    const [filterDoctor, setFilterDoctor] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const filteredData = Array.isArray(data)
        ? data.filter((item) => {
              const matchDoctor = filterDoctor
                  ? item.doctor
                        ?.toLowerCase()
                        .includes(filterDoctor.toLowerCase())
                  : true;
              const matchDate = filterDate ? item.date === filterDate : true;
              return matchDoctor && matchDate && item.status === "done";
          })
        : [];

    return (
        <div className="history-container">
            <h2>Lịch Sử Khám Bệnh</h2>
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

            <table className="history-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Bệnh Nhân</th>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Triệu Chứng</th>
                        <th>Bác Sĩ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.symptom}</td>
                                <td>{item.doctor}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data">
                                Không có dữ liệu phù hợp
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

AppointmentHistory.propTypes = {
    data: PropTypes.array,
};

AppointmentHistory.defaultProps = {
    data: [],
};

export default AppointmentHistory;
