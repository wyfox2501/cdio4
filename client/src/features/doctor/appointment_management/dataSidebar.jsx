import React from "react";
// import PropTypes from "prop-types";
import Demo from "./components/sidebar_List/sidebar";
import Heading from "../../../components/header/index";
import { Outlet } from "react-router-dom";
import "./styleIndex.scss";
// import Footing from '../../../components/footer/Footer.jsx'
DataSidebar.propTypes = {};

function DataSidebar(props) {
    const managerList = [
        {
            id: 1,
            title: "Xem Lịch",
        },
        {
            id: 2,
            title: "Thêm Lịch Làm Việc",
            path: "/quan-li-lich/themlich",
        },
        // {
        //     id: 3,
        //     title: "Hủy Lịch Khám",
        //     path: "/quan-li-lich/huy-lich",
        // },
        // {
        //     id: 4,
        //     title: "Xóa Lịch Làm Việc",
        //     path: "/quan-li-lich/xoa-lich",
        // },
        {
            id: 5,
            title: "Xem Lịch Sử Lịch Khám",
            path: "/quan-li-lich/xemLichSuLichKham",
        },
        {
            id: 6,
            title: "Chốt Lịch Khám",
            path: "/quan-li-lich/chotLich",
        },
        // {
        //     id: 7,
        //     title: "Nộp Tiền Cho Bệnh Viện",
        //     path: "/quan-li-lich/noptien",
        // },
    ];
    const viewList = [
        {
            id_view: "kham",
            title: "Lịch Khám",
            id: 1,
            path: "/quan-li-lich/LichKham",
        },
        {
            id_view: "work",
            title: "Lịch Làm Việc",
            id: 1,
            path: "/quan-li-lich/LichLamViec",
        },
    ];
    return (
        <div className="container-main">
            <div className="heading">
                <Heading />
            </div>
            <div className="body">
                <div className="side">
                    <Demo managerList={managerList} viewList={viewList} />
                </div>
                <div className="doctor-body">
                    <Outlet />
                </div>
            </div>
            {/* <div className="foot">
      <Footing/>
      </div> */}
        </div>
    );
}

export default DataSidebar;
