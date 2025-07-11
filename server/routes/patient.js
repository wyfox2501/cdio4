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
router.post('/:id',upload.none(), async function(req, res, next) {
    try {
        const customer_id=req.session.user.id;
        const doctor_id=req.params.id; // Lấy doctorId từ URL
        const {appointment_date,time,symptoms}=req.body;
        await healthy.query("INSERT INTO appointments (doctor_id,patient_id,appointment_date,time,symptoms) VALUES ($1,$2,$3,$4,$5)",[doctor_id,customer_id,appointment_date,time,symptoms]);
        res.status(201).json({ message: "Add appointment successfully" });
    } catch (error) {
        console.error("Error in POST /customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})
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
module.exports = router;