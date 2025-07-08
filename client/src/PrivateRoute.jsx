import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

// Component kiểm tra quyền truy cập trang
const PrivateRoute = ({ allowedRoles }) => {
  const [user, setUser] = useState(null);      // Lưu thông tin user từ server
  const [loading, setLoading] = useState(true); // Trạng thái loading khi đang kiểm tra

  // Khi component này được load, gọi API để lấy thông tin người dùng
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/me", { withCredentials: true })
      .then(res => {
        // Nếu lấy thông tin thành công, lưu user vào state
        // console.log("ROLE:", res.data); 
        setUser(res.data);
      })
      .catch(() => {
        // Nếu không đăng nhập hoặc có lỗi, đặt user = null
        setUser(null);
      })
      .finally(() => {
        // Tắt trạng thái loading
        setLoading(false);
      });
  }, []);

  // Nếu đang loading thì hiện chữ "Loading..."
  if (loading) return <div>Đang tải...</div>;

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

if (!allowedRoles.includes(user.role==="admin" || user.role === "doctor" || user.role === "patient")) {
  return <Navigate to="/unauthorized" replace /> ;

}

  // Nếu hợp lệ, hiển thị nội dung bên trong route (trang được phép truy cập)
  return <Outlet />;
};

export default PrivateRoute;