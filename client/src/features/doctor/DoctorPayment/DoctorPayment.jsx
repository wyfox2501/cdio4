import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './doctorPayment.scss';
DoctorPayment.propTypes = {
    
};

function DoctorPayment(props) {
    const [data, setData] = useState([]);
    const [balance, setBalance] = useState([]);
    useEffect(() => {
        const fetchPayment= async () => {
            try {
                const response = await fetch('http://localhost:5000/api/payment/create',{
                    method: 'GET',
                    credentials: 'include'
                } );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        }
        const fetchCheck=async () => {
            try {
                const response = await fetch('http://localhost:5000/api/payment/check',{
                    method: 'GET',
                    credentials: 'include'
                } );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setBalance(result[0]);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        }
        fetchPayment();
        fetchCheck();
    }, []);
    
    return (
        <div className="doctor-payment">
        <div className="balance">
            <h2>balance:</h2>
            <p>{Number(balance.total_money)?.toLocaleString('vi-VN')} VND</p>
        </div>
          <div className="main">
              <h2>Vietcombank</h2>
            <p><span>So tai khoan:</span> 0396603412</p>
            <p><span>Ten tai khoan:</span> Nguyen Hoang Huy</p>
            <p><span>Ngan hang:</span> Vietcombank</p>
            <img src={data.qrUrl} alt="QR MB" />
          </div>
        </div>
    );
}

export default DoctorPayment;