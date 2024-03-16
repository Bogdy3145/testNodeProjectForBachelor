require('dotenv').config();

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS); // Be cautious with logging passwords
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);

const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3003;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {


    const { rows } = await pool.query('SELECT * FROM items ORDER BY RANDOM() LIMIT 1');
    res.send(`<h1>Random Item: ${rows[0].content}</h1><button onclick="location.reload()">Next</button>`);
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
