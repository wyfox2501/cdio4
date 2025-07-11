import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function Home(props) {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBMI] = useState(null);
    const [status, setStatus] = useState("");
    const [fatPercentage, setFatPercentage] = useState(null);
    const [idealWeight, setIdealWeight] = useState(null);

    const calculateBMI = () => {
        const h = parseFloat(height) / 100; // Chuyển cm thành m
        const w = parseFloat(weight);

        if (!h || !w || h <= 0 || w <= 0) {
            alert("Vui lòng nhập chiều cao và cân nặng hợp lệ!");
            return;
        }

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

        const fatPercent = (((w - idealW) / idealW) * 100).toFixed(1);
        setFatPercentage(fatPercent);
    };
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const featch=async()=>{
            try {
                const rep=await fetch('http://localhost:5000/api/patient/view_doctor', {
                    method: 'GET',
                    credentials: 'include'
                })
                const result=await rep.json();
                setDoctors(result);
            } catch (error) {
                alert(error);
            }
        }
        featch();
    }, []);
    return (
        <div className="tong">
            <div className="bentrai">
                <h2>Nhập Thông Tin Cá Nhân</h2>
                <div className='thongtin'>
                    <div className='benchu'>
                        <p className='p1'>Chiều Cao</p>
                        <p className='p2'>Cân Nặng</p>
                        <p>Tuổi</p>
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
                        <input type="number" placeholder="Nhập Tuổi..." />
                    </div>
                </div>
                <h2>Chọn Giới Tính</h2>
                <div className="gioitinh">
                    <label>
                        <input type="radio" name="gender" value="male" />
                        Nam
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" />
                        Nữ
                    </label>
                </div>

                <button onClick={calculateBMI}>Tính BMI</button>
            </div>
            <div className="benphai">
                <div className='bentren'>
                    <h3>BMI: <br /> <br />{bmi}</h3>
                    <h3>Trọng Lượng Lý Tưởng:  <br /> <br />{idealWeight} kg</h3>
                    <h3>Mập: <br />  <br />{fatPercentage}%</h3>
                </div>

                <div className='benduoi'>
                    <h1>Bảng BMI</h1>
                    <div className='chiso'>
                        <ul className='chu'>
                            <li>Cân Nặng Thấp</li>
                            <li>Bình Thường</li>
                            <li>Thừa Cân</li>
                            <li>Tiền Béo Phì</li>
                            <li>Béo Phì Cấp 1</li>
                            <li>Béo Phì Cấp 2</li>
                            <li>Béo Phì Cấp 3</li>
                        </ul>
                        <ul className='so'>
                            <li>Dưới 18.5</li>
                            <li>18.5 - 24.9</li>
                            <li>Trên 25</li>
                            <li>25 - 29</li>
                            <li>30 -35</li>
                            <li>35 - 40</li>
                            <li>Trên 40</li>
                        </ul>
                    </div>
                </div>
            </div>


        
        </div>
    );
}

export default Home;
