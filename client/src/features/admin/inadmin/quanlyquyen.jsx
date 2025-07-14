import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quanlyquyen.scss';

function QuanLyQuyen() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  // Fetch pending doctor accounts from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/wait');
        setDoctors(response.data);

      } catch (error) {
        console.error('Error fetching doctor list:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Filter by approval status
  const filteredDoctors =
    filterStatus === ''
      ? doctors
      : doctors.filter((doc) => String(doc.active) === filterStatus);

  const handleViewProfile = (user_id) => {
    const doctor = doctors.find((doc) => doc.user_id === user_id);
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const resetModal = () => {
    setSelectedDoctor(null);
    setShowModal(false);
  };

  // Approve doctor API call
  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${selectedDoctor.user_id}`);


      const updatedDoctors = doctors.map((doc) =>
        doc.user_id === selectedDoctor.user_id ? { ...doc, active: true } : doc
      );
      setDoctors(updatedDoctors);

      alert('Doctor approved successfully!');
      resetModal();
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve doctor');
    }
  };
// đọc thông tin doctor
const [doctorsInfo, setDoctorsInfo] = useState([]);
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patient/doctor/${selectedDoctor.user_id}`);
      setDoctorsInfo(response.data[0]);
    } catch (error) {
      console.error('Error fetching doctor list:', error);
    }
  };
  fetchDoctors();
}, [selectedDoctor]);
  return (
    <div className="admin-container">
      <div className="main-content">
        <h1>Doctor Account Approval</h1>

        <div className="filter-role">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="true">Approved</option>
            <option value="wait">Pending</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc, index) => (
              <tr key={index}>
                <td>{doc.user_id}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleViewProfile(doc.user_id)}>
                    📝 View Profile
                  </button>
                </td>
                <td>{doc.active === true ? '✅ Approved' : '❌ Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Doctor Profile</h2>
            <div className="doctor-profile">
              <div className="header">
                <img
                  src={`http://localhost:5000/images/${selectedDoctor.avata || 'avatar.webp'}`}
                  alt={selectedDoctor.username}
                  className="avatar"
                />
                <div className="info">
                  <h2>{doctorsInfo.username}</h2>
                  <p><strong>Degree:</strong> <img src={`http://localhost:5000/images/${doctorsInfo.image_certification || 'không có hình'}`} alt="" /></p>
                  <p><strong>Specialty:</strong> {doctorsInfo.specification}</p>
                  <p><strong>Experience:</strong> {doctorsInfo.experience} years</p>
                  <p><strong>Education:</strong> {doctorsInfo.education}</p>
                  <p><strong>Clinic Address:</strong> {selectedDoctor.address}</p>
                </div>
              </div>

              {selectedDoctor.certifications && selectedDoctor.certifications.length > 0 && (
                <div className="certifications">
                  <h3>Certifications</h3>
                  <ul>
                    {selectedDoctor.certifications.map((cert, idx) => (
                      <li key={idx} className="certificate-item">
                        <strong>{cert.title}</strong><br />
                        <span>Issued by: {cert.issuedBy} ({cert.year})</span><br />
                        <img src={cert.imageUrl} alt={cert.title} className="certificate-image" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="button">
              {selectedDoctor.active !== true && (
                <button className="confirm-btn" onClick={handleApprove}>✅ Approve</button>
              )}
              <button className="cancel-btn" onClick={resetModal}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuanLyQuyen;
