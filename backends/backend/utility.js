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

app.post('/utility/reserve', async (req, res) => {
    const { user_id, utility_id, date, start_time, end_time} = req.body;
    try {
      await client.query(
        'INSERT INTO public_utilities_reserved (reserved_user_id, utilities_id, date, start_time, end_time) VALUES ($1, $2, $3, $4, $5)',
        [user_id, utility_id, date, start_time, end_time]
      );
      res.status(201).json({ message: 'Reservation created successfully' });
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/utility/user=:userId', async (req, res) => {
    const userId = req.params.userId.toString();
    try {
        const result = await client.query('SELECT * FROM public_utilities_reserved WHERE reserved_user_id = $1', [userId]);
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
