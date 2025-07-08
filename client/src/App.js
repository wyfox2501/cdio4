import { Routes, Route } from "react-router-dom";
import Sidebar from "./features/doctor/appointment_management/dataSidebar";
import Add_appointment from "./features/doctor/appointment_management/components/Add_calender/Add_calender.jsx";
// import Cancle_appointment from './features/doctor/appointment_management/components/Cancel_appointment/Cancel_appointment.jsx';
// import Delete_appointment from './features/doctor/appointment_management/components/Delete_appointment/Delete_appointment.jsx';
import History_appointment from "./features/doctor/appointment_management/components/View_HistoryKham/AppointmentHistory.jsx";
import Deal_appointment from "./features/doctor/appointment_management/components/ConfirmAppointment/ConfirmAppointment.jsx";
import View_appointment from "./features/doctor/appointment_management/components/View_calendar_List/appointment.jsx";
import View_work_calendar from "./features/doctor/appointment_management/components/View_calendar_List/work_schedule.jsx";
import Login from "./features/auth/login & register/Login";
import Register from "./features/auth/login & register/Register";
import Layout_Auth from "./features/auth/layout/AuthLayout";
import Home_appointment from "./features/doctor/appointment_management/pages/home/home_appointment_management.jsx";
import DoctorPayment from "./features/doctor/payment/DoctorPayment/DoctorPayment.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Unauthorized from "./components/unauthorized.jsx";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Unauthorized />} />
        <Route path="/auth" element={<Layout_Auth />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateRoute allowedRoles={"doctor"} />}>
          <Route index element={<Sidebar />} />
          <Route path="/quan-li-lich" element={<Sidebar />}>
            <Route index element={<Home_appointment />} />
            <Route path="LichKham" element={<View_appointment />} />
            <Route path="LichLamViec" element={<View_work_calendar />} />
            <Route path="themlich" element={<Add_appointment />} />
            <Route path="xemLichSuLichKham" element={<History_appointment />} />
            <Route path="chotLich" element={<Deal_appointment />} />
          </Route>
          <Route path="/nop-tien" element={<Sidebar />}>
            <Route index element={<DoctorPayment />} />
          </Route>
        </Route>
        {/* <Route path="/" element={<PrivateRoute allowedRoles={'admin'} />}>
        <Route path ="/quan-li-lich" element={<Sidebar />}>
          <Route index element={<Home_appointment />} />
          <Route path="LichKham" element={<View_appointment />} />
          <Route path="LichLamViec" element={<View_work_calendar />} />
          <Route path="themlich" element={<Add_appointment />} />
          <Route path="xem-lich-su" element={<History_appointment />} />
          <Route path="chot-lich" element={<Deal_appointment />} />
        </Route>
      </Route>
      <Route path="/" element={<PrivateRoute allowedRoles={'patient'} />}>
        <Route path ="/quan-li-lich" element={<Sidebar />}>
          <Route index element={<Home_appointment />} />
          <Route path="LichKham" element={<View_appointment />} />
          <Route path="LichLamViec" element={<View_work_calendar />} />
          <Route path="themlich" element={<Add_appointment />} />
          <Route path="xem-lich-su" element={<History_appointment />} />
          <Route path="chot-lich" element={<Deal_appointment />} />
        </Route>
      </Route> */}
      </Routes>
    </div>
  );
}

export default App;
