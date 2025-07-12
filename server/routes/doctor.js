var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload= multer();
const cron = require('node-cron');
const healthy= require('../model/Heathy');
//lấy lịch hẹn của bác sĩ(doctor)
router.get('/view_appointment',upload.none(), async function(req, res, next) {
  try {
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    const result = await healthy.query("SELECT * FROM appointments WHERE doctor_id = $1 and status=$2", [doctorId, 'confirm']);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /doctor/view_appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Lấy lịch làm việc của bác sĩ(doctor)
router.get('/view_work_schedule', async function(req, res, next) {
  const doctorId = req.session.user.id; // Lấy doctorId từ session
  try {
    //  console.log("📥 GET /view_work_schedule");
    // console.log("🍪 Session:", req.session);
    // console.log("👤 Session User:", req.session?.user);
    const result = await healthy.query("SELECT * FROM doctorschedule WHERE user_id = $1", [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /doctor/view_work_schedule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//lấy danh sách thông tin lịch hẹn để chốt hoặc hủy
router.get('/confirm_refuse', async function (req, res, next) {
  try {
    const doctorId = req.session.user.id;
    const result=await healthy.query("SELECT * FROM appointments WHERE doctor_id = $1 and status=$2", [doctorId,"confirmed"]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /doctor/confirm_refuse:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
})
// Lấy thông tin bác sĩ(doctor)
router.get('/',async function(req, res, next) {
  try {
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    const result=await healthy.query("SELECT * FROM doctor d, users u WHERE d.user_id=u.user_id and u.user_id = $1", [doctorId]);
    res.status(200).json(result.rows );
  } catch (error) {
    console.error("Error in GET /doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lấy lịch sử khám bệnh của bác sĩ 
router.get('/history',async function(req, res, next) {
  try {
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    const result=await healthy.query("SELECT * FROM appointments WHERE doctor_id = $1 and status=$2", [doctorId, 'successfully']);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /doctor/history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// Thêm lịch làm việc(doctor)
router.post('/',upload.none(),async function(req, res, next) {
  try {
    const { date, time_start, time_end, } = req.body;
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    await healthy.query(
      "INSERT INTO doctorschedule (user_id,date, datetime_start, datetime_end) VALUES ($1, $2, $3, $4) RETURNING *",
      [doctorId, date, time_start, time_end]
    );
    res.status(201).json({ message: "Add doctorschedule successfully" });
  } catch (error) {
    console.error("Error in POST /doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// xóa lịch làm việc(doctor)
router.delete('/:id', async function(req, res, next) {
  try {
    const scheduleId = req.params.id; // Lấy ID lịch làm việc từ URL
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    await healthy.query("DELETE FROM doctorschedule WHERE schedule_id = $1 AND user_id = $2", [scheduleId, doctorId]);
    res.status(200).json({ message: "Delete doctorschedule successfully" });
  } catch (error) {
    console.error("Error in DELETE /doctor/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//hủy lịch hẹn(doctor)
router.put('/cancel/:id',upload.none(), async function(req, res, next) {
  try {
    const appointmentId = req.params.id; // Lấy ID lịch hẹn từ URL
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    const reason = req.body.reason; // Lấy lý do hủy từ body yêu cầu
    await healthy.query("UPDATE appointments SET status = 'canceled', reason = $1 WHERE id = $2 AND doctor_id = $3", [reason, appointmentId, doctorId]);
    res.status(200).json({ message: "Cancel appointment successfully" });
  } catch (error) {
    console.error("Error in PUT /doctor/:id/cancel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// chốt lịch hẹn(doctor)
router.put('/confirm/:id',upload.none(), async function(req, res, next) {
  try {
    const appointmentId = req.params.id; // Lấy ID lịch hẹn từ URL
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    await healthy.query("UPDATE appointments SET status = 'confirmed' WHERE id = $1 AND doctor_id = $2", [appointmentId, doctorId]);
    res.status(200).json({ message: "Confirm appointment successfully" });
  } catch (error) {
    console.error("Error in PUT /doctor/:id/confirm:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// từ chối lịch hẹn(doctor)
router.put('/refuse/:id',upload.none(), async function(req, res, next) {
  try {
    const appointmentId = req.params.id; // Lấy ID lịch hẹn từ URL
    const doctorId = req.session.user.id; // Lấy doctorId từ session
    await healthy.query("UPDATE appointments SET status = 'refused' WHERE id = $1 AND doctor_id = $2", [appointmentId, doctorId]);
    res.status(200).json({ message: "Reject appointment successfully" });
  } catch (error) {
    console.error("Error in PUT /doctor/:id/reject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Thêm cron job để cập nhật trạng thái hoạt động
// tự động cập nhập lúc 00h01p sáng mỗi ngày
// const cron = require('node-cron');
cron.schedule('1 0 * * *', async () => {
  try {
    await healthy.query(`
      UPDATE appointments
      SET status = 'successfully'
      WHERE status = confirmed AND appointment_date < CURDATE()
    `);
  } catch (err) {
    console.error('Cron error:', err);
  }
});
module.exports = router;