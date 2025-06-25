import React, { useEffect, useState } from "react";
import "./style.scss";

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
    const patient = [
        {
            id: "BN01",
            name: "Trần Minh Tú",
            date: "03/07/2025",
            time: "14H",
        },
        {
            id: "BN02",
            name: "Trần Đại Huân",
            date: "03/05/2025",
            time: "8H",
        },
    ];

    const getWeekday = (dataString) => {
        const date = new Date(dataString);
        return daysOfWeek[date.getDay()];
    };

    const [coutDay, setCoutDay] = useState(new Date(2025, 2, 3)); // 3/3/2025
    const [endDay, setEndDay] = useState(new Date(coutDay));

    useEffect(() => {
        const newEndDay = new Date(coutDay);
        newEndDay.setDate(newEndDay.getDate() + 6);
        setEndDay(newEndDay);
    }, [coutDay]);

    const nextDay = () => {
        setCoutDay((pre) => {
            const next = new Date(pre);
            next.setDate(next.getDate() + 7);
            return next;
        });
    };

    const preDay = () => {
        setCoutDay((pre) => {
            const next = new Date(pre);
            next.setDate(next.getDate() - 7);
            return next;
        });
    };

    return (
        <div className="container">
            <h2>Lịch Khám</h2>
            <div className="calender">
                <div className="head">
                    <span className="next" onClick={preDay}>
                        ◀️
                    </span>
                    <span className="pre" onClick={nextDay}>
                        ▶️
                    </span>
                    <span>
                        {coutDay.toLocaleDateString()} -{" "}
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
                                        {patient
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
                                                </div>
                                            ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewCalendarKham;
