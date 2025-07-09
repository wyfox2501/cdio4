import React, { useState } from 'react';
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

    const openModal = (index, type) => {
        setSelectedUserIndex(index);
        setNewRole(accounts[index].role);
        setModalType(type);
        setShowModal(true);
    };

    const confirmChange = () => {
        const updated = [...accounts];
        if (modalType === 'role') {
            updated[selectedUserIndex].role = newRole;
        } else if (modalType === 'status') {
            updated[selectedUserIndex].status =
                updated[selectedUserIndex].status === 'Lock' ? 'Nomarl' : 'Lock';
        }
        setAccounts(updated);
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
                    <option value="User">User</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
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
                                        {acc.status === 'Lock' ? '🔴 Lock' : '🟢 Nomarl'}
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
