import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DoctorDetail.scss';

function DoctorDetail() {
    const { doctorId } = useParams();
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            if (!doctorId) return;
            try {
                const response = await axios.get(`http://localhost:5000/api/patient/doctors/${doctorId}`);
                setDoctorInfo(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải thông tin bác sĩ.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchDoctorDetail();
    }, [doctorId]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    if (!doctorInfo) return <div>Không tìm thấy thông tin bác sĩ!</div>;

    // Helper để format ngày
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="info-card">
            <div className="info-header">
                <img src={doctorInfo.avatar_url || 'https://placehold.co/150x150?text=Avatar'} alt={doctorInfo.full_name} className="doctor-avatar" />
                <h2>Thông Tin Về Bác Sĩ</h2>
            </div>

            <div className="info-grid">
                <div className="info-item">
                    <span className="label">Họ Và Tên:</span>
                    <span className="value">{doctorInfo.full_name}</span>
                </div>
                 <div className="info-item">
                    <span className="label">Chuyên khoa:</span>
                    <span className="value">{doctorInfo.specification}</span>
                </div>
                <div className="info-item">
                    <span className="label">Ngày Sinh:</span>
                    <span className="value">{formatDate(doctorInfo.birthdate)}</span>
                </div>
                <div className="info-item">
                    <span className="label">Giới Tính:</span>
                    <span className="value">{doctorInfo.genre ? 'Nam' : 'Nữ'}</span>
                </div>
                <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{doctorInfo.email}</span>
                </div>
                <div className="info-item">
                    <span className="label">Học Vấn:</span>
                    <span className="value">{doctorInfo.education || 'Đang cập nhật'}</span>
                </div>
                <div className="info-item">
                    <span className="label">Kinh Nghiệm:</span>
                    <span className="value">{doctorInfo.experience} năm</span>
                </div>
                <div className="info-item">
                    <span className="label">Địa Chỉ làm việc:</span>
                    <span className="value">{doctorInfo.address || 'Đang cập nhật'}</span>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;
