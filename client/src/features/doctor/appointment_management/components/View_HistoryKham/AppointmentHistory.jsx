import React, { useEffect, useState } from "react";
import "./appointmentHistory.scss";

function AppointmentHistory() {
    const [data, setData] = useState([]);
    const [filterDoctor, setFilterDoctor] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3000/doctor/history", {
                    method: "GET",
                    credentials: "include", // gửi cookie session
                    cache: "no-store", // tránh lỗi 304
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    console.log("Fetched history data:", data);
                    setData(data);
                } else {
                    console.error("Response is not JSON:", response);
                    setError("Dữ liệu không hợp lệ từ server.");
                }
            } catch (error) {
                console.error("Error fetching history:", error);
                setError("Không thể tải dữ liệu lịch sử khám bệnh.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredData = Array.isArray(data)
        ? data.filter((item) => {
              const matchDoctor = filterDoctor
                  ? item.doctor_name?.toLowerCase().includes(filterDoctor.toLowerCase())
                  : true;
              const matchDate = filterDate ? item.date === filterDate : true;
              return matchDoctor && matchDate && item.status === "successfully";
          })
        : [];

    return (
        <div className="history-container">
            <h2>Lịch Sử Khám Bệnh</h2>
            <div className="filters">
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
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
                                    <td>{item.patient_name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>{item.symptom}</td>
                                    <td>{item.doctor_name}</td>
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
            )}
        </div>
    );
}

export default AppointmentHistory;
