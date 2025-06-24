
import {Routes, Route} from "react-router-dom";
import Sidebar from './features/doctor/appointment_management/dataSidebar';
import Add from './features/doctor/appointment_management/pages/Add_calender/Add_calender';
import View from './features/doctor/appointment_management/pages/View_appointment/view_appointment';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path ="/" element={<Sidebar />}>
        <Route index element={<View />} />
        <Route path="themlich" element={<Add />} />
        <Route path="xem" element={<View />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
