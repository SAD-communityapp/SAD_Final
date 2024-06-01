const express = require('express');
const userRouter = require('./user');
const announcementRouter = require('./announcements');
const utilityRouter = require('./utility');
const feeRouter = require('./fee');
const notificationRouter = require('./notification');

const pool = require('./db');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(announcementRouter);
app.use(utilityRouter);
app.use(feeRouter);
app.use(notificationRouter);

// 測試連接是否成功
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('連接到 PostgreSQL 數據庫時出現錯誤:', err);
  } else {
    console.log('已成功連接到 PostgreSQL 數據庫，當前時間是:', res.rows[0].now);
  }
});

// 監聽應用程序的端口
app.listen(port, () => {
  console.log(`應用程序正在監聽端口 ${port}`);
});
