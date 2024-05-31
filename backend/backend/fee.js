const express = require('express');
const client = require('./db');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

const app = express();
// 使用 JSON 解析中間件
app.use(express.json());

app.get('/fee/user=:userId', async (req, res) => {
    const userId = req.params.userId.toString();
    console.log(userId)
    try {
        const result = await client.query('SELECT * FROM management_fee WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
          return res.status(404).send('User not found');
        }
        res.json(result.rows[0]);
      } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Internal Server Error');
      }
});


module.exports = app;
