import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import './Statistical_report.scss'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
Statistical_report.propTypes = {};

function Statistical_report(props) {
  const [data, setData] = useState([]);
  const [raw, setRaw] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/statistic",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setRaw([
          //   { name: "Tổng các tài khoản", value: result.totalAccount },
          { name: "Tài khoản hoạt động", value: result.totalAccountTrue },
          { name: "Tài khoản bị khóa", value: result.totalAccountFalse },
          { name: "Tài khoản đợi duyệt", value: result.totalAccountWait },
        ]);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };
    fetchdata();
  }, []);
  const COLORS = ["#28a745", "#6c757d", "#dc3545"];
  return (
    <div className="statistical_report">
      <div className="appointment">
        <div className="statiscal">
          <h2>Tổng số lịch hẹn</h2>
          <p>{data.total}</p>
        </div>
        <div className="statiscal">
          <h2>Đã hoàn thành</h2>
          <p>{data.done}</p>
        </div>
        <div className="statiscal">
          <h2>đã xác nhận</h2>
          <p>{data.confirmed}</p>
        </div>
        <div className="statiscal">
          <h2>Bị hủy & từ chối</h2>
          <p>{data.canceled}</p>
        </div>
        <div className="statiscal">
          <h2>Chờ xác nhận</h2>
          <p>{data.pending}</p>
        </div>
      </div>
      <h1>thống kê tài khoản</h1>
      <div className="acount">
      <div className="total">
        <h2>Tổng số tài khoản</h2>
        <p>{data.totalAccount}</p>
      </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={raw}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent, value }) =>
                  `${name}: ${(percent * 100).toFixed(
                    1
                  )}% - số thực tế: ${value}`
                }
                outerRadius={130}
                dataKey="value"
              >
                {raw.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Statistical_report;
