const express = require('express');
const client = require('./db');



const app = express();
// 使用 JSON 解析中間件
app.use(express.json());

app.get('/notifications', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM NOTIFICATIONS');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/notifications/account=:account', async (req, res) => {
    const account = req.params.account.toString();
    console.log(account)
    try {
        const result = await client.query('SELECT * FROM notifications WHERE account = $1;',[account] );
        if (result.rows.length === 0) {
          return res.status(404).send('User not found');
        }
        res.json(result.rows);
      } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Internal Server Error');
      }
});
app.put('/notifications/id=:id', async (req, res) => {
    id = req.params.id
    console.log(id)
    try {
      await client.query('UPDATE NOTIFICATIONS SET HASDOT = FALSE WHERE ID = $1', [id]);
      res.status(201).send('Notification HASDOT Updated');
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Internal Server Error');
    }
});
app.post('/notifications', async (req, res) => {
  const { title, account, details} = req.body;
  console.log(account)
  try {
      if (account == '所') {
        a = "" 
      } else {
        a = account
      }
      const accountsQuery = await client.query(
          'SELECT ACCOUNT FROM "USER" WHERE ACCOUNT LIKE $1',
          [`${a}%`]
      );
      const accounts = accountsQuery.rows.map(row => row.account);
      for (const acc of accounts) {
          const notificationInsertQuery = `
              INSERT INTO NOTIFICATIONS (title, account, details)
              VALUES ($1, $2, $3)
          `;
          const notificationInsertValues = [title, acc, details];
          await client.query(notificationInsertQuery, notificationInsertValues);
      }
      res.status(201).json({ message: 'Notification published successfully' });
  } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error publishing notification:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;
