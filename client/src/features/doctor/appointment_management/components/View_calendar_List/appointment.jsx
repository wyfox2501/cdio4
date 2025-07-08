import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
Calendar.propTypes = {
    dataPatient: PropTypes.array
};
Calendar.defaultProps={
    dataPatient:[],
}
const daysOfWeek = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy","Chủ Nhật"];
const hours = ["7H", "8H", "9H", "10H", "11H", "12H", "13H", "14H", "15H", "16H", "17H", "18H","19H","20H","21H"];
function Calendar({dataPatient}) {
    const getWeekday =(dataString) =>{
        const date = new Date(dataString);
        return daysOfWeek[date.getDay()];
    };
    const [coutDay,setCoutDay]=useState(new Date(2025,2,3));
    const [endDay,setEndDay] =useState( new Date(coutDay));
    // tự động cập nhập endDay khi CoutDay thay đổiđổi
    useEffect(()=>{
        const newEndDay = new Date(coutDay);
        newEndDay.setDate(newEndDay.getDate() + 6);
        setEndDay(newEndDay);
    }, [coutDay])
// khi onclick thì sẽ tăng ngày lên 
    const nextDay =()=>{
        setCoutDay(pre=>{
            const next= new Date(coutDay);
            next.setDate(next.getDate()+7)
            return next;
    });
    }
    //khi onclick thì sẽ giảm ngày xuống
    const preDay =()=>{
        setCoutDay(pre=>{
            const next= new Date(coutDay);
            next.setDate(next.getDate()-7)
            return next;
    });
    }
    return (
        <div className='container'>
            <h2>Lịch Khám</h2>
            <div className="calender">
            <div className="head">
            <span className='next' onClick={preDay}>◀️</span> <span className='pre' onClick={nextDay}>▶️</span> 
            <span>{coutDay.toLocaleDateString()}-{endDay.toLocaleDateString()}</span> 
            </div>
                <table>
                    <thead >
                        <tr>
                            <th className='time1'>giờ</th>
                            {daysOfWeek.map(day=>(
                                <th key={day} className='time2'>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {hours.map(data=>(
                                <tr key={data}>
                                    <td className='hour'>{data}</td>
                                    {daysOfWeek.map(day=>(
                                        <td key={day + data} className='date'>
                                            {dataPatient.filter(a=>getWeekday(a.date)===day && a.time===data).map((a,index)=>(
                                                <div key={index} className="see">
                                                <span>👤</span> {a.name}
                                                </div>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Calendar;