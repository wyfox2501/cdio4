var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cron = require('node-cron');
const checkVCBTransactions = require('./routes/checkVCB');
require('dotenv').config();
const Healthy= require('./model/Heathy');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctor');
var patientRouter = require('./routes/patient');
var paymentRouter = require('./routes/payment');
var adminRouter = require('./routes/admin');
var app = express();

app.use(cors({
  // origin: '*', // hoặc cụ thể: http://localhost:3000
   origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true // Cho phép gửi cookie
}));

cron.schedule('*/1 * * * *', async () => {
  console.log('⏳ Đang kiểm tra giao dịch VCB...');
  await checkVCBTransactions();
});

Healthy.query('SELECT NOW()')
  .then(res => console.log('✅ DB connected:', res.rows[0]))
  .catch(err => console.error('❌ DB connection error:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  store: new pgSession({
    pool: Healthy,                // Dùng kết nối từ pool
    tableName: 'session'         // Tên bảng lưu session (mặc định là "session")
  }),
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 *24,// 1 tiếng
    httpOnly: true,         // Ngăn JS truy cập cookie
  sameSite: 'lax',        // Cho phép cookie gửi khi gọi từ frontend
  secure: false           // KHÔNG set true nếu bạn dùng HTTP (localhost)
  } 
}));


app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
