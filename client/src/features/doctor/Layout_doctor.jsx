import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../../components/header/index';
import { Outlet } from 'react-router-dom';
Layout_doctor.propTypes = {
    
};

function Layout_doctor(props) {
    return (
         <div>
            <div className="heading">
                <Heading />
             </div>
        <div >
             <Outlet />
        </div>
        </div>
    );
}

export default Layout_doctor;