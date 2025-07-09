import React, { useState } from "react";
import "./adviseCustomer.scss";

const doctors = [
  {
    id: 1,
    name: "Ths.BS Võ Duy Tâm",
    specialization: "Tim mạch",
    workplace: "Nam Khoa, Ngoại Khoa",
    image: "",
  },
  {
    id: 2,
    name: "BS. Võ Thị Linh Oanh",
    specialization: "Sản phụ khoa",
    workplace: "",
    image: "",
  },
  {
    id: 3,
    name: "BS.CKI Đặng Thái Hiền",
    specialization: "Ngoại khoa",
    workplace: "Bác sĩ Ngoại khoa BV Nhi",
    image: "",
  },
  {
    id: 4,
    name: "BS.CKI Nguyễn Khắc Vân",
    specialization: "Ngoại khoa",
    workplace: "Bác sĩ Khoa Nội Tim mạch",
    image: "",
  },
  {
    id: 5,
    name: "BS.CKI Lê Khánh Trang",
    specialization: "Sản phụ khoa",
    workplace: "",
    image: "",
  },
  {
    id: 6,
    name: "BS Lương Thị Cẩm Nhung",
    specialization: "Sản phụ khoa",
    workplace: "",
    image: "",
  },
  {
    id: 7,
    name: "BS Lê Thị Thu Hường",
    specialization: "Sản phụ khoa",
    workplace: "",
    image: "",
  },
  {
    id: 8,
    name: "BS.CKI Trần Thị Hiếu Mỹ",
    specialization: "Sản phụ khoa",
    workplace: "",
    image: "",
  },
];

function AdviseCustomer() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <div className="advise-customer-container">
      {!selectedDoctor && (
        <>
          <h2 className="advise-title">Danh sách bác sĩ</h2>
          <div className="advise-grid">
            {doctors.map((doctor) => (
              <div className="advise-card" key={doctor.id}>
                <img
                  src={doctor.image || "/default-avatar.png"}
                  alt={doctor.name}
                  className="advise-avatar"
                />
                <div className="advise-info">
                  <div className="advise-name">{doctor.name}</div>
                  <div className="advise-specialization">{doctor.specialization}</div>
                  {doctor.workplace && (
                    <div className="advise-workplace">{doctor.workplace}</div>
                  )}
                </div>
                <div className="advise-actions">
                  <button className="action-button">Đánh giá</button>
                  <button
                    className="action-button"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setMessages([]); 
                    }}
                  >
                    Nhắn tin
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedDoctor && (
        <div className="chat-container">
          <button
            className="back-button"
            onClick={() => setSelectedDoctor(null)}
          >
            ⬅ Quay lại
          </button>
          <div className="chat-header">
            BÁC SĨ {selectedDoctor.name.toUpperCase()}
          </div>
          <div className="chat-body">
            {messages.length === 0 && (
              <div style={{ textAlign: "center", color: "#64748b" }}>
                Chưa có tin nhắn
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === "user" ? "user-message" : "doctor-message"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdviseCustomer;
