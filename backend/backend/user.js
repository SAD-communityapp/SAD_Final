const express = require('express');
const pool = require('./db');

const app = express();
// 使用 JSON 解析中間件
app.use(express.json());

// 用戶（USER）端點
// 獲取所有用戶資料
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// 獲取特定用戶信息
app.get('/users/user=:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// 創建新用戶
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// 更新用戶信息
app.put('/users/user=:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { name, email } = req.body;
  try {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, userId]);
    if (result.rowCount === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User updated successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// 刪除用戶
app.delete('/users/user=:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    if (result.rowCount === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});
//登入
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please provide userid and password' });
  }
  try {
    // Query the database to check if the user exists and password matches
    const query = 'SELECT * FROM "USER" WHERE ACCOUNT = $1 AND password = $2';
    const result = await pool.query(query, [username, password]);

    // If user exists and password matches, return success
    if (result.rows.length > 0) {
        return res.json({ success: true, message: 'Login successful' });
    } else {
        return res.json({ success: false, message: 'Invalid userid or password' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = app;
