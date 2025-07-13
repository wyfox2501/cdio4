import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Sử dụng axios để nhất quán với các component khác
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style.scss'; // Giả sử bạn có file style.scss cho component này

function Home(props) {
    // --- State cho chức năng tính BMI ---
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBMI] = useState(null);
    const [status, setStatus] = useState("");
    const [idealWeight, setIdealWeight] = useState(null);

    // --- State cho chức năng lấy danh sách bác sĩ ---
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state loading
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Khởi tạo hook navigate

    // --- Logic tính BMI (giữ nguyên) ---
    const calculateBMI = () => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);

        if (!h || !w || h <= 0 || w <= 0) {
            setError("Vui lòng nhập chiều cao và cân nặng hợp lệ!");
            return;
        }
        setError(null);

        const bmiValue = (w / (h * h)).toFixed(1);
        setBMI(bmiValue);

        let bmiStatus = "";
        if (bmiValue < 18.5) bmiStatus = "Cân Nặng Thấp";
        else if (bmiValue < 25) bmiStatus = "Bình Thường";
        else if (bmiValue < 30) bmiStatus = "Thừa Cân";
        else if (bmiValue < 35) bmiStatus = "Béo Phì Cấp 1";
        else if (bmiValue < 40) bmiStatus = "Béo Phì Cấp 2";
        else bmiStatus = "Béo Phì Cấp 3";
        setStatus(bmiStatus);

        const idealW = (22 * h * h).toFixed(1);
        setIdealWeight(idealW);
    };

    // --- useEffect để gọi API lấy danh sách bác sĩ ---
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/patient/doctors');
                setDoctors(response.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách bác sĩ:", err);
                setError("Không thể tải được danh sách bác sĩ từ server.");
            } finally {
                setLoading(false); // Dừng loading dù thành công hay thất bại
            }
        }
        fetchDoctors();
    }, []);

    return (
        <div className="home-container">
            {/* Phần tính BMI */}
            <div className="tong">
                <div className="bentrai">
                    <h2>Công cụ tính BMI</h2>
                    <div className='thongtin'>
                        <div className='benchu'>
                            <p className='p1'>Chiều Cao (cm)</p>
                            <p className='p2'>Cân Nặng (kg)</p>
                        </div>
                        <div className='bennhap'>
                            <input
                                type="number"
                                placeholder="Nhập Chiều Cao..."
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Nhập Cân Nặng..."
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={calculateBMI}>Tính BMI</button>
                </div>
                <div className="benphai">
                    <div className='bentren'>
                        <h3>BMI: <br /> <br />{bmi}</h3>
                        <h3>Trọng Lượng Lý Tưởng: <br /> <br />{idealWeight} kg</h3>
                        <h3>Trạng thái: <br /> <br />{status}</h3>
                    </div>
                    <div className='benduoi'>
                        <h1>Bảng BMI</h1>
                        <div className='chiso'>
                            <ul className='chu'>
                                <li>Cân Nặng Thấp</li>
                                <li>Bình Thường</li>
                                <li>Thừa Cân</li>
                                <li>Béo Phì Cấp 1</li>
                            </ul>
                            <ul className='so'>
                                <li>Dưới 18.5</li>
                                <li>18.5 - 24.9</li>
                                <li>25 - 29.9</li>
                                <li>30 - 34.9</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* === PHẦN MỚI: HIỂN THỊ DANH SÁCH BÁC SĨ === */}
            <div className="doctor-showcase">
                <h2>Bác sĩ nổi bật</h2>
                {loading && <p>Đang tải danh sách bác sĩ...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && (
                    <div className="doctor-list-home">
                        {doctors.slice(0, 4).map(doctor => ( // Chỉ hiển thị 4 bác sĩ đầu tiên
                            <div key={doctor.user_id} className="doctor-card-home" onClick={() => navigate(`/datlich/chi-tiet-bac-si/${doctor.user_id}`)}>
                                <img src={doctor.avatar_url || 'https://placehold.co/100x100?text=Avatar'} alt={doctor.full_name} />
                                <div className="doctor-info-home">
                                    <h4>{doctor.full_name}</h4>
                                    <p>{doctor.specification}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                 <button className="view-all-btn" onClick={() => navigate('/chon-bac-si')}>Xem tất cả bác sĩ</button>
            </div>
        </div>
    );
}

export default Home;
