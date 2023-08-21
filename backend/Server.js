const express = require('express');
const mongoose = require('mongoose');
console.log(process.env.PORT);
// require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/ToDoRoute');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Mongodb Connected...'))
    .catch((err) => console.error(err));

// Routes
app.use(routes);

// --------------------------deployment------------------------------

console.log(path.join(__dirname, '..', 'frontend'));
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV == undefined) {
    app.use(express.static(path.join(__dirname, '..', '/frontend/build')));
    app.get('/myserver', (req, res) => {
        res.json({
            server: process.env.PORT,
            Real_IP: req.headers['x-real-ip'],
            'X-Forwarded-For': req.headers['x-forwarded-for'],
        });
    });
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname1, '..', 'frontend', 'build', 'index.html')),
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running..');
    });
}

// --------------------------deployment------------------------------

app.listen(process.env.PORT || 8080, () =>
    console.log('Server running on port ' + process.env.PORT || 8080),
);
