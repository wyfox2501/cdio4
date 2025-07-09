import React from 'react';
import { useParams } from 'react-router-dom';
import './DoctorDetail.scss';

// Import dữ liệu từ tệp chung
import { doctorsData } from './data.js';

function DoctorDetail() {
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

  if (!doctorInfo) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', fontSize: '1.5rem' }}>
        <h1>Không tìm thấy thông tin bác sĩ!</h1>
      </div>
    );
  }

  return (
    <div className="info-card">
      <div className="info-header">
        <img src={doctorInfo.avatar} alt={doctorInfo.name} className="doctor-avatar" />
        <h2>Thông Tin Về Bác Sĩ</h2>
      </div>
      
      {/* Các trường dữ liệu đã được cập nhật để hiển thị trực tiếp */}
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Họ Và Tên:</span>
          <span className="value">{doctorInfo.name}</span>
        </div>
        <div className="info-item">
          <span className="label">Ngày Sinh:</span>
          <span className="value">{doctorInfo.dob}</span>
        </div>
        <div className="info-item">
          <span className="label">Giới Tính:</span>
          <div className="gender-options">
            <div className="gender-choice">
              <span className={`check-mark ${doctorInfo.gender === 'Nam' ? 'checked' : ''}`}>V</span>
              <span>Nam</span>
            </div>
            <div className="gender-choice">
              <span className={`check-mark ${doctorInfo.gender === 'Nữ' ? 'checked' : ''}`}>V</span>
              <span>Nữ</span>
            </div>
          </div>
        </div>
        <div className="info-item">
          <span className="label">SĐT:</span>
          <span className="value">{doctorInfo.phone}</span>
        </div>
        <div className="info-item">
          <span className="label">Email:</span>
          <span className="value">{doctorInfo.email}</span>
        </div>
        <div className="info-item">
          <span className="label">Học Vấn:</span>
          <span className="value">{doctorInfo.title}</span>
        </div>
        <div className="info-item">
          <span className="label">Kinh Nghiệm:</span>
          <span className="value">{doctorInfo.experience} năm</span>
        </div>
        <div className="info-item">
          <span className="label">Địa Chỉ:</span>
          <span className="value">{doctorInfo.address}</span>
        </div>
         <div className="info-item">
            <span className="label">Giá Khám:</span>
            <span className="value">{doctorInfo.price.toLocaleString()} VND</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;