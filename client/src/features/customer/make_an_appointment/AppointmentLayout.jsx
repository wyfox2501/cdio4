// src/features/customer/make_an_appointment/AppointmentLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppointmentLayout = () => {
  return (
    <div className="doctor-detail-container">
      <Sidebar />
      <main className="main-content">
        {/* Nội dung của các trang con sẽ được hiển thị ở đây */}
        <Outlet />
      </main>
    </div>
  );
};

export default AppointmentLayout;