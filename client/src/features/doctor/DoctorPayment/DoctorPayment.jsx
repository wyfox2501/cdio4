import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './doctorPayment.scss';
DoctorPayment.propTypes = {
    
};

function DoctorPayment(props) {
    const [data, setData] = useState([]);
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
        fetchPayment();
    }, []);
    return (
        <div className="doctor-payment">
            <h2>Vietcombank</h2>
            <p><span>So tai khoan:</span> 0396603412</p>
            <p><span>Ten tai khoan:</span> Nguyen Hoang Huy</p>
            <p><span>Ngan hang:</span> Vietcombank</p>
            <img src={data.qrUrl} alt="QR MB" />
        </div>
    );
}

export default DoctorPayment;