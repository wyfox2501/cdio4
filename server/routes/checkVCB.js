const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const { parse } = require('csv-parse/sync');
const Healthy = require('../model/Heathy'); // Kết nối DB

const config = {
  imap: {
    user: 'nhatnguyenhong45@gmail.com',
    password: 'eqiqxxiyvsdndbtz', // App password Gmail
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: {
      rejectUnauthorized: false // ⚠️ Cho phép chứng chỉ tự ký
    }
  }
};

async function checkVCBTransactions() {
  try {
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN', ['FROM', 'noreply@vietcombank.com.vn']]; // hoặc 'VCBDigibank'
    const fetchOptions = { bodies: [''], struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const item of messages) {
      const all = item.parts.find(part => part.which === '');
      const parsed = await simpleParser(all.body);

      const attachments = parsed.attachments || [];

      if (attachments.length > 0) {
        // ✅ Trường hợp có file CSV
        for (const file of attachments) {
          if (file.filename.endsWith('.csv')) {
            console.log(`🔍 Đang phân tích file CSV: ${file.filename}`);
            const content = file.content.toString('utf-8');
            const records = parse(content, { columns: true, skip_empty_lines: true });

            for (const row of records) {
              const description = row['Nội dung'] || row['Description'] || '';
              const amount = parseInt((row['Số tiền'] || '').replace(/[^0-9]/g, ''));

              const match = description.match(/USER-([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})-([a-zA-Z0-9]{4})/i);
              if (match) {
                const doctorId = match[1];
                const transactionId = match[2];

                // const exists = await Healthy.query(
                //   `SELECT * FROM transactions WHERE id = $1 AND status = 'pending' AND amount = $2`,
                //   [transactionId, amount]
                // );

                // if (exists.rows.length > 0) {
                //   console.log(`✅ Giao dịch hợp lệ từ CSV: ${transactionId}`);
                //   await Healthy.query(`UPDATE transactions SET status = 'paid', paid_at = NOW() WHERE id = $1`, [transactionId]);
                //   await Healthy.query(`UPDATE doctors SET balance = balance + $1 WHERE id = $2`, [amount, doctorId]);
                // }
                await Healthy.query(`UPDATE wallet SET total_money = total_money + $1, createdat = NOW() WHERE wallet_id = $2`, [amount, doctorId]);
                await Healthy.query(`Insert into bill (wallet_id,balance_fluctuation,transaction_type,createdat) VALUES ($1,$2,$3,NOW())`, [doctorId, amount, 'deposit_'+transactionId]);
              }
            }
          }
        }
      } else {
        // 🔍 Trường hợp KHÔNG có CSV – xử lý bằng text (biên lai HTML)
        console.log('📄 Không có file đính kèm, đang phân tích nội dung văn bản...');

        const text = parsed.text || '';

        const match = text.match(/USER-([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})-([a-zA-Z0-9]{4})/i); // tách nội dung 
        const amountMatch = text.match(/Số tiền.*?:\s*([\d,\.]+)\s*VND/i);

        if (match && amountMatch) {
          const doctorId = match[1];
          const transactionId = match[2];
          const amount = parseInt(amountMatch[1].replace(/[^0-9]/g, '')); //chuyển số tiền thanh số nguyên và bỏ các kí tự

        //   const exists = await Healthy.query(
        //     `SELECT * FROM transactions WHERE id = $1 AND status = 'pending' AND amount = $2`,
        //     [transactionId, amount]
        //   );

        //   if (exists.rows.length > 0) {
        //     console.log(`✅ Giao dịch hợp lệ từ nội dung email: ${transactionId}`);
        //     await Healthy.query(`UPDATE transactions SET status = 'paid', paid_at = NOW() WHERE id = $1`, [transactionId]);
        //     await Healthy.query(`UPDATE doctors SET balance = balance + $1 WHERE id = $2`, [amount, doctorId]);
        //   }
        await Healthy.query(`UPDATE wallet SET total_money = total_money + $1, createdat = NOW() WHERE wallet_id = $2`, [amount, doctorId]);
        await Healthy.query(`Insert into bill (wallet_id,balance_fluctuation,transaction_type,createdat) VALUES ($1,$2,$3,NOW())`, [doctorId, amount, 'deposit_'+transactionId]);
        } else {
          console.log('❌ Không tìm thấy thông tin giao dịch hợp lệ trong văn bản.');
        }
      }
    }

    connection.end();
  } catch (err) {
    console.error('❌ Lỗi khi kiểm tra email:', err);
  }
}

module.exports = checkVCBTransactions;
