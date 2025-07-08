import React from 'react';
import PropTypes from 'prop-types';

unauthorized.propTypes = {
    
};

function unauthorized(props) {
    return (
        <div style={{ padding: 20 }}>
    <h2>403 - Không có quyền truy cập</h2>
    <p>Bạn không được phép truy cập vào trang này.</p>
  </div>
    );
}

export default unauthorized;