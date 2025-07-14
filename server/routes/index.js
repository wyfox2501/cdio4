var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');
const fs = require('fs');
const healthy= require('../model/Heathy');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images/"), // Thư mục lưu ảnh
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: storage });
// đổi mật khẩu
router.put('/change_password',upload.none(),  async function(req, res, next) {
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
router.get('/profile',async function(req, res, next) {
  try {
    const userId = req.session.user.id; // Lấy userId từ session
    // const userId = req.params.id;
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
//cập nhâp avata
router.put('/avatar',upload.single('avata'), async function(req, res, next) {
  try {
    const userId = req.session.user.id; // Lấy userId từ session
    const avata = req.file?.filename; // Lấy tên file avatar
    // Lấy avatar cũ từ database
    const result = await healthy.query("SELECT avata FROM users WHERE user_id = $1", [userId]);
    const oldAvatar = result.rows[0]?.avata;

    // Xóa ảnh cũ nếu tồn tại
    if (oldAvatar) {
      const oldPath = path.join(__dirname, '../public/images/', oldAvatar);
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.warn('Không thể xóa avatar cũ:', err.message); // Không cần dừng tiến trình nếu lỗi
        }
      });
    }

    await healthy.query("UPDATE users SET avata = $1 WHERE user_id = $2", [avata, userId]);
    res.status(200).json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error in PUT /avatar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// cập nhập thông tin user
router.put('/profile',upload.none(), async function(req, res, next) {
  try {
    const {username,phone,email,address,sex,birthdate}=req.body;
    const userId = req.session.user.id; // Lấy userId từ session
    await healthy.query("UPDATE users SET username=$1,phone=$2,email=$3,address=$4,sex=$5,birthdate=$6 WHERE user_id=$7",[username,phone,email,address,sex,birthdate,userId]);
    res.status(200).json({ message: "Update user successfully" });
  } catch (error) {
    console.error("Error in PUT /customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
module.exports = router;
