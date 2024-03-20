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

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM items ORDER BY RANDOM() LIMIT 1');
    res.send(`
        <h1>Random Item: ${rows[0].content}</h1>
        <button onclick="location.reload()">Next</button>
        <form action="/add" method="post">
            <input type="text" name="content" placeholder="Add new item">
            <button type="submit">Add Item</button>
        </form>
        <form action="/delete" method="post">
            <input type="number" name="id" placeholder="ID to delete">
            <button type="submit">Delete Item</button>
        </form>
    `);
});

// Add item
app.post('/add', async (req, res) => {
    const { content } = req.body;
    try {
        await pool.query('INSERT INTO items(content) VALUES ($1)', [content]);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Error adding item');
    }
});

// Delete item
app.post('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await pool.query('DELETE FROM items WHERE id = $1', [id]);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Error deleting item');
    }
});


app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
