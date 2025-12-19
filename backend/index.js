const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

/* Получение мероприятий */
app.get('/api/events', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM events');
  res.json(rows);
});

/* Регистрация пользователя */
app.post('/api/register', async (req, res) => {
  const { name, email, event_id } = req.body;

  await pool.query(
    'INSERT INTO registrations (name, email, event_id) VALUES ($1,$2,$3)',
    [name, email, event_id]
  );

  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Backend started on port 3000');
});
