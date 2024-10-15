require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running on localhost');
});

app.use('/', require('./routes/index.js'));

mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
});