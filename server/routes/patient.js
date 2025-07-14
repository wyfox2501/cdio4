var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload= multer();
const healthy= require('../model/Heathy');
//lấy lịch hẹn của customer (customer)
router.get('/view_appointment', upload.none(), async function(req, res, next) {
  try {
    const customerId = req.session.user.id; // Lấy customerId từ session
    const result = await healthy.query("SELECT * FROM appointments WHERE patient_id = $1", [customerId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /customer/view_appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lấy danh sách bác sĩ
router.get('/view_doctor',upload.none(), async function(req, res, next) {
  try {
    const result = await healthy.query("SELECT * FROM doctor d, users u where d.user_id=u.user_id and u.active=$1", ["true"]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /customer/view_doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// lấy thông tin cá nhân của bác sĩ
router.get('/doctor/:id',upload.none(), async function(req, res, next) {
  try {
    const doctorId = req.params.id; // Lấy doctorId từ URL
    const result = await healthy.query("SELECT * FROM doctor d, users u where d.user_id=u.user_id and u.user_id=$1", [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /customer/doctor/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// đặt lịch khám
router.post('/appointments',upload.none(), async function(req, res, next) {
    try {
        const customer_id=req.session.user.id;
        const {doctor_id,appointment_date,time,symptoms}=req.body;
        const check=await healthy.query("SELECT * FROM appointments WHERE doctor_id=$1 and appointment_date=$2 and time=$3", [doctor_id,appointment_date,time]);
        if(check.rowCount>0){
            return res.status(400).json({ message: "appointments had exist" });
        }
        await healthy.query("INSERT INTO appointments (doctor_id,patient_id,appointment_date,time,status,symptoms) VALUES ($1,$2,$3,$4,$5,$6)",[doctor_id,customer_id,appointment_date,time,'pending',symptoms]);
        res.status(201).json({ message: "Add appointment successfully" });
    } catch (error) {
        console.error("Error in POST /customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// API để lấy các khung giờ đã được đặt của một bác sĩ vào một ngày cụ thể
router.get('/doctor/:id/booked-slots', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { date } = req.query; // Nhận ngày từ URL, ví dụ: ?date=2025-07-13

    if (!date) {
      return res.status(400).json({ message: "Vui lòng cung cấp ngày." });
    }

    const result = await healthy.query(
      "SELECT time FROM appointments WHERE doctor_id = $1 AND appointment_date = $2 AND status != 'cancelled'", 
      [id, date]
    );

    // Trả về một mảng chỉ chứa các chuỗi thời gian, ví dụ: ["08:30:00", "09:00:00"]
    const bookedTimes = result.rows.map(row => row.time);
    res.status(200).json(bookedTimes);

  } catch (error) {
    console.error("Error in GET /doctor/:id/booked-slots:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// lấy thông tin customer
router.get('/', async function(req, res, next) {
  try {
    const customerId = req.session.user.id; // Lấy customerId từ session
    const result = await healthy.query("SELECT * FROM patient p, users u WHERE p.user_id = u.user_id AND u.user_id = $1", [customerId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lấy lịch làm việc cá nhân của bác sĩ
router.get('/work_schedule_doctor/:id',upload.none(), async function(req, res, next) {
  try {
    const doctorId = req.params.id; // Lấy doctorId từ URL
    const result = await healthy.query("SELECT * FROM doctorschedule WHERE user_id = $1", [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /customer/work_schedule_doctor/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// cập nhập thông tin bệnh nhân
router.put('/',upload.none(), async function(req, res, next) {
  try {
    const {height,weight, bmi}=req.body;
    const customerId = req.session.user.id; // Lấy customerId từ session
    await healthy.query("UPDATE patient SET height=$1,weight=$2,bmi=$3 WHERE user_id=$4", [height,weight,bmi,customerId]);
    res.status(200).json({ message: "Update patient successfully" });
  } catch (error) {
    console.error("Error in PUT /customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
module.exports = router;