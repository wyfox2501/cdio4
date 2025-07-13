import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss'; // Đảm bảo bạn đã import file SCSS

function Manager_healthy() {
    // --- State cho chức năng tính BMI ---
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBMI] = useState(null);
    const [status, setStatus] = useState("");
    const [idealWeight, setIdealWeight] = useState(null);

    // --- State cho việc tải và lưu dữ liệu ---
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState('');

    // useEffect để gọi API lấy thông tin của người dùng
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/patient/profile', 
                    { withCredentials: true }
                );
                
                const userData = response.data;
                if (userData.height) setHeight(userData.height);
                if (userData.weight) setWeight(userData.weight);

            } catch (err) {
                console.error("Lỗi khi tải thông tin người dùng:", err);
                setError("Không thể tải thông tin của bạn. Vui lòng đăng nhập lại.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // --- Logic tính BMI ---
    const calculateBMI = () => {
        const h_in_meter = parseFloat(height) / 100; 
        const w = parseFloat(weight);

        if (!h_in_meter || !w || h_in_meter <= 0 || w <= 0) {
            setError("Vui lòng nhập chiều cao và cân nặng hợp lệ!");
            return;
        }
        setError(null);

        const bmiValue = parseFloat((w / (h_in_meter * h_in_meter)).toFixed(1));
        setBMI(bmiValue);

        let bmiStatus = "";
        if (bmiValue < 18.5) bmiStatus = "Cân Nặng Thấp";
        else if (bmiValue < 25) bmiStatus = "Bình Thường";
        else if (bmiValue < 30) bmiStatus = "Thừa Cân";
        else if (bmiValue < 35) bmiStatus = "Béo Phì Cấp 1";
        else if (bmiValue < 40) bmiStatus = "Béo Phì Cấp 2";
        else bmiStatus = "Béo Phì Cấp 3";
        setStatus(bmiStatus);

        const idealW = (22 * h_in_meter * h_in_meter).toFixed(1);
        setIdealWeight(idealW);
    };
    
    // --- Logic lưu thay đổi ---
    const handleSaveChanges = async () => {
        setError(null);
        setSaveSuccess('');
        setIsSaving(true);

        if (!height || !weight || parseFloat(height) <= 0 || parseFloat(weight) <= 0) {
            setError("Chiều cao và cân nặng không hợp lệ để lưu.");
            setIsSaving(false);
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/patient/profile',
                { height: height, weight: weight },
                { withCredentials: true }
            );
            setSaveSuccess(response.data.msg);
        } catch (err) {
            console.error("Lỗi khi lưu thông tin:", err);
            setError(err.response?.data?.msg || "Đã xảy ra lỗi khi lưu.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div className="health-manager-container">Đang tải dữ liệu...</div>
    }

    const bmiCategories = [
        { name: "Cân Nặng Thấp", range: "Dưới 18.5" },
        { name: "Bình Thường", range: "18.5 - 24.9" },
        { name: "Thừa Cân", range: "25 - 29.9" },
        { name: "Béo Phì Cấp 1", range: "30 - 34.9" },
        { name: "Béo Phì Cấp 2", range: "35 - 39.9" },
        { name: "Béo Phì Cấp 3", range: "Trên 40" },
    ];

    return (
        <div className="health-manager-container">
            <div className="bmi-calculator">
                {/* Cột bên trái: Form nhập liệu */}
                <div className="calculator-form">
                    <h2>Quản lý chỉ số sức khỏe</h2>
                    <div className="input-group">
                        <label htmlFor="height">Chiều Cao (cm)</label>
                        <input
                            id="height"
                            type="number"
                            placeholder="Nhập Chiều Cao..."
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="weight">Cân Nặng (kg)</label>
                        <input
                            id="weight"
                            type="number"
                            placeholder="Nhập Cân Nặng..."
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className="button-group">
                        <button className="calculate-btn" onClick={calculateBMI}>Tính BMI</button>
                        <button className="save-btn" onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                        </button>
                    </div>
                    {error && <p className="message error">{error}</p>}
                    {saveSuccess && <p className="message success">{saveSuccess}</p>}
                </div>

                {/* Cột bên phải: Hiển thị kết quả */}
                <div className="results-display">
                    <div className="results-grid">
                        <div className="result-card">
                            <h4>Chỉ số BMI</h4>
                            <p>{bmi || 'N/A'}</p>
                        </div>
                        <div className="result-card">
                            <h4>Cân nặng lý tưởng</h4>
                            <p>{idealWeight || 'N/A'}<span className="unit">kg</span></p>
                        </div>
                        <div className="result-card">
                            <h4>Trạng thái</h4>
                            <p style={{fontSize: '1.5rem'}}>{status || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="bmi-table">
                        <h3>Bảng phân loại BMI (WHO)</h3>
                        <table>
                            <tbody>
                                {bmiCategories.map(cat => (
                                    <tr key={cat.name} className={status === cat.name ? 'highlight' : ''}>
                                        <td>{cat.name}</td>
                                        <td>{cat.range}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manager_healthy;
