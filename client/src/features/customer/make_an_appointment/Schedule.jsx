import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Schedule.scss';

// --- HELPER FUNCTION: Chuyển đổi đối tượng Date thành chuỗi YYYY-MM-DD ---
// Sử dụng các thành phần local của Date để tránh lỗi múi giờ
const toYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


function Schedule() {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [clinicAddress, setClinicAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    // Đổi tên state để rõ ràng hơn
    const [timeSlots, setTimeSlots] = useState([]); 
    
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchScheduleData = async () => {
            setIsLoading(true);
            setError('');
            setTimeSlots([]); // Reset state
            setSelectedSlot(null);

            // Sử dụng helper function để đảm bảo định dạng ngày chính xác
            const dateString = toYYYYMMDD(selectedDate);

            try {
                // Gọi song song 3 API
                const [doctorRes, workScheduleRes, bookedSlotsRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/patient/doctor/${doctorId}`),
                    axios.get(`http://localhost:5000/api/patient/work_schedule_doctor/${doctorId}`),
                    axios.get(`http://localhost:5000/api/patient/doctor/${doctorId}/booked-slots?date=${dateString}`)
                ]);

                setClinicAddress(doctorRes.data[0]?.address || 'Địa chỉ đang được cập nhật');

                const allWorkBlocks = workScheduleRes.data;
                // const booked = bookedSlotsRes.data;
                const booked = bookedSlotsRes.data || []; 

                // === LOGIC SO SÁNH NGÀY THÁNG AN TOÀN NHẤT ===
                // So sánh các thành phần ngày, tháng, năm để tránh lỗi múi giờ
                const workBlocksForDay = allWorkBlocks.filter(block => {
                    if (!block.date) return false;
                    // Chuyển ngày từ DB (dạng UTC) về đối tượng Date ở local
                    const dbDate = new Date(block.date);
                    
                    // So sánh từng thành phần
                    return dbDate.getFullYear() === selectedDate.getFullYear() &&
                           dbDate.getMonth() === selectedDate.getMonth() &&
                           dbDate.getDate() === selectedDate.getDate();
                });

                if (workBlocksForDay.length === 0) {
                    setError("Bác sĩ không có lịch làm việc vào ngày này.");
                    setIsLoading(false);
                    return;
                }
                
                const generatedSlots = [];
                // Lặp qua từng ca làm việc trong ngày
                workBlocksForDay.forEach(block => {
                    if (block.datetime_start && block.datetime_end) {
                        const startTime = new Date(block.datetime_start);
                        const endTime = new Date(block.datetime_end);
                        let currentSlot = new Date(startTime);

                        while (currentSlot < endTime) {
                            const timeString = currentSlot.toTimeString().split(' ')[0];
                            
                            // Tạo một object chứa thời gian và trạng thái (đã đặt hay chưa)
                            generatedSlots.push({
                                time: timeString,
                                isBooked: booked.includes(timeString)
                            });
                            
                            // Tăng thời gian lên 1 giờ
                            currentSlot.setHours(currentSlot.getHours() + 1);
                        }
                    }
                });
                
                setTimeSlots(generatedSlots);
                // Kiểm tra xem có khung giờ nào còn trống không
                if (!generatedSlots.some(slot => !slot.isBooked)) {
                    setError("Tất cả các khung giờ trong ngày đã được đặt.");
                }

            } catch (err) {
                console.error("Lỗi khi tải lịch trình:", err);
                setError("Không thể tải lịch trình. Vui lòng thử lại.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchScheduleData();
    }, [selectedDate, doctorId]);

    const handleProceedToConfirmation = () => {
        if (!selectedSlot) {
            setError("Vui lòng chọn một khung giờ.");
            return;
        }
        if(!symptoms) {
            alert("Vui lòng nhập lý do kham.");
            return;
        }
        const appointmentInfo = {
            doctorId,
            appointmentDate: toYYYYMMDD(selectedDate), // Gửi đi ngày đã được format
            time: selectedSlot,
            symptoms,
            clinicAddress
        };

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
                    // SỬA LẠI: Dùng helper function để hiển thị ngày
                    value={toYYYYMMDD(selectedDate)}
                    // SỬA LẠI: Xử lý chuỗi ngày để tránh lỗi múi giờ
                    onChange={(e) => {
                        // Tách chuỗi YYYY-MM-DD và tạo Date object ở múi giờ local
                        const [year, month, day] = e.target.value.split('-').map(Number);
                        setSelectedDate(new Date(year, month - 1, day));
                    }}
                    min={toYYYYMMDD(new Date())}
                />
            </div>
            <div className="time-slots-container">
                {isLoading ? <p className="loading-message">Đang tải lịch...</p> : 
                 timeSlots.length > 0 ? (
                    timeSlots.map(slotInfo => (
                        <button
                            key={slotInfo.time}
                            className={`time-slot ${slotInfo.isBooked ? 'booked' : ''} ${selectedSlot === slotInfo.time ? 'selected' : ''}`}
                            disabled={slotInfo.isBooked}
                            onClick={() => !slotInfo.isBooked && setSelectedSlot(slotInfo.time)}
                        >
                            {slotInfo.time.substring(0, 5)}
                        </button>
                    ))
                 ) : (
                    <div className="no-slots-message">
                        <span className="icon">🗓️</span>
                        <p>{error || "Không có khung giờ trống nào"}</p>
                        <span>Vui lòng chọn một ngày khác hoặc kiểm tra lại sau.</span>
                    </div>
                 )
                }
            </div>
            <div className="symptoms-container">
                <label htmlFor="symptoms">Mô tả triệu chứng (không bắt buộc):</label>
                <textarea
                    id="symptoms"
                    rows="4"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    required
                    placeholder="Ví dụ: Đau đầu, chóng mặt..."
                ></textarea>
            </div>
            <footer className="footer-action">
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
