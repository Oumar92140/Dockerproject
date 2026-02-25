const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Configure CORS

const options = {
    origin: ['http://localhost:4200', 'http://esgi-client'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
        'X-ACCESS_TOKEN',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Origin',
        'x-requested-with',
        'Content-Type',
        'Content-Range',
        'Content-Disposition',
        'Content-Description',
    ],
    credentials: true,
};

app.use(cors(options));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'esgi-mysql',
    user: 'esgiuser',
    password: process.env.MYSQL_PASSWORD,
    database: 'esgi_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/api/users', (req, res) => {
    const pokemonId = Math.floor(Math.random() * 1010) + 1;
    const user = { firstname: req.body.firstName, lastname: req.body.lastName, pokemon_id: pokemonId };
    
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ success: true, userId: result.insertId });
    });
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
