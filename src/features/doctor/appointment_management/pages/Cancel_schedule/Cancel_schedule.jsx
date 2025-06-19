import React from 'react';
import PropTypes from 'prop-types';
import CancelList from '../../components/Cancel_schedule_List/CancelList';
Cancel_schedule.propTypes = {
    
};

function Cancel_schedule(props) {
    const shedule=[
        {
            name: "trần minh tú",
            sdt: "03312456789",
            date: '2025-03-11',
            hour: 8,
            symptum: "đau ho, cảm"
        },
        {
            name: "trần đại huân",
            sdt: "0354612148",
            date: '2025-03-10',
            hour: 8,
            symptum: "đau ho, cảm"
        },
        {
            name: "huỳnh anh kha",
            sdt: "0354612148",
            date: '2025-03-10',
            hour: 11,
            symptum: "đau ho, cảm"
        }
    ]
    return (
        <div>
            <CancelList dataCancel={shedule}/>
        </div>
    );
}

export default Cancel_schedule;