import React, { useEffect, useState } from "react";
import "./appointmentHistory.scss";

function AppointmentHistory() {
    const [data, setData] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:5000/api/doctor/history",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`Lỗi: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const result = await response.json();
                    console.log("Lịch sử khám:", result);
                    setData(result);
                } else {
                    setError("Phản hồi không phải JSON");
                }
            } catch (err) {
                console.error("Lỗi gọi API:", err);
                setError("Không thể tải lịch sử khám bệnh.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredData = Array.isArray(data)
        ? data.filter((item) => {
              if (!filterDate) return true;
              const itemDate = new Date(item.appointment_date)
                  .toISOString()
                  .split("T")[0];
              return itemDate === filterDate;
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
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => {
                                const dateObj = item.appointment_date
                                    ? new Date(item.appointment_date)
                                    : null;
                                return (
                                    <tr key={item.appointment_id || index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {item.username || "Không rõ"}
                                        </td>
                                        <td>
                                            {dateObj
                                                ? dateObj.toLocaleDateString(
                                                      "vi-VN"
                                                  )
                                                : "Không rõ"}
                                        </td>
                                        <td>
                                            {/* {dateObj
                                                ? dateObj.toLocaleTimeString(
                                                      "vi-VN",
                                                      {
                                                          hour: "2-digit",
                                                          minute: "2-digit",
                                                      }
                                                  ) */}
                                                { item.time ||
                                                  "Không rõ"}
                                        </td>
                                        <td>{item.symptoms || "Không rõ"}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    {data.length === 0
                                        ? "Chưa có lịch sử khám bệnh nào."
                                        : "Không có dữ liệu phù hợp với ngày đã chọn."}
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
