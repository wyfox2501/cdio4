import React from 'react';
import PropTypes from 'prop-types';
import Schedule from '../../components/View_calendar_List/work_schedule';
Work_schedule.propTypes = {
    
};

function Work_schedule(props) {
    const schdule=[
        {
            id: 1,
            doctor: 'Nguyễn Hoàng Huy',
            date: '09/03/2025',
            hour: ["7H","8H","9H","10H"]
        },
        {
            id: 2,
            doctor: 'Nguyễn Hoàng Huy',
            date: '05/03/2025',
            hour: ["7H","8H","9H","10H"]
        },
        {
            id:3,
            doctor: 'Nguyễn Hoàng Huy',
            date: '08/03/2025',
            hour: ["7H","8H","9H","10H"]
        },
    ]
    return (
        <div>
            <Schedule dataView={schdule}/>
        </div>
    );
}

export default Work_schedule;