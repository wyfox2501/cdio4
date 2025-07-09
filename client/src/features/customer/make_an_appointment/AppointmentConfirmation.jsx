import React from 'react';
// 1. THÊM CÁC HOOK CẦN THIẾT
import { useParams } from 'react-router-dom';
import './AppointmentConfirmation.scss';
import Doctorimages from "../../../images/avatardoctor.png";

// --- DỮ LIỆU BÁC SĨ ĐỂ TRA CỨU ---
const doctorsData = {
    1: [
        { id: 1, name: "Nguyễn Văn An", experience: 15, title: "Bác sĩ chuyên khoa II", price: 250000, avatar: Doctorimages, dob: '10/10/1978', gender: 'Nam', phone: '0905111222', email: 'an.nguyen@clinic.com', address: '123 Hùng Vương, Hải Châu, Đà Nẵng' },
        { id: 2, name: "Trần Thị Minh Hằng", experience: 10, title: "Thạc sĩ Y khoa", price: 300000, avatar: Doctorimages, dob: '12/02/1992', gender: 'Nữ', phone: '0398886699', email: 'minhhong1992@clinic.com', address: '26 Hải Phòng, Hải Châu, Đà Nẵng' },
        // ... Thêm dữ liệu đầy đủ cho các bác sĩ khác ở đây
    ],
    // ... các khoa khác
};

function AppointmentConfirmation() {
  // 2. LẤY ID BÁC SĨ TỪ URL
  const { doctorId } = useParams();

  // Tìm kiếm thông tin bác sĩ
  let doctorInfo = null;
  for (const deptId in doctorsData) {
    const foundDoctor = doctorsData[deptId]?.find(doc => doc.id.toString() === doctorId);
    if (foundDoctor) {
      doctorInfo = foundDoctor;
      break;
    }
  }

  // Dữ liệu bệnh nhân và lịch hẹn (hiện tại đang là dữ liệu tĩnh)
  const patientInfo = {
    name: 'Thái Đại Huấn',
    age: '20',
    dob: '12/02/2004',
    gender: 'Nam',
    address: '118 Lê Duẩn, Hải Châu, ĐN',
    phone: '0842132259',
    symptoms: 'đau răng, mệt, đau nửa đầu',
  };
  const appointmentDetails = {
    date: '23/01/2025',
    time: '14:00-16:00',
  };

  // Nếu không tìm thấy bác sĩ, hiển thị thông báo
  if (!doctorInfo) {
    return <div><h1>Lỗi: Không tìm thấy thông tin bác sĩ!</h1></div>;
  }

  return (
    // 3. XÓA BỎ SIDEBAR VÀ DIV BAO NGOÀI, CHỈ GIỮ LẠI NỘI DUNG CHÍNH
    <div className="confirmation-card">
      <header className="card-header">
        <h2><span role="img" aria-label="pin">📌</span> Thông Tin Lịch Hẹn</h2>
      </header>

      {/* Thông tin bệnh nhân */}
      <section className="info-section">
        <h3 className="section-title">*Thông Tin Bệnh Nhân</h3>
        <div className="info-grid">
          <div className="info-item"><label>Họ Và Tên:</label><div className="value">{patientInfo.name}</div></div>
          <div className="info-item"><label>Tuổi:</label><div className="value">{patientInfo.age}</div></div>
          <div className="info-item"><label>Ngày Sinh:</label><div className="value">{patientInfo.dob}</div></div>
          <div className="info-item"><label>Giới Tính:</label><div className="value">{patientInfo.gender}</div></div>
          <div className="info-item full-width"><label>Địa Chỉ:</label><div className="value">{patientInfo.address}</div></div>
          <div className="info-item"><label>SĐT:</label><div className="value">{patientInfo.phone}</div></div>
          <div className="info-item full-width"><label>Triệu Chứng:</label><div className="value">{patientInfo.symptoms}</div></div>
          <div className="info-item"><label>Ngày Khám:</label><div className="value">{appointmentDetails.date}</div></div>
          <div className="info-item"><label>Giờ:</label><div className="value">{appointmentDetails.time}</div></div>
        </div>
      </section>

      {/* Thông tin bác sĩ (lấy tự động) */}
      <section className="info-section">
        <h3 className="section-title">*Thông Tin Bác Sĩ</h3>
        <div className="info-grid">
          <div className="info-item"><label>Bác Sĩ Khám:</label><div className="value">{doctorInfo.name}</div></div>
          <div className="info-item"><label>Ngày Sinh:</label><div className="value">{doctorInfo.dob}</div></div>
          <div className="info-item"><label>Giới Tính:</label><div className="value">{doctorInfo.gender}</div></div>
          <div className="info-item full-width"><label>Địa Chỉ:</label><div className="value">{doctorInfo.address}</div></div>
          <div className="info-item"><label>SĐT:</label><div className="value">{doctorInfo.phone}</div></div>
          <div className="info-item"><label>Thời gian:</label><div className="value">{appointmentDetails.time}</div></div>
        </div>
      </section>

      <footer className="card-footer">
        <button className="confirm-button" onClick={() => alert('Xác nhận đặt lịch thành công!')}>
          Xác Nhận Đặt Lịch
        </button>
      </footer>
    </div>
  );
}

export default AppointmentConfirmation;