// src/features/customer/make_an_appointment/Sidebar.jsx
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import logo from '../../../images/healthycare.jpg'; // Cập nhật đường dẫn logo
import './DoctorDetail.scss'; // Dùng chung file style với DoctorDetail

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook để lấy đường dẫn hiện tại
  const { doctorId } = useParams(); // Lấy doctorId từ URL để truyền qua các trang

  // Hàm kiểm tra xem nút nào đang được chọn dựa trên URL
  const isActive = (path) => location.pathname.includes(path);

  // Nếu không có doctorId (ví dụ trang lỗi), không hiển thị sidebar
  if (!doctorId) return null; 

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="navigation">
        <button 
          className={`nav-button ${isActive('/chi-tiet-bac-si') ? 'active' : ''}`}
          onClick={() => navigate(`/datlich/chi-tiet-bac-si/${doctorId}`)}
        >
          Thông Tin Bác Sĩ
        </button>

        <button 
          className={`nav-button ${isActive('/thong-tin-kham-benh') ? 'active' : ''}`}
          onClick={() => navigate(`/datlich/thong-tin-kham-benh/${doctorId}`)}
        >
          Thông tin khám bệnh
        </button>

        <button 
          className={`nav-button ${isActive('/dat-lich') ? 'active' : ''}`}
          onClick={() => navigate(`/datlich/kiemtra/${doctorId}`)}
        >
          Đặt Lịch
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;