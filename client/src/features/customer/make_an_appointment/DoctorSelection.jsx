import { useState, useEffect } from "react";
import "./DoctorSelection.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

// Dữ liệu tĩnh về khoa có thể giữ lại hoặc cũng có thể fetch từ API nếu muốn
const departments = [
    { id: 1, name: "Tất cả chuyên khoa" },
    { id: 2, name: "Nội khoa" },
    { id: 3, name: "Ngoại khoa" },
    { id: 4, name: "Nhi khoa" },
    { id: 5, name: "Sản phụ khoa" },
];

const doctorsPerPage = 4;

export default function DoctorSelection() {
    const [doctors, setDoctors] = useState([]); // State để lưu danh sách bác sĩ từ API
    const [loading, setLoading] = useState(true); // State cho trạng thái loading
    const [error, setError] = useState(null); // State để lưu lỗi

    const [selectedDepartment, setSelectedDepartment] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // useEffect để gọi API khi component được mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Thay đổi PORT cho phù hợp với server của bạn (ví dụ: 3001, 5000)
                const response = await axios.get('http://localhost:5000/api/patient/view_doctor');
                setDoctors(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải danh sách bác sĩ.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchDoctors();
    }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần

    // Lọc bác sĩ dựa trên state `doctors` đã fetch được
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.username.toLowerCase().includes(searchTerm.toLowerCase())
        // Thêm logic lọc theo chuyên khoa nếu cần
    ) || [];

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    const handleDoctorClick = (doctorId) => {
        // Chuyển đến trang chi tiết với layout mới
        navigate(`/datlich/chi-tiet-bac-si/${doctorId}`);
    };

    if (loading) return <div>Đang tải danh sách bác sĩ...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="container-doctor-selection">
                <div className="controls">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bác sĩ theo tên"
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="department-select"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(Number(e.target.value))}
                    >
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                </div>

                <div className="doctor-list">
                    {currentDoctors.map((doctor) => (
                        <div
                            key={doctor.user_id}
                            className="doctor-card"
                            onClick={() => handleDoctorClick(doctor.user_id)}
                        >
                            <img src={`http://localhost:5000/images/${doctor.avata || 'avatar.webp'}`} alt={doctor.username} className="doctor-avatar" />
                            <p className="doctor-name">{doctor.username}</p>
                            <p className="doctor-spec">{doctor.specification}</p>
                            <p className="doctor-exp">{doctor.experience} năm kinh nghiệm</p>
                        </div>
                    ))}
                </div>

                {/* Pagination giữ nguyên */}
                <div className="pagination">
                    {/* ... code pagination của bạn ... */}
                </div>
            </div>
        </div>
    );
}