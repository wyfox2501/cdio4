var express = require('express');
var router = express.Router();
const multer = require('multer');
const healthy= require('../model/Heathy');
// lấy danh sách tài khoản doctor có active = wait
router.get('/wait', async function(req, res, next) {
  try {
    const result = await healthy.query("SELECT * FROM users where active=$1 and role=$2", ["wait", "doctor"]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /wait:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// duyệt người dùng có role doctor(Admin)
router.put('/approve/:id', async function(req, res, next) {
  try {
    const userId = req.params.id; // Lấy ID người dùng từ URL
    const result = await healthy.query("UPDATE users SET active = $1 WHERE user_id = $2 RETURNING *", ["true", userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User approved successfully"});
  } catch (error) {
    console.error("Error in PUT /users/approve/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lấy tất cả người dùng
router.get('/users', async function(req, res, next) {
  try {
    const result = await healthy.query("SELECT * FROM users WHERE  active!='wait'");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lock người dùng
router.put('/lock/:id', async function(req, res, next) {
  try {
    const userId = req.params.id; // Lấy ID người dùng từ URL
    const result = await healthy.query("SELECT * FROM users WHERE user_id = $1 and active=$2", [userId,'false']);
    if (result.rows.length > 0) {
      await healthy.query("UPDATE users SET active = $1 WHERE user_id = $2 RETURNING *", ["true", userId]);
      return res.status(404).json({ message: "User already open" });
    }
    
    await healthy.query("UPDATE users SET active = $1 WHERE user_id = $2 RETURNING *", ["false", userId]);

    res.status(200).json({ message: "User locked successfully"});
  } catch (error) {
    console.error("Error in PUT /users/lock/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
router.put('/unlock/:id', async function(req, res, next) {
  try {
    const userId = req.params.id; // Lấy ID người dùng từ URL

      await healthy.query("UPDATE users SET active = $1 WHERE user_id = $2 RETURNING *", ["true", userId]);

    res.status(200).json({ message: "User locked successfully"});
  } catch (error) {
    console.error("Error in PUT /users/lock/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// thống kê
router.get('/statistic', async function(req, res, next) {
   try {
    const totalFinish = await healthy.query("SELECT COUNT(*) FROM appointments");
    const done = await healthy.query("SELECT COUNT(*) FROM appointments WHERE status = 'successfully'");
    const canceled = await healthy.query("SELECT COUNT(*) FROM appointments WHERE status IN ('canceled', 'refused')");
    const pending = await healthy.query("SELECT COUNT(*) FROM appointments WHERE status = 'pending'");
    const confirmed = await healthy.query("SELECT COUNT(*) FROM appointments WHERE status = 'confirmed'");
    const totalAccount=await healthy.query("SELECT COUNT(*) FROM users ");
    const totalAccountTrue=await healthy.query("SELECT COUNT(*) FROM users WHERE active='true'");
    const totalAccountFalse=await healthy.query("SELECT COUNT(*) FROM users WHERE active='false'");
    const totalAccountWait=await healthy.query("SELECT COUNT(*) FROM users WHERE active='wait'");

    res.status(200).json({
      total: parseInt(totalFinish.rows[0].count),
      done: parseInt(done.rows[0].count),
      canceled: parseInt(canceled.rows[0].count),
      pending: parseInt(pending.rows[0].count),
      confirmed: parseInt(confirmed.rows[0].count),
      totalAccount: parseInt(totalAccount.rows[0].count),
      totalAccountTrue: parseInt(totalAccountTrue.rows[0].count),
      totalAccountFalse: parseInt(totalAccountFalse.rows[0].count),
      totalAccountWait: parseInt(totalAccountWait.rows[0].count),
    });
  } catch (error) {
    console.error("Error in GET /statistic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
module.exports = router;