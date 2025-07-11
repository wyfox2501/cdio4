var express = require('express');
var router = express.Router();
const multer = require('multer');
const healthy= require('../model/Heathy');
// 

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images/"), // Thư mục lưu ảnh
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: storage });
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/patient', upload.single('avata'), async function(req, res, next) {
  try {
    const { name, email, password, phone, cccd, birthday, sex, address } = req.body;
    const avata = req.file?.filename; // Lấy tên file avatar
    const check = await healthy.query("SELECT * FROM users WHERE email = $1 or cccd=$2", [email, cccd]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
   const result = await healthy.query(
      "INSERT INTO users (username, email, password, phone, cccd, avata,role, active, birthday, sex, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [name, email, password, phone, cccd, avata, 'patient', "true", birthday, sex, address]
    );
     const userId = result.rows[0].user_id;
    await healthy.query(
      "INSERT INTO patient (user_id) VALUES ($1) RETURNING *",
      [userId]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in POST /users:", error);
    res.status(500).json({ message: "register error" });
  }
});
router.post('/doctor', upload.fields([
  { name: 'avata', maxCount: 1 }, // Avatar
  { name: 'image_Certification', maxCount: 1 } // Chứng chỉ bác sĩ
]),async function(req, res, next) {
  try {
    const { name, email, password, phone, cccd, birthday, sex, address, specification, experience } = req.body;
    const avata = req.files?.avata?.[0]?.filename; // Lấy tên file avatar
    const image_Certification = req.files?.image_Certification?.[0]?.filename; // Lấy tên file chứng chỉ
    const check = await healthy.query("SELECT * FROM users WHERE email = $1 or cccd=$2", [email, cccd]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const result = await healthy.query(
      "INSERT INTO users (username, email, password, phone, cccd,birthday, sex, address, avata,role, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [name, email, password, phone, cccd, birthday, sex, address, avata, 'doctor', "wait"]
    );
    const userId = result.rows[0].user_id;
    // Lưu thông tin bác sĩ vào bảng doctor
   await healthy.query(
      "INSERT INTO doctor (user_id, specification, experience, image_Certification) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, specification, experience, image_Certification]
    );
    //lưu thông tin wallet của bác sĩ
   await healthy.query(
      "INSERT INTO wallet (wallet_id, total_money) VALUES ($1, $2) RETURNING *",
      [userId, 0]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in POST /users:", error);
    res.status(500).json({ message: "register error" });
  }
});
router.post('/login',upload.none(), async function(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await healthy.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // kiểm tra active
    if (result.rows[0].active === "false") {
      return res.status(403).json({ message: "Account is not active" });
    }else if (result.rows[0].active === "wait") {
      return res.status(403).json({ message: "Account is waiting for approval" });
    }
    const user = result.rows[0];
    req.session.user = { id: user.user_id, name: user.username, role: user.role };
    // console.log("Session set on login:", req.session.user);
    res.status(200).json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Error in POST /users/login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/logout', function(req, res, next) {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error("Error in POST /users/logout:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      // Xóa cookie phiên làm việc
      res.clearCookie('connect.sid');
      // Trả về phản hồi thành công
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error in POST /users/logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// lấy thông tin người dùng hiện tại
router.get('/me', async function(req, res, next) {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.session.user.id; // Lấy userId từ session
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await healthy.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.rows[0];
    // Lấy thông tin role từ bảng doctor nếu là bác sĩ
    if (user.role === 'doctor') {
      const doctorResult = await healthy.query("SELECT * FROM doctor WHERE user_id = $1", [userId]);
      if (doctorResult.rows.length > 0) {
        user.doctorInfo = doctorResult.rows[0];
      }
    }else if (user.role === 'patient') {
      const patientResult = await healthy.query("SELECT * FROM patient WHERE user_id = $1", [userId]);
      if (patientResult.rows.length > 0) {
        user.patientInfo = patientResult.rows[0];
      }
    }
    res.status(200).json({user});
  } catch (error) {
    console.error("Error in GET /users/me:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
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
module.exports = router;
