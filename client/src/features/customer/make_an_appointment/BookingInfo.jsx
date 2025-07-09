import React from 'react';
// 1. THÊM CÁC HOOK CẦN THIẾT
import { useNavigate, useParams } from 'react-router-dom'; 
import './BookingInfo.scss';
import patientAvatar from '../../../images/avatardoctor.png';

const BookingInfo = () => {
  // 2. KHỞI TẠO CÁC HOOK
  const navigate = useNavigate();
  const { doctorId } = useParams();

  // Dữ liệu bệnh nhân (giữ nguyên)
  const patientData = {
    name: 'Thái Đại Huấn',
    age: '20',
    dob: '12/02/2004',
    gender: 'Nam',
    address: '118 Lê Duẩn, Hải Châu, ĐN',
    phone: '0842132259',
    symptoms: 'đau răng, mệt, đau nửa đầu',
    backgroundDisease: 'Không có',
  };

  // 3. TẠO HÀM XỬ LÝ CHO NÚT TIẾP TỤC
  const handleContinue = () => {
    // Chuyển đến trang đặt lịch, truyền theo ID của bác sĩ
    navigate(`/dat-lich/${doctorId}`);
  };

  return (
    // XÓA BỎ DIV CONTAINER VÀ SIDEBAR, CHỈ GIỮ LẠI PHẦN NỘI DUNG CHÍNH
    <div className="main-content">
      <div className="form-card">
        <div className="form-header">
          <img src={patientAvatar} alt="Bệnh nhân" className="patient-avatar" />
          <h2 className="title">
            <span role="img" aria-label="Stethoscope">⚕️</span> Thông Tin Khám Bệnh
          </h2>
        </div>

        <div className="form-grid">
          {/* Hàng 1 */}
          <div className="form-group">
            <label>Họ Và Tên:</label>
            <div className="value-display">{patientData.name}</div>
          </div>
          <div className="form-group">
            <label>Tuổi:</label>
            <div className="value-display">{patientData.age}</div>
          </div>

          {/* Hàng 2 */}
          <div className="form-group">
            <label>Ngày Sinh:</label>
            <div className="value-display">{patientData.dob}</div>
          </div>
          <div className="form-group">
            <label>Giới Tính:</label>
            <div className="gender-select">
              <span className={`option ${patientData.gender === 'Nam' ? 'selected' : ''}`}>Nam</span>
              <span className={`option ${patientData.gender === 'Nữ' ? 'selected' : ''}`}>Nữ</span>
            </div>
          </div>

          {/* Hàng 3 */}
          <div className="form-group full-width">
            <label>Địa Chỉ:</label>
            <div className="value-display">{patientData.address}</div>
          </div>

           {/* Hàng 4 */}
           <div className="form-group">
            <label>SĐT:</label>
            <div className="value-display">{patientData.phone}</div>
          </div>
          <div className="form-group">
            <label>Bệnh Nền:</label>
            <div className="value-display">{patientData.backgroundDisease}</div>
          </div>

          {/* Hàng 5 */}
          <div className="form-group full-width">
            <label>Triệu Chứng:</label>
            <div className="value-display large">{patientData.symptoms}</div>
          </div>
        </div>

        <div className="footer-actions">
          {/* 4. GÁN HÀM VÀO SỰ KIỆN ONCLICK */}
          <button className="continue-button" onClick={handleContinue}>
            Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;