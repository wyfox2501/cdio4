import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

Home.propTypes = {
    
};

function Home(props) {
    const [user, setUser] = useState(null); // state để lưu thông tin người dùng
      useEffect(() => {
        const fetchUser = async () => {
          const res = await fetch("http://localhost:5000/api/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 🔥 cái này là để gửi cookie
          });
          const result = await res.json();
          if (res.status === 200) {
            setUser(result.user); // cập nhật state user
          } else {
            // alert(result.message);
          }
        };
        fetchUser();
      }, []);
    return (
        <div>
        {user.role=== 'doctor'?(
            <Route path="/" element={<Sidebar />}>
        ):user.role === 'patient'?(
            <Route path="/" element={<Sidebar />}>
        ):user.role === 'admin'?(
            <Route path="/" element={<Sidebar />}>
        ):(
            <Route path="/" element={<Sidebar />}>
            )}
        </div>
    );
}

export default Home;