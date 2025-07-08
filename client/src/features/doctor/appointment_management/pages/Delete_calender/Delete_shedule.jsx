import React from 'react';
import PropTypes from 'prop-types';
import Delete_schedule_List from '../../components/Delete_schedule_List/Delete_schedule';
Delete_shedule.propTypes = {
    
};

function Delete_shedule(props) {
    const patient=[
        {
            id: 1,
            doctor: 'Nguyễn Hoàng Huy',
            date: '2025-03-11',
            timeStart: 7,
            timeEnd:11
        },
        {
            id: 2,
            doctor: 'Nguyễn Hoàng kha',
            date: '2025-03-11',
            timeStart: 13,
            timeEnd:17,
        },
        {
            id:3,
            doctor: 'Nguyễn Hoàng sinh',
            date: '2025-03-13',
           timeStart: 7,
            timeEnd:11
        },
    ]
    return (
        <div>
            <Delete_schedule_List dataDelete={patient}/>
        </div>
    );
}

export default Delete_shedule;