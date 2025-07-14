import React, { useState, useEffect } from "react";
import "./confirmAppointment.scss";

function ConfirmAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // 🔹 Gọi API để lấy danh sách lịch hẹn từ backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/doctor/confirm_refuse",
          {
            credentials: "include", // cần nếu dùng session
          }
        );
        if (!res.ok) {
          console.warn("⚠️ Không lấy được lịch hẹn:", res.status);
          return;
        }
        const data = await res.json();
        setAppointments(data); // cập nhật danh sách lịch hẹn
      } catch (err) {
        console.error("❌ Lỗi khi lấy lịch hẹn:", err);
      }
    };
    fetchAppointments();
  }, []);

  // 🔹 Chốt lịch
  const handleConfirm = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/doctor/confirm/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!res.ok) {
        console.warn("❌ Lỗi khi chốt lịch:", res.status);
        return;
      }
      alert("Chốt lịch hẹn thành công");
      // await fetchAppointments(); // cập nhật lại danh sách sau khi chốt
      window.location.reload();
    } catch (err) {
      console.error("❌ Lỗi khi gọi API chốt lịch:", err);
    }
  };

  // // 🔹 Hủy lịch
  // const handleCancel = (id) => {
  //     const updated = appointments.map((item) =>
  //         item.appointment_id === id ? { ...item, status: "canceled" } : item
  //     );
  //     setAppointments(updated);
  // };
  const handleCancel = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/doctor/refuse/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      if (!res.ok) {
        console.warn("❌ Lỗi khi hủy lịch:", res.status);
        return;
      }
      alert("Hủy lịch hẹn thành công");
      // await fetchAppointments(); // cập nhật lại danh sách sau khi hủy
      window.location.reload();
    } catch (err) {
      console.error("❌ Lỗi khi gọi API hủy lịch:", err);
    }
  };
  // 🔹 Lọc lịch chờ chốt
  // const filtered = appointments.filter((item) => {
  //     const matchDoctor = filterDoctor
  //         ? item.doctor_name
  //               ?.toLowerCase()
  //               .includes(filterDoctor.toLowerCase())
  //         : true;
  //     const matchDate = filterDate
  //         ? item.appointment_date === filterDate
  //         : true;
  //     return item.status === "pending" && matchDoctor && matchDate;
  // });
  const filtered = appointments.filter((item) => {
    const itemDate = (() => {
      if (!item.appointment_date) return null;
      const date = new Date(item.appointment_date);
      date.setDate(date.getDate() + 1); // cộng thêm 1 ngày
      return date.toISOString().split("T")[0];
    })();
    return (
      item.status === "pending" && (!filterDate || itemDate === filterDate)
    );
  });

  return (
    <div className="confirm-container">
      <h2>Chốt Lịch Khám</h2>
      <div className="filters">
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
            <th>Triệu Chứng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <tr key={item.appointment_id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>
                  {(() => {
                    const date = new Date(item.appointment_date);
                    date.setDate(date.getDate() + 1);
                    return date.toISOString().split("T")[0];
                  })()}
                </td>
                <td>{item.time}</td>
                <td>{item.symptoms || "null"}</td>
                <td>
                  <button onClick={() => handleConfirm(item.appointment_id)}>
                    Chốt
                  </button>
                  <button
                    onClick={() => handleCancel(item.appointment_id)}
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
