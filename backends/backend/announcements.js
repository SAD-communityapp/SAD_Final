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

app.get('/announcements', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM ANNOUNCEMENTS');
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/announcements/id=:id', async (req, res) => {
    const announcementId = req.params.id;
    try {
      const result = await client.query('SELECT A.*, C.* FROM ANNOUNCEMENTS A JOIN ANNOUNCEMENT_COMMENT C ON A.Announcements_ID = C.Announcement_ID WHERE A.Announcement_ID = $1;', [announcementId]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Announcement not found' });
        return;
      }
  
      // 初始化處理後的資料物件
      const processedData = {
        "AnnouncementS_ID": result.rows[0].announcement_id,
        "Title": result.rows[0].title,
        "Post_Time": result.rows[0].post_time,
        "Category": result.rows[0].category,
        "Content": result.rows[0].content,
        "Comment_ID": [],
        "Nick_Name": [],
        "Comment_Time": [],
        "Comment_Contents": [],
        "Reply_Comment_ID": []
      };
  
      // 迴圈處理每個評論並填入對應的陣列中
      result.rows.forEach(comment => {
        processedData.Comment_ID.push(comment.comment_id);
        processedData.Nick_Name.push(comment.user_id); // 這裡假設 user_id 就是 Nick_Name
        processedData.Comment_Time.push(comment.comment_time);
        processedData.Comment_Contents.push(comment.content);
        processedData.Reply_Comment_ID.push(comment.reply_comment_id);
      });
  
      // 將處理後的資料回傳給用戶端
      res.json(processedData);
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

app.post('/announcements', async (req, res) => {
    const { title, show_in_calender, start_date, end_date, content, category } = req.body;
    console.log(req.body)
    console.log(show_in_calender)
    try {
      await client.query(
        'INSERT INTO ANNOUNCEMENTS (Title, show_in_calendar, start_date, end_date, Content, Category) VALUES ($1, $2, $3, $4, $5, $6)',
        [title, show_in_calender, start_date, end_date, content, category]
      );
      res.status(201).json({ message: 'Announcement created successfully' });
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/announcements/calender', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM ANNOUNCEMENTS a WHERE a.show_in_calendar = true');
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/announcements/comment', async (req, res) => {
    const { user_id, announcement_id, reply_comment_id, content} = req.body;
    try {
      await client.query(
        'INSERT INTO ANNOUNCEMENT_COMMENT (user_id, announcement_id, reply_comment_id, content, comment_time, comment_id) VALUES ($1, $2, $3, $4, NOW(), $5)',
        [user_id, announcement_id, reply_comment_id, content, getRandomInt(-10000000, 10000000)]
      );
      res.status(201).json({ message: 'Comment created successfully' });
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app;
