import React, { useState } from 'react';
// 1. THÊM CÁC HOOK CẦN THIẾT
import { useNavigate, useParams } from 'react-router-dom';
import './Schedule.scss';

function Schedule() {
  // 2. KHỞI TẠO CÁC HOOK
  const navigate = useNavigate();
  const { doctorId } = useParams();

  // 3. SỬ DỤNG STATE ĐỂ QUẢN LÝ LỊCH ĐƯỢC CHỌN
  // selectedScheduleId sẽ lưu ID của lịch hẹn mà người dùng click vào
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  // Dữ liệu giả lập (giữ nguyên)
  const appointmentAddress = '101 Nguyễn Văn Linh, Hải Châu, Đà Nẵng';
  const scheduleData = [
    { id: 1, date: '22/01/2025', time: '08:00 - 10:00', status: 'booked' },
    { id: 2, date: '23/01/2025', time: '14:00 - 16:00', status: 'available' },
    { id: 3, date: '25/01/2025', time: '09:00 - 11:00', status: 'available' },
    { id: 4, date: '27/01/2025', time: '16:00 - 18:00', status: 'booked' },
    { id: 5, date: '28/01/2025', time: '10:00 - 12:00', status: 'available' },
  ];

  // 4. HÀM XỬ LÝ KHI NGƯỜI DÙNG CHỌN MỘT LỊCH
  const handleRowClick = (schedule) => {
    // Chỉ cho phép chọn những lịch "Còn trống"
    if (schedule.status === 'available') {
      setSelectedScheduleId(schedule.id);
    }
  };

  // 5. HÀM XỬ LÝ CHO NÚT XÁC NHẬN
  const handleConfirmClick = () => {
    if (selectedScheduleId) {
      // Chuyển đến trang xác nhận, truyền theo ID của bác sĩ
      navigate(`/datlich/xac-nhan-dat-lich/${doctorId}`);
    } else {
      alert("Vui lòng chọn một lịch hẹn còn trống!");
    }
  };

  return (
    // XÓA BỎ DIV CONTAINER VÀ SIDEBAR, CHỈ GIỮ LẠI PHẦN NỘI DUNG CHÍNH
    <div className="schedule-card">
      <div className="date-filter">
        <label>Thời gian:</label>
        <span>Từ:</span>
        <div className="date-display">22/01/2025</div>
        <span>Đến:</span>
        <div className="date-display">28/01/2025</div>
      </div>

      <div className="schedule-table">
        <header className="table-header">
          <span className="col-select"></span>
          <span className="col-date">Ngày</span>
          <span className="col-time">Giờ</span>
          <span className="col-address">Địa Điểm</span>
          <span className="col-status">Trạng Thái</span>
        </header>
        <div className="table-body">
          {scheduleData.map((item) => (
            // 6. THÊM SỰ KIỆN ONCLICK VÀ CẬP NHẬT CLASSNAME
            <div 
              key={item.id} 
              className={`table-row ${item.id === selectedScheduleId ? 'selected' : ''} ${item.status === 'booked' ? 'disabled' : ''}`}
              onClick={() => handleRowClick(item)}
            >
              <div className="col-select">
                <div className="custom-checkbox">
                  {/* Dùng state để hiển thị dấu tick */}
                  {item.id === selectedScheduleId ? 'V' : ''}
                </div>
              </div>
              <div className="col-date">{item.date}</div>
              <div className="col-time">{item.time}</div>
              <div className="col-address">{appointmentAddress}</div>
              <div className={`col-status status-${item.status}`}>
                {item.status === 'available' ? '✅ Còn trống' : '❌ Đã đặt'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer-action">
        <button className="confirm-button" onClick={handleConfirmClick}>
          Xác nhận chọn lịch
        </button>
      </footer>
    </div>
  );
}

export default Schedule;