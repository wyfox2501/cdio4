var express = require('express');
var router = express.Router();
const healthy= require('../model/Heathy');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// đổi mật khẩu
router.post('/change_password', async function(req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.session.user.id; // Lấy userId từ session

    // Kiểm tra mật khẩu cũ
    const result = await healthy.query("SELECT * FROM users WHERE user_id = $1 AND password = $2", [userId, oldPassword]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Cập nhật mật khẩu mới
    await healthy.query("UPDATE users SET password = $1 WHERE user_id = $2", [newPassword, userId]); 
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in POST /change_password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lấy thông tin cá nhân
router.get('/profile/:id', async function(req, res, next) {
  try {
    // const userId = req.session.user.id; // Lấy userId từ session
    const userId = req.params.id;
    const result = await healthy.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    const user=result.rows[0];
    let detailResult = {};
    if(user.role==='doctor'){
      detailResult = await healthy.query("SELECT * FROM doctor WHERE user_id = $1", [userId]);
    }else{
      detailResult = await healthy.query("SELECT * FROM patient WHERE user_id = $1", [userId]);
    }
    const detailInfo = detailResult.rows[0] || {};
    res.status(200).json({user, detail: detailInfo});
  } catch (error) {
    console.error("Error in GET /profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
module.exports = router;
