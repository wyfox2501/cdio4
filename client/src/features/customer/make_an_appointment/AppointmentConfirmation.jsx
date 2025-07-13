import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppointmentConfirmation.scss';

function AppointmentConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Lấy thông tin lịch hẹn được truyền từ trang trước
    const { appointmentInfo } = location.state || {};

    const [doctorDetails, setDoctorDetails] = useState(null);
    const [patientDetails, setPatientDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Chuyển về trang chọn bác sĩ nếu không có thông tin lịch hẹn
        if (!appointmentInfo) {
            navigate('/chon-bac-si');
            return;
        }

        const fetchDetails = async () => {
            try {
                // Lấy thông tin bác sĩ và bệnh nhân song song
                const [doctorRes, patientRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/patient/doctor/${appointmentInfo.doctorId}`),
                    axios.get('http://localhost:5000/api/patient', { withCredentials: true, credentials: "include" })
                ]);
                setDoctorDetails(doctorRes.data[0]);
                setPatientDetails(patientRes.data[0]);
            } catch (err) {
                console.error("Lỗi khi tải thông tin chi tiết:", err);
                setError("Không thể tải đầy đủ thông tin để xác nhận.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [appointmentInfo, navigate]);

    const handleFinalConfirm = async () => {
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        const finalAppointmentData = {
            doctor_id: appointmentInfo.doctorId,
            appointment_date: appointmentInfo.appointmentDate,
            time: appointmentInfo.time,
            symptoms: appointmentInfo.symptoms
        };

        try {
            await axios.post(
                'http://localhost:5000/api/patient/appointments',
                finalAppointmentData,
                { withCredentials: true,
                    credentials: "include"
                 }
            );
            setSuccess("Bạn đã đặt lịch hẹn thành công!");
        } catch (err) {
            setError(err.response?.data?.msg || "Đã xảy ra lỗi khi xác nhận lịch hẹn.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN');
    const formatTime = (timeString) => timeString.substring(0, 5);

    if (isLoading) return <div className="confirmation-container loading">Đang tổng hợp thông tin...</div>;
    if (error && !success) return <div className="confirmation-container error">{error}</div>;

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <header className="card-header">
                    <h2>Kiểm Tra Lại Thông Tin Lịch Hẹn</h2>
                    <p>Vui lòng xác nhận các thông tin dưới đây là chính xác trước khi đặt lịch.</p>
                </header>

                {/* Chỉ hiển thị form khi chưa đặt lịch thành công */}
                {!success && (
                    <>
                        <section className="info-section">
                            <h3 className="section-title">Thông Tin Bệnh Nhân</h3>
                            <div className="details-grid">
                                <div><label>Họ và tên:</label><span>{patientDetails?.username}</span></div>
                                <div><label>Email:</label><span>{patientDetails?.email}</span></div>
                            </div>
                        </section>

                        <section className="info-section">
                            <h3 className="section-title">Thông Tin Bác Sĩ & Lịch Khám</h3>
                            <div className="details-grid">
                                <div><label>Bác sĩ:</label><span>{doctorDetails?.username}</span></div>
                                <div><label>Chuyên khoa:</label><span>{doctorDetails?.specification}</span></div>
                                <div><label>Ngày khám:</label><span>{formatDate(appointmentInfo.appointmentDate)}</span></div>
                                <div><label>Giờ khám:</label><span>{formatTime(appointmentInfo.time)}</span></div>
                                <div className="full-width"><label>Địa chỉ:</label><span>{appointmentInfo.clinicAddress}</span></div>
                                <div className="full-width"><label>Triệu chứng:</label><span>{appointmentInfo.symptoms || 'Không có'}</span></div>
                            </div>
                        </section>
                        
                        <footer className="card-footer">
                            {error && <p className="error-message">{error}</p>}
                            <button onClick={handleFinalConfirm} className="final-confirm-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Đang xử lý...' : 'Xác Nhận Đặt Lịch'}
                            </button>
                        </footer>
                    </>
                )}

                {/* Chỉ hiển thị khi đã đặt lịch thành công */}
                {success && (
                    <div className="success-view">
                        <div className="success-icon">✓</div>
                        <h3>{success}</h3>
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                        <button onClick={() => navigate('/')} className="home-button">Về Trang Chủ</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppointmentConfirmation;
