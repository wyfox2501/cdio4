import { useState } from "react";
import "./DoctorSelection.scss";
import Doctorimages from "../../../../images/avatardoctor.png"
import Header from "../../../../components/header";

const departments = [
  { id: 1, name: "Khoa Tai Mũi Họng" },
  { id: 2, name: "Khoa Nội" },
  { id: 3, name: "Khoa Ngoại" },
  { id: 4, name: "Khoa Nhi" },
  { id: 5, name: "Khoa Sản" }
];

const doctorsPerPage = 4;
const doctorsData = {
  1: [
    { id: 1, name: "Nguyễn Văn An", experience: 15, title: "Bác sĩ chuyên khoa II", price: 250000,avatar: Doctorimages },
    { id: 2, name: "Trần Thị Minh Hằng", experience: 10, title: "Thạc sĩ Y khoa", price: 300000,avatar: Doctorimages },
    { id: 3, name: "Phạm Hoàng Lâm", experience: 20, title: "Tiến sĩ Y khoa", price: 400000,avatar: Doctorimages },
    { id: 4, name: "Võ Văn Thanh", experience: 8, title: "Bác sĩ chuyên khoa I", price: 350000,avatar: Doctorimages },
    { id: 5, name: "Đỗ Mạnh Cường", experience: 12, title: "Bác sĩ chuyên khoa II", price: 320000,avatar: Doctorimages },
    { id: 6, name: "Hoàng Văn Bình", experience: 18, title: "Tiến sĩ Y khoa", price: 500000 ,avatar: Doctorimages},
    { id: 7, name: "Nguyễn Thị Lan", experience: 7, title: "Thạc sĩ Y khoa", price: 280000,avatar: Doctorimages },
    { id: 8, name: "Trần Đức Long", experience: 14, title: "Bác sĩ chuyên khoa I", price: 330000,avatar: Doctorimages },
    { id: 9, name: "Phạm Thùy Linh", experience: 9, title: "Bác sĩ chuyên khoa II", price: 270000,avatar: Doctorimages },
    { id: 10, name: "Lê Văn Tài", experience: 11, title: "Bác sĩ chuyên khoa I", price: 310000,avatar: Doctorimages }
  ],
  2: [ 
    { id: 11, name: "Vũ Minh Quân", experience: 9, title: "Bác sĩ chuyên khoa I", price: 280000 ,avatar: Doctorimages},
    { id: 12, name: "Ngô Thị Hương", experience: 12, title: "Thạc sĩ Y khoa", price: 320000 ,avatar: Doctorimages},
    { id: 13, name: "Đinh Văn Tú", experience: 15, title: "Tiến sĩ Y khoa", price: 450000 ,avatar: Doctorimages},
    { id: 14, name: "Lương Thị Mai", experience: 6, title: "Bác sĩ chuyên khoa II", price: 260000 ,avatar: Doctorimages},
    { id: 15, name: "Phan Đức Thành", experience: 18, title: "Bác sĩ chuyên khoa I", price: 380000 ,avatar: Doctorimages},
    { id: 16, name: "Trương Thị Ngọc", experience: 8, title: "Bác sĩ Nhi khoa", price: 270000,avatar: Doctorimages },
    { id: 17, name: "Bùi Văn Hiếu", experience: 11, title: "Thạc sĩ Nhi khoa", price: 310000,avatar: Doctorimages },
    { id: 18, name: "Hoàng Thị Thảo", experience: 14, title: "Tiến sĩ Nhi khoa", price: 420000 ,avatar: Doctorimages},
    { id: 19, name: "Mai Văn Đạt", experience: 5, title: "Bác sĩ chuyên khoa II", price: 240000 ,avatar: Doctorimages},
    { id: 20, name: "Lê Thị Hồng", experience: 16, title: "Bác sĩ chuyên khoa I", price: 360000 ,avatar: Doctorimages}
  ],
  3: [
    { id: 21, name: "Nguyễn Thị Hằng", experience: 7, title: "Bác sĩ Da liễu", price: 290000,avatar: Doctorimages },
    { id: 22, name: "Trần Văn Khôi", experience: 10, title: "Thạc sĩ Da liễu", price: 330000 ,avatar: Doctorimages},
    { id: 23, name: "Phạm Thị Lan", experience: 13, title: "Tiến sĩ Da liễu", price: 410000,avatar: Doctorimages },
    { id: 24, name: "Đỗ Minh Tuấn", experience: 4, title: "Bác sĩ chuyên khoa II", price: 220000,avatar: Doctorimages },
    { id: 25, name: "Võ Thị Kim", experience: 17, title: "Bác sĩ chuyên khoa I", price: 390000 ,avatar: Doctorimages},
    { id: 26, name: "Lê Minh Tâm", experience: 6, title: "Bác sĩ Da liễu", price: 280000, avatar: Doctorimages },
    { id: 27, name: "Nguyễn Văn Hoàng", experience: 12, title: "Thạc sĩ Da liễu", price: 350000, avatar: Doctorimages },
    { id: 28, name: "Trần Thu Hương", experience: 8, title: "Tiến sĩ Da liễu", price: 420000, avatar: Doctorimages },
    { id: 29, name: "Hoàng Văn Sơn", experience: 5, title: "Bác sĩ chuyên khoa I", price: 260000, avatar: Doctorimages },
    { id: 30, name: "Phạm Thùy Dung", experience: 15, title: "Bác sĩ chuyên khoa II", price: 390000, avatar: Doctorimages }
  ],
  4: [
    { id: 31, name: "Đỗ Hải Nam", experience: 10, title: "Tiến sĩ Da liễu", price: 450000, avatar: Doctorimages },
    { id: 32, name: "Nguyễn Thị Lan Anh", experience: 7, title: "Bác sĩ Da liễu", price: 270000, avatar: Doctorimages },
    { id: 33, name: "Trần Đăng Khoa", experience: 11, title: "Bác sĩ chuyên khoa I", price: 300000, avatar: Doctorimages },
    { id: 34, name: "Lê Hoàng Phúc", experience: 9, title: "Thạc sĩ Da liễu", price: 320000, avatar: Doctorimages },
    { id: 35, name: "Vũ Bảo Châu", experience: 14, title: "Tiến sĩ Da liễu", price: 480000, avatar: Doctorimages },
    { id: 36, name: "Ngô Thanh Tùng", experience: 8, title: "Bác sĩ chuyên khoa II", price: 310000, avatar: Doctorimages },
    { id: 37, name: "Bùi Hồng Nhung", experience: 6, title: "Bác sĩ Da liễu", price: 250000, avatar: Doctorimages },
    { id: 38, name: "Hoàng Đức Minh", experience: 13, title: "Tiến sĩ Da liễu", price: 460000, avatar: Doctorimages },
    { id: 39, name: "Lương Minh Hạnh", experience: 9, title: "Bác sĩ chuyên khoa I", price: 330000, avatar: Doctorimages },
    { id: 40, name: "Phan Thị Thanh", experience: 7, title: "Thạc sĩ Da liễu", price: 300000, avatar: Doctorimages }
  ],

  5: [
    { id: 41, name: "Đoàn Ngọc Khánh", experience: 10, title: "Tiến sĩ Da liễu", price: 400000, avatar: Doctorimages },
    { id: 42, name: "Nguyễn Hải Đăng", experience: 5, title: "Bác sĩ Da liễu", price: 280000, avatar: Doctorimages },
    { id: 43, name: "Trịnh Văn Quân", experience: 12, title: "Bác sĩ chuyên khoa I", price: 350000, avatar: Doctorimages },
    { id: 44, name: "Lê Phương Mai", experience: 6, title: "Bác sĩ Da liễu", price: 290000, avatar: Doctorimages },
    { id: 45, name: "Nguyễn Đức Huy", experience: 11, title: "Thạc sĩ Da liễu", price: 370000, avatar: Doctorimages },
    { id: 46, name: "Hoàng Thanh Tâm", experience: 15, title: "Tiến sĩ Da liễu", price: 490000, avatar: Doctorimages },
    { id: 47, name: "Vũ Minh Tú", experience: 9, title: "Bác sĩ chuyên khoa I", price: 320000, avatar: Doctorimages },
    { id: 48, name: "Bạch Hải Yến", experience: 7, title: "Bác sĩ Da liễu", price: 280000, avatar: Doctorimages },
    { id: 49, name: "Trần Minh Quang", experience: 10, title: "Thạc sĩ Da liễu", price: 360000, avatar: Doctorimages },
    { id: 50, name: "Nguyễn Ngọc Bảo", experience: 14, title: "Tiến sĩ Da liễu", price: 470000, avatar: Doctorimages }
  ]
};



export default function DoctorSelection() {
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredDoctors = doctorsData[selectedDepartment].filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);


  const menuItems = [
    { id: 1, title: "Trang Chủ" },
    { id: 2, title: "Hẹn Lịch" },
  ];

  return (
    <div>
       <div className="header">
       <Header dataheader={menuItems} className="header"/>
       </div>
     
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
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar"  style={{ width: "100px", height: "100px", objectFit: "cover" }}  />
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


