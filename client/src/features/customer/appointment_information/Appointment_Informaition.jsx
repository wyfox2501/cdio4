import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Appointment_Information.scss';
Appointment_Informaition.propTypes = {
    
};

function Appointment_Informaition(props) {
    const [dataInfo, setDataInfo] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);
    useEffect(() => {
        const fetchInfo=async()=>{
            try {
                const response = await fetch('http://localhost:5000/api/patient/view_appointment', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setDataInfo(result);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        }
        const fetchHistory=async()=>{
            try {
                const response = await fetch('http://localhost:5000/api/patient/history', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setDataHistory(result);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        }
        fetchInfo();
        fetchHistory();
    },[]);
    return (
        <div className='appointment-informaition'>
        <div className="information">
            <h2>Thông tin đặt lịch</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên bác sĩ</th>
                        <th>Ngày</th>
                        <th>thời gian</th>
                        <th>địa chỉ</th>
                        <th>triệu chứng</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                  {dataInfo.length>0 ? dataInfo.map((item) => (
                    <tr key={item.appointment_id}>
                      <td>{item.username}</td>
                      <td>{new Date(item.appointment_date).toLocaleDateString()}</td>
                      <td>{item.time}</td>
                      <td>{item.address}</td>
                      <td>{item.symptoms}</td>
                      <td style={item.status === 'pending' ? { color: '#856404',backgroundColor: '#fff3cd', fontWeight: 'bold' } 
                      : { color: '#004085',backgroundColor: '#cce5ff', fontWeight: 'bold' }}>{item.status}</td>
                    </tr>
                  )) : ( <tr>
                     <td colSpan="6">Chưa có lịch khám</td>
                  </tr>)}
                </tbody>
            </table>
        </div>
        <div className="history">
            <h2>Lịch sử đặt lịch</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên bác sĩ</th>
                        <th>Ngày</th>
                        <th>thời gian</th>
                        <th>địa chỉ</th>
                        <th>triệu chứng</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                  {dataHistory.length>0 ? dataHistory.map((item) => (
                    <tr key={item.appointment_id}>
                      <td>{item.username}</td>
                      <td>{new Date(item.appointment_date).toLocaleDateString()}</td>
                      <td>{item.time}</td>
                      <td>{item.address}</td>
                      <td>{item.symptoms}</td>
                      <td style={item.status === 'canceled' ? { backgroundColor: '#d3d3d3',fontWeight: 'bold' } : item.status === 'refused' 
                      ? { backgroundColor: '#f5c6cb', color:'#721c24',fontWeight: 'bold' } 
                      : { backgroundColor: '#d4edda', color: '#155724',fontWeight: 'bold' }}>{item.status}</td>
                    </tr>
                  )) :  ( <tr>
                     <td colSpan="6">Chưa có lịch sử khám</td>
                  </tr>)}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Appointment_Informaition;