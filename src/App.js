import { Routes, Route } from "react-router-dom";
import Sidebar from "./features/doctor/appointment_management/dataSidebar";
import Add from "./features/doctor/appointment_management/components/Add_calender/Add_calender";
import View from "./features/doctor/appointment_management/components/View_calendar_List/appointment";
// import Cancle from "./features/doctor/appointment_management/pages/Cancel_schedule/Cancel_schedule";
// import Delete from "./features/doctor/appointment_management/pages/Delete_calender/Delete_shedule";
import View_kham from "./features/doctor/appointment_management/components/View_calendar_List/appointment";
import View_lamviec from "./features/doctor/appointment_management/components/View_calendar_List/work_schedule";
import ConfirmAppointment from "./features/doctor/appointment_management/components/ConfirmAppointment/ConfirmAppointment";
import AppointmentHistory from "./features/doctor/appointment_management/components/View_HistoryKham/AppointmentHistory";
import DoctorPayment from "./features/doctor/appointment_management/components/DoctorPayment/DoctorPayment";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Sidebar />}>
                    <Route
                        path="/quan-li-lich/LichKham"
                        element={<View_kham />}
                    />
                    <Route
                        path="/quan-li-lich/LichLamViec"
                        element={<View_lamviec />}
                    />
                    <Route index element={<View />} />
                    <Route path="/quan-li-lich/themlich" element={<Add />} />
                    <Route path="xem" element={<View />} />
                    {/* <Route path="/quan-li-lich/huy-lich" element={<Cancle />} /> */}
                    {/* <Route path="/quan-li-lich/xoa-lich" element={<Delete />} /> */}
                    <Route
                        path="/quan-li-lich/xemLichSuLichKham"
                        element={<AppointmentHistory />}
                    />
                    <Route
                        path="/quan-li-lich/chotLich"
                        element={<ConfirmAppointment />}
                    />
                    <Route
                        path="/quan-li-lich/noptien"
                        element={<DoctorPayment />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
