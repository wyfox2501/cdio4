import { useState } from "react";
import "./DoctorSelection.scss";
// import Header from "../../../components/header";
import { useNavigate } from 'react-router-dom';
// 1. IMPORT DỮ LIỆU TỪ TỆP data.js
import { departments, doctorsData } from "./data.js";

// 2. DỮ LIỆU CỤ BỘ ĐÃ ĐƯỢC XÓA BỎ

const doctorsPerPage = 4;

export default function DoctorSelection() {
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const filteredDoctors = doctorsData[selectedDepartment]?.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const menuItems = [
    { id: 1, title: "Trang Chủ" },
    { id: 2, title: "Hẹn Lịch" },
  ];

  const handleDoctorClick = (doctorId) => {
    navigate(`/datlich/chi-tiet-bac-si/${doctorId}`);
  };

  return (
    <div>
      {/* <div className="header">
        <Header dataheader={menuItems} className="header"/>
      </div> */}
      
      <div className="container-doctor-selection">
        <div className="controls">
          <input 
            type="text" 
            placeholder="Tìm kiếm bác sĩ" 
            className="search-box" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="department-select"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
        
        <div className="doctor-list">
          {currentDoctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="doctor-card" 
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar" />
              <p className="doctor-name">{doctor.name} - {doctor.experience} năm - {doctor.title} - {doctor.price.toLocaleString()} VND</p>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i + 1} 
              className={currentPage === i + 1 ? "active" : ""} 
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}