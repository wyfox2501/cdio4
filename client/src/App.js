import { Routes, Route } from "react-router-dom";
// doctor
import Layout_doctor from "./features/doctor/Layout_doctor.jsx";
import Sidebar from "./features/doctor/appointment_management/dataSidebar";
import Add_appointment from "./features/doctor/appointment_management/components/Add_calender/Add_calender.jsx";
import History_appointment from "./features/doctor/appointment_management/components/View_HistoryKham/AppointmentHistory.jsx";
import Deal_appointment from "./features/doctor/appointment_management/components/ConfirmAppointment/ConfirmAppointment.jsx";
import View_appointment from "./features/doctor/appointment_management/components/View_calendar_List/appointment.jsx";
import View_work_calendar from "./features/doctor/appointment_management/components/View_calendar_List/work_schedule.jsx";
import Home_appointment from "./features/doctor/appointment_management/pages/home/home_appointment_management.jsx";
import DoctorPayment from "./features/doctor/DoctorPayment/DoctorPayment.jsx";
import ProfileDoctor from "./features/doctor/profileDoctor/profileDoctor.jsx";
import AdviseDoctor from "./features/doctor/adviseDoctor/adviseDoctor.jsx";
// patient
import Layout_customer from "./features/customer/Layout_customer.jsx";
import DoctorSelect from "./features/customer/make_an_appointment/DoctorSelection.jsx";
import AppointmentLayout from "./features/customer/make_an_appointment/AppointmentLayout.jsx";
import DoctorDetail from "./features/customer/make_an_appointment/DoctorDetail.jsx";
import BookingInfo from "./features/customer/make_an_appointment/BookingInfo.jsx";
import AppointmentConfirmation from "./features/customer/make_an_appointment/AppointmentConfirmation.jsx";
import Schedule from "./features/customer/make_an_appointment/Schedule.jsx";
import ProfileCustomer from "./features/customer/profileCustomer/profileCustomer.jsx";
import Maneger_healthy from "./features/customer/maneger_healthy/Maneger_healthy.jsx";
import Advise from "./features/customer/advise/adviseCustomer.jsx";
//admin
import Layout_admin from './features/admin/adminlayout.jsx';
import Inadmin from './features/admin/inadmin/quanlyquyen.jsx';
import UserAdmin from './features/admin/useradmin/quanlytaikhoan.jsx'
// layout
import Login from "./features/auth/login & register/Login";
import Register from "./features/auth/login & register/Register";
import Layout_Auth from "./features/auth/layout/AuthLayout";
import PrivateRoute from "./PrivateRoute.jsx";
import Unauthorized from "./components/unauthorized.jsx";
import Home from "./components/home/home.jsx";

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

        <Route path="/doctor" element={<PrivateRoute allowedRoles={"doctor"} />}>
          {/* <Route index element={<Layout_doctor />} /> */}
          <Route path="/doctor" element={<Layout_doctor />}>
            <Route index element={<Home />} />
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="quan-li-lich" element={<Sidebar />}>
              <Route index element={<Home_appointment />} />
              <Route path="LichKham" element={<View_appointment />} />
              <Route path="LichLamViec" element={<View_work_calendar />} />
              <Route path="themlich" element={<Add_appointment />} />
              <Route path="xemLichSuLichKham" element={<History_appointment />} />
              <Route path="chotLich" element={<Deal_appointment />} />
            </Route>
            <Route path="nop-tien" element={<DoctorPayment />} />
            <Route path="tu-van" element={<AdviseDoctor />} />
            <Route path="quan-li-tai-khoan" element={<ProfileDoctor />} />
          </Route>
        </Route>
        <Route path="/admin" element={<PrivateRoute allowedRoles={'admin'} />}>
          <Route index element={<Layout_admin/>}/>
          <Route path="/admin" element={<Layout_admin />}>
            <Route path="role-manager" element={<Inadmin />} />
            <Route path="account_manager" element={<UserAdmin />} />
        </Route>
      </Route>
        <Route path="/" element={<PrivateRoute allowedRoles={"patient"}/>}> 
              {/* <Route index element={<Layout_customer />} /> */}
              <Route path="/" element={<Layout_customer />}>
              <Route index element={<Home />} />
                <Route path="chon-bac-si" element={<DoctorSelect />} />
                <Route path="datlich" element={<AppointmentLayout />}>
                      <Route index element={<DoctorDetail />} />
                      <Route path="chi-tiet-bac-si/:doctorId" element={<DoctorDetail />}/>
                      <Route path="thong-tin-kham-benh/:doctorId" element={<BookingInfo />} />
                      <Route path="kiemtra/:doctorId" element={<Schedule />} />
                      <Route path="xac-nhan-thong-tin" element={<AppointmentConfirmation />} />
                </Route>
                <Route path="tu-van" element={<Advise />} />
                <Route path="quan-li-tai-khoan" element={<ProfileCustomer />} />
                <Route path="quan-li-ke-hoach" element={<Maneger_healthy />} />
              </Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
