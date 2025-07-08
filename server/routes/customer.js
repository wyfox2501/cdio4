var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload= multer();
const healthy= require('../model/Heathy');
//lấy lịch hẹn của customer (customer)
router.get('/view_appointment', upload.none(), async function(req, res, next) {
  try {
    const customerId = req.session.user.id; // Lấy customerId từ session
    const result = await healthy.query("SELECT * FROM appointments WHERE customer_id = $1", [customerId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /customer/view_appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// đặt lịch khám
router.post('/',upload.none(), async function(req, res, next) {
    try {
        const customer_id=req.session.user.id;
        const {doctor_id,appointment_date,time,}=req.body;
        await healthy.query("INSERT INTO appointments (customer_id,doctor_id,date,datetime_start,datetime_end) VALUES ($1,$2,$3,$4,$5)",[customer_id,doctor_id,date,time_start,time_end]);
        res.status(201).json({ message: "Add appointment successfully" });
    } catch (error) {
        
    }
})
module.exports = router;