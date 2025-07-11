import React, { useState, useEffect } from "react";
import "./adviseDoctor.scss";

function AdviseDoctor() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load tin nhắn từ localStorage khi mở trang
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chatData")) || [];
    setMessages(stored);
    const handleStorage = () => {
      const updated = JSON.parse(localStorage.getItem("chatData")) || [];
      setMessages(updated);
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Hàm gửi tin nhắn
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        sender: "doctor",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const stored = JSON.parse(localStorage.getItem("chatData")) || [];
      const updated = [...stored, newMessage];

      localStorage.setItem("chatData", JSON.stringify(updated));
      setMessages(updated);
      setMessage("");
    }
  };

  return (
    <div className="advise-doctor-container">
      <h2 className="advise-title">Trò chuyện với khách hàng</h2>
      <div className="chat-container">
        <div className="chat-header">Tin nhắn khách hàng</div>
        <div className="chat-body">
          {messages.length === 0 && (
            <div style={{ textAlign: "center", color: "#64748b" }}>Chưa có tin nhắn</div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "doctor" ? "user-message" : "doctor-message"}`}
            >
              <div>{msg.text}</div>
              <div className="chat-time">{msg.time}</div>
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
    </div>
  );
}

export default AdviseDoctor;
