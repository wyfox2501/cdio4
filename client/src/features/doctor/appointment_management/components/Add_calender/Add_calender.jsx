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
    const [doctorName, setDoctorName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/doctor", {
                    method: "GET",
                    credentials: "include",
                });
                const json = await res.json();
                setDoctorName(json[0]?.username || "");
            } catch (err) {
                console.error("❌ Lỗi fetch doctor:", err);
            }
        };
        fetchDoctor();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.ngay) newErrors.ngay = "Vui lòng nhập ngày";

        const start = parseInt(data.thoigianstart);
        const end = parseInt(data.thoigianend);

        if (!data.thoigianstart) {
            newErrors.thoigianstart = "Vui lòng nhập thời gian bắt đầu";
        } else if (isNaN(start) || start < 7 || start > 21) {
            newErrors.thoigianstart = "Giờ bắt đầu không hợp lệ (7 - 21)";
        }

        if (!data.thoigianend) {
            newErrors.thoigianend = "Vui lòng nhập thời gian kết thúc";
        } else if (isNaN(end) || end < 0 || end > 23) {
            newErrors.thoigianend = "Giờ kết thúc không hợp lệ (0 - 23)";
        } else if (end <= start) {
            newErrors.thoigianend = "Giờ kết thúc phải lớn hơn giờ bắt đầu";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setMeseger("Lỗi nhập liệu");
            setColor("#f03242");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/doctor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    date: data.ngay,
                    time_start: start,  // gửi dạng số
                    time_end: end,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("❌ API lỗi:", res.status, text);
                setMeseger("Không thể thêm lịch");
                setColor("#f03242");
                return;
            }

            const result = await res.json();
            console.log("✅ Thêm thành công:", result);
            setMeseger("Đã thêm lịch thành công!");
            setColor("green");

            setTimeout(() => {
                setMeseger("");
                window.location.reload();
            }, 1500);
        } catch (err) {
            console.error("❌ Gửi API lỗi:", err);
            setMeseger("Gửi API thất bại");
            setColor("#f03242");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add">
            {meseger && (
                <p style={{ backgroundColor: color, color: "white" }}>
                    {meseger}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <h2>Thêm lịch làm việc</h2>
                <div className="insert">
                    <div className="date">
                        <span>Ngày</span>
                        <input
                            type="date"
                            name="ngay"
                            value={data.ngay}
                            onChange={handleInputChange}
                        />
                        {errors.ngay && <p className="error">{errors.ngay}</p>}
                    </div>
                    <div className="hourStart">
                        <span>Thời Gian Bắt Đầu</span>
                        <input
                            type="number"
                            name="thoigianstart"
                            value={data.thoigianstart}
                            onChange={handleInputChange}
                            placeholder="7"
                            min="7"
                            max="21"
                        />
                        {errors.thoigianstart && (
                            <p className="error">{errors.thoigianstart}</p>
                        )}
                    </div>
                    <div className="hourEnd">
                        <span>Thời Gian Kết Thúc</span>
                        <input
                            type="number"
                            name="thoigianend"
                            value={data.thoigianend}
                            onChange={handleInputChange}
                            placeholder="11"
                            min="8"
                            max="23"
                        />
                        {errors.thoigianend && (
                            <p className="error">{errors.thoigianend}</p>
                        )}
                    </div>
                    <div className="doctor">
                        <span>Doctor</span>
                        <input type="text" value={doctorName} readOnly />
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Đang thêm..." : "Thêm"}
                </button>
            </form>
        </div>
    );
}

export default Add_calender;
