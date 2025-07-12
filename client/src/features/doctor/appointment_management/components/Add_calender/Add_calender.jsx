import React, { useEffect, useState } from "react";
import "./style_Add.scss";

function Add_calender() {
    const [data, setData] = useState({
        ngay: "",
        thoigianstart: "",
        thoigianend: "",
    });
    const [meseger, setMeseger] = useState("");
    const [errors, setErrors] = useState({});
    const [color, setColor] = useState("#f03242");
    const [doctor, setDoctor] = useState({});
    const setinput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/doctor", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) {
                    console.error("❌ Lỗi lấy bác sĩ:", res.status);
                    return;
                }
                const json = await res.json();
                console.log("📥 Dữ liệu doctor:", json[0]);
                setDoctor(json[0]); // Lấy tên bác sĩ để hiển thị
            } catch (error) {
                console.error("❌ Lỗi khi fetch bác sĩ:", error);
                
            }
        };
        fetchDoctor();
    }, []);

    const check_input = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!data.ngay.trim()) {
            newErrors.ngay = "Vui lòng nhập ngày";
        }
        if (!data.thoigianstart.trim()) {
            newErrors.thoigianstart = "Vui lòng nhập giờ bắt đầu";
        } else if (
            isNaN(data.thoigianstart) ||
            data.thoigianstart < 7 ||
            data.thoigianstart > 21
        ) {
            newErrors.thoigianstart = "Giờ bắt đầu không hợp lệ (7 - 21)";
        }
        if (!data.thoigianend.trim()) {
            newErrors.thoigianend = "Vui lòng nhập giờ kết thúc";
        } else if (
            isNaN(data.thoigianend) ||
            data.thoigianend < 0 ||
            data.thoigianend > 23
        ) {
            newErrors.thoigianend = "Giờ kết thúc không hợp lệ (0 - 23)";
        } else if (parseInt(data.thoigianend) <= parseInt(data.thoigianstart)) {
            newErrors.thoigianend = "Giờ kết thúc phải lớn hơn giờ bắt đầu";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setMeseger("Lỗi");
            setColor("#f03242");
            return;
        }
        try {
            // Format date to YYYY-MM-DD
            const formattedDate = data.ngay; // 'YYYY-MM-DD'

            // Tạo datetime_start và datetime_end dạng 'YYYY-MM-DD HH:MM:SS'
            const datetime_start = `${formattedDate} ${String(
                data.thoigianstart
            ).padStart(2, "0")}:00:00`;
            const datetime_end = `${formattedDate} ${String(
                data.thoigianend
            ).padStart(2, "0")}:00:00`;

            const response = await fetch("http://localhost:5000/api/doctor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    date: formattedDate,
                    time_start: datetime_start,
                    time_end: datetime_end,
                }),
            });
            const errorText = await response.text();
            if (!response.ok) {
                console.error("❌ Lỗi API:", response.status, errorText);
                setMeseger("Lỗi khi thêm lịch");
                setColor("#f03242");
                alert("Schedule conflict"||errorText.message);
                return;
            }
            
            console.log("✅ Thêm lịch thành công");
            setMeseger("Thêm lịch thành công!");
            setColor("green");
            // Reset form sau khi thêm
            setData({
                ngay: "",
                thoigianstart: "",
                thoigianend: "",
            });
        } catch (error) {
            console.error("❌ Lỗi fetch:", error);
            setMeseger("Lỗi khi thêm lịch");
            setColor("#f03242");
            alert(error);
        }
    };

    return (
        <div className="add">
            {meseger && (
                <p
                    style={{
                        backgroundColor: color,
                        color: "white",
                        padding: "8px",
                    }}
                >
                    {meseger}
                </p>
            )}
            <form onSubmit={check_input}>
                <h2 style={{ color: "red", textAlign: "center" }}>
                    Thêm lịch làm việc
                </h2>
                <div className="insert">
                    <div className="date">
                        <span>Ngày</span>
                        <input
                            type="date"
                            name="ngay"
                            value={data.ngay}
                            onChange={setinput}
                        />
                        {errors.ngay && (
                            <p style={{ color: "red" }}>{errors.ngay}</p>
                        )}
                    </div>
                    <div className="hourStart">
                        <span>Thời Gian Bắt Đầu</span>
                        <input
                            type="number"
                            name="thoigianstart"
                            min="7"
                            max="20"
                            placeholder="7H"
                            value={data.thoigianstart}
                            onChange={setinput}
                        />
                        {errors.thoigianstart && (
                            <p style={{ color: "red" }}>
                                {errors.thoigianstart}
                            </p>
                        )}
                    </div>
                    <div className="hourEnd">
                        <span>Thời Gian Kết Thúc</span>
                        <input
                            type="number"
                            name="thoigianend"
                            min="8"
                            max="21"
                            placeholder="11H"
                            value={data.thoigianend}
                            onChange={setinput}
                        />
                        {errors.thoigianend && (
                            <p style={{ color: "red" }}>{errors.thoigianend}</p>
                        )}
                    </div>
                    <div className="doctor">
                        <span>Doctor</span>
                        <input
                            type="text"
                            value={doctor.username || "Tên bác sĩ"}
                            readOnly
                            placeholder="Tên bác sĩ"
                        />
                    </div>
                </div>
                <button type="submit">Lưu</button>
            </form>
        </div>
    );
}

export default Add_calender;
