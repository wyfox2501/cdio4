import React, { useEffect, useState } from "react";
import "./style.scss";
import "./styleDelete.scss";

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

function WorkSchedule() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 7));
    const [weekDates, setWeekDates] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const week = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(currentDate);
            day.setDate(currentDate.getDate() + i);
            return day;
        });
        setWeekDates(week);
    }, [currentDate]);

    // 🔹 Lấy tên user từ session
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/users/me", {
                    credentials: "include",
                });
                if (!res.ok) {
                    console.warn("⚠️ Không lấy được user:", res.status);
                    return;
                }
                const data = await res.json();
                console.log("👤 User:", data);
                setUserName(data.name || "Bác sĩ");
            } catch (err) {
                console.error("❌ Lỗi khi lấy user:", err);
            }
        };
        fetchUserName();
    }, []);

    // 🔹 Lấy lịch khi có userName
    useEffect(() => {
        if (!userName) return; // Chờ có tên rồi mới fetch

        const fetchSchedule = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5000/api/doctor/view_work_schedule",
                    { credentials: "include" }
                );

                if (!res.ok) {
                    console.warn("⚠️ Backend trả về lỗi HTTP:", res.status);
                    return;
                }

                const data = await res.json();
                console.log('data',data);
                
                const formatted = data.map((item) => {
                    const startUTC =
                        new Date(item.datetime_start).getUTCHours() + 7;
                    const endUTC =
                        new Date(item.datetime_end).getUTCHours() + 7;
                    const start = startUTC >= 24 ? startUTC - 24 : startUTC;
                    const end = endUTC >= 24 ? endUTC - 24 : endUTC;

                    const hours = [];
                    for (let i = start; i < end; i++) {
                        hours.push(`${i}H`);
                    }
                    return {
                        id: item.schedule_id,
                        doctor: userName, // ✅ dùng tên user thay "Bác sĩ"
                        date: item.date,
                        hour: hours,
                    };
                });

                console.log("✅ Lịch từ API:", formatted);
                setSchedule(formatted);
            } catch (error) {
                console.error("❌ Lỗi khi gọi API:", error);
            }
        };

        fetchSchedule();
    }, [userName]);

    const formatDate = (date) =>
        date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    const goToNextWeek = () => {
        const next = new Date(currentDate);
        next.setDate(currentDate.getDate() + 7);
        setCurrentDate(next);
    };
    const goToPreviousWeek = () => {
        const prev = new Date(currentDate);
        prev.setDate(currentDate.getDate() - 7);
        setCurrentDate(prev);
    };

    const handleDeleteClick = (date, hour, doctor) => {
        const numericHour = parseInt(hour.replace("H", ""));
        const formattedDate = new Date(date).toDateString();
        setSelectedDelete({
            date: formattedDate,
            timeStart: numericHour,
            timeEnd: numericHour + 1,
            doctor,
        });
    };

    const DeletePopup = ({ dataDelete, onClose, schedule, setSchedule }) => {
        const [data] = useState({
            ngay: dataDelete.date || "",
            thoigianstart: dataDelete.timeStart || "",
            thoigianend: dataDelete.timeEnd || "",
            doctor: dataDelete.doctor || "",
        });

        const handleSubmit = async (e) => {
            e.preventDefault();
            const matched = schedule.find((item) => {
                const isSameDate =
                    new Date(item.date).toDateString() ===
                    new Date(dataDelete.date).toDateString();
                return (
                    isSameDate &&
                    item.doctor === dataDelete.doctor &&
                    item.hour.includes(`${dataDelete.timeStart}H`)
                );
            });
            if (!matched) {
                alert("Không tìm thấy lịch để xóa!");
                return;
            }

            try {
                const res = await fetch(
                    `http://localhost:5000/api/doctor/${matched.id}`,
                    {
                        method: "DELETE",
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    alert("Xóa thất bại trên server");
                    return;
                }

                const updatedSchedule = schedule
                    .map((item) => {
                        const isSameDate =
                            new Date(item.date).toDateString() ===
                            new Date(dataDelete.date).toDateString();
                        if (isSameDate && item.doctor === dataDelete.doctor) {
                            const newHourList = item.hour.filter(
                                (h) =>
                                    parseInt(h.replace("H", "")) !==
                                    dataDelete.timeStart
                            );
                            return { ...item, hour: newHourList };
                        }
                        return item;
                    })
                    .filter((item) => item.hour.length > 0);

                setSchedule(updatedSchedule);
                alert("✅ Xóa thành công!");
                onClose();
            } catch (err) {
                console.error("❌ Lỗi khi gọi API DELETE:", err);
                alert("Xóa thất bại!");
            }
        };

        return (
            <div className="modal-backdrop">
                <div className="modal">
                    <button className="close-btn" onClick={onClose}>
                        ❌
                    </button>
                    <div className="add">
                        <form onSubmit={handleSubmit}>
                            <h2>Xóa lịch</h2>
                            <div className="insert">
                                <div className="date">
                                    <span>Ngày</span>
                                    <input
                                        type="text"
                                        value={new Date(
                                            data.ngay
                                        ).toLocaleDateString("vi-VN")}
                                        readOnly
                                    />
                                </div>
                                <div className="hourStart">
                                    <span>Thời Gian Bắt Đầu</span>
                                    <input
                                        type="number"
                                        value={data.thoigianstart}
                                        readOnly
                                    />
                                </div>
                                <div className="hourEnd">
                                    <span>Thời Gian Kết Thúc</span>
                                    <input
                                        type="number"
                                        value={data.thoigianend}
                                        readOnly
                                    />
                                </div>
                                <div className="doctor">
                                    <span>Doctor</span>
                                    <input
                                        type="text"
                                        value={data.doctor}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <button type="submit">Xóa</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <h2>Lịch Làm Việc</h2>
            <div className="calender">
                <div className="head">
                    <span className="next" onClick={goToPreviousWeek}>
                        ◀️
                    </span>
                    <span className="pre" onClick={goToNextWeek}>
                        ▶️
                    </span>
                    <span>
                        {formatDate(weekDates[0] || currentDate)} -{" "}
                        {formatDate(weekDates[6] || currentDate)}
                    </span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="time1">Giờ</th>
                            {weekDates.map((date, index) => (
                                <th key={index} className="time2">
                                    {daysOfWeek[index]}
                                    <br />
                                    {formatDate(date)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour}>
                                <td className="hour">{hour}</td>
                                {weekDates.map((date, idx) => (
                                    <td key={idx + hour} className="date">
                                        {schedule
                                            .filter(
                                                (s) =>
                                                    isSameDay(
                                                        new Date(s.date),
                                                        date
                                                    ) && s.hour.includes(hour)
                                            )
                                            .map((item, i) => (
                                                <div key={i} className="see">
                                                    <span className="doctor-name">
                                                        {item.doctor}
                                                    </span>
                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                date,
                                                                hour,
                                                                item.doctor
                                                            )
                                                        }
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedDelete && (
                <DeletePopup
                    dataDelete={selectedDelete}
                    onClose={() => setSelectedDelete(null)}
                    schedule={schedule}
                    setSchedule={setSchedule}
                />
            )}
        </div>
    );
}

export default WorkSchedule;
