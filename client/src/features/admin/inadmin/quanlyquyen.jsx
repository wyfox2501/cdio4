import React, { useState } from 'react';
import axios from 'axios';
import './quanlyquyen.scss';

function QuanLyQuyen() {

  const [doctors, setDoctors] = useState([
    {
      role: 'DT01',
      fullName: 'Dr. Nguyen Van A',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      degree: 'Doctor of Medicine (PhD)',
      specialty: 'General Internal Medicine',
      yearsOfExperience: 15,
      workingHospital: 'Cho Ray Hospital',
      clinicAddress: '123 Nguyen Trai, District 5, HCMC',
      approved: false
    },
    {
      role: 'DT02',
      fullName: 'Dr. Tran Thi B',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      degree: 'Master of Medicine',
      specialty: 'Pediatrics',
      yearsOfExperience: 8,
      workingHospital: 'Children’s Hospital 1',
      clinicAddress: '456 Hai Ba Trung, District 3, HCMC',
      approved: false,
      certifications: [
        {
          title: 'Internal Medicine Specialist Certificate',
          issuedBy: 'University of Medicine and Pharmacy',
          year: 2010,
          imageUrl: 'https://via.placeholder.com/300x200?text=Certificate+1'
        },
        {
          title: 'Advanced Endoscopy Training',
          issuedBy: 'Cho Ray Hospital',
          year: 2015,
          imageUrl: 'https://via.placeholder.com/300x200?text=Certificate+2'
        }
      ]
    },
    {
      role: 'DT03',
      fullName: 'Dr. Pham Van C',
      avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
      degree: 'Specialist Doctor Level II',
      specialty: 'Cardiology',
      yearsOfExperience: 20,
      workingHospital: 'University Medical Center Ho Chi Minh City',
      clinicAddress: '789 Le Loi, District 1, HCMC',
      approved: false,
      certifications: []
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filterdoc, setFilterdoc] = useState('');


  const filtereddoc = filterdoc === ''
    ? doctors
    : doctors.filter(doc => doc.approved === (filterdoc === 'true'));



  const handleViewProfile = (role) => {
    const doctor = doctors.find(doc => doc.role === role);
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const resetModal = () => {
    setSelectedDoctor(null);
    setShowModal(false);
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:3000/api/doctors/${selectedDoctor.role}/approve`, { approved: true });

      const updatedDoctors = doctors.map(doc =>
        doc.role === selectedDoctor.role ? { ...doc, approved: true } : doc
      );
      setDoctors(updatedDoctors);

      alert('Doctor approved successfully!');
      resetModal();
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve doctor');
    }
  };

  return (
    <div className="admin-container">
      <div className="main-content">
        <h1>Browse Account</h1>
        <div className="filter-role">
          <select value={filterdoc} onChange={(e) => setFilterdoc(e.target.value)}>
            <option value="">All</option>
            <option value="true">Approved</option>
            <option value="false">Not Approved</option>
          </select>

        </div>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtereddoc.map((doc, index) => (
              <tr key={index}>
                <td>{doc.role}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleViewProfile(doc.role)}>
                    📝 View Profile
                  </button>
                </td>
                <td>{doc.approved ? '✅ Approved' : '❌ Not Approved'}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {showModal && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>View Profile</h2>
            <div className="doctor-profile">
              <div className="header">
                <img src={selectedDoctor.avatar} alt={selectedDoctor.fullName} className="avatar" />
                <div className="info">
                  <h2>{selectedDoctor.fullName}</h2>
                  <p><strong>Degree:</strong> {selectedDoctor.degree}</p>
                  <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                  <p><strong>Experience:</strong> {selectedDoctor.yearsOfExperience} years</p>
                  <p><strong>Hospital:</strong> {selectedDoctor.workingHospital}</p>
                  <p><strong>Address:</strong> {selectedDoctor.clinicAddress}</p>
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
              {!selectedDoctor.approved && (
                <button className="confirm-btn" onClick={handleApprove}>✅ Confirm</button>
              )}
              <button className="huy-btn" onClick={resetModal}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuanLyQuyen;
