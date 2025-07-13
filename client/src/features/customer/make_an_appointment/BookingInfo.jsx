import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios'; // Import axios
import './BookingInfo.scss';
import patientAvatar from '../../../images/avatardoctor.png'; // Giữ lại avatar mặc định

const BookingInfo = () => {
    const navigate = useNavigate();
    const { doctorId } = useParams();

    // State để lưu thông tin bệnh nhân từ API
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect để gọi API lấy thông tin bệnh nhân khi component được tải
    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                // Gọi API để lấy thông tin của người dùng đã đăng nhập
                // Cần gửi kèm cookie để server xác thực
                const response = await axios.get(
                    'http://localhost:5000/api/patient/profile', // Đảm bảo cổng chính xác
                    { withCredentials: true }
                );
                setPatientData(response.data);
            } catch (err) {
                console.error("Lỗi khi lấy thông tin bệnh nhân:", err);
                setError("Không thể tải thông tin của bạn. Vui lòng đăng nhập lại.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatientProfile();
    }, []); // Mảng rỗng đảm bảo chỉ chạy một lần

    const handleContinue = () => {
        // Chuyển đến trang đặt lịch (đã đúng)
        navigate(`/datlich/kiemtra/${doctorId}`);
    };

    // Hiển thị trạng thái tải hoặc lỗi
    if (loading) {
        return <div className="main-content">Đang tải thông tin...</div>;
    }
    if (error) {
        return <div className="main-content error-message">{error}</div>;
    }
    if (!patientData) {
        return <div className="main-content">Không có dữ liệu.</div>;
    }

    // Helper để format ngày
    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa cập nhật';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="main-content">
            <div className="form-card">
                <div className="form-header">
                    <img src={patientData.avata || patientAvatar} alt="Bệnh nhân" className="patient-avatar" />
                    <h2 className="title">
                        <span role="img" aria-label="Stethoscope">⚕️</span> Thông Tin Khám Bệnh
                    </h2>
                </div>

                <div className="form-grid">
                    {/* Các trường dữ liệu giờ sẽ lấy từ state `patientData` */}
                    <div className="form-group">
                        <label>Họ Và Tên:</label>
                        <div className="value-display">{patientData.username}</div>
                    </div>
                    <div className="form-group">
                        <label>Ngày Sinh:</label>
                        <div className="value-display">{formatDate(patientData.birthdate)}</div>
                    </div>
                    <div className="form-group full-width">
                        <label>Địa Chỉ:</label>
                        <div className="value-display">{patientData.address || 'Chưa cập nhật'}</div>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <div className="value-display">{patientData.email}</div>
                    </div>
                    <div className="form-group">
                        <label>Chiều cao (m):</label>
                        <div className="value-display">{patientData.height || 'N/A'}</div>
                    </div>
                     <div className="form-group">
                        <label>Cân nặng (kg):</label>
                        <div className="value-display">{patientData.weight || 'N/A'}</div>
                    </div>
                    <div className="form-group full-width">
                        <label>Triệu Chứng (sẽ được nhập ở bước sau):</label>
                        <div className="value-display large">...</div>
                    </div>
                </div>

                <div className="footer-actions">
                    <button className="continue-button" onClick={handleContinue}>
                        Tiếp Tục
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;
