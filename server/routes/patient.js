// File: server/routes/patient.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const healthy = require('../model/Heathy');

// Middleware để kiểm tra người dùng đã đăng nhập hay chưa
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.id) {
        return next();
    }
    res.status(401).json({ msg: 'Truy cập bị từ chối. Vui lòng đăng nhập.' });
};

// === API MỚI ĐỂ LẤY CHI TIẾT LỊCH HẸN ===
/**
 * @route   GET /api/patient/appointments/:id
 * @desc    Lấy chi tiết một lịch hẹn cụ thể để xác nhận.
 * @access  Private
 */
router.get('/appointments/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const patientId = req.session.user.id; // Đảm bảo bệnh nhân chỉ xem được lịch hẹn của mình

        const query = {
            text: `
                SELECT 
                    a.appointment_id, a.appointment_date, a.time, a.symptoms, a.status,
                    doc_user.username as doctor_name,
                    doc_user.email as doctor_email,
                    doc_user.address as clinic_address,
                    d.specification as doctor_specialty,
                    pat_user.username as patient_name,
                    pat_user.email as patient_email,
                    pat_user.birthdate as patient_birthdate
                FROM appointments a
                JOIN doctor d ON a.doctor_id = d.user_id
                JOIN users doc_user ON d.user_id = doc_user.user_id
                JOIN users pat_user ON a.patient_id = pat_user.user_id
                WHERE a.appointment_id = $1 AND a.patient_id = $2;
            `,
            values: [id, patientId],
        };
        const { rows } = await healthy.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy lịch hẹn hoặc bạn không có quyền xem.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết lịch hẹn:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});


// --- CÁC API KHÁC GIỮ NGUYÊN ---
// (Toàn bộ các API GET/PUT /profile, GET /doctors, POST /appointments... vẫn giữ nguyên như trước)

/**
 * @route   PUT /api/patient/profile
 * @desc    Cập nhật chiều cao và cân nặng cho bệnh nhân.
 * @access  Private
 */
router.put('/profile', isAuthenticated, async (req, res) => {
    const { height, weight } = req.body;
    const patientId = req.session.user.id;

    if (!height || !weight || parseFloat(height) <= 0 || parseFloat(weight) <= 0) {
        return res.status(400).json({ msg: 'Vui lòng cung cấp chiều cao và cân nặng hợp lệ.' });
    }

    try {
        const heightInMeters = parseFloat(height) / 100;
        const bmi = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(1);

        const query = {
            text: `
                UPDATE patient
                SET height = $1, weight = $2, bmi = $3
                WHERE user_id = $4
                RETURNING *;
            `,
            values: [height, weight, bmi, patientId]
        };
        const { rows } = await healthy.query(query);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy thông tin bệnh nhân để cập nhật.' });
        }
        res.status(200).json({ msg: 'Cập nhật thông tin thành công!', patient: rows[0] });
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin bệnh nhân:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});


/**
 * @route   GET /api/patient/profile
 * @desc    Lấy thông tin cá nhân của bệnh nhân đang đăng nhập.
 * @access  Private
 */
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const patientId = req.session.user.id;
        const query = {
            text: `
                SELECT u.user_id, u.username, u.email, u.avata, u.address, u.birthdate,
                       p.height, p.weight, p.bmi
                FROM users u
                LEFT JOIN patient p ON u.user_id = p.user_id
                WHERE u.user_id = $1;
            `,
            values: [patientId]
        };
        const { rows } = await healthy.query(query);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy thông tin bệnh nhân.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bệnh nhân:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});

/**
 * @route   GET /api/patient/doctors
 * @desc    Lấy danh sách tất cả bác sĩ đang hoạt động.
 * @access  Public
 */
router.get('/doctors', async (req, res) => {
    try {
        const query = `
            SELECT 
                u.user_id, 
                u.username AS full_name, 
                u.avata AS avatar_url,
                d.specification,
                d.experience
            FROM doctor d
            JOIN users u ON d.user_id = u.user_id
            WHERE u.active = 'true'
            ORDER BY u.username;
        `;
        const { rows } = await healthy.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bác sĩ:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});

/**
 * @route   GET /api/patient/doctors/:id
 * @desc    Lấy thông tin chi tiết của một bác sĩ.
 * @access  Public
 */
router.get('/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = {
            text: `
                SELECT 
                    u.user_id, 
                    u.username AS full_name, 
                    u.email,
                    u.address,
                    u.birthdate,
                    u.avata AS avatar_url,
                    d.specification,
                    d.experience,
                    d.education
                FROM doctor d
                JOIN users u ON d.user_id = u.user_id
                WHERE u.user_id = $1 AND u.active = 'true';
            `,
            values: [id],
        };
        const { rows } = await healthy.query(query);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy bác sĩ.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết bác sĩ:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});

/**
 * @route   GET /api/patient/doctors/:id/schedule?date=YYYY-MM-DD
 * @desc    Lấy các créneaux đã được đặt của bác sĩ trong một ngày.
 * @access  Public
 */
router.get('/doctors/:id/schedule', async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ msg: 'Vui lòng cung cấp ngày để kiểm tra.' });
        }
        const query = {
            text: `
                SELECT time 
                FROM appointments 
                WHERE doctor_id = $1 AND appointment_date = $2 AND status NOT IN ('cancelled', 'rejected');
            `,
            values: [id, date],
        };
        const { rows } = await healthy.query(query);
        const bookedTimes = rows.map(row => row.time);
        res.status(200).json(bookedTimes);
    } catch (error) {
        console.error('Lỗi khi lấy lịch trình:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});

/**
 * @route   GET /api/patient/appointments
 * @desc    Lấy lịch sử hẹn của người dùng đang đăng nhập.
 * @access  Private
 */
router.get('/appointments', isAuthenticated, async (req, res) => {
    try {
        const patientId = req.session.user.id;
        const query = {
            text: `
                SELECT a.appointment_id, a.appointment_date, a.time, a.symptoms, a.status,
                       u.username as doctor_name, d.specification
                FROM appointments a
                JOIN doctor d ON a.doctor_id = d.user_id
                JOIN users u ON d.user_id = u.user_id
                WHERE a.patient_id = $1
                ORDER BY a.appointment_date DESC, a.time DESC;
            `,
            values: [patientId],
        };
        const { rows } = await healthy.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Lỗi khi lấy lịch sử hẹn:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});

/**
 * @route   POST /api/patient/appointments
 * @desc    Tạo một lịch hẹn mới.
 * @access  Private
 */
router.post('/appointments', isAuthenticated, upload.none(), async (req, res) => {
    const { doctor_id, appointment_date, time, symptoms } = req.body;
    const patientId = req.session.user.id;
    if (!doctor_id || !appointment_date || !time) {
        return res.status(400).json({ msg: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
    }
    try {
        const query = {
            text: `
                INSERT INTO appointments (patient_id, doctor_id, appointment_date, time, symptoms, status)
                VALUES ($1, $2, $3, $4, $5, 'pending')
                RETURNING *;
            `,
            values: [patientId, doctor_id, appointment_date, time, symptoms || ''],
        };
        const { rows } = await healthy.query(query);
        res.status(201).json({ 
            msg: 'Đặt lịch hẹn thành công!', 
            appointment: rows[0] 
        });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ msg: 'Créneau này đã có người đặt. Vui lòng chọn thời gian khác.' });
        }
        console.error('Lỗi khi tạo lịch hẹn:', error.message);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
});

module.exports = router;
