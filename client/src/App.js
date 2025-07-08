
import {Routes, Route} from "react-router-dom";
import Sidebar from './features/doctor/appointment_management/dataSidebar';
import Add from './features/doctor/appointment_management/pages/Add_calender/Add_calender';
import View from './features/doctor/appointment_management/pages/View_appointment/view_appointment';
import Login from './features/auth/login & register/Login';
import Register from './features/auth/login & register/Register';
import Layout_Auth from './features/auth/layout/AuthLayout';

function App() {
  return (
    <div className="App">
    <Routes>
      {/* <Route path ="/" element={<Sidebar />}>
        <Route index element={<View />} />
        <Route path="themlich" element={<Add />} />
        <Route path="xem" element={<View />} />
      </Route> */}
      <Route path ="/auth" element={<Layout_Auth />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
