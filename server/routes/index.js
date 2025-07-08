var express = require('express');
var router = express.Router();

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
module.exports = router;
