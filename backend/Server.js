const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
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

const __dirname1 = path.resolve(); //đường dẫn tuyệt đối đến thư mục hiện tại: mern-chat-app/ not .../backend
console.log(path.join(__dirname, '..', 'frontend'));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '..', '/frontend/build')));
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

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT));
