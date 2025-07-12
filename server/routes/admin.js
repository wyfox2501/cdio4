var express = require('express');
var router = express.Router();
const multer = require('multer');
const healthy= require('../model/Heathy');
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
// lấy tất cả người dùngh
router.get('/users', async function(req, res, next) {
  try {
    const result = await healthy.query("SELECT * FROM users where active=$1", ["true"]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in GET /users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;