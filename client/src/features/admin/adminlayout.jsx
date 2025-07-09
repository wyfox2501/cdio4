import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './adminlayout.scss'; // nếu bạn có CSS riêng

function AdminLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h2>Administrator</h2>
        <ul>
          <li className={currentPath.includes('quanlyquyen') ? 'active' : ''}>
            <Link to="/admin/role-manager">📅
              Browse Account</Link>
          </li>
          <li className={currentPath.includes('quanlytaikhoan') ? 'active' : ''}>
            <Link to="/admin/account_manager">👥Account Manager</Link>
          </li>
        </ul>
      </div>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
