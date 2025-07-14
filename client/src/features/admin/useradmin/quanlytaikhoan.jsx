import React, { useState, useEffect } from 'react';
import './quanlytaikhoan.scss';

const dummyData = [
    { username: 'ABC1', role: 'User', status: 'Nomarl' },
    { username: 'ABC2', role: 'Doctor', status: 'Lock' },
];


function QuanLyTaiKhoan() {

    const [accounts, setAccounts] = useState(dummyData);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [modalType, setModalType] = useState(null);
    const [filterRole, setFilterRole] = useState('');



    useEffect(() => {
        fetch('http://localhost:5000/api/admin/users')
            .then(res => res.json())
            .then(data => setAccounts(data))
            .catch(err => console.error('Lỗi khi gọi API:', err));
    }, []);

    const openModal = (index, type) => {
        setSelectedUserIndex(index);
        setNewRole(accounts[index].role);
        setModalType(type);
        setShowModal(true);
    };

    const confirmChange = async () => {
        const updated = [...accounts];
        const user = updated[selectedUserIndex];

        try {
            if (modalType === 'role') {
                updated[selectedUserIndex].role = newRole;
                // Gửi API đổi role (nếu cần)
                await fetch(`http://localhost:5000/api/admin/users/role/${user.user_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role: newRole }),
                });
            }
            else if (modalType === 'status') {
                const userId = user.user_id;

                const url = user.active === 'false'
                    ? `http://localhost:5000/api/admin/unlock/${userId}`
                    : `http://localhost:5000/api/admin/lock/${userId}`;

                await fetch(url, { method: 'PUT' });

                // Sau khi gọi API xong thì cập nhật local state
                updated[selectedUserIndex].status = user.status === 'Lock' ? 'Normal' : 'Lock';
            }

            // Reload danh sách user từ server sau khi cập nhật
            const res = await fetch('http://localhost:5000/api/admin/users');
            const data = await res.json();
            setAccounts(data);
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        }

        setShowModal(false);
        setModalType(null);
    };


    const filteredAccounts = filterRole
        ? accounts.filter(acc => acc.role === filterRole)
        : accounts;

    return (
        <div className="user-manager">
            <h1>Account List</h1>
            <div className="filter-role">
                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="">All</option>
                    <option value="patient">User</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map((acc, i) => (
                        <tr key={i}>
                            <td>{acc.username}</td>
                            <td>
                                <button onClick={() => openModal(i, 'role')}>{acc.role}</button>
                            </td>
                            <td>
                                <button1 onClick={() => openModal(i, 'status')}>
                                    <span
                                        className={`status-label ${acc.status === 'Lock' ? 'lock' : 'normal'
                                            }`}
                                    >
                                        {acc.active === 'false' ? '🔴 Lock' : '🟢 Nomarl'}
                                    </span>
                                </button1>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{modalType === 'role' ? 'Change Role' : 'Change Status'}</h3>

                        {modalType === 'role' ? (
                            <div className="option">
                                <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                    <option value="User">User</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        ) : (
                            <p>
                                Are you sure you want to {accounts[selectedUserIndex].status === 'Lock' ? 'unlock' : 'lock'} this account?
                            </p>
                        )}

                        <div className="butoon1">
                            <button onClick={confirmChange} className="confirm-btn">Confirm</button>
                            <button onClick={() => setShowModal(false)} className="huy-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuanLyTaiKhoan;
