
const express = require("express");
const router = express.Router();
const cron = require('node-cron');
const healthy= require('../model/Heathy');
const { v4: uuidv4 } = require("uuid");

router.get("/create", async function(req, res, next) {
  try {
    const amount=10000;
    const doctor_id= req.session.user.id; // Lấy doctorId từ session
    const transactionId = uuidv4();
    const addInfo = `USER-${doctor_id}-${transactionId}`;
    const bankNumber = "1029727969"; // số tài khoản MB nhận tiền
    const bankCode = "VCB"; // MB Bank
    const accountName = "NGUYEN HOANG HUY";

    const qrUrl = `https://img.vietqr.io/image/${bankCode}-${bankNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;

    res.status(200).json({message: "Payment created successfully", qrUrl, transactionId });
  } catch (error) {
    console.error("Error in POST /api/payment/create:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
