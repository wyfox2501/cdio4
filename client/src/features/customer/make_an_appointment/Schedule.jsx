import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Schedule.scss';

// Hàm tạo các créneaux thời gian trong ngày
const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i < 17; i++) {
        slots.push(`${String(i).padStart(2, '0')}:00:00`);
        if (i < 16) {
             slots.push(`${String(i).padStart(2, '0')}:30:00`);
        }
    }
    return slots;
};

function Schedule() {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [clinicAddress, setClinicAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allSlots] = useState(generateTimeSlots());
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect để fetch địa chỉ của bác sĩ
    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const doctorResponse = await axios.get(`http://localhost:5000/api/patient/doctors/${doctorId}`);
                setClinicAddress(doctorResponse.data.address || 'Địa chỉ đang được cập nhật');
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu bác sĩ:", err);
            }
        };
        fetchDoctorData();
    }, [doctorId]);
    
    // useEffect để fetch lịch trình khi ngày thay đổi
    useEffect(() => {
        const fetchSchedule = async () => {
            setIsLoading(true);
            const dateString = selectedDate.toISOString().split('T')[0];
            try {
                const scheduleResponse = await axios.get(`http://localhost:5000/api/patient/doctors/${doctorId}/schedule?date=${dateString}`);
                setBookedSlots(scheduleResponse.data);
            } catch (err) {
                console.error("Lỗi khi lấy lịch trình:", err);
                setError("Không thể tải lịch trình cho ngày này.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSchedule();
    }, [selectedDate, doctorId]);


    // === LOGIC MỚI: CHỈ CHUYỂN TRANG VÀ GỬI DỮ LIỆU ===
    const handleProceedToConfirmation = () => {
        if (!selectedSlot) {
            setError("Vui lòng chọn một créneau thời gian.");
            return;
        }
        
        // Tạo đối tượng chứa tất cả thông tin cần thiết
        const appointmentInfo = {
            doctorId,
            appointmentDate: selectedDate.toISOString().split('T')[0],
            time: selectedSlot,
            symptoms,
            clinicAddress
        };

        // Điều hướng đến trang xác nhận và truyền dữ liệu qua state
        navigate('/datlich/xac-nhan-thong-tin', { state: { appointmentInfo } });
    };

    return (
        <div className="schedule-card">
            <h3>Chọn Ngày và Giờ Khám</h3>
            <div className="address-info">
                <span className="icon" role="img" aria-label="location-pin">📍</span>
                <span className="address-text">
                    <strong>Địa điểm khám:</strong> {clinicAddress}
                </span>
            </div>
            <div className="date-picker-container">
                <label>Chọn ngày:</label>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>
            <div className="time-slots-container">
                {isLoading ? <p>Đang tải lịch...</p> : allSlots.map(slot => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                        <button
                            key={slot}
                            className={`time-slot ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                            disabled={isBooked}
                            onClick={() => !isBooked && setSelectedSlot(slot)}
                        >
                            {slot.substring(0, 5)}
                        </button>
                    );
                })}
            </div>
            <div className="symptoms-container">
                <label htmlFor="symptoms">Mô tả triệu chứng (không bắt buộc):</label>
                <textarea
                    id="symptoms"
                    rows="4"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Ví dụ: Đau đầu, chóng mặt..."
                ></textarea>
            </div>
            <footer className="footer-action">
                {error && <p className="error-message">{error}</p>}
                <button
                    className="confirm-button"
                    onClick={handleProceedToConfirmation}
                    disabled={!selectedSlot}
                >
                    Tiếp Tục
                </button>
            </footer>
        </div>
    );
}

export default Schedule;
