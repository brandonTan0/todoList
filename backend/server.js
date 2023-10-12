const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const tasks = require('./routes/tasks');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/tasks', tasks);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build',
    'index.html')));
    console.log(path.resolve(__dirname, 'client', 'build',
    'index.html'));
}


const PORT = process.env.PORT || 5002;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`.yellow.bold));