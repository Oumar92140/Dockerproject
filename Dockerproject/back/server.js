const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion a la base de donnee :', err);
    process.exit(1);
  }
  console.log('Connecte a MariaDB');
});

app.get('/api/messages', (req, res) => {
  db.query('SELECT * FROM messages ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: 'author et content sont requis' });
  }
  db.query(
    'INSERT INTO messages (author, content) VALUES (?, ?)',
    [author, content],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, author, content });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend demarre sur le port ${PORT}`);
});
